let aspects = JsonIO.read('aspectfilegenerated.json');
let scanned;
let vis;

onEvent('player.data_from_server.scanned', e => {
    scanned = e.data;
})

onEvent('player.data_from_server.vis', e => {
    vis = e.data;
})

onEvent('client.tick', event => {
    if (event.player.getHeldItem(MAIN_HAND) == 'kubejs:scanner') {
        if (event.player.rayTrace().block !== null) {
            let rayBlock = event.player.rayTrace().block.id;
            // TODO: add entity scanning, use entity data to check if its an item entity and process that normally
            let rayEntity = rayTraceEntities(event)[0];
            let textAspects = [];
            if (rayEntity && scanned) {
                if (rayEntity.id == 'minecraft:item') {
                    let item = rayEntity.entityData.Item;
                    Object.keys(aspects[`${item}`]).forEach(aspect => {
                        textAspects.push(`${Text.translate(aspect)}${aspects[item][aspect]}`);
                    })
                    event.player.paint({
                        aspects: {
                            type: 'text',
                            text: textAspects.join(""),
                            scale: 1,
                            x: -1,
                            y: 24,
                            alignX: 'center',
                            alignY: 'center',
                            draw: 'ingame'
                        }
                    })
                }
                else if (aspects[`${rayEntity}`] !== null && aspects[`${rayEntity}`] !== undefined) {
                    Object.keys(aspects[`${rayEntity}`]).forEach(aspect => {
                        textAspects.push(`${Text.translate(aspect)}${aspects[rayEntity][aspect]}`);
                    })
                    event.player.paint({
                        aspects: {
                            type: 'text',
                            text: textAspects.join(""),
                            scale: 1,
                            x: -1,
                            y: 24,
                            alignX: 'center',
                            alignY: 'center',
                            draw: 'ingame'
                        }
                    })
                } else {
                    event.player.paint({
                        aspects: {
                            remove: true
                        }
                    })
                }
            }
            else if (scanned == undefined || scanned[rayBlock] == undefined) { }
            else {
                if (aspects[`${rayBlock}`] !== null && aspects[`${rayBlock}`] !== undefined) {
                    Object.keys(aspects[`${rayBlock}`]).forEach(aspect => {
                        textAspects.push(`${Text.translate(aspect)}${aspects[rayBlock][aspect]}`);
                    })
                    event.player.paint({
                        aspects: {
                            type: 'text',
                            text: textAspects.join(""),
                            scale: 1,
                            x: -1,
                            y: 24,
                            alignX: 'center',
                            alignY: 'center',
                            draw: 'ingame'
                        }
                    })
                } else {
                    event.player.paint({
                        aspects: {
                            remove: true
                        }
                    })
                }
            }
        } else {
            event.player.paint({
                aspects: {
                    remove: true
                }
            })
        }
    } else {
        event.player.paint({
            aspects: {
                remove: true
            }
        })
    }
})

onEvent('client.tick', event => {
    if (event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_basic' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:caster_advanced' || event.player.getHeldItem(MAIN_HAND) == 'kubejs:wand') {
        event.player.paint({
            visText: {
                type: 'text',
                x: 0,
                y: 12,
                scale: 0.5,
                alignX: 'center',
                alignY: 'center',
                draw: 'ingame',
                text: `${vis.current}/${vis.cap}`
            }
        })
        event.player.paint({
            visBar: {
                type: 'rectangle',
                x: 0,
                y: 8,
                w: vis.current / vis.cap * 40,
                h: 2,
                color: 'RED',
                draw: 'ingame',
                alignX: 'center',
                alignY: 'center'
            }
        })
    } else {
        event.player.paint({
            visText: {
                remove: true
            }
        })
        event.player.paint({
            visBar: {
                remove: true
            }
        })
    }
    
})

onEvent('client.logged_in', event => {
    if (vis) {
        //console.log(`count: ${vis.current}`)
        
    }

})



function rayTraceEntities(event) {
    let entities = []
    let start = event.getPlayer()
    let lookAt = rayTrace(event, 200)
    let rayx = lookAt.block.x
    let rayy = lookAt.block.y - 1.30
    let rayz = lookAt.block.z
    let d = distance(start.x, start.y + 1, start.z, rayx, rayy, rayz)
    for (let i = -1; i < d * 10; i++) {
        let delta = i / 10 / d
        let x = (1 - delta) * start.x + delta * (rayx + 0.5)
        let y = (1 - delta) * start.y + 1.60 + delta * (rayy + 0.5)
        let z = (1 - delta) * start.z + delta * (rayz + 0.5)

        let entity = event.level.getEntitiesWithin(AABB.of(x - 0.1, y - 0.1, z - 0.1, x + 0.1, y + 0.1, z + 0.1))
        entity = entity.filter(i => !i.isPlayer() && !i.isLiving())

        if (entity.length > 0) {
            event.player.tell(entity)
            entities.push(entity)
            i = d * 10
        }
    }
    return entities
}

function rayTrace(event, distance) {


    const x_rad = event.player.pitch * JavaMath.PI / 180;
    const y_rad = event.player.yaw * JavaMath.PI / 180;

    const dirV = {
        x: -Math.sin(y_rad) * Math.cos(x_rad),
        y: -Math.sin(x_rad),
        z: Math.cos(y_rad) * Math.cos(x_rad)
    };

    const PosVec = {
        x: event.player.x + (distance * dirV.x),
        y: event.player.y + (distance * dirV.y) + 0.4,
        z: event.player.z + (distance * dirV.z)
    }

    for (let i = -1; i < distance * 2; i++) {
        let delta = i / 10 / distance
        let x = (1 - delta) * event.player.x + delta * (PosVec.x)
        let y = (1 - delta) * event.player.y + 1.52 + delta * (PosVec.y)
        let z = (1 - delta) * event.player.z + delta * (PosVec.z)

        let block = event.level.getBlock(x, y, z)
        if (!block.equals('minecraft:air')) {

            return {
                block: block,
                x: PosVec.x,
                y: PosVec.y,
                z: PosVec.z
            }
        }
    }

    return {
        x: PosVec.x,
        y: PosVec.y,
        z: PosVec.z
    }
}

function distance(x1, y1, z1, x2, y2, z2) {
    return Math.abs(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)));
}