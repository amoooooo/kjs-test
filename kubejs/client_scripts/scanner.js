let aspects = JsonIO.read('aspectfilegenerated.json');

onEvent('client.tick', event => {
    if (event.player.getHeldItem(MAIN_HAND) == 'kubejs:scanner') {
        if (event.player.rayTrace().block !== null) {
            let rayBlock = event.player.rayTrace().block.id;
            // TODO: add entity scanning, use entity data to check if its an item entity and process that normally
            let rayEntity = event.player.rayTrace().entity;
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