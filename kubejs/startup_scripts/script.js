// priority: 0

let essentia = {
    'Perditio': 0x404040,
    'Terra': 0x56c000,
    'Aqua': 0x3cd4fc,
    'Ignis': 0xff5a01,
    'Ordo': 0xd5d4ec,
    'Gelum': 0xe1ffff,
    'Aer': 0xffff7e,
    'Vacuos': 0x888888,
    'Lux': 0xffffc0,
    'Motus': 0xcdccf4,
    'Tenebrae': 0x222222,
    'Alienis': 0x805080,
    'Alkimia': 0x23ac9d,
    'Bestia': 0x9f6409,
    'Herba': 0x01ac00,
    'Cognitio': 0xf9967f,
    'Humanus': 0xffd7c0,
    'Auram': 0xffc0ff,
    'Aversio': 0xc05050,
    'Desiderium': 0xe6be44,
    'Victus': 0xde0005,
    'Exanimis': 0x3a4000,
    'Fabrico': 0x809d80,
    'Instrumentum': 0x4040ee,
    'Permutatio': 0x578357,
    'Vinculum': 0x9a8080,
    'Machina': 0x8080a0,
    'Metallum': 0xb5b5cd,
    'Mortuus': 0x6a0005,
    'Potentia': 0xc0ffff,
    'Vitium': 0x800080,
    'Praecantatio': 0xcf00ff,
    'Praemunio': 0x00c0c0,
    'Sensus': 0xc0ffc0,
    'Spiritus': 0xebebfb,
    'Vitreus': 0x80ffff,
    'Volatus': 0xe7e7d7

}
onEvent('item.registry', event => {
    // Register new items here
    // event.create('example_item').displayName('Example Item')
    Object.entries(essentia).forEach(([name, color]) => {
        event.create(name.toLowerCase() + '_phial', 'basic')
            .displayName('Phial of Essentia')
            .color(1, color).maxStackSize(16)
            .tooltip('A phial of ' + name + ' essentia.')
            .parentModel('kubejs:perditio_phial')
        event.create(name.toLowerCase() + '_crystal', 'basic')
            .displayName(`${name} Crystal`)
            .color(0, color).maxStackSize(64)
            .texture('kubejs:item/crystal_essence')
    })
    event.create('essentia_phial', 'basic').displayName('Empty Phial')
    event.create('scanner', 'basic').displayName('Essentia Scanner')
    event.create('caster_basic', 'basic')
        .displayName("Caster's Gauntlet")
        .maxStackSize(1)
        .useAnimation("bow")
        .useDuration((itemstack) => (itemstack.nbt && itemstack.nbt.data) ? itemstack.nbt.data.duration : 5)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => { return itemstack })
        .releaseUsing((itemstack, level, entity, tick) => {
            if (entity.player) {
                /**
                 * @type {Internal.PlayerJS<Internal.ServerPlayer>}
                 */
                let player = entity
                if (itemstack.nbt && itemstack.nbt.data) {
                    player.addItemCooldown("kubejs:caster_basic", Math.min(5, Math.floor(5 - tick)))
                }
            }
        })
        .color((itemstack, tintindex) => {
            if (itemstack.nbt && itemstack.nbt.data && tintindex == 1) {
                return itemstack.nbt.data.color
            }
            return 0xffffff
        })
    event.create('caster_advanced', 'basic')
        .displayName("Advanced Caster's Gauntlet")
        .maxStackSize(1)
        .useAnimation("bow")
        .useDuration((itemstack) => (itemstack.nbt && itemstack.nbt.data) ? itemstack.nbt.data.duration : 5)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => { return itemstack })
        .releaseUsing((itemstack, level, entity, tick) => {
            if (entity.player) {
                /**
                 * @type {Internal.PlayerJS<Internal.ServerPlayer>}
                 */
                let player = entity
                if (itemstack.nbt && itemstack.nbt.data) {
                    player.addItemCooldown("kubejs:caster_advanced", Math.min(5, Math.floor(5 - tick)))
                }
            }
        })
        .color((itemstack, tintindex) => {
            if (itemstack.nbt && itemstack.nbt.data && tintindex == 1) {
                return itemstack.nbt.data.color
            }
            return 0xffffff
        })
    event.create('lightning_focus', 'basic').displayName("Lightning Focus").parentModel('kubejs:item/focus_1').texture('kubejs:item/focus_1').color(0, 0x00e7e7)
    event.create('warding_focus', 'basic').displayName("Warding Focus").parentModel('kubejs:item/focus_2').texture('kubejs:item/focus_2').color(0, 0xe7e7ff)
    event.create('excavation_focus', 'basic').displayName("Excavation Focus").parentModel('kubejs:item/focus_3').texture('kubejs:item/focus_3').color(0, 0x33a433)
    event.create('boots_of_the_traveller', 'basic').displayName("Boots of the Traveller").texture('kubejs:item/traveller_boots')
    event.create('dynamic_focus', 'basic').displayName("Dynamic Focus").parentModel('kubejs:item/focus_1').texture('kubejs:item/focus_1')
        .color((itemstack) => {
            if (itemstack.nbt && itemstack.nbt.data) {
                return itemstack.nbt.data.color
            }
            return 0xb3d7ff
        })
    event.create('wand', 'basic')
        .displayName('Wand')
        .maxStackSize(1)
        .parentModel('kubejs:item/wand')
        .texture('kubejs:item/wand')
        .useAnimation("bow")
        .useDuration((itemstack) => (itemstack.nbt && itemstack.nbt.data) ? itemstack.nbt.data.duration : 5)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => { return itemstack })
        .releaseUsing((itemstack, level, entity, tick) => {
            if (entity.player) {
                /**
                 * @type {Internal.PlayerJS<Internal.ServerPlayer>}
                 */
                let player = entity
                if (itemstack.nbt && itemstack.nbt.data) {
                    player.addItemCooldown("kubejs:wand", Math.min(5, Math.floor(5 - tick)))
                }
            }
        })
        .color((itemstack, tintindex) => {
            if (itemstack.nbt && itemstack.nbt.data && tintindex == 1) {
                return itemstack.nbt.data.color
            }
            return 0xffffff
        })
})

