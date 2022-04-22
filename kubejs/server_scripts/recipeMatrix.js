onEvent('recipes', (event)=>{
    const matrix = Utils.newMap();
    const allItems = Item.getList();
    event.forEachRecipe({}, (recipe) => {
        recipe.inputItems.forEach( (ing) => {
            allItems.forEach( (stack) => {
                if(ing.test(stack.withCount(64))){
                    if(matrix.get(stack.id) == null){
                    matrix.put(stack.id, Utils.newMap());
                }
                recipe.outputItems.forEach((out) => {
                    matrix.get(stack.id).put(out.id, true);
                });
                }
            });
        });
    });
    JsonIO.write('recipematrix.json', matrix);
});