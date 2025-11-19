import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'trpc',
  async scaffold({ targetDirectory }) {
    console.log('Setting up tRPC handlers in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'tRPC handlers ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
