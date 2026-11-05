import { Home } from '@/components/Home';
import { countKeyboardTables, getCategories, getKeyboard, getVersion } from '@/lib/content';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getLlmsFullText, getLlmsText } from '@/lib/llms';
import { COMPOSABLE_SNIPPETS } from '@/lib/composable';
import { highlight } from '@/lib/highlight';
import { getPageMetadata } from '@/lib/site';
import FACTS from '@/generated/facts.json';

export const getHomeMetadata = (locale: Locale) => {
  const t = getDictionary(locale).meta;

  return getPageMetadata(locale, '/', t.title, t.description);
};

export const HomeScreen = async () => {
  const categories = getCategories().map(({ name, components }) => ({ name, components: components.map(({ slug, title }) => ({ slug, title, gzip: (FACTS as Record<string, { size: { gzip: number } }>)[slug].size.gzip })) }));

  const llms = getLlmsText();
  const ai = {
    preview: llms.split('\n').slice(0, 12),
    pages: llms.split('\n').filter((line) => line.startsWith('- [')).length,
    size: Buffer.byteLength(getLlmsFullText()),
  };
  const snippets = await Promise.all(COMPOSABLE_SNIPPETS.map(async ({ tsx, css }) => ({ tsx: await highlight(tsx, 'tsx'), css: await highlight(css, 'css') })));
  const keyboard = { en: getKeyboard('listbox', 'en'), ru: getKeyboard('listbox', 'ru') };

  return <Home version={getVersion()} categories={categories} keyboard={keyboard} keyboardCount={countKeyboardTables()} ai={ai} snippets={snippets} />;
};