onEvent('postinit', event => {
    Object.entries(essentia).forEach(([name, color]) => {
        let hex = color.toString()
        let output = {
            "color": `#${hex}`,
            "containers": [
                {
                    "filled": [
                        `kubejs:${name.toLowerCase()}_phial`
                    ],
                    "empty": "kubejs:essentia_phial",
                    "capacity": 1
                }
            ],
            "equivalent_fluids": [
                `kubejs:${name.toLowerCase()}_essentia`
            ],
            "id": `kubejs:${name.toLowerCase()}_essentia`,
            "translation_key": `item.kubejs.${name.toLowerCase()}_essentia`,
            "still_texture": "selene:blocks/potion_still",
            "flowing_texture": "minecraft:block/water_flow"
        }
        JsonIO.write(`./config/openloader/data/tc_remake/data/selene/soft_fluids/${name.toLowerCase()}.json`, output)
    })

})

onEvent('block.registry', event => {
    event.create('matrix')
        .material('rock')
        .hardness(0.5)
        .displayName('Matrix')
        .renderType('cutout')
        .notSolid()
        .textureAll('kubejs:block/matrix')
        .model('kubejs:block/matrix')
        .box(2, 2, 2, 14, 14, 14)
    event.create('pillar_ne')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
        .item(item => {
            item.group(null)
        })
    event.create('pillar_nw')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
        .item(item => {
            item.group(null)
        })
    event.create('pillar_se')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
        .item(item => {
            item.group(null)
        })
    event.create('pillar_sw')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
        .item(item => {
            item.group(null)
        })
    event.create('urn')
        .material('rock')
        .hardness(0.5)
        .displayName('Urn of Everlasting Life')
        .renderType('cutout')
    event.create('crystal')
        .material('rock')
        .hardness(0)
        .displayName('Crystal')
        .renderType('cutout')
        .box(4, 0, 4, 12, 8, 12)
})


onEvent('fluid.registry', event => {
    Object.entries(essentia).forEach(([key, value]) => {
        event.create(key.toLowerCase() + '_essentia')
            .displayName(key)
            .thinTexture(value)
            .bucketColor(value)
    })
})

onEvent('ponder.tag.registry', event => {
    event.create('kubejs:thaumaturgy', 'kubejs:matrix', "§8A Thaumaturge's Matrix", "§8A Thaumaturge's Matrix")
})

onEvent('ponder.registry', event => {
    event.create('infusion', 'minecraft:lodestone')
        .tag('kubejs:thaumaturgy')
        .scene("thaumaturgy_scene", "thaumaturgy: javascript edition", 'kubejs:altar_built', (scene, util) => {
            var pos = util.grid().at(4, 4, 4)
            scene.showBasePlate();
            scene.scaleSceneView(0.5)
            scene.idle(10)
            scene.world().showSection(util.select().layer(1), Facing.down)
            scene.idle(20)
            scene.world().showSection(util.select().layer(2), Facing.down)
            scene.idle(20)
            scene.world().showSection(util.select().layer(3), Facing.down)
            scene.idle(20)
            scene.overlay().showControls(new PonderInput(util.vector().blockSurface(pos, Facing.down), PonderPointing.LEFT)
                .rightClick().withItem("supplementaries:wrench"),
                40)
            scene.idle(20)

        })
        .scene("matrix_scene", "infusion!", "kubejs:altar_formed", (scene, util) => {
            scene.showBasePlate()
            scene.scaleSceneView(0.5)
            scene.idle(10)
            scene.world().showSection(util.select().layersFrom(1), Facing.down)
            scene.idle(20)
            scene.overlay().showText(60)
                .text('After the altar is formed, you can add as many pedestals and decorations as you want.')
                .pointAt(util.vector().centerOf(util.grid().at(1, 2, 1)))
            scene.idle(60)
            scene.rotateCameraY(-180)
            scene.idle(60)
            scene.overlay().showText(60)
                .text('Only add the jars of essentia you need for the infusion, or else it will not work.')
                .pointAt(util.vector().centerOf(util.grid().at(0, 3, 7)))
            scene.idle(40)
        })
    event.create('gs', 'minecraft:lime_concrete')
        .tag('kubejs:thaumaturgy')
        .scene("gs_scene", "", 'kubejs:altar_gs', (scene, util) => {
            scene.showBasePlate()
            scene.world().showSection(util.select().layersFrom(1), Facing.down)
        })
})
