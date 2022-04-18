// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')
let essentia = {
    'Perditio': 0x403E3E,
    'Terra': 0x20AB20,
    'Aqua': 0x26E4EB,
    'Ignis': 0xEB5A26,
    'Ordo': 0xB8BABA,
    'Gelum': 0x99E5E8,
    'Aer': 0xF2E783,
    'Vacuos': 0x969393,
    'Lux': 0xC4BB66,
    'Motus': 0x829492,
    'Tenebrae': 0x404040
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
    })
    event.create('essentia_phial', 'basic').displayName('Empty Phial')

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
    event.create('pillar_nw')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
    event.create('pillar_se')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
    event.create('pillar_sw')
        .material('rock')
        .hardness(0.5)
        .displayName('Pillar')
        .renderType('cutout')
        .box(0, 0, 0, 16, 32, 16)
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
})