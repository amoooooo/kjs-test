// TODO: compare hand written structure list with box, if matches, replace existing blocks with hand written structure
onEvent('block.right_click', event => {
    if(event.getItem() === Item.of('supplementaries:wrench') && event.block.id === 'minecraft:lodestone') {
        global.functions.infusionAltarCheck(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4);
    }
})

onEvent('block.right_click', event => {
    if(event.block.id === 'kubejs:matrix') {
        //event.player.tell('matrix');
    }
})

onEvent('block.right_click', event => {
    if(event.getItem() === Item.of('minecraft:stick')) {
        let inputItems = global.functions.getItemsInPedestals(event, event.getBlock().pos, -4, -2, -4, 4 ,0, 4);
        let recipes = global.recipe_data;
        for (let recipe in recipes) {
            console.log(recipes[recipe].toString());
            console.log(JSON.stringify(inputItems));
            let definedRecipe = recipes[recipe];
            if (JSON.stringify(inputItems).equals(definedRecipe.toString())) {
                event.player.tell('Found recipe: ' + recipe);
            }
        }
    }
})