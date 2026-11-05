import NextLink from 'next/link';
import { Badge, Text } from '@vega-ui/react';
import { getVersion } from '@/lib/content';
import { localize, type Locale } from '@/lib/i18n';
import { AppearanceMenu } from './AppearanceMenu';
import { GitHubLink } from './GitHubLink';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';
import { LanguageSwitch } from './LanguageSwitch';
import { Search } from './Search';
import styles from './SiteHeader.module.css';

export const SiteHeader = ({ locale }: { locale: Locale }) => {
  const version = getVersion();

  return (
    <header className={styles.header}>
      <div className={`site-frame ${styles.inner}`}>
        <NextLink href={localize(locale, '/')} className={styles.logo}>
          <span className={styles.mark} aria-hidden='true' />
          <Text fontWeight={600} className={styles.name}>Vega UI</Text>
        </NextLink>
        <NextLink href={localize(locale, `/changelog/#v${version.replace(/\./g, '-')}`)} className={styles.version}>
          <Badge size='xs' variant='info' appearance='ghost'>{`v${version}`}</Badge>
        </NextLink>
        <HeaderNav className={styles.nav} />
        <div className={styles.tools}>
          <Search />
          <LanguageSwitch />
          <GitHubLink className={styles.github} />
          <AppearanceMenu />
          <HeaderMenu className={styles.menu} />
        </div>
      </div>
    </header>
  );
};
