// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

onEvent('item.registry', event => {
    // Register new items here
    // event.create('example_item').displayName('Example Item')
    event.create('essentia_phial', 'basic').displayName('Empty Phial')
    event.create('perditio_phial', 'basic').displayName('Vial of Essentia').tooltip("§8A Phial of Perditio Essentia").maxStackSize(16).containerItem('kubejs:essentia_phial').color(1, 0x403E3E);
    event.create('terra_phial', 'basic').displayName('Vial of Essentia').tooltip("§8A Phial of Terra Essentia").maxStackSize(16).containerItem('kubejs:essentia_phial').color(1, 0x20AB20);

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
    event.create('perditio_essentia')
        .thinTexture(0x403E3E)
        .bucketColor(0x403E3E)
        .displayName('Perditio')
    event.create('terra_essentia')
        .thinTexture(0x20AB20)
        .bucketColor(0x20AB20)
        .displayName('Terra')
})

onEvent('ponder.tag.registry', event => {
    event.create('kubejs:thaumaturgy', 'kubejs:matrix', "§8A Thaumaturge's Matrix", "§8A Thaumaturge's Matrix")
})

onEvent('ponder.registry', event => {
    event.create('infusion', 'kubejs:matrix')
        .tag('kubejs:thaumaturgy')
        .scene("thaumaturgy_scene", "thaumaturgy: javascript edition", 'kubejs:altar_built', (scene, util) => {
            var pos = util.grid().at(4,4,4)
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
        .scene("matrix_scene", "infusion!", "kubejs:altar_formed", (scene, util) =>{
            scene.showBasePlate()
            scene.scaleSceneView(0.5)
            scene.idle(10)
            scene.world().showSection(util.select().layersFrom(1), Facing.down)
            scene.idle(60)
        })
})