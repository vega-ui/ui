'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer, DrawerContent, DrawerTrigger, Icon, IconButton, Text } from '@vega-ui/react';
import { PanelLeft } from '@vega-ui/icons';
import { useDictionary } from './LocaleProvider';
import { Sidebar, type SidebarSection } from './Sidebar';
import styles from './MobileNav.module.css';

export const MobileNav = ({ sections }: { sections: SidebarSection[] }) => {
  const pathname = usePathname();
  const t = useDictionary();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={styles.bar}>
      <Drawer position='start' open={open} onChangeOpen={setOpen}>
        <DrawerTrigger asChild>
          <IconButton size='sm' variant='secondary' appearance='transparent' aria-label={t.sidebar.open}>
            <Icon><PanelLeft /></Icon>
          </IconButton>
        </DrawerTrigger>
        <DrawerContent aria-label={t.sidebar.drawer} className={styles.drawer}>
          <Sidebar sections={sections} />
        </DrawerContent>
      </Drawer>
      <Text className={styles.label}>{t.sidebar.label}</Text>
    </div>
  );
};
