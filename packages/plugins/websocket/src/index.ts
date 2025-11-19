import { NxArchPlugin } from '@nx-arch/core';

const plugin: NxArchPlugin = {
  name: 'websocket',
  async scaffold({ targetDirectory }) {
    console.log('Setting up Websocket gateways in', targetDirectory);
  },
  async doctor() {
    return [
      {
        description: 'Websocket gateways ready',
        level: 'info',
      },
    ];
  },
};

export default plugin;
