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
    "minecraft:diamond_axe" : {items:["minecraft:stick","minecraft:stone"],catalyst:"minecraft:diamond",fluid:[{fluid:"minecraft:water",count:4}]},
    "minecraft:nether_star" : {items:["minecraft:quartz","minecraft:blaze_rod","minecraft:heart_of_the_sea"],catalyst:"minecraft:nautilus_shell",fluid:[{fluid:"minecraft:empty",count:0}]},
    "minecraft:shulker_box" : {items:["minecraft:stone","minecraft:shulker_shell","minecraft:shulker_shell","minecraft:quartz","minecraft:chain"],catalyst:"minecraft:chest",fluid:[{fluid:"minecraft:empty",count:0}]}
};