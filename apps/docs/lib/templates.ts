import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getComponents } from './content';
import { getDictionary, type Locale } from './i18n';

export const TEMPLATES = Object.keys(getDictionary('en').templates.items);

export const TEMPLATE_CATEGORIES = ['account', 'commerce', 'data', 'communication', 'scheduling', 'support', 'auth', 'marketing', 'forms', 'productivity'];

const CATEGORY_BY_TEMPLATE: Record<string, string> = {
  'account-settings': 'account',
  'team-members': 'account',
  billing: 'account',
  checkout: 'commerce',
  'product-page': 'commerce',
  orders: 'data',
  analytics: 'data',
  inbox: 'communication',
  chat: 'communication',
  booking: 'scheduling',
  availability: 'scheduling',
  'event-scheduling': 'scheduling',
  'help-center': 'support',
  onboarding: 'auth',
  'sign-in': 'auth',
  pricing: 'marketing',
  survey: 'forms',
  'travel-search': 'commerce',
  'command-palette': 'productivity',
  'task-board': 'productivity',
  'file-manager': 'productivity',
  notifications: 'communication',
  security: 'account',
};

export const getTemplateCategory = (name: string): string | undefined => CATEGORY_BY_TEMPLATE[name];

const toPascalCase = (slug: string) => slug.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');

export const getTemplateSource = (name: string) => readFileSync(join(process.cwd(), '../../docs/examples/templates', `${name}.tsx`), 'utf8');

export const getTemplateComponents = (name: string, locale: Locale = 'en') => {
  const imports = getTemplateSource(name).match(/import \{([^}]+)\} from '@vega-ui\/react';/)?.[1] ?? '';
  const names = imports.split(',').map((entry) => entry.trim()).filter((entry) => entry !== '' && !entry.startsWith('type '));
  const components = getComponents(locale).map((component) => ({ ...component, pascal: toPascalCase(component.slug) }));

  const findComponent = (exported: string) => components
    .filter((component) => exported.startsWith(component.pascal))
    .sort((a, b) => b.pascal.length - a.pascal.length)[0];

  const used = new Set(names.map(findComponent).filter((component) => component !== undefined));

  return [...used]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((component) => ({ slug: component.slug, title: component.title }));
};
