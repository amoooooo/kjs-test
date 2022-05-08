/// <reference path="./globals.d.ts" />
/// <reference path="./registries.d.ts" />
declare function onEvent(name: "recipes.serializer.special.flag", handler: (event: Internal.SpecialRecipeSerializerManager) => void);
declare function onEvent(name: "ponder.tag", handler: (event: Internal.PonderItemTagEventJS) => void);
declare function onEvent(name: "player.advancement", handler: (event: Internal.PlayerAdvancementEventJS) => void);
declare function onEvent(name: "jei.remove.recipes", handler: (event: Internal.RemoveJEIRecipesEvent) => void);
declare function onEvent(name: "ponder.tag.registry", handler: (event: Internal.PonderTagRegistryEventJS) => void);
declare function onEvent(name: "rei.add.items", handler: (event: Internal.AddREIEventJS) => void);
declare function onEvent(name: "jei.add.items", handler: (event: Internal.AddJEIEventJS<any>) => void);
declare function onEvent(name: "recipes.type_registry", handler: (event: Internal.RecipeTypeRegistryEventJS) => void);
declare function onEvent(name: "sound.registry", handler: (event: Internal.SoundRegistryEventJS) => void);
declare function onEvent(name: "recipes.compostables", handler: (event: Internal.CompostablesRecipeEventJS) => void);
declare function onEvent(name: "jei.hide.fluids", handler: (event: Internal.HideJEIEventJS<any>) => void);
declare function onEvent(name: "item.registry.armor_tiers", handler: (event: Internal.ItemArmorTierEventJS) => void);
declare function onEvent(name: "client.generate_assets", handler: (event: Internal.ClientGenerateAssetsEventJS) => void);
declare function onEvent(name: "jei.remove.categories", handler: (event: Internal.RemoveJEICategoriesEvent) => void);
declare function onEvent(name: "client.paint_screen", handler: (event: Internal.ScreenPaintEventJS) => void);
declare function onEvent(name: "jei.information", handler: (event: Internal.InformationJEIEventJS) => void);
declare function onEvent(name: "item.model_properties", handler: (event: Internal.ItemModelPropertiesEventJS) => void);
declare function onEvent(name: "client.painter_updated", handler: (event: Internal.PainterUpdatedEventJS) => void);
declare function onEvent(name: "jei.add.fluids", handler: (event: Internal.AddJEIEventJS<any>) => void);
declare function onEvent(name: "rei.add.fluids", handler: (event: Internal.AddREIEventJS) => void);
declare function onEvent(name: "jei.hide.custom", handler: (event: Internal.HideCustomJEIEventJS) => void);
declare function onEvent(name: "rei.hide.fluids", handler: (event: Internal.HideREIEventJS<any>) => void);
declare function onEvent(name: "ponder.registry", handler: (event: Internal.PonderRegistryEventJS) => void);
declare function onEvent(name: "command.run", handler: (event: Internal.CommandEventJS) => void);
declare function onEvent(name: "entity.check_spawn", handler: (event: Internal.CheckLivingEntitySpawnEventJS) => void);
declare function onEvent(name: "rei.remove.categories", handler: (event: Internal.RemoveREICategoryEventJS) => void);
declare function onEvent(name: "jei.hide.items", handler: (event: Internal.HideJEIEventJS<any>) => void);
declare function onEvent(name: "rei.information", handler: (event: Internal.InformationREIEventJS) => void);
declare function onEvent(name: "item.registry.tool_tiers", handler: (event: Internal.ItemToolTierEventJS) => void);
declare function onEvent(name: "jei.subtypes", handler: (event: Internal.JEISubtypesEventJS) => void);
declare function onEvent(name: "rei.hide.items", handler: (event: Internal.HideREIEventJS<any>) => void);
declare function onEvent(name: "minecraft.sound_event.registry", handler: (event: Registry.Sound_event) => void);
declare function onEvent(name: "sound_event.registry", handler: (event: Registry.Sound_event) => void);
declare function onEvent(name: "minecraft.fluid.registry", handler: (event: Registry.Fluid) => void);
declare function onEvent(name: "fluid.registry", handler: (event: Registry.Fluid) => void);
declare function onEvent(name: "minecraft.block.registry", handler: (event: Registry.Block) => void);
declare function onEvent(name: "block.registry", handler: (event: Registry.Block) => void);
declare function onEvent(name: "minecraft.item.registry", handler: (event: Registry.Item) => void);
declare function onEvent(name: "item.registry", handler: (event: Registry.Item) => void);
declare function onEvent(name: "minecraft.enchantment.registry", handler: (event: Registry.Enchantment) => void);
declare function onEvent(name: "enchantment.registry", handler: (event: Registry.Enchantment) => void);
declare function onEvent(name: "minecraft.mob_effect.registry", handler: (event: Registry.Mob_effect) => void);
declare function onEvent(name: "mob_effect.registry", handler: (event: Registry.Mob_effect) => void);
declare function onEvent(name: "minecraft.entity_type.registry", handler: (event: Registry.Entity_type) => void);
declare function onEvent(name: "entity_type.registry", handler: (event: Registry.Entity_type) => void);
declare function onEvent(name: "minecraft.block_entity_type.registry", handler: (event: Registry.Block_entity_type) => void);
declare function onEvent(name: "block_entity_type.registry", handler: (event: Registry.Block_entity_type) => void);
declare function onEvent(name: "minecraft.potion.registry", handler: (event: Registry.Potion) => void);
declare function onEvent(name: "potion.registry", handler: (event: Registry.Potion) => void);
declare function onEvent(name: "minecraft.particle_type.registry", handler: (event: Registry.Particle_type) => void);
declare function onEvent(name: "particle_type.registry", handler: (event: Registry.Particle_type) => void);
declare function onEvent(name: "minecraft.motive.registry", handler: (event: Registry.Motive) => void);
declare function onEvent(name: "motive.registry", handler: (event: Registry.Motive) => void);
declare function onEvent(name: "minecraft.custom_stat.registry", handler: (event: Registry.Custom_stat) => void);
declare function onEvent(name: "custom_stat.registry", handler: (event: Registry.Custom_stat) => void);
declare function onEvent(name: "minecraft.point_of_interest_type.registry", handler: (event: Registry.Point_of_interest_type) => void);
declare function onEvent(name: "point_of_interest_type.registry", handler: (event: Registry.Point_of_interest_type) => void);
declare function onEvent(name: "minecraft.villager_type.registry", handler: (event: Registry.Villager_type) => void);
declare function onEvent(name: "villager_type.registry", handler: (event: Registry.Villager_type) => void);
declare function onEvent(name: "minecraft.villager_profession.registry", handler: (event: Registry.Villager_profession) => void);
declare function onEvent(name: "villager_profession.registry", handler: (event: Registry.Villager_profession) => void);
