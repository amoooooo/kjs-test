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
