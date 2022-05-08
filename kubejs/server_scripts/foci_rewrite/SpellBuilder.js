// priority: 10 

function SpellBuilder(event) {
    this.entities = []
    this.position
    this.power
    this.range
    this.modifier
    this.shape
    this.aspect
    this.duration
    this.chain
    this.spells = []
    this.event = event
    this.offset
    this.location = event.player
}

SpellBuilder.prototype = {
    parseFocus: function (focus) {
        if (focus.data.chain != undefined) {
            this.parseChain(focus)
        }
        this.power = focus.data.power
        this.range = focus.data.range
        this.modifier = focus.data.modifier
        this.shape = focus.data.shape
        this.aspect = focus.data.aspect
        this.duration = focus.data.duration
        return this
    },
    parseChain: function (focus) {
        this.chain = focus.data.chain
        for (let i = 0; i < this.chain; i++) {
            this.spells.push(focus.data.spells[i])
        }
    },
    // Figure out logic for chain spells
    cast: function () {
        if (this.chain > 1) {
            for (let i = 0; i < this.chain; i++) {
                let spellShape = new SpellModifiers().parse(this.spells[i])
                for (modSpell of spellShape.mod) {
                    if (Array.isArray(modSpell.position)) {
                        for (let position in modSpell.position) {
                            if (position <= modSpell.position.length - 1) {
                                let subSpell = new SpellModifiers().parse(this.spells[i + 1])
                                let subCast = new SpellAspects()
                                subCast.cast(this.spells[i + 1], subSpell)
                            } else {
                                if (i <= this.chain - 1) {
                                    this.spells[i + 1].position = modSpell.position

                                }
                            }
                        }
                    } else {
                        if (i <= this.chain - 1) {
                            this.spells[i + 1].position = modSpell.position
                        }
                    }
                }
            }
        } else {
            let spellShape = new SpellModifiers().parse(this)
            console.log(spellShape)
            let cast = new SpellAspects()
            let ticks = 0
            this.event.server.scheduleInTicks(1, event => {
                if (ticks < this.duration * 10) {
                    cast.parse(this, spellShape)
                    ticks++
                    event.reschedule()
                }
            })

            return cast
        }
    }
}

onEvent('item.right_click', event => {
    if (event.item == 'kubejs:dynamic_focus' && event.item.nbt != undefined) {
        let focus = new SpellBuilder(event).parseFocus(event.item.nbt).cast()
        console.log(focus)
    }
})