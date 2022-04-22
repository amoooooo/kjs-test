import mods.jei.category.Custom;
import mods.jei.JEI;
import mods.jei.category.SimpleJeiCategory;
import mods.jei.category.JeiCategory;
import crafttweaker.api.text.TextComponent;
import mods.jei.component.JeiDrawable;

val pedestalCategory = JeiCategory.create<Custom>("pedestal_category", new TextComponent("Ammonition"), JeiDrawable.of(<item:minecraft:nautilus_shell>), [<item:minecraft:glass_bottle>]) as Custom;
var intSlotCount = 0;
pedestalCategory.background = JeiDrawable.blank(128, 128);
//Adds 10 slots? Maybe
for i in 0 .. 9 {
    pedestalCategory.addSlot(intSlotCount, 18 * intSlotCount, 20 * intSlotCount % 10, true);
    intSlotCount++;
}
pedestalCategory.addSlot(intSlotCount++, 64, 64, false);
pedestalCategory.addText(0, 150, new TextComponent("I Still hate you"));
pedestalCategory.addRecipe([<item:minecraft:oak_sapling>], [[<item:minecraft:shulker_shell> *2], [<item:minecraft:purpur_block>], [<item:minecraft:quartz>], [<item:minecraft:chain>], [<item:minecraft:slime_ball>], [<item:minecraft:amethyst_shard>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>], [<item:minecraft:enchanted_book>]]);
JEI.addCategory(pedestalCategory);