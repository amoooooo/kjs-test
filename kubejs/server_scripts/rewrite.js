/**
 * Check input recipe vs defined recipe.
 * 200 ticks base time, 20 ticks per item, 20 ticks per fluid.
 * extract items from pedestals per tick, and add them to the object
 * extract fluid(count) from jars per tick, and add it to the object
 * check if the recipe is valid.
 * place the output item in the pedestal.
 */

/**
 * @author amo
 */
onEvent('block.right_click', event => {
    if (event.block.id == 'kubejs:matrix') {
        let inputItems = getItemsInPedestals(event, event.getBlock().pos, -4, -2, -4, 4, 0, 4);
        let recipes = global.recipe_data;
        for (let recipe in recipes) {
            let definedRecipe = recipes[recipe];
            let time = 50;
            let count = 0;
            console.log(checkRecipes(inputItems, definedRecipe));
            if (checkRecipes(inputItems, definedRecipe)) {
                console.log("Recipe found");
                for (item in definedRecipe.items) {
                    time += 20;
                }
                for (fluid in definedRecipe.fluid) {
                    time += 20;
                }
                let outputItem = Item.of(recipe);
                count = definedRecipe.fluid[0].count;
                console.log(`time: ${time}`);
                extractItemsInPedestals(event, event.getBlock().pos, -4, -2, -4, 4, 0, 4, time, count, outputItem);

            }
        }
    }
})





/**
 * 
 * @param {{level:Internal.ServerLevelJS, player:Internal.PlayerJS<Internal.ServerPlayer>}} event 
 * @param {BlockPos} pos 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} z1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {number} z2 
 */
function getItemsInPedestals(event, pos, x1, y1, z1, x2, y2, z2) {
    /**
     * @type {Internal.BlockContainerJS[]}
     */
    let box = betweenClosed(event, pos, x1, y1, z1, x2, y2, z2);
    let items = [];
    let catalyst;
    let fluids = [];
    let count;

    console.log("Search started")
    box.forEach((block, idx, arr) => {
        if (block.id == "supplementaries:pedestal" && block.entity !== null) {
            if (!block.pos.equals(pos.below(2))) {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                if (item !== "minecraft:air") {
                    items.push(item);
                }

            } else {
                let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                let item = cap.getStackInSlot(0).item.getId();
                catalyst = item;
            }

        } else if (block.id == "supplementaries:jar" && block.entity !== null) {
            let fluid = getFluid(block);
            count = getFluidCount(block);
            fluids.push({ fluid: fluid, count: count });
        }
    })
    console.log({ items: items, catalyst: catalyst, fluid: fluids });
    return { items: items, catalyst: catalyst, fluid: fluids };
}

function extractItemsInPedestals(event, pos, x1, y1, z1, x2, y2, z2, time, count, outputItem) {
    let box = betweenClosed(event, pos, x1, y1, z1, x2, y2, z2);
    let dimension = event.level.dimension;
    let indexPedestal = 0;
    let indexJar = 0;
    event.server.runCommandSilent(`execute positioned ${pos.x} ${pos.y + 2} ${pos.z} in ${dimension} run playsound minecraft:block.portal.travel block @a[distance=..5] ${pos.x} ${pos.y + 2} ${pos.z} 0.2 0.1`);
    event.server.runCommandSilent(`execute positioned ${pos.x} ${pos.y + 2} ${pos.z} in ${dimension} run playsound minecraft:block.portal.ambient block @a[distance=..5] ${pos.x} ${pos.y + 2} ${pos.z} 0.4 0.1`);
    box.forEach((block, idx, arr) => {
        if (block.id == "supplementaries:pedestal" && block.entity !== null) {
            if (!block.pos.equals(pos.below(2))) {
                //console.log(`Extracting item from ${block.pos}`);
                //console.log(`index: ${idx}`);
                extractPedestals(block, pos, event, dimension, time, indexPedestal);
                indexPedestal++;
            } else {
                circleRing(event, time, pos, dimension);
                event.server.scheduleInTicks(time, event => {
                    let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
                    let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
                    cap.extractItem(0, 1, false);
                    cap.insertItem(0, outputItem, false);
                    circlePos(event, 0.5, false, pos, dimension);
                    event.server.runCommandSilent(`execute positioned ${pos.x} ${pos.y + 2} ${pos.z} in ${dimension} run stopsound @a[distance=..5] block minecraft:block.portal.ambient`);
                    event.server.runCommandSilent(`execute positioned ${block.x} ${block.y + 2} ${block.z} in ${dimension} run playsound minecraft:block.amethyst_block.chime block @a[distance=..5] ${block.x} ${block.y + 2} ${block.z} 200`);
                })
            }
        } else if (block.id == "supplementaries:jar" && block.entity !== null) {
            //console.log(`Extracting fluid from ${block.pos}`);
            extractJars(block, pos, event, dimension, time, indexJar, count);
            indexJar++;
        }
    })
}

