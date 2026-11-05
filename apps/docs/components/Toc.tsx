'use client';

import { useEffect, useState } from 'react';
import { Text } from '@vega-ui/react';
import type { TocEntry } from '@/lib/toc';
import { useDictionary } from './LocaleProvider';
import styles from './Toc.module.css';

export const Toc = ({ entries }: { entries: TocEntry[] }) => {
  const t = useDictionary();
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver((records) => {
      const visible = records.find((record) => record.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-80px 0px -70% 0px' });

    for (const entry of entries) {
      const heading = document.getElementById(entry.id);
      if (heading) observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-labelledby='toc-title' className={styles.toc}>
      <Text id='toc-title' fontWeight={500} className={styles.title}>{t.doc.toc}</Text>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={styles.link}
              data-depth={entry.depth}
              aria-current={entry.id === active ? 'location' : undefined}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
