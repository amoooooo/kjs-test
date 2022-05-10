let DamageSource = java("net.minecraft.world.damagesource.DamageSource")

function SpellAspects() {
    this.aspects = [];
    this.spells = []
}

SpellAspects.prototype = {
    ignis: function (spell, modifiedSpells) {
        console.log(modifiedSpells)
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                console.log(modifiedSpell)
                let count = 0
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        for (entity of modifiedSpell.entities) {
                            if (entity.getType() != 'minecraft:item') {
                                if (!entity.minecraftEntity.isOnFire()) {
                                    entity.setOnFire(spell.duration)
                                }
                                entity.attack(spell.power)
                            }
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
                console.log(modifiedSpell)
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        for (entity of modifiedSpell.entities) {
                            console.log(entity)
                            if (entity.minecraftEntity.isOnFire()) {
                                entity.extinguish()
                            }
                            entity.minecraftEntity.hurt(DamageSource.DROWN, (spell.power - spell.power / 2) / spell.duration)
                        }
                        count++
                        event.reschedule()
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
                console.log(modifiedSpell.entities)
                spell.event.server.scheduleInTicks(1, event => {
                    if (count < spell.duration) {
                        for (entity of modifiedSpell.entities) {
                            if (!hitEntities.includes(entity)) {
                                entity.addMotion(0, (1 * (spell.power / 100)), 0)
                                entity.minecraftEntity.hurtMarked = true
                                hitEntities.push(entity)
                                spell.event.server.scheduleInTicks(5, event => {
                                    entity.setMotionY(0)
                                    entity.minecraftEntity.hurtMarked = true
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
    lux: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < modifiedSpells.mod.length; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                spell.event.server.scheduleInTicks(1, event => {
                    if (modifiedSpells.position) {
                        if (count < spell.duration) {
                            if (modifiedSpell.position.forEach) {
                                modifiedSpell.position.forEach((position, index) => {
                                    if (index % 3 == 0) {
                                        if (spell.event.level.getBlock(position.x, position.y, position.z) == 'minecraft:air' || spell.event.level.getBlock(position.x, position.y, position.z) == 'minecraft:water') {
                                            spell.event.level.getBlock(position.x, position.y, position.z).set('malum:ether', {})
                                            spell.event.server.scheduleInTicks(spell.duration, event => {
                                                spell.event.level.getBlock(position.x, position.y, position.z).set('minecraft:air', {})
                                            })
                                        }
                                    }
                                })
                            } else {
                                if (spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y, modifiedSpell.position.z) == 'minecraft:air' || spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y, modifiedSpell.position.z) == 'minecraft:water') {
                                    spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y, modifiedSpell.position.z).set('malum:ether', {})
                                    spell.event.server.scheduleInTicks(spell.duration, event => {
                                        spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y, modifiedSpell.position.z).set('minecraft:air', {})
                                    })
                                }
                            }
                        }
                    }
                })
            }
        }
    },
    alienis: function (spell, modifiedSpells) {
        if (modifiedSpells.mod.length > 0) {
            for (let i = 0; i < 1; i++) {
                let modifiedSpell = modifiedSpells.mod[i]
                let count = 0
                if (modifiedSpell.position.forEach) {
                    modifiedSpell.position.forEach(position => {
                        if (count <= 1) {
                            let block = spell.event.level.getBlock(position.x, position.y + 1, position.z)
                            spell.event.player.setPosition(block)
                            spell.event.server.runCommandSilent(`execute in ${spell.event.level.dimension} run particle minecraft:dust ${aspectColors[spell.aspect].r} ${aspectColors[spell.aspect].g} ${aspectColors[spell.aspect].b} 1 ${position.x} ${position.y + 1.5} ${position.z} 0.5 0.5 0.5 0 5 normal`)
                            count++
                        }
                    })
                } else {
                    let block = spell.event.level.getBlock(modifiedSpell.position.x, modifiedSpell.position.y + 1, modifiedSpell.position.z)
                    spell.event.player.setPosition(block)
                    spell.event.server.runCommandSilent(`execute in ${spell.event.level.dimension} run particle minecraft:dust ${aspectColors[spell.aspect].r} ${aspectColors[spell.aspect].g} ${aspectColors[spell.aspect].b} 1 ${modifiedSpell.position.x} ${modifiedSpell.position.y + 1.5} ${modifiedSpell.position.z} 0.5 0.5 0.5 0 5 normal`)
                }
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
            case "lux":
                this.lux(spell, modifiedSpells)
                break
            case "alienis":
                this.alienis(spell, modifiedSpells)
                break
            default:
                spell.event.player.tell("Aspect not found")
                break
        }
    }
}