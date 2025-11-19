import fs from 'fs-extra';
import path from 'node:path';
import { DoctorResult, NxArchConfig } from './types.js';
import { availableTemplates } from './templates.js';

export async function doctor(config: NxArchConfig, cwd: string): Promise<DoctorResult[]> {
  const results: DoctorResult[] = [];
  const templateExists = availableTemplates().some((tpl) => tpl.name === config.frontend);
  if (!templateExists) {
    results.push({
      description: `Template ${config.frontend} is not installed`,
      level: 'warn',
      suggestion: 'Reinstall @nx-arch/templates package.',
    });
  }

  const configPath = path.join(cwd, '.nxarch.config.json');
  if (!(await fs.pathExists(configPath))) {
    results.push({
      description: 'Missing .nxarch.config.json',
      level: 'error',
      suggestion: 'Run `nxarch doctor --fix` to rewrite the config file.',
    });
  }

  return results;
}
