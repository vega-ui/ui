'use client';

import NextLink from 'next/link';
import { Heading, Text } from '@vega-ui/react';
import { localize } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import { TemplateThumbnail } from './TemplateThumbnail';
import styles from './TemplateCards.module.css';

export interface TemplateCardEntry {
  name: string
  title: string
  description: string
  components?: string[]
}

export const TemplateCards = ({ templates, headingLevel = 'h2' }: { templates: TemplateCardEntry[], headingLevel?: 'h2' | 'h3' }) => {
  const locale = useLocale();

  return (
    <ul className={styles.grid}>
      {templates.map((template) => (
        <li key={template.name} className={styles.card}>
          <TemplateThumbnail name={template.name} />
          <div className={styles.body}>
            <Heading as={headingLevel} fontWeight={600} className={styles.title}>
              <NextLink href={localize(locale, `/templates/${template.name}/`)} className={styles.link}>{template.title}</NextLink>
            </Heading>
            <Text className={styles.description}>{template.description}</Text>
            {template.components && <Text className={styles.components}>{template.components.join(' · ')}</Text>}
          </div>
        </li>
      ))}
    </ul>
  );
};
