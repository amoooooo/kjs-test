onEvent('block.right_click', event => {
    if (event.getItem() === Item.of('supplementaries:wrench') && event.block.id === 'minecraft:lodestone') {
        global.functions.infusionAltarCheck(event, event.getBlock().pos, -4, -2, -4, 4, 0, 4);
    }
})

onEvent('block.right_click', event => {
    if (event.block.id == 'minecraft:diamond_block') {
        event.player.tell(Text.translate("tcr.aspect.terra") + "8");
    }
})

onEvent('block.right_click', event => {
    if (event.block.id == 'supplementaries:jar' && event.item.id.includes('phial')) {
        let aspect = event.item.id.slice(0, -6);
        if (getFluid(event.block) == 'minecraft:empty') {
            let data = event.block.entityData;
            data.FluidHolder.Fluid = `kubejs:${aspect}_essentia`;
            data.FluidHolder.Count = data.FluidHolder.Count + 1;
            event.block.setEntityData(data);
            event.block.entity.setChanged();
        } else if (getFluid(event.block) == `kubejs:${aspect}_essentia`) {
            let data = event.block.entityData;
            data.FluidHolder.Count = data.FluidHolder.Count + 1;
            event.block.setEntityData(data);
            event.block.entity.setChanged();
        } else {
        }
    }
})