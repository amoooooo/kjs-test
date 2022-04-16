var altarStructure = "minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:lodestone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air";
global.functions = {}
global.functions.infusionAltarCheck = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let box = global.functions.betweenClosedID(event, pos, x1, y1, z1, x2, y2, z2);
    if (box.toString() === altarStructure){
        event.block.set("kubejs:matrix");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.north.east.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x+1} ${event.block.y-1} ${event.block.z+1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.north.west.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x+1} ${event.block.y-1} ${event.block.z-1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.south.east.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x-1} ${event.block.y-1} ${event.block.z+1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.south.west.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x-1} ${event.block.y-1} ${event.block.z-1} 0.5 0.5 0.5 0 100 normal`);
        event.server.runCommandSilent(`execute positioned ${event.block.x} ${event.block.y} ${event.block.z} in ${event.level.dimension} run playsound minecraft:block.enchantment_table.use block @a[distance=..5]`);
        event.block.down.down.north.east.set("kubejs:pillar_sw");
        event.block.down.down.north.west.set("kubejs:pillar_se");
        event.block.down.down.south.east.set("kubejs:pillar_nw");
        event.block.down.down.south.west.set("kubejs:pillar_ne");
    } else {
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:angry_villager ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0 20 normal`);
        event.server.runCommandSilent(`execute positioned ${event.block.x} ${event.block.y} ${event.block.z} in ${event.level.dimension} run playsound minecraft:entity.villager.no block @a[distance=..5]`);
    }
}

/**
 * 
 * @param {{level:Internal.ServerLevelJS, player:Internal.PlayerJS<Internal.ServerPlayer>}} event 
 * @param {BlockPos} pos 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} z1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {number} z2 
 */
 global.functions.getItemsInPedestals = (event, pos, x1, y1, z1, x2, y2, z2) => {
    /**
     * @type {Internal.BlockContainerJS[]}
     */
    let box = global.functions.betweenClosed(event, pos, x1, y1, z1, x2, y2, z2);
    let items = [];
    let catalyst;

    console.log("Search started")
    box.forEach((block, idx, arr) => {
        if (block.id == "supplementaries:pedestal" && block.entity !== null) {
            if (!block.pos.equals(pos.below(2))) {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                if (item !== "minecraft:air") {
                    items.push(item);
                }
                
            } else {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                catalyst = item;
            }
            
        }
    })
    console.log(JSON.stringify({items: items, catalyst: catalyst}));
    return {items: items, catalyst: catalyst};
}

global.functions.extractItemsInPedestals = (event, pos, x1, y1, z1, x2, y2, z2, item) => {
    let box = global.functions.betweenClosed(event, pos, x1, y1, z1, x2, y2, z2);
    let dimension = event.level.dimension;
    box.forEach((block, idx, arr) => {
        if (block.id == "supplementaries:pedestal" && block.entity !== null) {
            if (!block.pos.equals(pos.below(2))) {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                console.log(block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get().getStackInSlot(0));
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                if(item !== "minecraft:air"){
                    let ticks = 100;
                    let currentTicks = 0;
                    let vec = global.functions.vecToTarget(block.pos, pos, 1);
                    console.log(block.pos + " " + pos);
                    //console.log(JSON.stringify(vec));
                    event.server.scheduleInTicks(1, event => {
                        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:item ${item} ${block.x} ${block.y} ${block.z} ${vec.x} ${vec.y} ${vec.z} 0 100 normal`);
                        if (currentTicks <= ticks) {
                            currentTicks++;
                            event.reschedule()
                        }
                    })
                }
                event.server.scheduleInTicks(100, event => {cap.extractItem(0, 1, false);})
                
            } else {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                cap.extractItem(0, 1, false);
                cap.insertItem(0, item, false);
            }
        }
    })
}


global.functions.betweenClosed = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let x = pos.x+x1;
    let y = pos.y+y1;
    let z = pos.z+z1;

    let box = [];
    while (x <= pos.x+x2) {
        while (y <= pos.y+y2) {
            while (z <= pos.z+z2) {
                box.push(event.level.getBlock(x, y, z));
                z++;
            }
            y++;
            z = pos.z+z1;
        }
        x++;
        y = pos.y+y1;
    }
    return box;
}

global.functions.betweenClosedID = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let x = pos.x+x1;
    let y = pos.y+y1;
    let z = pos.z+z1;

    let box = [];
    while (x <= pos.x+x2) {
        while (y <= pos.y+y2) {
            while (z <= pos.z+z2) {
                box.push(event.level.getBlock(x, y, z).id);
                if (event.level.getBlock(x, y, z).id.toString() !== "minecraft:air") {
                }
                z++;
            }
            y++;
            z = pos.z+z1;
        }
        x++;
        y = pos.y+y1;
    }
    return box;
}

global.functions.getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

global.functions.vecToTarget = (pos, target, speed) => {
    let x = (target.x - pos.x) / speed;
    let y = (target.y - pos.y) / speed;
    let z = (target.z - pos.z) / speed;
    console.log(x + " " + y + " " + z);
    let vec = {x: `${x}`, y: `${y}`, z: `${z}`};
    return vec;
}

global.functions.deepEqual = (x, y) => {
    return (x && y && typeof x === 'object' && typeof y === 'object') ?
    (Object.keys(x).length === Object.keys(y).length) &&
      Object.keys(x).reduce(function(isEqual, key) {
        return isEqual && global.functions.deepEqual(x[key], y[key]);
      }, true) : (x === y);
}