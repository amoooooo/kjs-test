var altarStructure = "minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:lodestone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:chiseled_polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:polished_blackstone,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,supplementaries:pedestal,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air,minecraft:air";
global.functions = {}
global.functions.infusionAltarCheck = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let box = global.functions.betweenClosedID(event, pos, x1, y1, z1, x2, y2, z2);
    if (box.toString() === altarStructure) {
        event.block.set("kubejs:matrix");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.north.east.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x + 1} ${event.block.y - 1} ${event.block.z + 1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.north.west.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x + 1} ${event.block.y - 1} ${event.block.z - 1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.south.east.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x - 1} ${event.block.y - 1} ${event.block.z + 1} 0.5 0.5 0.5 0 100 normal`);
        event.block.down.south.west.set("minecraft:air");
        event.server.runCommandSilent(`execute in ${event.level.dimension} run particle minecraft:enchant ${event.block.x - 1} ${event.block.y - 1} ${event.block.z - 1} 0.5 0.5 0.5 0 100 normal`);
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
    let fluids = [];
    let count;

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

        } else if (block.id == "supplementaries:jar" && block.entity !== null) {
            let fluid = global.functions.getFluid(block);
            count = global.functions.getFluidCount(block);
            fluids.push({ fluid: fluid, count: count });
        }
    })
    console.log({ items: items, catalyst: catalyst, fluid: fluids });
    return { items: items, catalyst: catalyst, fluid: fluids };
}

global.functions.extractItemsInPedestals = (event, pos, x1, y1, z1, x2, y2, z2, item, count) => {
    let box = global.functions.betweenClosed(event, pos, x1, y1, z1, x2, y2, z2);
    let dimension = event.level.dimension;
    event.server.runCommandSilent(`execute positioned ${pos.x} ${pos.y + 2} ${pos.z} in ${dimension} run playsound minecraft:block.portal.ambient block @a[distance=..5] ${pos.x} ${pos.y + 2} ${pos.z} 25 0.2`);
    box.forEach((block, idx, arr) => {
        if (block.id == "supplementaries:pedestal" && block.entity !== null) {
            if (!block.pos.equals(pos.below(2))) {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                if (item !== "minecraft:air") {
                    let ticks = 200;
                    let currentTicks = 0;
                    let vec = global.functions.vecToTarget(block.pos, pos, 1);
                    event.server.scheduleInTicks(1, event => {
                        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:item ${item} ${block.x} ${block.y + 1.5} ${block.z} ${vec.x} ${vec.y} ${vec.z} 0.175 0 normal`);
                        if (currentTicks <= ticks) {
                            currentTicks++;
                            event.reschedule()
                        }
                    })
                }
                event.server.scheduleInTicks(200, event => { cap.extractItem(0, 1, false); })

            } else {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                event.server.scheduleInTicks(200, event => {
                    cap.extractItem(0, 1, false);
                    cap.insertItem(0, item, false);
                    event.server.runCommandSilent(`execute positioned ${pos.x} ${pos.y + 2} ${pos.z} in ${dimension} run stopsound @a[distance=..5] block minecraft:block.portal.ambient`);
                    event.server.runCommandSilent(`execute positioned ${block.x} ${block.y + 2} ${block.z} in ${dimension} run playsound minecraft:block.amethyst_block.chime block @a[distance=..5] ${block.x} ${block.y + 2} ${block.z} 200`);
                });
            }
        } else if (block.id == "supplementaries:jar" && block.entity !== null) {
            let color = global.functions.getFluidColor(block);
            console.log(color);
            let ticks = 200;
            let currentTicks = 0;
            let counter = 0;
            let vec = global.functions.vecToTarget(block.pos, pos, 1);
            event.server.scheduleInTicks(1, event => {
                global.functions.particleLine(event, block.pos, pos, color, dimension);
                if (currentTicks % 50 == 0 && global.functions.getFluidCount(block) > 0 && counter < count) {
                    let data = block.entityData;
                    data.FluidHolder.Count = data.FluidHolder.Count - 1;
                    console.log(data.FluidHolder.Count);
                    block.setEntityData(data);
                    block.entity.setChanged();
                    //block.entityData.FluidHolder.put("Count",block.entityData.FluidHolder.Count - 1);
                    counter++;
                }
                if (currentTicks <= ticks) {
                    currentTicks++;
                    event.reschedule()
                }
            })
        }
    })
}


global.functions.betweenClosed = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let x = pos.x + x1;
    let y = pos.y + y1;
    let z = pos.z + z1;

    let box = [];
    while (x <= pos.x + x2) {
        while (y <= pos.y + y2) {
            while (z <= pos.z + z2) {
                box.push(event.level.getBlock(x, y, z));
                z++;
            }
            y++;
            z = pos.z + z1;
        }
        x++;
        y = pos.y + y1;
    }
    return box;
}

global.functions.betweenClosedID = (event, pos, x1, y1, z1, x2, y2, z2) => {
    let x = pos.x + x1;
    let y = pos.y + y1;
    let z = pos.z + z1;

    let box = [];
    while (x <= pos.x + x2) {
        while (y <= pos.y + y2) {
            while (z <= pos.z + z2) {
                box.push(event.level.getBlock(x, y, z).id);
                if (event.level.getBlock(x, y, z).id.toString() !== "minecraft:air") {
                }
                z++;
            }
            y++;
            z = pos.z + z1;
        }
        x++;
        y = pos.y + y1;
    }
    return box;
}

global.functions.getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

global.functions.vecToTarget = (pos, target, speed) => {
    let step = target.subtract(pos).multiply(1 / speed);
    return step;
}

global.functions.deepEqual = (x, y) => {
    return (x && y && typeof x === 'object' && typeof y === 'object') ?
        (Object.keys(x).length === Object.keys(y).length) &&
        Object.keys(x).reduce(function (isEqual, key) {
            return isEqual && global.functions.deepEqual(x[key], y[key]);
        }, true) : (x === y);
}

global.functions.getFluid = (block) => {
    return block.entityData.FluidHolder.Fluid;
}

global.functions.getFluidCount = block => {
    return block.entityData.FluidHolder.Count;
}

global.functions.getFluidColor = (block) => {
    return global.functions.intToRGB(block.entityData.FluidHolder.CachedColor)
}

global.functions.particleLine = (event, start, end, color, dimension) => {
    let d = global.functions.distance(start.x, start.y, start.z, end.x, end.y, end.z);
    let counter = 0;
    for (let i = -1; i < d * 10; i++) {
        let delta = i / 10 / d;
        let x = (1 - delta) * (start.x + 0.5) + delta * (end.x + 0.5);
        let y = (1 - delta) * (start.y + 1) + delta * (end.y + 0.5);
        let z = (1 - delta) * (start.z + 0.5) + delta * (end.z + 0.5);
        //console.log(`${x} | ${y} | ${z}`);
        if (counter == 1) {
            event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:dust ${color.r} ${color.g} ${color.b} 1.0 ${x} ${y} ${z} 0 0 0 0 0 normal`);
            counter = 0;
        } else {
            counter++;
        }
    }
}

global.functions.intToRGB = (col) => {
    const b = (col) & 0xFF;
    const g = (col >> 8) & 0xFF;
    const r = (col >> 16) & 0xFF;
    return { r: r / 255, g: g / 255, b: b / 255 };
}

global.functions.randomNegative = (x) => {
    return Math.random() * (Math.round(Math.random()) ? -1 : 1);
}

global.functions.distance = (x1, y1, z1, x2, y2, z2) => {
    return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)));
}