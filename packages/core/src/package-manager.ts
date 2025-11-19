import path from 'node:path';
import fs from 'fs-extra';

export type PackageManager = 'pnpm' | 'yarn' | 'npm';

const LOCK_FILES: Record<PackageManager, string> = {
  pnpm: 'pnpm-lock.yaml',
  yarn: 'yarn.lock',
  npm: 'package-lock.json',
};

export async function detectPackageManager(root: string): Promise<PackageManager> {
  for (const [manager, file] of Object.entries(LOCK_FILES)) {
    if (await fs.pathExists(path.join(root, file))) {
      return manager as PackageManager;
    }
  }
  return 'pnpm';
}
