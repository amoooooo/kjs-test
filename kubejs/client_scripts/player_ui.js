onEvent('client.tick', event => {
    event.player.paint({vis: {
        type: 'rectangle',
        x: 0,
        y: -256,
        alignX: 'left',
        alignY: 'top',
        draw: 'ingame',
        w: 8,
        h: global.vis.count,
        color: '#00FF00'
    }})
})