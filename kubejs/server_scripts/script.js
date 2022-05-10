// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

let essentia = {
	'perditio': 0x404040,
	'terra': 0x56c000,
	'aqua': 0x3cd4fc,
	'ignis': 0xff5a01,
	'ordo': 0xd5d4ec,
	'gelum': 0xe1ffff,
	'aer': 0xffff7e,
	'vacuos': 0x888888,
	'lux': 0xffffc0,
	'motus': 0xcdccf4,
	'tenebrae': 0x222222,
	'alienis': 0x805080,
	'alkimia': 0x23ac9d,
	'bestia': 0x9f6409,
	'herba': 0x01ac00,
	'cognitio': 0xf9967f,
	'humanus': 0xffd7c0,
	'auram': 0xffc0ff,
	'aversio': 0xc05050,
	'desiderium': 0xe6be44,
	'victus': 0xde0005,
	'exanimis': 0x3a4000,
	'fabrico': 0x809d80,
	'instrumentum': 0x4040ee,
	'permutatio': 0x578357,
	'vinculum': 0x9a8080,
	'machina': 0x8080a0,
	'metallum': 0xb5b5cd,
	'mortuus': 0x6a0005,
	'potentia': 0xc0ffff,
	'vitium': 0x800080,
	'praecantatio': 0xcf00ff,
	'praemunio': 0x00c0c0,
	'sensus': 0xc0ffc0,
	'spiritus': 0xebebfb,
	'vitreus': 0x80ffff,
	'volatus': 0xe7e7d7

}

onEvent('recipes', event => {
	// Change recipes here
	Ingredient.registerCustomIngredientAction('create_spell', (itemstack, index, inventory) => {
		let nbt = {
			focus: itemstack.id,
			data: {
			}
		}
		Object.entries(components).forEach(([name, component]) => {
			let item = inventory.find(Item.of(name))
			if (item != -1) {
				if (inventory.get(item) == name) {
					console.log(inventory.get(item))
					if (name == 'minecraft:redstone') {
						if (itemstack.nbt && itemstack.nbt.data.power) {
							nbt.data.power = itemstack.nbt.data.power + 1
						} else {
							nbt.data.power = 1
						}
					} else if (name == 'minecraft:amethyst_shard') {
						if (itemstack.nbt && itemstack.nbt.data.range) {
							nbt.data.range = itemstack.nbt.data.range + 1
						} else {
							nbt.data.range = 1
						}
					} else if (name == 'minecraft:glowstone_dust') {
						if (itemstack.nbt && itemstack.nbt.data.duration) {
							nbt.data.duration = itemstack.nbt.data.duration + 1
						} else {
							nbt.data.duration = 1
						}
					} else if (name == 'supplementaries:ash') {
						if (itemstack.nbt && itemstack.nbt.data.range && itemstack.nbt.data.range > 2) {
							nbt.data.range = itemstack.nbt.data.range - 1
						}
					} else if (name == 'minecraft:clay_ball') {
						if (itemstack.nbt && itemstack.nbt.data.duration && itemstack.nbt.data.duration > 2) {
							nbt.data.duration = itemstack.nbt.data.duration - 1
						}
					} else {
						Object.entries(component).forEach(([key, value]) => {
							if (key == 'aspect') { nbt.data.color = essentia[value] }
							nbt.data[key] = value
							console.log(`${nbt}`)
						})
					}
				}
			}
		})
		if (itemstack.nbt == null) {
			itemstack.nbt = {}
		}
		itemstack.nbt = itemstack.nbt.merge(nbt)
		console.log(itemstack.getNbtString())
		inventory.set(index, itemstack)
		return itemstack
	})
	event.shapeless('minecraft:paper', ['#tckjs:components', Item.of('kubejs:dynamic_focus').ignoreNBT(), Item.of('minecraft:paper').ignoreNBT()])
		.customIngredientAction('kubejs:dynamic_focus', 'create_spell')

	Ingredient.registerCustomIngredientAction('merge_spell', (itemstack, index, inventory) => {
		let nbt = {
			focus: itemstack.id,
			data: {
				chain: 'true'
			}
		}
		for (let i = 0; i < 1; i++) {
			let item = inventory.find(Item.of('kubejs:dynamic_focus').ignoreNBT())
			if (item != -1) {
				let items = inventory.get(item)
				if (i == 0) {
					nbt.data.spell1 = items.nbt.data
					inventory.clear(item)
				} else {
					nbt.data.spell2 = items.nbt.data
					if (itemstack.nbt == null) {
						itemstack.nbt = {}
					}
					//itemstack.nbt = itemstack.nbt.merge(nbt)
					console.log(itemstack.getNbtString())
					return itemstack
				}
			}
		}
		return itemstack
	})
	event.shapeless('kubejs:dynamic_focus', [Item.of('kubejs:dynamic_focus').ignoreNBT(), Item.of('kubejs:dynamic_focus').ignoreNBT()])
		.customIngredientAction('kubejs:dynamic_focus', 'merge_spell')
})

onEvent('item.tags', event => {
	event.add('tckjs:components', [
		'minecraft:white_wool', 'kubejs:ignis_crystal', 'kubejs:aqua_crystal',
		'minecraft:arrow', 'kubejs:aer_crystal', 'minecraft:chorus_fruit',
		'minecraft:prismarine_shard', 'minecraft:stick', 'kubejs:terra_crystal',
		'minecraft:chorus_flower', 'minecraft:redstone', 'minecraft:amethyst_shard',
		'minecraft:chain', 'minecraft:glowstone_dust', 'kubejs:lux_crystal',
		'kubejs:alienis_crystal', 'minecraft:clay_ball', 'supplementaries:ash',
		'malum:poppet', 'minecraft:slime_ball'
	])
	event.add('tckjs:magical_implements', [
		'kubejs:caster_basic', 'kubejs:caster_advanced', 'kubejs:wand'
	])
})

let components = {
	'minecraft:white_wool': { 'shape': 'cloud' },
	'kubejs:ignis_crystal': { 'aspect': 'ignis' },
	'kubejs:aqua_crystal': { 'aspect': 'aqua' },
	'minecraft:arrow': { 'shape': 'bolt' },
	'kubejs:aer_crystal': { 'aspect': 'aer' },
	'minecraft:chorus_fruit': { 'modifier': 'split' },
	'minecraft:prismarine_shard': { 'modifier': 'cone' },
	'minecraft:stick': { 'modifier': 'single' },
	'kubejs:terra_crystal': { 'aspect': 'terra' },
	'minecraft:chorus_flower': { 'shape': 'pulsar' },
	'minecraft:redstone': { 'power': 0 },
	'minecraft:amethyst_shard': { 'range': 0 },
	'minecraft:chain': { 'shape': 'chain' },
	'minecraft:glowstone_dust': { 'duration': 0 },
	'kubejs:lux_crystal': { 'aspect': 'lux' },
	'kubejs:alienis_crystal': { 'aspect': 'alienis' },
	'minecraft:clay_ball': { 'duration': 0 },
	'supplementaries:ash': { 'range': 0 },
	'malum:poppet': { 'shape': 'self' },
	'minecraft:slime_ball': { 'shape': 'touch' }
}