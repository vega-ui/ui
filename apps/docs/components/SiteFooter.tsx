import NextLink from 'next/link';
import { Text } from '@vega-ui/react';
import { getVersion } from '@/lib/content';
import { getDictionary, localize, type Locale } from '@/lib/i18n';
import styles from './SiteFooter.module.css';

export const SiteFooter = ({ locale }: { locale: Locale }) => {
  const t = getDictionary(locale);

  return (
    <footer className={styles.footer}>
      <div className={`site-frame ${styles.inner}`}>
        <div className={styles.brand}>
          <NextLink href={localize(locale, '/')} className={styles.logo}>
            <span className={styles.mark} aria-hidden='true' />
            <Text fontWeight={600}>Vega UI</Text>
          </NextLink>
          <Text className={styles.text}>
            <span className={styles.version}>{`v${getVersion()}`}</span>
            {` · ${t.footer.note}`}
          </Text>
        </div>
        <nav aria-label={t.nav.footer} className={styles.columns}>
          <div className={styles.column}>
            <Text className={styles.heading}>{t.footer.product}</Text>
            <NextLink href={localize(locale, '/docs/getting-started/')} className={styles.link}>{t.nav.docs}</NextLink>
            <NextLink href={localize(locale, '/components/')} className={styles.link}>{t.nav.components}</NextLink>
            <NextLink href={localize(locale, '/templates/')} className={styles.link}>{t.nav.templates}</NextLink>
          </div>
          <div className={styles.column}>
            <Text className={styles.heading}>{t.footer.resources}</Text>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH}/storybook/`} className={styles.link}>{t.nav.storybook}</a>
            <NextLink href={localize(locale, '/changelog/')} className={styles.link}>{t.changelog.title}</NextLink>
          </div>
          <div className={styles.column}>
            <Text className={styles.heading}>{t.footer.community}</Text>
            <a href='https://github.com/vega-ui/ui' className={styles.link}>GitHub</a>
            <a href='https://www.npmjs.com/package/@vega-ui/react' className={styles.link}>npm</a>
          </div>
        </nav>
      </div>
    </footer>
  );
};