function extractJars(block, pos, event, dimension, time, index, count) {
    let fluid = getFluid(block);
    if (fluid !== "minecraft:empty") {
        let currentTicks = 0;
        event.server.scheduleInTicks(1, event => {
            //console.log(count);
            let blockData = block.entityData;
            if (currentTicks < time) {
                if (index > 1) {
                    if (currentTicks >= (count * 10) * index && currentTicks <= (count * 10) * (index + 1) && blockData.FluidHolder.Fluid != "minecraft:empty") {
                        //console.log(`Extracting fluid ${fluid} from ${block.pos}`);
                        particleLine(event, block, pos, getFluidColor(block), dimension);
                        let data = block.entityData;
                        if (data.FluidHolder.Count > 0) {
                            data.FluidHolder.Count = data.FluidHolder.Count - (count / 2);
                            block.setEntityData(data);
                            block.entity.setChanged();
                        }
                        if (data.FluidHolder.Count <= 0) {
                            data.FluidHolder.Fluid = "minecraft:empty";
                            data.FluidHolder.Count = 0;
                            block.setEntityData(data);
                            block.entity.setChanged();
                        }
                    }
                } else {
                    if (currentTicks <= (count * 10) * (index + 1) && blockData.FluidHolder.Fluid != "minecraft:empty") {
                        //console.log(`Extracting fluid ${fluid} from ${block.pos}`);
                        particleLine(event, block, pos, getFluidColor(block), dimension);
                        let data = block.entityData;
                        if (data.FluidHolder.Count > 0) {
                            data.FluidHolder.Count = data.FluidHolder.Count - (count / 2);
                            block.setEntityData(data);
                            block.entity.setChanged();
                        }
                        if (data.FluidHolder.Count <= 0) {
                            data.FluidHolder.Fluid = "minecraft:empty";
                            data.FluidHolder.Count = 0;
                            block.setEntityData(data);
                            block.entity.setChanged();
                        }
                    }
                }
                currentTicks++;
                event.reschedule();
            }
        })
    }
}

function extractPedestals(block, pos, event, dimension, time, index) {
    let CapabilityItem = java("net.minecraftforge.items.CapabilityItemHandler");
    let cap = block.entity.getCapability(CapabilityItem.ITEM_HANDLER_CAPABILITY).resolve().get();
    let item = cap.getStackInSlot(0).item.getId();
    if (item !== "minecraft:air") {
        let currentTicks = 0;
        let vec = vecToTarget(block.pos, pos, 1);
        event.server.scheduleInTicks(1, event => {
            if (currentTicks < time) {
                if (index > 1) {
                    if (currentTicks >= 30 * index && currentTicks <= 30 * (index + 1)) {
                        //console.log(`Extracting ${item}`);
                        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:item ${item} ${block.x} ${block.y + 1.5} ${block.z} ${vec.x} ${vec.y} ${vec.z} 0.175 0 normal`);
                    }
                } else {
                    if (currentTicks <= 30 * (index + 1)) {
                        //console.log(`Extracting ${item}`);
                        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:item ${item} ${block.x} ${block.y + 1.5} ${block.z} ${vec.x} ${vec.y} ${vec.z} 0.175 0 normal`);
                    }
                }
                if (currentTicks == 30 * (index + 1)) {
                    cap.extractItem(0, 1, false)
                }
                currentTicks++;
                event.reschedule();
            }
        })
    }
}

