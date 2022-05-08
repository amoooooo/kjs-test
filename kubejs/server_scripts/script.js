// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

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
					} else {
						Object.entries(component).forEach(([key, value]) => {
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
		'minecraft:white_wool', 'minecraft:netherrack', 'kubejs:aqua_crystal',
		'minecraft:arrow', 'minecraft:feather', 'minecraft:chorus_fruit',
		'minecraft:prismarine_shard', 'minecraft:stick', 'minecraft:dirt',
		'minecraft:chorus_flower', 'minecraft:redstone', 'minecraft:amethyst_shard',
		'minecraft:chain', 'minecraft:glowstone_dust'
	])
})

let components = {
	'minecraft:white_wool': { 'shape': 'cloud' },
	'minecraft:netherrack': { 'aspect': 'ignis' },
	'kubejs:aqua_crystal': { 'aspect': 'aqua' },
	'minecraft:arrow': { 'shape': 'bolt' },
	'minecraft:feather': { 'aspect': 'aer' },
	'minecraft:chorus_fruit': { 'modifier': 'split' },
	'minecraft:prismarine_shard': { 'modifier': 'cone' },
	'minecraft:stick': { 'modifier': 'single' },
	'minecraft:dirt': { 'aspect': 'terra' },
	'minecraft:chorus_flower': { 'shape': 'pulsar' },
	'minecraft:redstone': { 'power': 0 },
	'minecraft:amethyst_shard': { 'range': 0 },
	'minecraft:chain': { 'shape': 'chain' },
	'minecraft:glowstone_dust': { 'duration': 0 }
}