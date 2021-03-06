function SpellModifiers() {
    this.spell
}

SpellModifiers.prototype = {
    // Fix any shape that doesnt return a single spellShape
    split: function (spell) {
        let spells = []
        spell.power = spell.power / 3
        spell.range = spell.range / 1.5
        spell.duration = spell.duration / 3
        for (let i = -1; i < 2; i++) {
            console.log(i)
            let offset = { x: i + (Math.random() * (1 - -1) + -1), y: i + (Math.random() * (1 - -1) + -1), z: i + (Math.random() * (1 - -1) + -1)}
            console.log(offset)
            spell.offset = offset
            let spellShape = new SpellShapes().parse(spell)
            spells.push(spellShape)
        }
        return spells
    },
    cone: function (spell) {
        let spells = []
        spell.power = spell.power / 5
        spell.range = spell.range / 2.5
        spell.duration = spell.duration / 5
        for (let i = 0; i < 4; i++) {
            let offset = { x: Math.cos(i * Math.random() * (1 - -1) + -1) * (i*2), y: 0, z: Math.cos(i * Math.random() * (1 - -1) + -1) * (i*2)}
            spell.offset = offset
            let spellShape = new SpellShapes().parse(spell)
            spells.push(spellShape)
        }
        return spells
    },
    single: function (spell) {
        let spellShape = new SpellShapes().parse(spell)
        return [spellShape]
    },
    parse: function (spell) {
        switch (spell.modifier) {
            case 'split':
                return {mod: this.split(spell), spell: spell}
            case 'cone':
                return {mod: this.cone(spell), spell: spell}
            case 'single':
                return {mod: this.single(spell), spell: spell}
            default:
                spell.event.player.tell('No spell modifier found')
                return undefined
        }
    }
}