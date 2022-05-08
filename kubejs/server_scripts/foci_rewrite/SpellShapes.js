// priority: 11
function SpellShapes() {
    this.entities = []
    this.position
    this.power
    this.range
    this.shape
}

SpellShapes.prototype = {
    bolt: function (spell) {
        let entities = spell.offset ? rayTraceEntitiesOffset(spell.event, spell.offset, spell.range) : rayTraceEntitiesRange(spell.event, spell.range)
        let ray = spell.event.player.rayTrace(spell.range * 2).block
        if (ray == null) {
            ray = rayTrace(spell.event, spell.range).block
        }
        if (spell.offset) {
            ray = ray.offset(spell.offset.x, spell.offset.y, spell.offset.z)
        }
        particleLine(spell.event, { x: spell.event.player.x, y: spell.event.player.y + 1, z: spell.event.player.z }, ray, aspectColors[spell.aspect])
        console.log(entities)
        return { entities: entities, position: ray }
    },
    chain: function (spell) {
        let entities = spell.offset ? rayTraceEntitiesOffset(spell.event, spell.offset, spell.range) : rayTraceEntitiesRange(spell.event, spell.range)
        let endEnt = []
        let end
        let ray = spell.event.player.rayTrace((spell.range + 1) * 2).block
        if (ray == null) {
            ray = rayTrace(spell.event, spell.range + 1).block
        }
        if (spell.offset) {
            ray = ray.offset(spell.offset.x, spell.offset.y, spell.offset.z)
        }
        console.log(entities)
        particleLine(spell.event, { x: spell.event.player.x, y: spell.event.player.y, z: spell.event.player.z }, ray, aspectColors[spell.aspect])
        entities.forEach(entity => {
            endEnt.push(entity)
        })
        console.log(entities)
        for (let i = 0; i < spell.range; i++) {
            let endOfChain = entities[entities.length - 1]
            console.log(endOfChain)
            if (endOfChain) {
                let box = spell.event.level.getEntitiesWithin(AABB.of(endOfChain.x - spell.range, endOfChain.y - spell.range, endOfChain.z - spell.range, endOfChain.x + spell.range, endOfChain.y + spell.range, endOfChain.z + spell.range))
                box = box.filter(i => i.isAlive() && i.isLiving() && i.id != spell.event.player.id)
                box.forEach(entity => {
                    if (!endEnt.includes(entity)) {
                        particleLine(spell.event, endOfChain, entity, aspectColors[spell.aspect])
                        endOfChain = entity
                        endEnt.push(entity)
                    }
                })
                end = { x: endOfChain.x, y: endOfChain.y + endOfChain.getEyeHeight(), z: endOfChain.z }
            }
        }
        console.log(endEnt)
        return { entities: endEnt, position: end }
    },
    pulsar: function (spell) {
        let box
        let entities = []
        let duration = 0
        let baseEvent = spell.event
        if (Array.isArray(spell.location)) {
            let block = spell.location[(spell.location.length - 1) / 2]
            spell.location = spell.event.level.getBlock(block.x, block.y, block.z)
        }
        spell.location = spell.location.isPlayer() ? spell.event.level.getBlock(spell.location.x, spell.location.y, spell.location.z) : spell.location
        console.log(spell.location)
        spell.location = spell.offset ? spell.location.offset(spell.offset.x, spell.offset.y, spell.offset.z) : spell.location
        console.log(spell.location)
        spell.event.server.scheduleInTicks(1, event => {
            if (duration < spell.duration * 10) {
                baseEvent.server.runCommandSilent(`execute in ${baseEvent.level.dimension} run particle minecraft:dust ${aspectColors[spell.aspect].r} ${aspectColors[spell.aspect].g} ${aspectColors[spell.aspect].b} 1 ${spell.location.x} ${spell.location.y} ${spell.location.z} 0.05 0.05 0.05 0 5 normal`)
                box = baseEvent.level.getEntitiesWithin(AABB.of(spell.location.x - spell.range, spell.location.y - spell.range, spell.location.z - spell.range, spell.location.x + spell.range, spell.location.y + spell.range, spell.location.z + spell.range))
                box = box.filter(i => i.isAlive() && i.isLiving && i.id != baseEvent.player.id)
                if (box.length > 0) {
                    box.forEach(entity => {
                        entities.push(entity)
                    })
                    let target = getRandomInt(0, entities.length - 1)
                    if (duration % 2 == 0) {
                        let points = particleLineOffset(baseEvent, spell.location, entities[target], aspectColors[spell.aspect])
                        console.log(points)
                        for (let i = 0; i < points.length - 1; i++) {
                            particleLine(baseEvent, points[i], points[i + 1], aspectColors[spell.aspect])
                        }
                    }
                }
                duration++
                event.reschedule()
            }
        })
        return { entities: entities, position: spell.event.level.getBlock(spell.location.x, spell.location.y, spell.location.z) }
    },
    cloud: function (spell) {
        let box
        let blocks = []
        let entities = []
        if (Array.isArray(spell.location)) {
            let block = spell.location[(spell.location.length - 1) / 2]
            spell.location = spell.event.level.getBlock(block.x, block.y, block.z)
        }
        spell.location = spell.offset ? spell.location.offset(spell.offset.x, spell.offset.y, spell.offset.z) : spell.location
        spell.event.server.runCommandSilent(`execute in ${spell.event.level.dimension} run summon area_effect_cloud ${spell.location.x} ${spell.location.y} ${spell.location.z} {Particle:"dust ${aspectColors[spell.aspect].r} ${aspectColors[spell.aspect].g} ${aspectColors[spell.aspect].b} 1",Radius:${spell.range}f,Duration:${spell.duration * 10},Color:${rgbToInt(aspectColors[spell.aspect])}}`)
        let aecSearch = spell.event.level.getEntitiesWithin(AABB.of(spell.location.x - 0.5, spell.location.y - 0.5, spell.location.z - 0.5, spell.location.x + 0.5, spell.location.y + 0.5, spell.location.z + 0.5))
        aecSearch = aecSearch.filter(i => i.getType() == 'minecraft:area_effect_cloud')
        if (aecSearch.length > 0) {
            let timer = 0;
            box = aecSearch[0].minecraftEntity.getBoundingBox()
            spell.event.server.scheduleInTicks(1, event => {
                if (timer < spell.duration * 10) {
                    let boxEntities = spell.event.level.getEntitiesWithin(box)
                    boxEntities = boxEntities.filter(i => i.isAlive() && i.isLiving && i.id != spell.event.player.id)
                    boxEntities.forEach(entity => {
                        if (!(entity.getType() == 'minecraft:area_effect_cloud' || entity.id == spell.event.player.id)) {
                            entities.push(entity)
                        }
                    })
                    timer++
                    event.reschedule()
                }
            })
            let center = getCenter(box.minX, box.minY, box.minZ, box.maxX, box.maxY, box.maxZ)
            blocks = betweenClosedBlocks(spell.event, center, box.minX, box.minY, box.minZ, box.maxX, box.maxY, box.maxZ)
        }
        return { entities: entities, position: blocks }
    },
    parse: function (spell) {
        switch (spell.shape) {
            case 'bolt':
                return this.bolt(spell)
            case 'pulsar':
                return this.pulsar(spell)
            case 'cloud':
                return this.cloud(spell)
            case 'chain':
                return this.chain(spell)
            default:
                spell.event.player.tell('No spell shape found')
                return undefined
        }
    }
}