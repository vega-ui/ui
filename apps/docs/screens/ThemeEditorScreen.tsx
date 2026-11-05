import { Heading, Text } from '@vega-ui/react';
import { ThemeEditor } from '@/components/ThemeEditor';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getPageMetadata, withSiteName } from '@/lib/site';
import styles from './ThemeEditorScreen.module.css';

export const getThemeEditorMetadata = (locale: Locale) => {
  const t = getDictionary(locale).themeEditor;
  const metadata = getPageMetadata(locale, '/docs/theme/', withSiteName(t.title), t.description);

  return { ...metadata, alternates: { ...metadata.alternates, types: undefined } };
};

export const ThemeEditorScreen = ({ locale }: { locale: Locale }) => {
  const t = getDictionary(locale).themeEditor;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Heading as='h1' fontWeight={600} className={styles.title}>{t.title}</Heading>
        <Text className={styles.description}>{t.description}</Text>
      </header>
      <ThemeEditor />
    </div>
  );
};
