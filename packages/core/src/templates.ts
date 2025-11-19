import path from 'node:path';
import fs from 'fs-extra';
import { globby } from 'globby';
import {
  getTemplateDefinition,
  listTemplates,
  TemplateDefinition,
} from '@nx-arch/templates';
import { TemplateContext } from './types.js';

export interface LoadedTemplateFile {
  relativePath: string;
  absolutePath: string;
}

export interface LoadedTemplate {
  definition: TemplateDefinition;
  files: LoadedTemplateFile[];
}

export function availableTemplates(): TemplateDefinition[] {
  return listTemplates();
}

export async function loadTemplate(templateName: string): Promise<LoadedTemplate> {
  const definition = getTemplateDefinition(templateName);
  const files = await globby('**/*', {
    cwd: definition.path,
    dot: true,
    onlyFiles: true,
  });

  return {
    definition,
    files: files.map((relativePath) => ({
      relativePath,
      absolutePath: path.join(definition.path, relativePath),
    })),
  };
}

const TOKEN_PATTERN = /{{\s*(\w+)\s*}}/g;

export async function writeTemplateFile(
  source: LoadedTemplateFile,
  targetDirectory: string,
  context: TemplateContext,
): Promise<void> {
  const targetPath = path.join(targetDirectory, source.relativePath.replace(/\.hbs$/, ''));
  await fs.ensureDir(path.dirname(targetPath));
  const fileContent = await fs.readFile(source.absolutePath, 'utf8');
  const rendered = fileContent.replace(TOKEN_PATTERN, (_, token: keyof TemplateContext) => {
    return context[token] ?? '';
  });
  await fs.writeFile(targetPath, rendered, 'utf8');
}
