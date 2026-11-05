import NextLink from 'next/link';
import type { ComponentEntry } from '@/lib/content';
import { localize, type Locale } from '@/lib/i18n';
import styles from './ComponentGrid.module.css';

export const ComponentGrid = ({ locale, components }: { locale: Locale, components: ComponentEntry[] }) => (
  <ul className={styles.grid}>
    {components.map((component) => (
      <li key={component.slug}>
        <NextLink href={localize(locale, `/components/${component.slug}/`)} title={component.summary} className={styles.link}>
          {component.title}
        </NextLink>
      </li>
    ))}
  </ul>
);
