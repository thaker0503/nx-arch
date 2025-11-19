import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'ui-shadcn',
  async scaffold({ targetDirectory }) {
    console.log('Setting up shadcn/ui component setup in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'shadcn/ui component setup ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
