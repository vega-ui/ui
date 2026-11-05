'use client';

import { useEffect, useRef, useState } from 'react';
import { useDictionary } from './LocaleProvider';
import styles from './Home.module.css';

const SECTIONS = ['platform', 'composable', 'keyboard', 'access', 'world', 'ai', 'templates', 'catalog'] as const;

export const HomeNav = () => {
  const t = useDictionary();
  const [active, setActive] = useState<string>(SECTIONS[0]);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });

    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current]');
    if (!nav || !link) return;

    nav.scrollTo({ left: link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2 });
  }, [active]);

  return (
    <nav ref={navRef} aria-label={t.doc.toc} className={styles.nav}>
      <ol className={styles.navList}>
        {SECTIONS.map((id, index) => (
          <li key={id}>
            <a href={`#${id}`} className={styles.navLink} aria-current={active === id ? 'location' : undefined}>
              <span className={styles.navNumber}>{String(index + 1).padStart(2, '0')}</span>
              {t.home[id].eyebrow}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
