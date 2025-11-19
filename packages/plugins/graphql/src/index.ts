import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'graphql',
  async scaffold({ targetDirectory }) {
    console.log('Setting up GraphQL resolvers in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'GraphQL resolvers ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
