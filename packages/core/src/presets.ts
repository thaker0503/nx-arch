import { PluginManager, NxArchPlugin } from './plugins.js';

export function applyPreset(manager: PluginManager, plugins: NxArchPlugin[]): void {
  plugins.forEach((plugin) => manager.register(plugin));
}

export function applyApiModePlugin(manager: PluginManager, plugin: NxArchPlugin): void {
  manager.register(plugin);
}

export function applyUiPlugin(manager: PluginManager, plugin: NxArchPlugin): void {
  manager.register(plugin);
}

export function applyVerticalPreset(manager: PluginManager, plugins: NxArchPlugin[]): void {
  plugins.forEach((plugin) => manager.register(plugin));
}
