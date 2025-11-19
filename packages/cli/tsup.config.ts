import { defineConfig } from 'tsup';

const external = [
  '@nx-arch/core',
  '@nx-arch/plugin-rest',
  '@nx-arch/plugin-server-actions',
  '@nx-arch/plugin-trpc',
  '@nx-arch/plugin-graphql',
  '@nx-arch/plugin-websocket',
  '@nx-arch/plugin-ui-shadcn',
  '@nx-arch/plugin-ui-tailwind',
  '@nx-arch/plugin-orm-prisma',
  '@nx-arch/plugin-orm-drizzle',
];

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2020',
  external,
});
