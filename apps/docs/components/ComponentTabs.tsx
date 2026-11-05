'use client';

import { useEffect, useRef } from 'react';
import NextLink from 'next/link';
import styles from './ComponentTabs.module.css';

interface ComponentTabsProps {
  label: string
  tabs: { href: string, label: string, current: boolean }[]
}

export const ComponentTabs = ({ label, tabs }: ComponentTabsProps) => {
  const ref = useRef<HTMLElement>(null);
  const current = tabs.find((tab) => tab.current)?.href;

  useEffect(() => {
    const nav = ref.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;

    const start = active.offsetLeft - nav.scrollLeft;
    if (start >= 0 && start + active.offsetWidth <= nav.clientWidth) return;

    nav.scrollLeft = active.offsetLeft + active.offsetWidth / 2 - nav.clientWidth / 2;
  }, [current]);

  return (
    <div className={styles.frame}>
      <nav ref={ref} aria-label={label} className={styles.tabs}>
        {tabs.map((tab) => (
          <NextLink key={tab.href} href={tab.href} className={styles.tab} aria-current={tab.current ? 'page' : undefined}>
            {tab.label}
          </NextLink>
        ))}
      </nav>
    </div>
  );
};
