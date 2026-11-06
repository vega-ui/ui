import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { Text } from '@vega-ui/react';
import { ComponentFacts, type ComponentFactsData } from '@/components/ComponentFacts';
import { ComponentTabs } from '@/components/ComponentTabs';
import { DocPage } from '@/components/DocPage';
import { Markdown } from '@/components/Markdown';
import { PageFooter } from '@/components/PageFooter';
import { ResourceLinks } from '@/components/ResourceLinks';
import { Workbench } from '@/components/Workbench';
import { getCategories, getComponentPage, getComponents, getKeyboard, getKeyboardExample, type KeyboardRow, type PropRow } from '@/lib/content';
import { codeKey } from '@/lib/code';
import { getHighlightStyles, highlightMarkdown, highlightPreview } from '@/lib/highlight';
import { getDictionary, localize, type Locale } from '@/lib/i18n';
import { getPreviewSource } from '@/lib/previewSource';
import { getPageMetadata, withSiteName } from '@/lib/site';
import type { VariableRow } from '@/lib/cssVars';
import { getView } from '@/lib/views';
import { getToc } from '@/lib/toc';
import FACTS from '@/generated/facts.json';
import styles from './ComponentScreen.module.css';

export interface ComponentParams {
  slug: string
  page?: string[]
}

export const getComponentParams = (): ComponentParams[] => getComponents().flatMap((component) => [...new Set([...component.pages, ...component.files])].map((page) => ({
  slug: component.slug,
  page: page === 'index' ? [] : [page],
})));

export const getComponentMetadata = async (locale: Locale, params: Promise<ComponentParams>) => {
  const { slug, page } = await params;
  const t = getDictionary(locale);
  const component = getComponents(locale).find((entry) => entry.slug === slug);
  const name = page?.[0] && component?.pages.includes(page[0]) ? page[0] : undefined;

  if (!component) return {};

  const path = `/components/${slug}/${name ? `${name}/` : ''}`;
  const image = `/components/${slug}/og.png`;

  if (!name) return getPageMetadata(locale, path, withSiteName(component.title), component.summary, image);

  const title = t.meta.componentPage.replace('{component}', component.title).replace('{page}', t.pages[name]);
  const description = t.meta.pages[name].replace('{component}', component.title);

  return getPageMetadata(locale, path, withSiteName(title), description, image);
};

const PROPS_TABLE = /^\| (?:Prop \| Type \| Default \| Required \| (?:Description|Notes)|Проп \| Тип \| По умолчанию \| Обязательный \| (?:Описание|Примечания)) \|\n\| --- \| --- \| --- \| --- \| --- \|\n((?:\|.*\n?)+)/gm;

const toPropRow = (line: string): PropRow => {
  const [name, type, value, required, description] = line.slice(2, -2).split(/ (?<!\\)\| /).map((cell) => cell.replaceAll('\\|', '|'));

  return { name, type, value, required: required === 'Yes' || required === 'Да', description };
};

const withProps = (source: string) => source.replace(PROPS_TABLE, (_, body: string) => `\`\`\`props\n${JSON.stringify(body.trim().split('\n').map(toPropRow))}\n\`\`\`\n`);

const VARIABLES_TABLE = /^\| (?:Variable \| (?:Used By \| )?Purpose|Переменная \| (?:Где используется \| )?Назначение) \|\n\|(?: --- \|){2,3}\n((?:\|.*\n?)+)/m;

const toVariableRow = (line: string): VariableRow => {
  const cells = line.slice(2, -2).split(/ (?<!\\)\| /).map((cell) => cell.replaceAll('\\|', '|'));
  const [name, usedBy, purpose] = cells.length === 2 ? [cells[0], '', cells[1]] : cells;

  return { name: name.replaceAll('`', ''), usedBy, purpose };
};

const withVariables = (source: string) => source.replace(VARIABLES_TABLE, (_, body: string) => `\`\`\`cssvars\n${JSON.stringify(body.trim().split('\n').map(toVariableRow))}\n\`\`\`\n`);

const KEYBOARD_TABLE = /^\| .+ \|\n\| --- \| --- \|\n(?:\| <kbd>.*\n?)+/m;

const withInspector = (source: string, rows: KeyboardRow[], example?: string) => {
  const fence = `\`\`\`a11y${example ? ` example=${example}` : ''}\n${JSON.stringify(rows)}\n\`\`\`\n`;
  if (KEYBOARD_TABLE.test(source)) return source.replace(KEYBOARD_TABLE, fence);

  return `${fence}\n${source}`;
};

export const ComponentScreen = async ({ locale, params }: { locale: Locale, params: Promise<ComponentParams> }) => {
  const { slug, page } = await params;
  const t = getDictionary(locale);
  const component = getCategories(locale).flatMap((category) => category.components).find((entry) => entry.slug === slug);
  const current = page?.[0] ?? 'index';

  if (!component) notFound();
  if (!component.pages.includes(current)) {
    if (!component.files.includes(current)) notFound();

    const view = getView(current);
    const target = localize(locale, `/components/${slug}/${view === 'index' ? '' : `${view}/`}#${current}`);

    return (
      <>
        <meta httpEquiv='refresh' content={`0; url=${process.env.NEXT_PUBLIC_BASE_PATH}${target}`} />
        <NextLink href={target}>{`${component.title} · ${t.pages[current]}`}</NextLink>
      </>
    );
  }

  const { source: markdown, translated, files } = getComponentPage(slug, current, locale);
  const sources: Record<string, string> = {
    accessibility: withInspector(markdown, getKeyboard(slug, locale), getKeyboardExample(slug)),
    styling: withVariables(markdown),
  };
  const source = sources[current] ?? withProps(markdown);
  const previewCode = getPreviewSource(slug) ?? undefined;
  const toc = getToc(source, getComponentPage(slug, current, 'en').source);
  const facts = current === 'index' ? (FACTS as Record<string, ComponentFactsData>)[slug] : undefined;
  const previewHtml = current === 'index' && previewCode ? await highlightPreview(previewCode, 'tsx') : undefined;
  const highlighted = await highlightMarkdown(source);
  const highlightStyles = getHighlightStyles([previewHtml ?? '', ...Object.values(highlighted)]);

  return (
    <DocPage
      title={component.title}
      description={component.summary}
      toc={toc}
    >
      <style href={`code-highlight-${codeKey(highlightStyles)}`} precedence='default'>{highlightStyles}</style>
      <ResourceLinks component={component} />
      {current === 'index' && <Workbench slug={slug} code={previewCode} html={previewHtml} />}
      {facts && <ComponentFacts facts={facts} />}
      <ComponentTabs
        label={`${component.title} ${t.doc.documentation}`}
        tabs={component.pages.map((name) => ({
          href: localize(locale, `/components/${slug}/${name === 'index' ? '' : `${name}/`}`),
          label: t.pages[name],
          current: name === current,
        }))}
      />
      {!translated && <Text size={2} className={styles.untranslated}>{t.doc.untranslated}</Text>}
      <div lang={translated ? undefined : 'en'}>
        <Markdown source={source} slug={slug} headings={toc} highlighted={highlighted} />
      </div>
      <PageFooter locale={locale} path={files[0].path} parts={files} />
    </DocPage>
  );
};
