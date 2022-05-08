onForgeEvent('net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent', event => {
    if(event.getTo() == 'tckjs:depths'){
        event.player.abilities.flying = true
        event.player.abilities.mayfly = true
    } else {
        event.player.abilities.flying = false
        event.player.abilities.mayfly = false
    }
})