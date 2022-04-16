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
    "minecraft:diamond_axe" : '{items:[minecraft:stick,minecraft:stone],catalyst:"minecraft:diamond"}'
};