import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface TemplateDefinition {
  name: string;
  description: string;
  path: string;
  tags: string[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveTemplatePath(relative: string): string {
  return path.join(__dirname, 'templates', relative);
}

const templateManifest: TemplateDefinition[] = [
  {
    name: 'dashboard',
    description: 'Next.js dashboard starter with REST API wiring',
    path: resolveTemplatePath('dashboard'),
    tags: ['frontend', 'dashboard'],
  },
  {
    name: 'marketing',
    description: 'Marketing site template with hero + CTA blocks',
    path: resolveTemplatePath('marketing'),
    tags: ['frontend', 'marketing'],
  },
];

export function listTemplates(): TemplateDefinition[] {
  return [...templateManifest];
}

export function getTemplateDefinition(name: string): TemplateDefinition {
  const template = templateManifest.find((tpl) => tpl.name === name);
  if (!template) {
    throw new Error(`Unknown template ${name}`);
  }
  return template;
}
