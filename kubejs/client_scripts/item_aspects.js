let aspects = JsonIO.read('aspectfilegenerated.json')

onEvent('item.tooltip', e => {
    e.addAdvanced("*", (item, advanced, lines) => {
        let textAspects = [];
        let id = item.id.toString();
        if (e.isShift()) {
            if (aspects[`${id}`] !== null && aspects[`${id}`] !== undefined && scanned[`${id}`] == 1) {
                Object.keys(aspects[`${id}`]).forEach(aspect => {
                    textAspects.push(`${Text.translate(aspect)}§f${aspects[id][aspect]}§f`);
                })
                lines.add(Text.of(""));
                lines.add(Text.of(textAspects.join("")));
            }
        }

    })
})

