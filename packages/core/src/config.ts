import path from 'node:path';
import fs from 'fs-extra';
import { NxArchConfig } from './types.js';

const CONFIG_FILE = '.nxarch.config.json';

export async function loadConfig(root: string): Promise<NxArchConfig | null> {
  const filePath = path.join(root, CONFIG_FILE);
  if (!(await fs.pathExists(filePath))) {
    return null;
  }
  const data = await fs.readJSON(filePath);
  return data as NxArchConfig;
}

export async function writeConfig(root: string, config: NxArchConfig): Promise<void> {
  const filePath = path.join(root, CONFIG_FILE);
  await fs.writeJSON(filePath, config, { spaces: 2 });
}

export { CONFIG_FILE };
