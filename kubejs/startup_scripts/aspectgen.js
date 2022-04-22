onEvent('postinit', (event) => {
    console.log("Event triggered")
    let matrix = JsonIO.read('recipematrix.json');
    let aspectFile = JsonIO.read('aspectfile.json');
    const todo = Utils.newList();
    const seen = Utils.newMap();

    function addAspects(item, output) {
        // Do whatever you need to make the output
        // item have the aspects of the input here.
        if (!aspectFile[output]) {
            aspectFile[output] = Utils.newMap();
        }
        console.info(`Now Transferring aspects from ${item} to ${output}.`);
        if (aspectFile[item]) {
            for (let asp of aspectFile[item].entrySet()) {
                if (!aspectFile[output][asp.key]) {
                    aspectFile[output][asp.key] = 0;
                }
                aspectFile[output][asp.key] = asp.value + aspectFile[output][asp.key];
            }
        }
    }
    function searchRecipeGraph() {
        while (!todo.isEmpty()) {
            let item = todo.pop();
            console.log(`Now searching ${item}...`);
            if (seen.get(item)) {
                console.log("Item has already been seen.");
                continue;
            }
            seen.put(item, true);
            if (matrix[item]) {
                console.log(`Found ${matrix[item].size()} items that can be made with item.`);
                for (let output of matrix[item].keySet()) {
                    todo.push(output);
                    addAspects(item, output);
                }
            } else {
                console.info("Item was undefined / no items found.");
            }
        }
    }
    for (let [itemid] of Object.entries(aspectFile)) {
        if(matrix[itemid]){
            seen.put(itemid, true);
            for (let output of matrix[itemid].keySet()) {
                todo.push(output);
                if(!aspectFile[output])
                  addAspects(itemid,output)
            }
        }
    }  
    searchRecipeGraph();
    JsonIO.write('aspectfilegenerated.json', aspectFile.toJson());
    global.aspects = aspectFile;
});