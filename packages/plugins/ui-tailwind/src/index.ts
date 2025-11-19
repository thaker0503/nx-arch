import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'ui-tailwind',
  async scaffold({ targetDirectory }) {
    console.log('Setting up Tailwind UI starter in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'Tailwind UI starter ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
