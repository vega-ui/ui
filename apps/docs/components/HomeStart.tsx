'use client';

import { useId } from 'react';
import NextLink from 'next/link';
import { Button, Heading, Icon, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { CopyButton } from './CodeBlock';
import { useDictionary, useLocale } from './LocaleProvider';
import section from './HomeSection.module.css';
import styles from './HomeStart.module.css';

const INSTALL = 'pnpm add @vega-ui/react @vega-ui/theme-core @vega-ui/icons';

export const HomeStart = () => {
  const locale = useLocale();
  const t = useDictionary().home.finale;
  const id = useId();

  return (
    <section className='site-frame' aria-labelledby={`${id}-title`}>
      <div className={`${section.frame} ${styles.tile}`}>
        <Heading id={`${id}-title`} as='h2' fontWeight={700} className={styles.title}>{t.title}</Heading>
        <Text className={styles.text}>{t.text}</Text>
        <div className={styles.command}>
          <code className={styles.code}>{INSTALL}</code>
          <CopyButton code={INSTALL} />
        </div>
        <div className={styles.actions}>
          <Button asChild size='md' className={styles.pill}>
            <NextLink href={localize(locale, '/docs/getting-started/')}>{t.docs}</NextLink>
          </Button>
          <Button asChild size='md' appearance='transparent' className={styles.pill}>
            <NextLink href={localize(locale, '/templates/')}>
              {t.templates}
              <Icon size='xs'><ChevronRight /></Icon>
            </NextLink>
          </Button>
        </div>
      </div>
    </section>
  );
};
