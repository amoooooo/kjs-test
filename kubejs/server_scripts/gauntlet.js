// TODO: fix this
let wards = JsonIO.read('wards.json');

// TODO: get the ray to work if it doesnt hit a block


onEvent('block.right_click', event => {
    let dimension = event.level.dimension;
    if ((event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_basic' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_advanced') && event.player.persistentData.vis.current > 10 && event.player.getHeldItem(MAIN_HAND).nbt.Focus == 'kubejs:warding_focus' && !event.player.crouching) {
        wardBlock(event, event.block)
        event.server.runCommandSilent(`execute positioned ${event.block.x} ${event.block.y} ${event.block.z} in ${dimension} run playsound minecraft:block.amethyst_block.fall block @a[distance=..5] ${event.block.x} ${event.block.y} ${event.block.z} 0.7 1.3`);
        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${event.block.x} ${event.block.y} ${event.block.z} 0.3 0.3 0.3 0 50 normal`)
    }
})



onEvent('block.break', event => {
    let dimension = event.level.dimension;
    let pos = `${event.block.x}_${event.block.y}_${event.block.z}_${event.level.dimension}`;
    console.log(`block broken! ${pos}`)
    if (wards) {
        if (pos in wards && wards[pos] != "undefined") {
            if (wards[pos] == event.player.minecraftPlayer.getStringUUID()) {
                wards[pos] = undefined;
                event.server.runCommandSilent(`execute positioned ${event.block.x} ${event.block.y} ${event.block.z} in ${dimension} run playsound minecraft:block.amethyst_block.step block @a[distance=..5] ${event.block.x} ${event.block.y} ${event.block.z} 0.7 1.3`);
                event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:warped_spore ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0 20 normal`)
                JsonIO.write('wards.json', wards);
            } else {
                event.player.tell('You do not own this ward.')
                event.server.runCommandSilent(`execute positioned ${event.block.x} ${event.block.y} ${event.block.z} in ${dimension} run playsound minecraft:block.amethyst_block.break block @a[distance=..5] ${event.block.x} ${event.block.y} ${event.block.z} 0.7 1.3`);
                event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0 20 normal`)
                event.cancel()
            }
        }
    } else {
        wards = {};
    }

})

onEvent('item.right_click', event => {
    if ((event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_basic' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_advanced' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:wand') && event.player.getHeldItem(OFF_HAND).id.toString().includes('focus') && ( !event.player.getHeldItem(MAIN_HAND).nbt || (event.player.getHeldItem(MAIN_HAND).nbt && !event.player.getHeldItem(MAIN_HAND).nbt.data) )) {
            let caster = event.player.getHeldItem(MAIN_HAND);
            caster.nbt = {};
            caster.nbt.CustomModelData = 1;
            let focus = event.player.getHeldItem(OFF_HAND).id
            console.log(focus)
            let data = event.player.getHeldItem(OFF_HAND).nbt
            console.log(data)
            caster.nbt.focus = focus;
            caster.nbt.data = data.data;
            event.player.setHeldItem(MAIN_HAND, caster);
            event.player.setHeldItem(OFF_HAND, Item.empty);
    } else if ((event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_basic' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_advanced' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:wand') && event.player.getHeldItem(MAIN_HAND).hasNBT && event.player.crouching && event.player.getHeldItem(OFF_HAND) == Item.empty) {
        let caster = event.player.getHeldItem(MAIN_HAND);
        console.log(caster.nbt.focus);
        console.log(caster.nbt.data)
        let focus = Item.of(caster.nbt.focus);
        focus.nbt = {}
        focus.nbt.data = caster.nbt.data
        event.player.setHeldItem(OFF_HAND, focus)
        caster.nbt = {};
        caster.nbt.CustomModelData = 0;
        caster.nbt.Focus = 'kubejs:focus_none';
    }
})

function explodeOnBlock(event, entities, ray, damage) {
    //console.log(`${ray.x} ${ray.y} ${ray.z}`)
    //event.level.createExplosion(ray.x, ray.y, ray.z).explode()
    let upper = { x: ray.x + 2, y: ray.y + 2, z: ray.z + 2 };
    let lower = { x: ray.x - 2, y: ray.y - 2, z: ray.z - 2 };
    let explosionEnt = event.level.getEntitiesWithin(AABB.of(lower.x, lower.y, lower.z, upper.x, upper.y, upper.z));
    explosionEnt = explosionEnt.filter(i => !i.isPlayer() && i.isAlive() && i.isLiving())
    for (let expEnt of explosionEnt) {
        console.log(expEnt);
        expEnt.attack(damage)
    }
    for (let entity of entities) {
        console.log(entity);
        entity[0].attack(damage)
    }
    // summon firework_rocket ~ ~1 ~ {LifeTime:15,FireworksItem:{id:firework_rocket,Count:1,tag:{Fireworks:{Flight:1,Explosions:[{Type:1,Flicker:0,Trail:0,Colors:[I;15790320],FadeColors:[I;8073150]}]}}}}
    event.server.runCommandSilent(`execute positioned ${ray.x} ${ray.y} ${ray.z} in ${event.level.dimension} run playsound minecraft:entity.lightning_bolt.thunder master @a[distance=..120] ${ray.x} ${ray.y} ${ray.z} 1 2`);
    event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:dust 0.0 0.6 1.0 1.0 ${ray.x} ${ray.y} ${ray.z} 1 1 1 0 250 normal`)
}

// TODO: get this to save data to the level's persistent data instead of a file
function wardBlock(event, block) {
    let pos = `${block.x}_${block.y}_${block.z}_${event.level.dimension}`;
    if (event.player.minecraftPlayer.getStringUUID() != wards[pos] && wards[pos] != "undefined" && wards[pos] != undefined) {
        event.player.tell('You do not own this ward.')
    } else {
        wards[pos] = event.player.minecraftPlayer.getStringUUID();
    }
    if (wards == undefined) {
        wards = {};
    }
    JsonIO.write('wards.json', wards);
}

