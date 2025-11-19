export type FrontendPreset = 'marketing' | 'dashboard' | 'saas' | 'ecommerce';
export type ApiArchitecture = 'rest' | 'server-actions' | 'trpc' | 'graphql' | 'websocket';
export type OrmOption = 'prisma' | 'drizzle' | 'none';
export type UiLibrary = 'shadcn' | 'tailwind' | 'chakra';

export interface NxArchConfig {
  projectName: string;
  frontend: FrontendPreset;
  api: ApiArchitecture;
  orm: OrmOption;
  ui: UiLibrary;
  createdAt: string;
}

export interface TemplateContext {
  projectName: string;
  frontend: FrontendPreset;
  api: ApiArchitecture;
  orm: OrmOption;
  ui: UiLibrary;
}

export interface GeneratorOptions {
  targetDirectory: string;
  templateName: FrontendPreset;
  context: TemplateContext;
}

export interface PluginContext {
  targetDirectory: string;
  config: NxArchConfig;
}

export interface DoctorResult {
  description: string;
  level: 'info' | 'warn' | 'error';
  suggestion?: string;
}
