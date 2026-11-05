import { createHighlighter } from 'shiki';
import { getInstallVariants } from './install';

const LANGUAGES = ['tsx', 'ts', 'css', 'bash', 'md'];
const THEMES = { light: 'github-light-default', dark: 'github-dark-default' };

const highlighter = createHighlighter({ themes: Object.values(THEMES), langs: LANGUAGES });

export type Highlighted = Record<string, string>;

export const highlight = async (code: string, language = 'text') => {
  const instance = await highlighter;
  const lang = LANGUAGES.includes(language) ? language : 'text';

  return instance.codeToHtml(code, { lang, themes: THEMES, defaultColor: false });
};

const FENCE = /^( *)```(\w*)[^\n]*\n([\s\S]*?)\n\1```$/gm;

const readFences = (markdown: string) => [...markdown.matchAll(FENCE)].flatMap(([, indent, language, body]) => {
  const code = body.split('\n').map((line) => line.slice(indent.length)).join('\n');
  const variants = getInstallVariants(code);
  if (variants) return variants.map((variant) => ({ code: variant.code, language: 'bash' }));

  return [{ code, language }];
});

export const highlightAll = async (blocks: { code: string, language: string }[]): Promise<Highlighted> => {
  const entries = await Promise.all(blocks.map(async ({ code, language }) => [code, await highlight(code, language)]));

  return Object.fromEntries(entries);
};

export const highlightMarkdown = (markdown: string) => highlightAll(readFences(markdown));
