onEvent('block.right_click', event => {
    if (event.getItem() == Item.of('minecraft:nether_star') && event.block.id == 'minecraft:respawn_anchor') {
        if (event.level.dimension == 'tckjs:depths') {
            let data = betweenClosedBlocksStructure(event, event.block, event.block.x - 10, event.block.y, event.block.z - 10, event.block.x + 10, event.block.y + 10, event.block.z + 10);
            let key = `key_${event.player.id}`
            console.log(`key: ${key} data: ${data}`)
            console.log(event.level.persistentData.toString())
            event.level.persistentData[key] = data;
            console.log(`persistentData: ${event.level.persistentData[key]}`)
            data.forEach((pos, block) => {
                console.log(`${pos} ${block}`)
                event.level.setBlock(pos, 'minecraft:air');
            })
            console.log(data)
            event.server.scheduleInTicks(20, event => {
                event.server.runCommandSilent(`execute in minecraft:overworld run tp ${event.player.name} 0 250 0`);
            })
        } else {
            event.server.runCommandSilent(`execute in tckjs:depths run tp ${event.player.name} 0 2 0`);
        }
    } else if (event.getItem() == Item.of('minecraft:ghast_tear') && event.block.id == 'minecraft:respawn_anchor') {
        if (event.level.dimension == 'tckjs:depths') {
            let data = event.level.persistentData[`key_${event.player.id}`];
            data.forEach((pos, block) => {
                console.log(`${pos} ${block}`)
                event.level.setBlock(pos, block);
            })
        }
    }
})

function betweenClosedBlocksStructure(event, pos, x1, y1, z1, x2, y2, z2) {
    let x = x1;
    let y = y1;
    let z = z1;
    let box = {};
    while (x <= x2) {
        while (y <= y2) {
            while (z <= z2) {
                if (event.level.getBlock(x, y, z).equals('minecraft:air')) { } else {
                    let pos = event.level.getBlock(x, y, z).pos;
                    box[pos] = event.level.getBlock(x, y, z);
                }
                z++;
            }
            y++;
            z = z1;
        }
        x++;
        y = y1;
    }
    console.log(box)
    return box;
}