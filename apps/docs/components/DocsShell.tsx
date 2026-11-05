import type { ReactNode } from 'react';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getSidebar } from '@/lib/navigation';
import { MobileNav } from './MobileNav';
import { Shortcuts } from './Shortcuts';
import { Sidebar } from './Sidebar';
import styles from './DocsShell.module.css';

export const DocsShell = ({ locale, children }: { locale: Locale, children: ReactNode }) => (
  <div className={`site-panel ${styles.panel}`}>
    <div className={`site-frame ${styles.shell}`}>
      <aside aria-label={getDictionary(locale).sidebar.drawer} className={styles.aside}>
        <Sidebar sections={getSidebar(locale)} />
      </aside>
      <main id='content' tabIndex={-1} className={styles.main}>
        <MobileNav sections={getSidebar(locale)} />
        {children}
      </main>
    </div>
    <Shortcuts />
  </div>
);
