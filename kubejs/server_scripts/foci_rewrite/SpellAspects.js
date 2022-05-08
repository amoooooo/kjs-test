let DamageSource = java("net.minecraft.world.damagesource.DamageSource")

function SpellAspects() {
    this.aspects = [];
    this.spells = []
}

SpellAspects.prototype = {
    ignis: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        for (entity of modifiedSpell.entities) {
                            if (!entity.minecraftEntity.isOnFire()) {
                                entity.setOnFire(spell.duration)
                            }
                            entity.attack(spell.power)
                        }
                        count++
                        event.reschedule()
                    }

                })
            }
        }
    },
    aqua: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                let hitEntities = []
                console.log(modifiedSpell)
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        if (modifiedSpell.entities) {
                            if (modifiedSpell.entities.forEach) {
                                for (entity of modifiedSpell.entities) {
                                    console.log(entity)
                                    entity.entities.forEach(entity => {
                                        if (entity.minecraftEntity.isOnFire()) {
                                            entity.extinguish()
                                        }
                                        if (!hitEntities.includes(entity)) {
                                            entity.minecraftEntity.hurt(DamageSource.DROWN, spell.power)
                                            hitEntities.push(entity)
                                        }
                                    })
                                }
                            }
                        } else if (modifiedSpell.entities) {
                            modifiedSpell.entities.forEach(entity => {
                                if (entity.minecraftEntity.isOnFire()) {
                                    entity.extinguish()
                                }
                                if (!hitEntities.includes(entity)) {
                                    entity.minecraftEntity.hurt(DamageSource.DROWN, spell.power)
                                    hitEntities.push(entity)
                                }
                            })
                        }

                        count++
                    }
                })
            }
        }
    },
    aer: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                let hitEntities = []
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        for (entity of modifiedSpell.entities) {
                            if (!hitEntities.includes(entity)) {
                                entity.addMotion(0, (1 * (spell.power / 100)), 0)
                                hitEntities.push(entity)
                                spell.event.server.scheduleInTicks(5, event => {
                                    entity.setMotionY(0)
                                    hitEntities = hitEntities.filter(i => i != entity)
                                })

                            }
                        }
                        count++
                        event.reschedule()
                    }
                })
            }
        }
    },
    terra: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        if (modifiedSpell.position.forEach) {
                            modifiedSpell.position.forEach(position => {
                                let block = spell.event.level.getBlock(position.x, position.y, position.z)
                                let strength
                                if (block.hasTag("minecraft:needs_stone_tool")) {
                                    strength = 2
                                } else if (block.hasTag("minecraft:needs_iron_tool")) {
                                    strength = 4
                                } else if (block.hasTag("minecraft:needs_diamond_tool")) {
                                    strength = 8
                                } else {
                                    strength = 0
                                }
                                if (spell.power > strength) {
                                    spell.event.level.minecraftLevel.destroyBlock(block.pos.immutable(), true, null, 512)
                                }
                            })
                        } else {
                            let block = spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y, modifiedSpell.position.z)
                            let strength
                            if (block.hasTag("minecraft:needs_stone_tool")) {
                                strength = 2
                            } else if (block.hasTag("minecraft:needs_iron_tool")) {
                                strength = 4
                            } else if (block.hasTag("minecraft:needs_diamond_tool")) {
                                strength = 8
                            } else {
                                strength = 0
                            }
                            if (spell.power > strength) {
                                spell.event.level.minecraftLevel.destroyBlock(block.pos.immutable(), true, null, 512)
                            }
                        }
                    }
                })
            }
        }
    },
    parse: function (spell, modifiedSpells) {
        switch (spell.aspect) {
            case "ignis":
                this.ignis(spell, modifiedSpells)
                break
            case "aqua":
                this.aqua(spell, modifiedSpells)
                break
            case "aer":
                this.aer(spell, modifiedSpells)
                break
            case "terra":
                this.terra(spell, modifiedSpells)
                break
            default:
                spell.event.player.tell("Aspect not found")
                break
        }
    }
}