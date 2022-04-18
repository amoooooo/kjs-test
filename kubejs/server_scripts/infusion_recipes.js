/**
 * Global object of objects that contain the recipe data.
 * something like this:
 * recipe_data = 
 * {
 *  {items:[blah,blah], catalyst: "blah"} : "minecraft:slime_ball"
 * };
 * use this to check if the recipe is valid.
 * if ({recipeInput} in recipe_data) {
 *  recipe_output = recipe_data[{recipeInput}];
 * }
 */

global.recipe_data = {
    "minecraft:diamond_axe" : {items:["minecraft:stick","minecraft:stone"],catalyst:"minecraft:diamond",fluid:[{fluid:"kubejs:perditio_essentia",count:4}]},
    "minecraft:nether_star" : {items:["minecraft:quartz","minecraft:blaze_rod","minecraft:heart_of_the_sea"],catalyst:"minecraft:nautilus_shell",fluid:[{fluid:"kubejs:perditio_essentia",count:8},{fluid:"kubejs:terra_essentia",count:8}]},
    "minecraft:shulker_box" : {
        items:["minecraft:purpur_block","minecraft:shulker_shell","minecraft:shulker_shell","minecraft:quartz","minecraft:chain","minecraft:slime_ball","minecraft:amethyst_shard","minecraft:enchanted_book"],
        catalyst:"minecraft:chest",
        fluid:[
            {fluid:"kubejs:terra_essentia",count:4},
            {fluid:"kubejs:aqua_essentia",count:8},
            {fluid:"kubejs:ignis_essentia",count:8},
            {fluid:"kubejs:aer_essentia",count:8},
            {fluid:"kubejs:ordo_essentia",count:8},
            {fluid:"kubejs:motus_essentia",count:4},
            {fluid:"kubejs:gelum_essentia",count:4},
            {fluid:"kubejs:lux_essentia",count:4},
            {fluid:"kubejs:tenebrae_essentia",count:4},
        ]
    }
};