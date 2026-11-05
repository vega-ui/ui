import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { Heading, Text } from '@vega-ui/react';
import { ChevronLeft } from '@vega-ui/icons';
import { CodeBlock } from '@/components/CodeBlock';
import { TemplatePreview } from '@/components/TemplatePreview';
import { highlight } from '@/lib/highlight';
import { getDictionary, localize, type Locale } from '@/lib/i18n';
import { getPageMetadata, withSiteName } from '@/lib/site';
import { getTemplateComponents, getTemplateSource, TEMPLATES } from '@/lib/templates';
import styles from './TemplatesScreen.module.css';

export interface TemplateParams {
  name: string
}

export const getTemplateParams = (): TemplateParams[] => TEMPLATES.map((name) => ({ name }));

export const getTemplateMetadata = async (locale: Locale, params: Promise<TemplateParams>) => {
  const { name } = await params;
  const template = getDictionary(locale).templates.items[name];

  if (!template) return {};

  return getPageMetadata(locale, `/templates/${name}/`, withSiteName(template.title), template.description);
};

export const TemplateScreen = async ({ locale, params }: { locale: Locale, params: Promise<TemplateParams> }) => {
  const { name } = await params;
  const t = getDictionary(locale).templates;
  const template = t.items[name];

  if (!template) notFound();

  const code = getTemplateSource(name);
  const components = getTemplateComponents(name, locale);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <NextLink href={localize(locale, '/templates/')} className={styles.back}>
          <ChevronLeft size={16} aria-hidden='true' />
          {t.all}
        </NextLink>
        <Heading as='h1' fontWeight={600} className={styles.title}>{template.title}</Heading>
        <Text className={styles.description}>{template.description}</Text>
      </header>

      <TemplatePreview name={name} />

      <section className={styles.section} aria-labelledby='template-code'>
        <div>
          <Heading as='h2' id='template-code' fontWeight={600} className={styles.sectionTitle}>{t.code}</Heading>
          <Text className={styles.file}>{`docs/examples/templates/${name}.tsx`}</Text>
        </div>
        <div className={styles.code}>
          <CodeBlock code={code} html={await highlight(code, 'tsx')} />
        </div>
      </section>

      <section className={styles.section} aria-labelledby='template-components'>
        <Heading as='h2' id='template-components' fontWeight={600} className={styles.sectionTitle}>{t.componentsUsed}</Heading>
        <ul className={styles.chips}>
          {components.map((component) => (
            <li key={component.slug}>
              <NextLink href={localize(locale, `/components/${component.slug}/`)} className={styles.chip}>{component.title}</NextLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
