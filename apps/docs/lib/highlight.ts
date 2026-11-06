import { createHighlighter } from 'shiki';
import { transformerStyleToClass } from '@shikijs/transformers';
import { codeKey, isPartial, PREVIEW_LINES } from './code';
import { getInstallVariants } from './install';

const LANGUAGES = ['tsx', 'ts', 'css', 'bash', 'md'];
const THEMES = { light: 'github-light-default', dark: 'github-dark-default' };

const highlighter = createHighlighter({ themes: Object.values(THEMES), langs: LANGUAGES });
const toClass = transformerStyleToClass({ classPrefix: 'k' });

export type Highlighted = Record<string, string>;

interface Fence {
  code: string
  language: string
  example?: boolean
}

export const highlight = async (code: string, language = 'text') => {
  const instance = await highlighter;
  const lang = LANGUAGES.includes(language) ? language : 'text';

  return instance.codeToHtml(code, { lang, themes: THEMES, defaultColor: false, transformers: [toClass] });
};

export const highlightPreview = async (code: string, language?: string) => {
  const html = await highlight(code, language);
  if (!isPartial(code)) return html;

  return `${html.split('\n').slice(0, PREVIEW_LINES).join('\n')}</code></pre>`;
};

const toRule = ([name, style]: [string, Record<string, string> | string]) => {
  const declarations = typeof style === 'string' ? style : Object.entries(style).map(([property, value]) => `${property}:${value}`).join(';');

  return `.${name}{${declarations}}`;
};

export const getHighlightStyles = (html: string[]) => {
  const markup = html.join('');

  return [...toClass.getClassRegistry()].filter(([name]) => markup.includes(name)).map(toRule).join('');
};

const FENCE = /^( *)```(\w*)([^\n]*)\n([\s\S]*?)\n\1```$/gm;

const readFences = (markdown: string): Fence[] => [...markdown.matchAll(FENCE)].flatMap(([, indent, language, meta, body]) => {
  const code = body.split('\n').map((line) => line.slice(indent.length)).join('\n');
  const variants = getInstallVariants(code);
  if (variants) return variants.map((variant) => ({ code: variant.code, language: 'bash' }));

  const file = meta.match(/\bexample=(\S+)/)?.[1];

  return [{ code, language, example: Boolean(file?.endsWith('.tsx') && /^export default /m.test(code)) }];
});

export const readExamples = (markdown: string) => readFences(markdown).filter((fence) => fence.example);

export const highlightAll = async (blocks: Fence[]): Promise<Highlighted> => {
  const entries = await Promise.all(blocks.map(async ({ code, language, example }) => [codeKey(code), example ? await highlightPreview(code, language) : await highlight(code, language)]));

  return Object.fromEntries(entries);
};

export const highlightMarkdown = (markdown: string) => highlightAll(readFences(markdown));
