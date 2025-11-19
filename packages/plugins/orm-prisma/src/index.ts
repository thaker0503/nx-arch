import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'orm-prisma',
  async scaffold({ targetDirectory }) {
    console.log('Setting up Prisma ORM models in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'Prisma ORM models ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
