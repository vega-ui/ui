import { Heading } from '@vega-ui/react';
import { ComponentGrid } from '@/components/ComponentGrid';
import { DocPage } from '@/components/DocPage';
import { getCategories } from '@/lib/content';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getPageMetadata, withSiteName } from '@/lib/site';
import { toId } from '@/lib/toc';
import styles from './ComponentsScreen.module.css';

export const getComponentsMetadata = (locale: Locale) => {
  const t = getDictionary(locale).components;

  return getPageMetadata(locale, '/components/', withSiteName(t.title), t.description);
};

export const ComponentsScreen = ({ locale }: { locale: Locale }) => {
  const t = getDictionary(locale);
  const categories = getCategories(locale).map((category) => ({ ...category, title: t.categories[category.name] ?? category.name }));
  const toc = categories.map((category) => ({ id: toId(category.name), title: category.title, depth: 2 }));

  return (
    <DocPage title={t.components.title} description={t.components.description} toc={toc}>
      {categories.map((category) => (
        <section key={category.name} className={styles.category} aria-labelledby={toId(category.name)}>
          <Heading as='h2' id={toId(category.name)} size={5} fontWeight={600} className={styles.heading}>{category.title}</Heading>
          <ComponentGrid locale={locale} components={category.components} />
        </section>
      ))}
    </DocPage>
  );
};
