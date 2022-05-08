// priority: 0

console.info('Hello, World! (You will see this line every time client resources reload)')

onEvent('jei.hide.items', event => {
	// Hide items in JEI here
	// event.hide('minecraft:cobblestone')
})

onEvent('item.tooltip', tooltip => {
	tooltip.addAdvanced('kubejs:dynamic_focus', (item, advanced, text) => {
		let icons = []
		if (item.nbt) {
			if (item.nbt.data) {
				if (item.nbt.data.chain == 'true') {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Chain').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						text.add(Text.of('Spell 1').gold())

						Object.keys(item.nbt.data.spell1).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell1[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell1[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell1[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
						text.add(Text.of('Spell 2').gold())
						let icons2 = []
						Object.keys(item.nbt.data.spell2).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons2.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell2[key]}`)} `)
							} else if (key == 'aspect') {
								icons2.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell2[key]}`)} `)
							} else {
								icons2.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell2[key]} `)
							}
						})
						for (let i = 0; i < icons2.length; i++) {
							text.add(Text.of(icons2[i]))
						}
					}
				} else {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Spell').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						Object.keys(item.nbt.data).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §b${Text.translate(`tcr.component.${item.nbt.data[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §f${Text.translate(`tcr.aspect.${item.nbt.data[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
					}
				}

			}
		}
	})
	tooltip.addAdvanced('kubejs:caster_basic', (item, advanced, text) => {
		let icons = []
		if (item.nbt) {
			if (item.nbt.data) {
				if (item.nbt.data.chain == 'true') {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Chain').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						text.add(Text.of('Spell 1').gold())

						Object.keys(item.nbt.data.spell1).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell1[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell1[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell1[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
						text.add(Text.of('Spell 2').gold())
						let icons2 = []
						Object.keys(item.nbt.data.spell2).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons2.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell2[key]}`)} `)
							} else if (key == 'aspect') {
								icons2.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell2[key]}`)} `)
							} else {
								icons2.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell2[key]} `)
							}
						})
						for (let i = 0; i < icons2.length; i++) {
							text.add(Text.of(icons2[i]))
						}
					}
				} else {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Spell').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						Object.keys(item.nbt.data).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §b${Text.translate(`tcr.component.${item.nbt.data[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §f${Text.translate(`tcr.aspect.${item.nbt.data[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
					}
				}

			}
		}
	})
	tooltip.addAdvanced('kubejs:caster_advanced', (item, advanced, text) => {
		let icons = []
		if (item.nbt) {
			if (item.nbt.data) {
				if (item.nbt.data.chain == 'true') {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Chain').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						text.add(Text.of('Spell 1').gold())

						Object.keys(item.nbt.data.spell1).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell1[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell1[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell1[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
						text.add(Text.of('Spell 2').gold())
						let icons2 = []
						Object.keys(item.nbt.data.spell2).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons2.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell2[key]}`)} `)
							} else if (key == 'aspect') {
								icons2.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell2[key]}`)} `)
							} else {
								icons2.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell2[key]} `)
							}
						})
						for (let i = 0; i < icons2.length; i++) {
							text.add(Text.of(icons2[i]))
						}
					}
				} else {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Spell').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						Object.keys(item.nbt.data).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §b${Text.translate(`tcr.component.${item.nbt.data[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §f${Text.translate(`tcr.aspect.${item.nbt.data[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
					}
				}

			}
		}
	})
	tooltip.addAdvanced('kubejs:wand', (item, advanced, text) => {
		let icons = []
		if (item.nbt) {
			if (item.nbt.data) {
				if (item.nbt.data.chain == 'true') {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Chain').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						text.add(Text.of('Spell 1').gold())

						Object.keys(item.nbt.data.spell1).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell1[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell1[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell1[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
						text.add(Text.of('Spell 2').gold())
						let icons2 = []
						Object.keys(item.nbt.data.spell2).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons2.push(` §c${key}: §b${Text.translate(`tcr.component.${item.nbt.data.spell2[key]}`)} `)
							} else if (key == 'aspect') {
								icons2.push(` §c${key}: §f${Text.translate(`tcr.aspect.${item.nbt.data.spell2[key]}`)} `)
							} else {
								icons2.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data.spell2[key]} `)
							}
						})
						for (let i = 0; i < icons2.length; i++) {
							text.add(Text.of(icons2[i]))
						}
					}
				} else {
					text.set(0, Text.of(item.name).yellow())
					text.add([Text.of('Spell').gold(), Text.of(' [Hold Shift]').darkGray()])
					if (tooltip.isShift()) {
						let icons1 = []
						Object.keys(item.nbt.data).forEach(key => {
							if (key == 'shape' || key == 'modifier') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §b${Text.translate(`tcr.component.${item.nbt.data[key]}`)} `)
							} else if (key == 'aspect') {
								icons1.push(` §c${capitalizeFirstLetter(key)}: §f${Text.translate(`tcr.aspect.${item.nbt.data[key]}`)} `)
							} else {
								icons1.push(` §c${Text.translate(`tcr.component.${key}`)}: §f${item.nbt.data[key]} `)
							}
						})
						for (let i = 0; i < icons1.length; i++) {
							text.add(Text.of(icons1[i]))
						}
					}
				}

			}
		}
	})
})

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}