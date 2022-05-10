onEvent('player.tick', event => {
    let playerChunk = `${event.player.x >> 4},${event.player.z >> 4}`
    let north = `${event.player.x >> 4},${(event.player.z - 16) >> 4}`
    let south = `${event.player.x >> 4},${(event.player.z + 16) >> 4}`
    let east = `${(event.player.x + 16) >> 4},${event.player.z >> 4}`
    let west = `${(event.player.x - 16) >> 4},${event.player.z >> 4}`
    if (event.level.persistentData[playerChunk] == undefined) {
        event.level.persistentData[playerChunk] = {
            currentVis: getRandomInt(100, 200),
            max: 500,
            flux: getRandomInt(0, 50),
            minStable: getRandomInt(200, 270)
        }
    } else if (event.level.persistentData[playerChunk].currentVis < event.level.persistentData[playerChunk].minStable) {
        vacuumVis(event)
    } else if (event.level.persistentData[playerChunk].minStable == undefined){
        event.level.persistentData[playerChunk].minStable = getRandomInt(200, 270)
    }
    //console.log(event.level.persistentData[playerChunk])
    event.player.paint({
        vis: {
            type: 'text',
            x: 8,
            y: 26,
            scale: 0.5,
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame',
            text: `${event.level.persistentData[playerChunk].currentVis}/${event.level.persistentData[playerChunk].max}`
        }
    })
    event.player.paint({
        flux: {
            type: 'text',
            x: 8,
            y: 32,
            scale: 0.5,
            alignX: 'left',
            alignY: 'top',
            draw: 'ingame',
            text: `${event.level.persistentData[playerChunk].flux}/${event.level.persistentData[playerChunk].max}`,
            color: '#e600ff'
        }
    })
    event.player.paint({
        bar: {
            type: 'rectangle',
            x: 12,
            y: 24 - (event.level.persistentData[playerChunk].currentVis / event.level.persistentData[playerChunk].max * 16),
            w: 4,
            h: event.level.persistentData[playerChunk].currentVis / event.level.persistentData[playerChunk].max * 16,
            color: '#67307A',
            draw: 'ingame',
            alignX: 'left',
            alignY: 'top'
        }
    })
    
})

function vacuumVis(event) {
    let playerChunk = `${event.player.x >> 4},${event.player.z >> 4}`
    let chunk = event.level.persistentData[playerChunk]
    let north = `${event.player.x >> 4},${(event.player.z - 16) >> 4}`
    let south = `${event.player.x >> 4},${(event.player.z + 16) >> 4}`
    let east = `${(event.player.x + 16) >> 4},${event.player.z >> 4}`
    let west = `${(event.player.x - 16) >> 4},${event.player.z >> 4}`
    let chunkArr = [north, south, east, west]
    let rand = getRandomInt(0, 3)
    let whichChunk = chunkArr[rand]
    if (event.level.persistentData[whichChunk] != undefined) {
        if (event.level.persistentData[whichChunk].currentVis > 0 && chunk.currentVis + chunk.flux < chunk.max) {
            event.level.persistentData[whichChunk].currentVis--
            chunk.currentVis += 1
            //console.log(whichChunk)
            //console.log(`north: ${event.level.persistentData[north].currentVis}, south: ${event.level.persistentData[south].currentVis}, east: ${event.level.persistentData[east].currentVis}, west: ${event.level.persistentData[west].currentVis}`)
        }
    } else {
        event.level.persistentData[whichChunk] = {
            currentVis: getRandomInt(100, 200),
            max: 500,
            flux: getRandomInt(0, 50),
            minStable: getRandomInt(200, 270)
        }
    }
    
    event.level.persistentData[playerChunk] = chunk
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}