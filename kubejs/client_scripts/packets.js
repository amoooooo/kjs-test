global.scanned;
global.vis;
onEvent('player.data_from_server.scanned', e => {
    globalscanned = e.data;
})
onEvent('player.data_from_server.vis', e => {
    globalvis = e.data;
})