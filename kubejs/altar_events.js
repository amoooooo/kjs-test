onEvent('block.right_click', event => {
    if(event.getItem() === Item.of('supplementaries:wrench') && event.block.id === 'minecraft:lodestone') {
        global.functions.infusionAltarCheck(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4);
    }
})

onEvent('block.right_click', event => {
    if(event.block.id === 'kubejs:matrix') {
        let inputItems = global.functions.getItemsInPedestals(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4);
        let recipes = global.recipe_data;
        for (let recipe in recipes) {
            let definedRecipe = recipes[recipe];
            if (global.functions.checkRecipes(inputItems, definedRecipe)) {
                event.player.swingArm(event.hand);
                let output = recipe;
                let outputItem = Item.of(output);
                let count = definedRecipe.fluid[0].count;
                console.log(count);
                global.functions.extractItemsInPedestals(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4, outputItem, count);
            }
        }
    }
})

onEvent('block.right_click', event => {
    if(event.block.id == 'supplementaries:jar') {
        console.log(event.block.entityData.FluidHolder.Fluid);
    }
})