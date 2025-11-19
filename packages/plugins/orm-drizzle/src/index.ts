import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'orm-drizzle',
  async scaffold({ targetDirectory }) {
    console.log('Setting up Drizzle ORM schema in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'Drizzle ORM schema ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
