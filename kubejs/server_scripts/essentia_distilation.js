let aspects = JsonIO.read('aspectfilegenerated.json')

onEvent('recipes', event => {
    aspects.forEach((item, aspectObj) => {
        let aspectList = [];
        aspectObj.forEach((aspect, count) => {
            // [output], [input]
            // "(aspect.slice(11))_essentia"
            let name = `kubejs:${aspect.slice(11)}_essentia`;
            aspectList.push(Fluid.of(name, count*10));
        })
        //console.log(aspectList);
        event.recipes.createMixing(aspectList, [Fluid.of("minecraft:water", 50), Item.of(item)]).heated()
    })
})