/// <reference path="./globals.d.ts" />
/// <reference path="./registries.d.ts" />
declare function onEvent(name: "server.datapack.low_priority", handler: (event: Internal.DataPackEventJS) => void);
declare function onEvent(name: "tags.worldgen.chunk_generator", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.height_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.material_condition", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "entity.spawned", handler: (event: Internal.EntitySpawnedEventJS) => void);
declare function onEvent(name: "player.tick", handler: (event: Internal.SimplePlayerEventJS) => void);
declare function onEvent(name: "tags.worldgen.material_rule", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.activity", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "block.left_click", handler: (event: Internal.BlockLeftClickEventJS) => void);
declare function onEvent(name: "tags.worldgen.placed_feature", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.template_pool", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "client.tick", handler: (event: Internal.ClientTickEventJS) => void);
declare function onEvent(name: "item.modification", handler: (event: Internal.ItemModificationEventJS) => void);
declare function onEvent(name: "tags.chunk_status", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.noise", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.sensor_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.items", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.trunk_placer_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.loot_condition_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.blocks", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "recipes.serializer.special.flag", handler: (event: Internal.SpecialRecipeSerializerManager) => void);
declare function onEvent(name: "init", handler: (event: Internal.StartupEventJS) => void);
declare function onEvent(name: "recipes", handler: (event: Internal.RecipeEventJS) => void);
declare function onEvent(name: "tags.int_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "block.tags", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "player.logged_in", handler: (event: Internal.SimplePlayerEventJS) => void);
declare function onEvent(name: "tags.entity_types", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.loot_pool_entry_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.memory_module_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.motive", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.feature_size_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "chest.loot_tables", handler: (event: Internal.ChestLootEventJS) => void);
declare function onEvent(name: "tags.position_source_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "worldgen.remove", handler: (event: Internal.WorldgenRemoveEventJS) => void);
declare function onEvent(name: "item.tooltip", handler: (event: Internal.ItemTooltipEventJS) => void);
declare function onEvent(name: "tags.block_entity_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.game_events", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.structure_pool_element", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "block.place", handler: (event: Internal.BlockPlaceEventJS) => void);
declare function onEvent(name: "ponder.tag", handler: (event: Internal.PonderItemTagEventJS) => void);
declare function onEvent(name: "tags.data_serializers", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.custom_stat", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.stat_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "player.advancement", handler: (event: Internal.PlayerAdvancementEventJS) => void);
declare function onEvent(name: "tags.worldgen.block_state_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.loot_function_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.dimension_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.attribute", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "worldgen.add", handler: (event: Internal.WorldgenAddEventJS) => void);
declare function onEvent(name: "block.modification", handler: (event: Internal.BlockModificationEventJS) => void);
declare function onEvent(name: "player.inventory.changed", handler: (event: Internal.InventoryChangedEventJS) => void);
declare function onEvent(name: "jei.remove.recipes", handler: (event: Internal.RemoveJEIRecipesEvent) => void);
declare function onEvent(name: "gift.loot_tables", handler: (event: Internal.GiftLootEventJS) => void);
declare function onEvent(name: "tags.particle_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.foliage_placer_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.recipe_serializer", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "fishing.loot_tables", handler: (event: Internal.FishingLootEventJS) => void);
declare function onEvent(name: "fluid.tags", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "ponder.tag.registry", handler: (event: Internal.PonderTagRegistryEventJS) => void);
declare function onEvent(name: "level.tick", handler: (event: Internal.SimpleLevelEventJS) => void);
declare function onEvent(name: "tags.enchantment", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.mob_effect", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.add.items", handler: (event: Internal.AddJEIEventJS<any>) => void);
declare function onEvent(name: "tags.loot_score_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.crafttweaker.transformer_serializer", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.noise_settings", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.point_of_interest_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "server.tick", handler: (event: Internal.ServerEventJS) => void);
declare function onEvent(name: "recipes.type_registry", handler: (event: Internal.RecipeTypeRegistryEventJS) => void);
declare function onEvent(name: "sound.registry", handler: (event: Internal.SoundRegistryEventJS) => void);
declare function onEvent(name: "tags.worldgen.structure_placement", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.crafttweaker.condition_serializer", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "recipes.compostables", handler: (event: Internal.CompostablesRecipeEventJS) => void);
declare function onEvent(name: "jei.hide.fluids", handler: (event: Internal.HideJEIEventJS<any>) => void);
declare function onEvent(name: "item.registry.armor_tiers", handler: (event: Internal.ItemArmorTierEventJS) => void);
declare function onEvent(name: "tags.worldgen.biome_source", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.remove.categories", handler: (event: Internal.RemoveJEICategoriesEvent) => void);
declare function onEvent(name: "tags.pos_rule_test", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "player.inventory.opened", handler: (event: Internal.InventoryEventJS) => void);
declare function onEvent(name: "item.right_click_empty", handler: (event: Internal.ItemRightClickEmptyEventJS) => void);
declare function onEvent(name: "client.paint_screen", handler: (event: Internal.ScreenPaintEventJS) => void);
declare function onEvent(name: "tags.loot_number_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.recipe_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.loot_nbt_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.configured_structure_feature", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.block_predicate_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.information", handler: (event: Internal.InformationJEIEventJS) => void);
declare function onEvent(name: "postinit", handler: (event: Internal.StartupEventJS) => void);
declare function onEvent(name: "tags.worldgen.structure_feature", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.configured_feature", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.forge.loot_modifier_serializers", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "generic.loot_tables", handler: (event: Internal.GenericLootEventJS) => void);
declare function onEvent(name: "client.painter_updated", handler: (event: Internal.PainterUpdatedEventJS) => void);
declare function onEvent(name: "tags.worldgen.feature", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.add.fluids", handler: (event: Internal.AddJEIEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.density_function_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "server.load", handler: (event: Internal.ServerEventJS) => void);
declare function onEvent(name: "tags.float_provider_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "server.datapack.high_priority", handler: (event: Internal.DataPackEventJS) => void);
declare function onEvent(name: "server.datapack.last", handler: (event: Internal.DataPackEventJS) => void);
declare function onEvent(name: "tags.schedule", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.hide.custom", handler: (event: Internal.HideCustomJEIEventJS) => void);
declare function onEvent(name: "level.load", handler: (event: Internal.SimpleLevelEventJS) => void);
declare function onEvent(name: "tags.worldgen.structure_piece", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.density_function", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.structure_processor", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "ponder.registry", handler: (event: Internal.PonderRegistryEventJS) => void);
declare function onEvent(name: "tags.sound_event", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "item.left_click", handler: (event: Internal.ItemLeftClickEventJS) => void);
declare function onEvent(name: "item.toss", handler: (event: Internal.ItemTossEventJS) => void);
declare function onEvent(name: "item.tags", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "entity.loot_tables", handler: (event: Internal.EntityLootEventJS) => void);
declare function onEvent(name: "tags.rule_test", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "client.init", handler: (event: Internal.ClientEventJS) => void);
declare function onEvent(name: "command.run", handler: (event: Internal.CommandEventJS) => void);
declare function onEvent(name: "block.break", handler: (event: Internal.BlockBreakEventJS) => void);
declare function onEvent(name: "tags.worldgen.structure_set", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.tree_decorator_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "entity.check_spawn", handler: (event: Internal.CheckLivingEntitySpawnEventJS) => void);
declare function onEvent(name: "item.right_click", handler: (event: Internal.ItemRightClickEventJS) => void);
declare function onEvent(name: "tags.worldgen.placement_modifier_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.villager_profession", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "player.inventory.closed", handler: (event: Internal.InventoryEventJS) => void);
declare function onEvent(name: "tags.villager_type", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.forge.world_types", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "jei.hide.items", handler: (event: Internal.HideJEIEventJS<any>) => void);
declare function onEvent(name: "item.pickup", handler: (event: Internal.ItemPickupEventJS) => void);
declare function onEvent(name: "tags.worldgen.processor_list", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.fluids", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.configured_carver", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.carver", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "block.loot_tables", handler: (event: Internal.BlockLootEventJS) => void);
declare function onEvent(name: "item.registry.tool_tiers", handler: (event: Internal.ItemToolTierEventJS) => void);
declare function onEvent(name: "client.logged_in", handler: (event: Internal.ClientLoggedInEventJS) => void);
declare function onEvent(name: "block.right_click", handler: (event: Internal.BlockRightClickEventJS) => void);
declare function onEvent(name: "jei.subtypes", handler: (event: Internal.JEISubtypesEventJS) => void);
declare function onEvent(name: "tags.menu", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.potion", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "tags.worldgen.biome", handler: (event: Internal.TagEventJS<any>) => void);
declare function onEvent(name: "server.datapack.first", handler: (event: Internal.DataPackEventJS) => void);
declare function onEvent(name: "minecraft.block.registry", handler: (event: Registry.Block) => void);
declare function onEvent(name: "block.registry", handler: (event: Registry.Block) => void);
declare function onEvent(name: "minecraft.item.registry", handler: (event: Registry.Item) => void);
declare function onEvent(name: "item.registry", handler: (event: Registry.Item) => void);
declare function onEvent(name: "minecraft.fluid.registry", handler: (event: Registry.Fluid) => void);
declare function onEvent(name: "fluid.registry", handler: (event: Registry.Fluid) => void);
declare function onEvent(name: "minecraft.sound_event.registry", handler: (event: Registry.Sound_event) => void);
declare function onEvent(name: "sound_event.registry", handler: (event: Registry.Sound_event) => void);
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
