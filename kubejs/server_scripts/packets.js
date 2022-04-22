onEvent('player.tick', (event) => {
    event.player.sendData('scanned', event.player.persistentData.scanned);
    event.player.sendData('vis', event.player.persistentData.vis);
})