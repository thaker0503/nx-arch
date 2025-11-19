import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'server-actions',
  async scaffold({ targetDirectory }) {
    console.log('Setting up Next.js server actions in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'Next.js server actions ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
