onEvent("ponder.tag.registry", event => {
    event.create("tea", "minecraft:diamond_block", "Tea Is Epic!", "Tea!!!!")

    event.remove("kinetic_relays")
})

onEvent("ponder.tag", event => {
    event.add("kinetic_appliances", "minecraft:dirt")

    event.remove("kinetic_appliances", ["create:deployer", "create:encased_fan"])
})

onEvent("ponder.registry", event => {
    event.create("test", "minecraft:cobblestone")
        .tag("kubejs:tea")
        // create:debug/scene_7 is a schematic built into create for the birb debug scene
        .scene("birb_test", "birbs: javascript edition", "create:debug/scene_7", (scene, util) => {
        	scene.showBasePlate();
            scene.idle(10)
            scene.world().showSection(util.select().layersFrom(1), Facing.down)
            scene.idle(10)

            var pos = util.grid().at(1, 2, 3)
            scene.special().birbOnSpinnyShaft(pos)
            scene.overlay().showText(100)
                .colored(PonderPalette.GREEN)
                .text("More birbs = More interesting")
                .pointAt(util.vector().topOf(pos))

            scene.idle(10)
            scene.special().createBirb(util.vector().topOf(0, 1, 2), () => new ParrotElement.DancePose())
            scene.idle(10)

            scene.getSpecial().createBirb(util.vector().centerOf(3, 1.25, 3)
                , () => new ParrotElement.FacePointOfInterestPose())
            scene.idle(20)

            var poi1 = util.grid().at(4, 1, 0)
            var poi2 = util.grid().at(0, 1, 4)

            scene.world().setBlock(poi1, util.getDefaultState("gold_block"), true)
            scene.special().movePointOfInterest(poi1)
            scene.idle(20)

            scene.world().setBlock(poi2, util.getDefaultState("gold_block"), true)
            scene.special().movePointOfInterest(poi2)
            scene.overlay().showText(20)
                .text("Point of Interest")
                .pointAt(util.vector().centerOf(poi2))
            scene.idle(20)

            scene.world().destroyBlock(poi1)
            scene.special().movePointOfInterest(poi1)
            scene.idle(20)

            scene.world().destroyBlock(poi2)
            scene.special().movePointOfInterest(poi2)
        })
        .scene("multi_scene_test", "Yes rainbow sheep is cool", "sheep", (scene, util) => {
            scene.showBasePlate()
            scene.idle(10)
            var pos = util.grid().at(1, 0, 1)
//            var entity = scene.world.createEntity(world => {
//                return jsUtil.createEntity(world, "sheep", pos)
//            })
            scene.idle(10)
            scene.overlay().showText(60)
                .text("This is sheep. It's boring and not rainbow!!!!!!!!!!!!!!!!!!!!!!!!")
                .pointAt(util.vector().centerOf(pos))
            scene.idle(60)
            scene.idle(10)
            scene.overlay().showText(20)
                .text("Yess!!! It's rainbow now!!!")
                .pointAt(util.vector().centerOf(pos))
            scene.idle(20)
        })
        .scene("data_test", "Data test", "sheep", (scene, util) => {
            scene.showBasePlate()
            scene.idle(10)
            scene.world().showSection(util.select().layersFrom(1), Facing.down)

            var pos = util.grid().at(1, 1, 1)

            console.info(util.getDefaultState("create:deployer"))
            scene.world().setBlock(pos, util.getDefaultState("create:deployer"), true)

            scene.world().modifyBlock(pos, state => state.with("facing", Facing.up))

            for(let color in Color.DYE) {
                let colorName = color
                scene.world().modifyTileNBT(pos, {
                        HeldItem: java("dev.latvian.kubejs.item.ItemStackJS").of("minecraft:" + colorName + "_wool")
                    })
                scene.idle(20)
            }
        })

})