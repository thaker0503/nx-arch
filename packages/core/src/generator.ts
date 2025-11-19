import fs from 'fs-extra';
import path from 'node:path';
import chalk from 'chalk';
import { GeneratorOptions } from './types.js';
import { loadTemplate, writeTemplateFile } from './templates.js';

export async function generateProject(options: GeneratorOptions): Promise<void> {
  const template = await loadTemplate(options.templateName);
  await fs.ensureDir(options.targetDirectory);
  for (const file of template.files) {
    await writeTemplateFile(file, options.targetDirectory, options.context);
  }
  const relativeTemplateDir = path.relative(process.cwd(), template.definition.path);
  console.log(
    chalk.green(
      `Scaffolded ${template.definition.name} template (source: ${relativeTemplateDir || '.'})`,
    ),
  );
}
