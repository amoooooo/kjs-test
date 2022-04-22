

onEvent('item.right_click', event => {
    let baseEv = event;
    let dimension = event.level.dimension;
    let scanTarget, scanTargetName;
    if (event.getItem() == Item.of('kubejs:scanner') && (event.player.rayTrace().block !== undefined || event.player.rayTrace().entity !== undefined)) {
        if (event.player.rayTrace().block != undefined) {
            scanTarget = event.player.rayTrace().block;
            scanTargetName = scanTarget.id;
            event.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:ui.button.click block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.1 2`);
            event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${scanTarget.pos.x} ${scanTarget.pos.y + 0.5} ${scanTarget.pos.z} 0.5 0.5 0.5 0 100 normal`)
            event.server.scheduleInTicks(20, (event) => {
                if (baseEv.player.persistentData.scanned[scanTargetName] == undefined) {
                    baseEv.player.persistentData.scanned[scanTargetName] = 1;
                    baseEv.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:block.respawn_anchor.set_spawn block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.4 2`);
                }
            })

        } else {
            
        }
    }

})

onEvent('item.right_click', event => {
    let baseEv = event;
    let dimension = event.level.dimension;
    let scanTarget, scanTargetName;
    if (event.getItem() == Item.of('kubejs:scanner') && (event.player.rayTrace().block !== undefined)) {
        if (event.player.rayTrace().block != undefined) {
            let entities = rayTraceEntities(event);
            for (entity of entities) {
                scanTarget = entity;
                scanTargetName = scanTarget.item.getId().toString();
                event.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:ui.button.click block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.1 2`);
                event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${scanTarget.pos.x} ${scanTarget.pos.y + 0.5} ${scanTarget.pos.z} 0.5 0.5 0.5 0 100 normal`)
                event.server.scheduleInTicks(20, (event) => {
                    if (baseEv.player.persistentData.scanned[scanTargetName] == undefined) {
                        baseEv.player.persistentData.scanned[scanTargetName] = 1;
                        event.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:block.respawn_anchor.set_spawn block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.4 2`);
                    }
                })
            }
        }
    }
})

onEvent('item.entity_interact', event => {
    let baseEv = event;
    let dimension = event.level.dimension;
    let entity = event.target;
    let scannedEntity;
    if (event.getItem() == Item.of('kubejs:scanner')) {
        
        if (event.entity.id == 'minecraft:item') {
            scannedEntity = event.target.entityData.Item;
        } else {
            scannedEntity = event.target.name;
        }
        event.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:ui.button.click block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.1 2`);
        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${entity.x} ${entity.y} ${entity.z} 0.5 0.5 0.5 0 100 normal`)
        console.log(scannedEntity)
        event.server.scheduleInTicks(20, (event) => {
            if (baseEv.player.persistentData.scanned[scannedEntity] == undefined) {
                baseEv.player.persistentData.scanned[scannedEntity] = 1;
                baseEv.server.runCommandSilent(`execute positioned ${baseEv.player.x} ${baseEv.player.y + 2} ${baseEv.player.z} in ${dimension} run playsound minecraft:block.respawn_anchor.set_spawn block @a[distance=..10] ${baseEv.player.x} ${baseEv.player.y} ${baseEv.player.z} 0.4 2`);
            }
        })

    }
})

function rayTraceEntities(event) {
    let entities = []
    let start = event.getPlayer()
    let lookAt = rayTrace(event, 200)
    let rayx = lookAt.block.x
    let rayy = lookAt.block.y - 1.30
    let rayz = lookAt.block.z
    let d = distance(start.x, start.y + 1, start.z, rayx, rayy, rayz)
    for (let i = -1; i < d * 10; i++) {
        let delta = i / 10 / d
        let x = (1 - delta) * start.x + delta * (rayx + 0.5)
        let y = (1 - delta) * start.y + 1.60 + delta * (rayy + 0.5)
        let z = (1 - delta) * start.z + delta * (rayz + 0.5)

        let entity = event.level.getEntitiesWithin(AABB.of(x - 0.1, y - 0.1, z - 0.1, x + 0.1, y + 0.1, z + 0.1))
        entity = entity.filter(i => !i.isPlayer() && !i.isLiving())

        if (entity.length > 0) {
            event.player.tell(entity.Item)
            entities.push(entity)
            i = d * 10
        }
    }
    return entities
}

function rayTrace(event, distance) {


    const x_rad = event.player.pitch * JavaMath.PI / 180;
    const y_rad = event.player.yaw * JavaMath.PI / 180;

    const dirV = {
        x: -Math.sin(y_rad) * Math.cos(x_rad),
        y: -Math.sin(x_rad),
        z: Math.cos(y_rad) * Math.cos(x_rad)
    };

    const PosVec = {
        x: event.player.x + (distance * dirV.x),
        y: event.player.y + (distance * dirV.y) + 0.4,
        z: event.player.z + (distance * dirV.z)
    }

    for (let i = -1; i < distance * 2; i++) {
        let delta = i / 10 / distance
        let x = (1 - delta) * event.player.x + delta * (PosVec.x)
        let y = (1 - delta) * event.player.y + 1.52 + delta * (PosVec.y)
        let z = (1 - delta) * event.player.z + delta * (PosVec.z)

        let block = event.level.getBlock(x, y, z)
        if (!block.equals('minecraft:air')) {

            return {
                block: block,
                x: PosVec.x,
                y: PosVec.y,
                z: PosVec.z
            }
        }
    }

    return {
        x: PosVec.x,
        y: PosVec.y,
        z: PosVec.z
    }
}