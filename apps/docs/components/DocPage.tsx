import type { ReactNode } from 'react';
import { Heading, Text } from '@vega-ui/react';
import type { TocEntry } from '@/lib/toc';
import { CopyPage } from './CopyPage';
import { Toc } from './Toc';
import styles from './DocPage.module.css';

interface DocPageProps {
  title: string
  description?: string
  actions?: ReactNode
  toc: TocEntry[]
  children: ReactNode
}

export const DocPage = ({ title, description, actions, toc, children }: DocPageProps) => (
  <div className={styles.page}>
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.headline}>
          <Heading as='h1' fontWeight={600} className={styles.title}>{title}</Heading>
          <div className={styles.actions}>
            <CopyPage />
            {actions}
          </div>
        </div>
        {description && <Text className={styles.description}>{description}</Text>}
      </header>
      {children}
    </article>
    <div className={styles.aside}>
      <Toc entries={toc.filter((entry) => entry.depth < 4)} />
    </div>
  </div>
);
