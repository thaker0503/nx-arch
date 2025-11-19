import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'rest',
  async scaffold({ targetDirectory }) {
    console.log('Setting up REST API scaffolding in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'REST API scaffolding ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
