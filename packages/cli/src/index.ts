#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import path from 'node:path';
import fs from 'fs-extra';
import chalk from 'chalk';
import {
  TemplateContext,
  generateProject,
  writeConfig,
  detectPackageManager,
  PluginManager,
  applyPreset,
} from '@nx-arch/core';
import type { NxArchPlugin } from '@nx-arch/core';
import restPlugin from '@nx-arch/plugin-rest';
import serverActionsPlugin from '@nx-arch/plugin-server-actions';
import trpcPlugin from '@nx-arch/plugin-trpc';
import graphqlPlugin from '@nx-arch/plugin-graphql';
import websocketPlugin from '@nx-arch/plugin-websocket';
import uiShadcnPlugin from '@nx-arch/plugin-ui-shadcn';
import uiTailwindPlugin from '@nx-arch/plugin-ui-tailwind';
import ormPrismaPlugin from '@nx-arch/plugin-orm-prisma';
import ormDrizzlePlugin from '@nx-arch/plugin-orm-drizzle';

const program = new Command();
program
  .name('create-nx-arch-app')
  .description('Scaffold a new Nx Arch application')
  .version('0.0.0')
  .option('--debug', 'Print additional debug information', false);

program
  .argument('<project-name>', 'Name of the project directory')
  .action(async (projectName) => {
    const options = program.opts<{ debug?: boolean }>();
    if (options.debug) {
      console.log(chalk.gray('Debug mode enabled.'));
    }

    const answers = await prompts([
      {
        type: 'select',
        name: 'frontend',
        message: 'Choose a frontend preset',
        choices: [
          { title: 'Marketing', value: 'marketing' },
          { title: 'Dashboard', value: 'dashboard' },
          { title: 'SaaS', value: 'saas' },
          { title: 'Ecommerce', value: 'ecommerce' },
        ],
        initial: 1,
      },
      {
        type: 'select',
        name: 'api',
        message: 'Choose API architecture',
        choices: [
          { title: 'REST', value: 'rest' },
          { title: 'Server Actions', value: 'server-actions' },
          { title: 'tRPC', value: 'trpc' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'Websocket', value: 'websocket' },
        ],
        initial: 0,
      },
      {
        type: 'select',
        name: 'orm',
        message: 'Choose ORM',
        choices: [
          { title: 'Prisma', value: 'prisma' },
          { title: 'Drizzle', value: 'drizzle' },
          { title: 'None', value: 'none' },
        ],
        initial: 0,
      },
      {
        type: 'select',
        name: 'ui',
        message: 'Choose UI library',
        choices: [
          { title: 'shadcn/ui', value: 'shadcn' },
          { title: 'Tailwind UI', value: 'tailwind' },
          { title: 'Chakra UI', value: 'chakra' },
        ],
        initial: 0,
      },
    ]);

    const targetDirectory = path.resolve(process.cwd(), projectName);
    if (await fs.pathExists(targetDirectory)) {
      console.error(chalk.red(`Directory ${projectName} already exists.`));
      process.exit(1);
    }

    const context: TemplateContext = {
      projectName,
      frontend: answers.frontend,
      api: answers.api,
      orm: answers.orm,
      ui: answers.ui,
    };

    await generateProject({
      targetDirectory,
      templateName: answers.frontend,
      context,
    });

    const config = {
      ...context,
      createdAt: new Date().toISOString(),
    };

    await writeConfig(targetDirectory, config);
    const packageManager = await detectPackageManager(process.cwd());

    const pluginManager = new PluginManager();
    const registeredPlugins: NxArchPlugin[] = loadPluginsForContext(answers);
    applyPreset(pluginManager, registeredPlugins);
    await pluginManager.scaffold({ targetDirectory, config });

    console.log(chalk.green(`\nProject ready at ${targetDirectory}`));
    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    console.log(`  ${packageManager} install`);
  });

program.parseAsync();

const apiPlugins: Record<string, NxArchPlugin> = {
  rest: restPlugin,
  'server-actions': serverActionsPlugin,
  trpc: trpcPlugin,
  graphql: graphqlPlugin,
  websocket: websocketPlugin,
};

const uiPlugins: Record<string, NxArchPlugin> = {
  shadcn: uiShadcnPlugin,
  tailwind: uiTailwindPlugin,
  chakra: uiTailwindPlugin,
};

const ormPlugins: Record<string, NxArchPlugin> = {
  prisma: ormPrismaPlugin,
  drizzle: ormDrizzlePlugin,
};

function loadPluginsForContext(context: TemplateContext): NxArchPlugin[] {
  const plugins: NxArchPlugin[] = [];
  const apiPlugin = apiPlugins[context.api];
  if (apiPlugin) plugins.push(apiPlugin);
  const uiPlugin = uiPlugins[context.ui];
  if (uiPlugin) plugins.push(uiPlugin);
  const ormPlugin = ormPlugins[context.orm];
  if (ormPlugin) plugins.push(ormPlugin);
  return plugins;
}
