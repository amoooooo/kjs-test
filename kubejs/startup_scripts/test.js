onEvent("ponder.tag.registry", event => {
    event.create("dirtcraft:useless", "minecraft:dirt", "Useless stuff", "This stuff is useless!")
})

onEvent("ponder.registry", event => {
    event.create("dirtcraft:dirt", ["minecraft:dirt", "minecraft:grass_block"])
        .tag("dirtcraft:useless")
        .scene("basic_usage", "Placing and breaking dirt blocks", "kubejs:altar_formed", (scene, util) => {
            var pos = util.grid().at(1, 1, 1)

            scene.showBasePlate()
            scene.idle(10)

            scene.overlay().showText(20)
                .text("Blocks can be placed by right clicking another block")
                .pointAt(util.vector().centerOf(pos))
            scene.idle(20)

            scene.overlay().showControls(new PonderInput(util.vector().blockSurface(pos, Facing.down), PonderPointing.LEFT)
                .rightClick().withItem("minecraft:dirt"),
                40)
            scene.idle(20)

            scene.world().setBlock(pos, util.getDefaultState("kubejs:matrix"), true)
            scene.world().showSection(util.select().layer(1), Facing.down)
            scene.idle(20)

           scene.overlay().showText(60)
                .text("And fun fact: You can break it too! Who knew you can mine in MINEcraft?")
                .pointAt(util.vector().centerOf(pos))
           scene.idle(60)

            scene.overlay().showControls(new PonderInput(pos, PonderPointing.DOWN)
                .leftClick().withItem("minecraft:stone_shovel"),
                40)
            scene.idle(20)

            scene.world().destroyBlock(pos)

            scene.idle(40)

            // what??? you can MINE and PLACE blocks in MINECRAFT??
        })
        .scene("hoeing", "Hoeing blocks", "kubejs:sheep", (scene, util) => {
            var pos = util.grid().at(1, 1, 1)
            var waterPos = util.grid().at(2, 1, 1)
            var seedPos = util.grid().at(1, 2, 1)

            scene.showBasePlate()
            scene.idle(10)

            scene.world().setBlock(pos, util.getDefaultState("minecraft:dirt"), true)
            scene.world().showSection(util.select().layer(1), Facing.down)

            scene.overlay().showText(20)
                .text("You can hoe dirt and grass blocks to grow plants on them!")
                .pointAt(util.vector().centerOf(pos))
            scene.idle(20)

            scene.overlay().showControls(new PonderInput(util.vector().blockSurface(pos, Facing.down), PonderPointing.LEFT)
                .rightClick().withItem("minecraft:stone_hoe"),
                40)
            scene.idle(20)

            scene.world().setBlock(pos, util.getDefaultState("minecraft:farmland"), true)

            scene.idle(60)
            scene.overlay().showText(20)
                .text("But without water they turn back into dirt blocks")
                .pointAt(util.vector().topOf(pos))
            scene.idle(10)
            scene.world().setBlock(pos, util.getDefaultState("minecraft:dirt"), true)
            scene.idle(60)

            scene.world().setBlock(waterPos, util.getDefaultState("minecraft:water"), false)
            scene.idle(10)

            scene.world().setBlock(pos, util.getDefaultState("minecraft:farmland"), true)

//            scene.idle(10)

//            scene.world().setBlock(seedPos, util.getDefaultState("minecraft:carrots"), false)
        })
        .scene("grass", "Growing grass", "kubejs:sheep", (scene, util) => {
                var pos = util.grid().at(1, 1, 1)
                var grassPos = util.grid().at(1, 1, 2)
                scene.showBasePlate()

                scene.world().setBlock(pos, util.getDefaultState("minecraft:dirt"), true)
                scene.world().showSection(util.select().layer(1), Facing.down)
                scene.overlay().showText(40)
                    .text("This is dirt, contrary to popular belief it is not green")
                    .pointAt(util.vector().topOf(pos))
                scene.idle(40)
                scene.world().setBlock(grassPos, util.getDefaultState("minecraft:grass_block"), true)
                scene.overlay().showText(40)
                    .text("However you can put grass blocks next to it to make it green")
                    .pointAt(util.vector().topOf(grassPos))
                    scene.idle(40)
                scene.idle(20)
                scene.overlay().showText(40)
                    .text("And then you wait")
                    .pointAt(util.vector().topOf(pos))

                scene.idle(60)

                scene.world().setBlock(pos, util.getDefaultState("minecraft:grass_block"), true)
                scene.idle(20)

                scene.overlay().showText(40)
                    .text("Oh look it's green now!")
                    .pointAt(util.vector().topOf(pos))
        })
})