function checkRecipes(input, recipe) {
    var inputItems = input.items;
    var inputCatalyst = input.catalyst;
    var inputFluid = input.fluid;
    var recipeItems = recipe.items;
    var recipeCatalyst = recipe.catalyst;
    var recipeFluid = recipe.fluid;
    let items = () => {
        for (item of inputItems) {
            //console.log(item)
            for (item2 of recipeItems) {
                //console.log(item2)
                if (item == item2) {
                    return true;
                }
            }
        }
    }
    let catalyst = inputCatalyst == recipeCatalyst;
    let fluid = () => {
        for (fluid of inputFluid) {
            //console.log(`${fluid.fluid} + ${fluid.count}`)
            for (fluid2 of recipeFluid) {
                //console.log(`${fluid2.fluid} + ${fluid2.count}`)
                if (fluid.fluid == fluid2.fluid && fluid.count >= fluid2.count) {
                    return true;
                }
            }
        }
    }
    return items() && catalyst && fluid();
}

function betweenClosed(event, pos, x1, y1, z1, x2, y2, z2) {
    let x = pos.x + x1;
    let y = pos.y + y1;
    let z = pos.z + z1;

    let box = [];
    while (x <= pos.x + x2) {
        while (y <= pos.y + y2) {
            while (z <= pos.z + z2) {
                box.push(event.level.getBlock(x, y, z));
                z++;
            }
            y++;
            z = pos.z + z1;
        }
        x++;
        y = pos.y + y1;
    }
    return box;
}

function vecToTarget(pos, target, speed) {
    let step = target.subtract(pos).multiply(1 / speed);
    return step;
}

function getFluidCount(block) {
    return block.entityData.FluidHolder.Count;
}

function getFluidColor(block) {
    return intToRGB(block.entityData.FluidHolder.CachedColor);
}

function getFluid(block) {
    return block.entityData.FluidHolder.Fluid;
}

function intToRGB(col) {
    const b = (col) & 0xFF;
    const g = (col >> 8) & 0xFF;
    const r = (col >> 16) & 0xFF;
    return { r: r / 255, g: g / 255, b: b / 255 };
}

function particleLine(event, start, end, color, dimension) {
    let d = distance(start.x, start.y, start.z, end.x, end.y, end.z);
    let counter = 0;
    let i = -1;
    for (let i = -1; i < d * 10; i++) {
        let delta = i / 10 / d;
        let x = (1 - delta) * (start.x + 0.5) + delta * (end.x + 0.5);
        let y = (1 - delta) * (start.y + 1) + delta * (end.y + 0.5);
        let z = (1 - delta) * (start.z + 0.5) + delta * (end.z + 0.5);
        //console.log(`${x} | ${y} | ${z}`);
        if (counter == 4) {
            event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:dust ${color.r} ${color.g} ${color.b} 1.0 ${x} ${y} ${z} 0.1 0.05 0.1 0 2 normal`);
            counter = 0;
        } else {
            counter++;
        }
    }
}

function circlePos(event, r, delay, pos, dimension) {
    if (!delay) {
        for (let angle = 0; angle < 6.3; angle += 0.1) {
            let x = (r * Math.sin(angle))
            let z = (r * Math.cos(angle))
            event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${(pos.x + 0.5) + x} ${pos.y - 1} ${(pos.z + 0.5) + z} 0 0 0 0 3`)
        }
    } else {
        let angle = 0;
        event.server.schedule(delay, event, callback => {
            let x = (r * Math.sin(angle));
            let z = (r * Math.cos(angle))
            event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:enchant ${(pos.x + 0.5) + x} ${pos.y - 1} ${(pos.z + 0.5) + z} 0 0 0 0 3`)
            if (angle < 6.3) {
                angle += 0.1
                callback.reschedule()
            }
        })
    }
}

function circleRing(event, time, pos, dimension) {
    circlePos(event, 0.75, time * 0.1, { x: pos.x, y: pos.y + 2.5, z: pos.z }, dimension);

    circlePos(event, 1.5, time * 0.75, { x: pos.x, y: pos.y + 2, z: pos.z }, dimension);
    circlePos(event, 1.5, time * 0.75, { x: pos.x, y: pos.y + 1.25, z: pos.z }, dimension);
    circlePos(event, 1.5, time * 0.75, { x: pos.x, y: pos.y + 1.5, z: pos.z }, dimension);
    circlePos(event, 1.5, time * 0.75, { x: pos.x, y: pos.y + 1.75, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 0.5, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 0.75, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 0, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 0.25, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 1.5, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 1.75, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 1, z: pos.z }, dimension);
    circlePos(event, -3, false, { x: pos.x, y: pos.y - 1.25, z: pos.z }, dimension);
}
function randomNegative(x) {
    return Math.random() * (Math.round(Math.random()) ? -1 : 1);
}

function distance(x1, y1, z1, x2, y2, z2) {
    return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)));
}