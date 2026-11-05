'use client';

import { useId } from 'react';
import { Icon, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeAi.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const HREFS = ['/llms.txt', '/llms-full.txt', '/components/button/index.md'];

interface HomeAiProps {
  preview: string[]
  pages: number
  size: number
}

export const HomeAi = ({ preview, pages, size }: HomeAiProps) => {
  const locale = useLocale();
  const t = useDictionary().home.ai;
  const megabytes = new Intl.NumberFormat(locale, { style: 'unit', unit: 'megabyte', maximumFractionDigits: 1 }).format(size / 1_000_000);
  const id = useId();

  return (
    <section id='ai' className={`${section.section}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text}</Text>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label='text/markdown'>
        <ul className={styles.list}>
          {t.items.map((item, index) => (
            <li key={item.title}>
              <a href={`${basePath}${HREFS[index]}`} className={styles.item}>
                <span className={styles.name}>
                  {item.title}
                  <Icon size='xs'><ChevronRight /></Icon>
                </span>
                <span className={styles.text}>{item.text.replace('{count}', String(pages)).replace('{size}', megabytes)}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={section.readout}>
          <span className={section.readoutLabel}>{t.readout}</span>
          <pre className={styles.preview}>
            {preview.map((line, index) => <span key={index} className={styles.line}>{line || ' '}</span>)}
          </pre>
        </div>
      </div>
    </section>
  );
};
