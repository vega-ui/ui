import { Heading, Text } from '@vega-ui/react';
import { TemplateCardsFilter } from '@/components/TemplateCardsFilter';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getPageMetadata, withSiteName } from '@/lib/site';
import { getTemplateCategory, getTemplateComponents, TEMPLATE_CATEGORIES, TEMPLATES } from '@/lib/templates';
import styles from './TemplatesScreen.module.css';

const BASICS = ['button', 'card', 'heading', 'helper-text', 'icon', 'icon-button', 'label', 'separator', 'text', 'visually-hidden'];

export const getTemplatesMetadata = (locale: Locale) => {
  const t = getDictionary(locale).templates;

  return getPageMetadata(locale, '/templates/', withSiteName(t.title), t.description);
};

export const TemplatesScreen = ({ locale }: { locale: Locale }) => {
  const t = getDictionary(locale).templates;
  const templates = TEMPLATES.map((name) => ({
    name,
    ...t.items[name],
    category: getTemplateCategory(name),
    components: getTemplateComponents(name, locale)
      .filter((component) => !BASICS.includes(component.slug))
      .map((component) => component.title),
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Heading as='h1' fontWeight={600} className={styles.title}>{t.title}</Heading>
        <Text className={styles.description}>{t.description}</Text>
      </header>
      <TemplateCardsFilter templates={templates} categories={TEMPLATE_CATEGORIES} />
    </div>
  );
};
