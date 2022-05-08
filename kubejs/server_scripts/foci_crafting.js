let aspectColors = {
    'ignis': { r: 1, g: 0.5, b: 0 },
    'gelum': { r: 0.5, g: 0.5, b: 1 },
    'aer': { r: 0.5, g: 1, b: 0.5 },
    'terra': { r: 0.3, g: 0.7, b: 0.3 },
    'aqua': { r: 0.3, g: 0.3, b: 1 },
}

onEvent('item.right_click', event => {
    if (event.player.getHeldItem(MAIN_HAND).id == 'kubejs:dynamic_focus' && event.player.getHeldItem(MAIN_HAND).nbt == null) {
        let focus = makeFocus(event, event.player.getHeldItem(OFF_HAND), event.player.getHeldItem(MAIN_HAND))

        event.player.setHeldItem(MAIN_HAND, focus)
        event.player.setHeldItem(OFF_HAND, Item.empty)
    } else if (event.player.getHeldItem(MAIN_HAND).id == 'kubejs:dynamic_focus' && event.player.getHeldItem(OFF_HAND).id == 'kubejs:dynamic_focus' && event.player.getHeldItem(OFF_HAND).nbt != null && event.player.getHeldItem(MAIN_HAND).nbt != null) {
        let focus = mergeFoci(event, event.player.getHeldItem(MAIN_HAND), event.player.getHeldItem(OFF_HAND))
        event.player.setHeldItem(MAIN_HAND, focus)
        event.player.setHeldItem(OFF_HAND, Item.empty)
    }
})
onEvent(`item.right_click`, event => {
    if ((event.player.getHeldItem(MAIN_HAND).id == 'kubejs:caster_basic' || event.player.getHeldItem(MAIN_HAND).id == 'kubejs:caster_advanced' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:wand') && !event.player.crouching && event.player.persistentData.vis.current > 10 && event.player.getHeldItem(MAIN_HAND).nbt !=  null && event.player.getHeldItem(MAIN_HAND).nbt.data !=  null ) {
        let focus = parseFocus(event)
        if (focus.chain) {
            if (event.player.getHeldItem(MAIN_HAND).id == 'kubejs:caster_advanced') { focus.spell1.power = focus.spell1.power + 1; focus.spell2.power = focus.spell2.power + 1; }
            if (event.player.persistentData.vis.current < (((focus.spell1.power + focus.spell2.power) / 2) * 10)) { return }
            event.player.persistentData.vis.current = event.player.persistentData.vis.current - (((focus.spell1.power + focus.spell2.power) / 2) * 10);
            let spell1
            if (focus.spell1.shape == 'cloud') {
                spell1 = modifiers(event, focus.spell1.power, focus.spell1.range / 5, focus.spell1.modifier, focus.spell1.shape, aspectColors[focus.spell1.aspect], event.level.getBlock(event.player.x, event.player.y + 0.5, event.player.z))
            } else {
                spell1 = modifiers(event, focus.spell1.power, focus.spell1.range, focus.spell1.modifier, focus.spell1.shape, aspectColors[focus.spell1.aspect], event.level.getBlock(event.player.x, event.player.y + 0.5, event.player.z))
            }
            console.log(`spell1 length: ${spell1.length}`)
            if (spell1.length > 0) {
                for (beam of spell1) {
                    console.log(`${beam} ${beam.ray}`)
                    aspects(event, focus.spell1.power, focus.spell1.range, focus.spell1.aspect, beam, beam.ray)
                    let spell2
                    if (focus.spell2.shape == 'cloud') {
                        spell2 = modifiers(event, focus.spell2.power, focus.spell2.range / 5, focus.spell2.modifier, focus.spell2.shape, aspectColors[focus.spell2.aspect], beam.ray)
                    } else {
                        spell2 = modifiers(event, focus.spell2.power, focus.spell2.range, focus.spell2.modifier, focus.spell2.shape, aspectColors[focus.spell2.aspect], beam.ray)
                    }
                    if (spell2.length > 0) {
                        for (beam2 of spell2) {
                            aspects(event, focus.spell2.power, focus.spell2.range, focus.spell2.aspect, beam2, beam2.ray)
                        }
                    } else {
                        aspects(event, focus.spell2.power, focus.spell2.range, focus.spell2.aspect, spell2, spell2.ray)
                    }
                }
            } else {
                aspects(event, focus.spell1.power, focus.spell1.range, focus.spell1.aspect, spell1, spell1.ray)
                let spell2
                if (focus.spell2.shape == 'cloud') {
                    spell2 = modifiers(event, focus.spell2.power, focus.spell2.range / 5, focus.spell2.modifier, focus.spell2.shape, aspectColors[focus.spell2.aspect], spell1.ray)
                } else {
                    spell2 = modifiers(event, focus.spell2.power, focus.spell2.range, focus.spell2.modifier, focus.spell2.shape, aspectColors[focus.spell2.aspect], spell1.ray)
                }
                if (spell2.length > 0) {
                    for (beam2 of spell2) {
                        aspects(event, focus.spell2.power, focus.spell2.range, focus.spell2.aspect, beam2, beam2.ray)
                    }
                } else {
                    aspects(event, focus.spell2.power, focus.spell2.range, focus.spell2.aspect, spell2, spell2.ray)
                }

            }
        } else {
            if (event.player.getHeldItem(MAIN_HAND).id == 'kubejs:caster_advanced') { focus.power = focus.power + 1; }
            if (event.player.persistentData.vis.current < focus.power * 10) { return }
            event.player.persistentData.vis.current = event.player.persistentData.vis.current - (focus.power * 10);
            let spell = modifiers(event, focus.power, focus.range, focus.modifier, focus.shape, aspectColors[focus.aspect], event.level.getBlock(event.player.x, event.player.y + 0.5, event.player.z))
            if (spell.length > 0) {
                for (beam of spell) {
                    aspects(event, focus.power, focus.range, focus.aspect, beam, beam.ray)
                }
            } else {
                aspects(event, focus.power, focus.range, focus.aspect, spell, spell.ray)
            }

        }

    } else if (event.player.getHeldItem(MAIN_HAND).id == 'minecraft:stick') {
        let spell1 = modifiers(event, 5, 10, 'cone', 'cloud', { r: 1, g: 1, b: 1 }, event.level.getBlock(event.player.x, event.player.y + 0.5, event.player.z))
        for (beam of spell1) {
            aspects(event, 1, 10, 'ignis', beam, beam.ray)
            let spell2 = modifiers(event, 1, 1, 'split', 'bolt', { r: 1, g: 1, b: 1 }, beam.ray)
            for (beam2 of spell2) {
                aspects(event, 1, 10, 'gelum', beam2, beam2.ray)
            }
        }

    }
})


function shapes(event, power, range, shape, offset, color, location) {
    switch (shape) {
        case 'bolt':
            console.log(`bolt: power: ${power} range: ${range} offset: ${offset} color: ${color} location: ${location}`)
            return bolt(event, power, range, offset, color)
        case 'cloud':
            return cloud(event, power, range, offset, color, location)
        case 'pulsar':
            return pulsar(event, power, range, offset, color, location)
        case 'chain':
            return chain(event, power, range, offset, color, location)
        default:
            break;
    }
}

function aspects(event, power, range, aspect, entities, ray) {
    switch (aspect) {
        case 'ignis':
            entities.entities.forEach(entity => {
                entity.setOnFire(power)
            })
            break;
        case 'gelum':
            entities.entities.forEach(entity => {
                entity.setNoGravity(true)
                let defaultSpeed = entity.getDefaultMovementSpeed()
                entity.setDefaultMovementSpeed(0)
                event.server.scheduleInTicks(power, (event) => {
                    entity.setNoGravity(false)
                    entity.setDefaultMovementSpeed(defaultSpeed)
                })
            })
            break;
        case 'aer':
            let count = 0
            event.server.scheduleInTicks(5, event => {
                if (count < (power * 100) / 5) {
                    entities.entities.forEach(entity => {
                        console.log(`power : ${(1 * (power / 100))}`)
                        entity.addMotion(0, (1 * (power / 100)) * (power*2), 0)
                        event.server.scheduleInTicks(5, event => {
                            entity.setMotionY(0)
                        })
                    })
                    count++
                    event.reschedule()
                }
            })
            break;
        case 'terra':
            if (ray.forEach) {
                ray.forEach(block => {
                    let strength
                    if (event.level.getBlock(block.x, block.y, block.z).hasTag("minecraft:needs_stone_tool")) {
                        strength = 2
                    } else if (event.level.getBlock(block.x, block.y, block.z).hasTag("minecraft:needs_iron_tool")) {
                        strength = 4
                    } else if (event.level.getBlock(block.x, block.y, block.z).hasTag("minecraft:needs_diamond_tool")) {
                        strength = 8
                    } else {
                        strength = 0
                    }
                    if (power >= strength) {
                        event.level.minecraftLevel.destroyBlock(block.immutable(), true, null, 512)
                    }
                })
            } else {
                let strength
                if (ray.hasTag("minecraft:needs_stone_tool")) {
                    strength = 2
                } else if (ray.hasTag("minecraft:needs_iron_tool")) {
                    strength = 4
                } else if (ray.hasTag("minecraft:needs_diamond_tool")) {
                    strength = 8
                } else {
                    strength = 0
                }
                if (power >= strength) {
                    event.level.minecraftLevel.destroyBlock(ray.pos.immutable(), true, null, 512)
                }
            }
            break;

        default:
            break;
    }

}

function modifiers(event, power, range, modifier, shape, color, location) {
    switch (modifier) {
        case 'split':
            let s1 = shapes(event, power / 3, range, shape, false, color, location)
            let s2 = shapes(event, power / 3, range, shape, { x: Math.random() * 1.5, y: Math.random() * 1.5, z: Math.random() * 1.5 }, color, location)
            let s3 = shapes(event, power / 3, range, shape, { x: -(Math.random() * 1.5), y: -(Math.random() * 1.5), z: -(Math.random() * 1.5) }, color, location)
            return [s1, s2, s3]
        case 'cone':
            let c1 = shapes(event, power / 5, range, shape, false, color, location)
            let c2 = shapes(event, power / 5, range, shape, { x: 1, y: 0, z: 2 }, color, location)
            let c3 = shapes(event, power / 5, range, shape, { x: 2, y: 0, z: -2 }, color, location)
            let c4 = shapes(event, power / 5, range, shape, { x: -2, y: 0, z: 2 }, color, location)
            let c5 = shapes(event, power / 5, range, shape, { x: -2, y: 0, z: -1 }, color, location)
            return [c1, c2, c3, c4, c5]
        case 'single':
            console.log(location)
            return shapes(event, power, range, shape, false, color, location)
        default:
            let beam = shapes(event, power, range, shape, false, color, location)
            return beam
    }

}

/**
 * 
 * @param {InternalJS.event}} event 
 * @param {*} power 
 * @param {*} range 
 * @param {*} offset
 * @param {Internal.BlockKJS} ray  
 * @returns 
 */
function bolt(event, power, range, offset, color) {
    let entities = rayTraceEntitiesRange(event, range)
    if (offset) {
        entities = rayTraceEntitiesOffset(event, offset, range)
    }
    console.log(entities)
    let ray = event.player.rayTrace(range * 2).block
    if (ray == null) {
        ray = rayTrace(event, range).block
    }
    if (offset) {
        ray = ray.offset(offset.x, offset.y, offset.z)
    }
    particleLine(event, { x: event.player.x - 0.5, y: event.player.y + 0.5, z: event.player.z - 0.5 }, ray, color, event.level.dimension);
    entities.forEach(entity => {
        entity.attack(power)
    })
    return { entities: entities, ray: ray }
}
// chain from one entity to another, limit of range
function chain(event, power, range, offset, color) {
    console.log("chain")
    let entities
    let endEnt = []
    let end
    if (offset) {
        entities = rayTraceEntitiesOffset(event, offset, range)
    } else {
        entities = rayTraceEntitiesRange(event, range)
    }
    let ray = event.player.rayTrace(range * 2).block
    if (ray == null) {
        ray = rayTrace(event, range).block
    }
    if (offset) {
        ray = ray.offset(offset.x, offset.y, offset.z)
    }
    particleLine(event, { x: event.player.x - 0.5, y: event.player.y + 0.5, z: event.player.z - 0.5 }, ray, color, event.level.dimension);
    entities.forEach(entity => {
        entity.attack(power)
    })
    console.log(entities)
    for (let i = 0; i < range; i++) {
        console.log(i)
        let endOfChain = (entities[entities.length - 1])
        console.log(`${endOfChain.x} ${endOfChain.y} ${endOfChain.z}`)
        let box = event.level.getEntitiesWithin(AABB.of(endOfChain.x - range, endOfChain.y - range, endOfChain.z - range, endOfChain.x + range, endOfChain.y + range, endOfChain.z + range))
        box = box.filter(i => i.isAlive() && i.isLiving() && !i.isPlayer())
        box.forEach(entity => {
            if (!endEnt.includes(entity)) {
                particleLine(event, endOfChain, entity, color, event.level.dimension)
                entity.attack(power)
                endOfChain = entity
                endEnt.push(entity)
            }
        })
        end = { x: endOfChain.x, y: endOfChain.y + endOfChain.getEyeHeight(), z: endOfChain.z }
    }
    return { entities: endEnt, ray: end }
}

//  TODO: fix return for this to actually return something
function pulsar(event, power, range, offset, color, location) {
    let box;
    let entities = []
    let duration = 0
    let baseEvent = event
    if (offset) {
        if (location.forEach) {
            console.log(`location: ${location}`)
            let block = location[(location.length + 1) / 2]
            location = event.level.getBlock(block.x, block.y, block.z)
        }
        location = location.offset(offset.x, offset.y, offset.z)
    } else {
        if (location.forEach) {
            console.log(`location: ${location}`)
            let block = location[(location.length + 1) / 2]
            location = event.level.getBlock(block.x, block.y, block.z)
        }
    }

    event.server.scheduleInTicks(1, event => {
        if (duration < power * 20) {
            baseEvent.server.runCommandSilent(`execute in ${baseEvent.level.dimension} run particle minecraft:dust ${color.r} ${color.g} ${color.b} 1 ${location.x} ${location.y} ${location.z} 0.05 0.05 0.05 0 5 normal`)
            box = baseEvent.level.getEntitiesWithin(AABB.of(location.x - range, location.y - range, location.z - range, location.x + range, location.y + range, location.z + range))
            box = box.filter(i => i.isAlive() && i.isLiving() && !i.isPlayer())
            if (box.length > 0) {
                box.forEach(entity => {
                    entities.push(entity)
                })
                let target = getRandomInt(0, entities.length - 1)
                if (duration % 2 == 0) {
                    let points = particleLineOffset(baseEvent, { x: location.x, y: location.y, z: location.z }, entities[target], color, baseEvent.level.dimension)
                    for (let i = 0; i < points.length - 1; i++) {
                        particleLine(baseEvent, points[i], points[i + 1], color, baseEvent.level.dimension)
                    }
                    entities[target].attack(power)
                }
            }
            duration++
            event.reschedule()
        }
    })
    return { entities: entities, ray: event.level.getBlock(location.x, location.y, location.z), duration: duration }
}

function cloud(event, power, range, offset, color, location) {
    let box;
    let blocks = []
    let entities = []
    if (offset) {
        if (location.expandTowards) {
            location = event.level.getBlock(location.center.x, location.center.y, location.center.z)
        }
        location = location.offset(offset.x, offset.y, offset.z)
    } else {
        if (location.expandTowards) {
            location = event.level.getBlock(location.center.x, location.center.y, location.center.z)
        }
    }
    event.server.runCommandSilent(`execute in ${event.level.dimension} run summon area_effect_cloud ${location.x} ${location.y} ${location.z} {Particle:"dust ${color.r} ${color.g} ${color.b} 1",Radius:${range}f,Duration:${power * 100},Color:${rgbToInt(color)}}`)
    let baseBox = event.level.getEntitiesWithin(AABB.of(location.x - 0.5, location.y - 0.5, location.z - 0.5, location.x + 0.5, location.y + 0.5, location.z + 0.5))
    baseBox = baseBox.filter(entity => {
        return entity.getType() == 'minecraft:area_effect_cloud'
    })
    console.log(`length: ${baseBox.length}`)
    if (baseBox.length > 0) {
        box = baseBox[0].minecraftEntity.getBoundingBox()
        console.log(`box: ${box}`)
        let boxEntities = event.level.getEntitiesWithin(box)
        boxEntities.forEach(entity => {
            if (entity.getType() == 'minecraft:area_effect_cloud' || entity.getType() == 'minecraft:player') {
            } else {
                entities.push(entity)
            }
        })
        console.log(`entities: ${entities}`)
        let center = getCenter(box.minX, box.minY, box.minZ, box.maxX, box.maxY, box.maxZ)
        blocks = betweenClosedBlocks(event, center, box.minX, box.minY, box.minZ, box.maxX, box.maxY, box.maxZ)
        console.log(`blocks: ${blocks}`)
        return { entities: entities, ray: blocks }
    }
    return { entities: entities, ray: blocks }
}

function rgbToInt(color) {
    return (1 * 255 << 24) + (color.r * 255 << 16) + (color.g * 255 << 8) + color.b;
}

// TODO: add focus crafting, power and range options
function makeFocus(event, item, focus) {
    let nbt = {
        focus: focus.id,
        data: {
            power: 5,
            range: 10
        }
    }
    if (item.id == 'minecraft:stick') {
        nbt.data.shape = 'bolt'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'gelum'
    } else if (item.id == 'minecraft:white_wool') {
        nbt.data.shape = 'cloud'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'aer'
    } else if (item.id == 'minecraft:diamond_sword') {
        nbt.data.shape = 'bolt'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'ignis'
    } else if (item.id == 'minecraft:diamond_pickaxe') {
        nbt.data.shape = 'cloud'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'ignis'
    } else if (item.id == 'minecraft:diamond_axe') {
        nbt.data.shape = 'cloud'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'gelum'
    } else if (item.id == 'minecraft:diamond_shovel') {
        nbt.data.shape = 'bolt'
        nbt.data.modifier = 'split'
        nbt.data.aspect = 'aer'
    } else if (item.id == 'minecraft:diamond_hoe') {
        nbt.data.chain = 'true'
        nbt.data.spell1 = {}
        nbt.data.spell2 = {}
        nbt.data.spell2.power = 5
        nbt.data.spell2.range = 10
        nbt.data.spell2.shape = 'cloud'
        nbt.data.spell2.modifier = 'split'
        nbt.data.spell2.aspect = 'aer'
        nbt.data.spell1.shape = 'bolt'
        nbt.data.spell1.modifier = 'split'
        nbt.data.spell1.aspect = 'ignis'
        nbt.data.spell1.power = 5
        nbt.data.spell1.range = 10
    }
    focus.nbt = nbt
    return focus
}

function mergeFoci(event, item, focus) {
    let nbt = {
        focus: focus.id,
        data: {
        }
    }
    if (focus.nbt){
        if(!focus.nbt.data.chain){
            nbt.data.chain = 2
        }
        if (!focus.nbt.data.spells){
            nbt.data.spells = [focus.nbt.data]
        }
    }
    nbt.data.spells.push(item.nbt.data)
    focus.nbt = nbt
    return focus
}

function parseFocus(event) {
    let focus = event.player.getHeldItem(MAIN_HAND).nbt
    if (focus.data.chain == 'true') {
        return parseChain(focus)
    }
    let shape = focus.data.shape
    let aspect = focus.data.aspect
    let modifier = focus.data.modifier
    let power = focus.data.power
    let range = focus.data.range
    return { shape: shape, aspect: aspect, modifier: modifier, power: power, range: range }
}

/*function parseChain(focus) {
    let spell1 = { shape: focus.data.spell1.shape, aspect: focus.data.spell1.aspect, modifier: focus.data.spell1.modifier, power: focus.data.spell1.power, range: focus.data.spell1.range }
    let spell2 = { shape: focus.data.spell2.shape, aspect: focus.data.spell2.aspect, modifier: focus.data.spell2.modifier, power: focus.data.spell2.power, range: focus.data.spell2.range }
    return { chain: 'true', spell1: spell1, spell2: spell2 }
}*/

function betweenClosedBlocks(event, pos, x1, y1, z1, x2, y2, z2) {
    let x = x1;
    let y = y1;
    let z = z1;
    let box = [];
    while (x <= x2) {
        while (y <= y2) {
            while (z <= z2) {
                box.push(event.level.getBlock(x, y, z).pos);
                z++;
            }
            y++;
            z = z1;
        }
        x++;
        y = y1;
    }
    return box;
}

function generatePoints(event, x1, y1, z1, x2, y2, z2, range) {
    let start = { x: x1, y: y1, z: z1 }
    let points = []
    let box = AABB.of(x1, y1, z1, x2, y2, z2)
    let offset = 0;
    let x = start.x
    let y = start.y
    let z = start.z
    for (let i = 0; i < box.size; i++) {
        x = x + (i * 0.5) + Math.random();
        y = y + (i * 0.5) + Math.random();
        z = z + (i * 0.5) + Math.random();
        points.push({ x: x, y: y, z: z })
    }
    return points;
}

function drawPath(event, points, color, dimension) {
    for (let i = 0; i < points.length; i++) {
        let point = points[i]
        event.server.runCommandSilent(`execute in ${dimension} run particle minecraft:dust 1 1 1 1 ${point.x} ${point.y} ${point.z} 0 0 0 0 10 normal`)
    }
}

function particleLineOffset(event, start, end, color, dimension) {
    let points = []
    let d = distance(start.x, start.y, start.z, end.x, end.y, end.z);
    let counter = 0;
    let i = -1;
    let x, y, z
    for (let i = -1; i < d * 10; i++) {
        let delta = i / 10 / d;
        if (i == -1) {
            points.push(start)
        } else if (i - 1 == d * 10) {
            points.push(end)
        } else {
            x = ((1 - delta) * (start.x + 0.5) + delta * (end.x + 0.5)) + ((generateRandomFloat(0, 2) - 1) * 1.5);
            y = (1 - delta) * (start.y + 1) + delta * (end.y + 0.5) + ((generateRandomFloat(0, 2) - 1) * 1.5);
            z = (1 - delta) * (start.z + 0.5) + delta * (end.z + 0.5) + ((generateRandomFloat(0, 2) - 1) * 1.5);
        }
        if (counter == Math.round(d * 5)) {
            points.push({ x: x, y: y, z: z })
            counter = 0;
        } else {
            counter++;
        }
    }
    return points
}

function generateRandomFloat(low, high) {
    return low + Math.random() * (high - low);
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function getCenter(x1, y1, z1, x2, y2, z2) {
    let x = lerp(x1, x2, 0.5)
    let y = lerp(y1, y2, 0.5)
    let z = lerp(z1, z2, 0.5)
    return { x: x, y: y, z: z }
}