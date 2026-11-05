'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon, IconButton, Sheet, SheetContent, SheetHandle, SheetTrigger } from '@vega-ui/react';
import { Menu } from '@vega-ui/icons';
import { HeaderNav } from './HeaderNav';
import { useDictionary } from './LocaleProvider';
import styles from './HeaderMenu.module.css';

export const HeaderMenu = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const t = useDictionary();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onChangeOpen={setOpen}>
      <SheetTrigger asChild>
        <IconButton size='xs' variant='secondary' appearance='transparent' aria-label={t.nav.menu} className={className}>
          <Icon size='xs'><Menu /></Icon>
        </IconButton>
      </SheetTrigger>
      <SheetContent aria-label={t.nav.sheet} className={styles.sheet}>
        <SheetHandle aria-label={t.nav.handle} />
        <HeaderNav className={styles.nav} />
      </SheetContent>
    </Sheet>
  );
};
