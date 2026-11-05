'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Button, Icon, IconButton, Popover, PopoverContent, PopoverTrigger, Text } from '@vega-ui/react';
import { ChevronRight, Palette } from '@vega-ui/icons';
import { useRootAttribute } from '@/hooks/useRootAttribute';
import { localize } from '@/lib/i18n';
import { AccentPicker } from './AccentPicker';
import { RadiusPicker } from './RadiusPicker';
import { ThemeToggle } from './ThemeToggle';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './AppearanceMenu.module.css';

export const AppearanceMenu = () => {
  const t = useDictionary();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const radius = useRootAttribute('data-radius') ?? 'default';

  return (
    <Popover role='dialog' placement='bottom-end' open={open} onChangeOpen={setOpen}>
      <PopoverTrigger asChild>
        <IconButton size='xs' variant='secondary' appearance='transparent' aria-label={t.settings.open}>
          <Icon size='xs'><Palette /></Icon>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent aria-label={t.settings.open}>
        <div className={styles.panel}>
          <div className={styles.section}>
            <Text size={2} fontWeight={500}>{t.settings.theme}</Text>
            <ThemeToggle className={styles.theme} />
          </div>
          <div className={styles.section}>
            <Text size={2} fontWeight={500}>{t.settings.accent}</Text>
            <AccentPicker name='menu-accent' />
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <Text size={2} fontWeight={500}>{t.settings.radius}</Text>
              <Text size={2} className={styles.value}>{t.radii[radius]}</Text>
            </div>
            <RadiusPicker name='menu-radius' />
          </div>
          <Button asChild size='xs' variant='secondary' appearance='ghost' className={styles.editor}>
            <NextLink href={localize(locale, '/docs/theme/')} onClick={() => setOpen(false)}>
              {t.settings.editor}
              <Icon size='xs' className={styles.chevron}><ChevronRight /></Icon>
            </NextLink>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
