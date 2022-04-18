onEvent('block.right_click', event => {
    if(event.getItem() === Item.of('supplementaries:wrench') && event.block.id === 'minecraft:lodestone') {
        global.functions.infusionAltarCheck(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4);
    }
})