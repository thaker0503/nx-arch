import chalk from 'chalk';
import { DoctorResult, PluginContext } from './types.js';

export interface NxArchPlugin {
  name: string;
  scaffold(ctx: PluginContext): Promise<void>;
  generate?(ctx: PluginContext): Promise<void>;
  doctor?(ctx: PluginContext): Promise<DoctorResult[]>;
}

export class PluginManager {
  private readonly plugins: NxArchPlugin[] = [];

  register(plugin: NxArchPlugin): void {
    this.plugins.push(plugin);
  }

  list(): NxArchPlugin[] {
    return [...this.plugins];
  }

  async scaffold(ctx: PluginContext): Promise<void> {
    for (const plugin of this.plugins) {
      console.log(chalk.cyan(`Running ${plugin.name} scaffold...`));
      await plugin.scaffold(ctx);
    }
  }

  async generate(ctx: PluginContext): Promise<void> {
    for (const plugin of this.plugins) {
      if (!plugin.generate) continue;
      await plugin.generate(ctx);
    }
  }

  async doctor(ctx: PluginContext): Promise<DoctorResult[]> {
    const results: DoctorResult[] = [];
    for (const plugin of this.plugins) {
      if (!plugin.doctor) continue;
      results.push(...(await plugin.doctor(ctx)));
    }
    return results;
  }
}
