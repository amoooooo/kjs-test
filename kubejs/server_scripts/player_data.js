onEvent('player.logged_in', event => {
    if (event.player.persistentData.scanned == undefined) {
        event.player.persistentData.scanned = {};
    }
    if (event.player.persistentData.vis == undefined) {
        event.player.persistentData.vis = {};
        
    } else {
        if (event.player.persistentData.vis.cap == undefined || event.player.persistentData.vis.current == undefined) {
            event.player.persistentData.vis.cap = 200;
            event.player.persistentData.vis.current = 0;
        }
    }
})

onEvent('player.tick', event => {
    console.log(event.player.persistentData.vis.current + " " + event.player.persistentData.vis.cap);
    if (event.player.persistentData.vis){
        if (event.player.persistentData.vis.current < event.player.persistentData.vis.cap){
            event.player.persistentData.vis.current = event.player.persistentData.vis.current + 1;
        }
    }
    
})