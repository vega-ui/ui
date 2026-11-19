'use client';

import { useEffect, useState } from 'react';
import { Icon, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from '@vega-ui/react';
import { Monitor, Moon, Sun } from '@vega-ui/icons';
import { useTheme } from 'next-themes';
import { useDictionary } from './LocaleProvider';

const OPTIONS = [
  { value: 'light', icon: <Sun /> },
  { value: 'dark', icon: <Moon /> },
  { value: 'system', icon: <Monitor /> },
] as const;

export const ThemeToggle = ({ className }: { className?: string }) => {
  const t = useDictionary();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <SegmentedControl size='xs' variant='secondary' name='site-theme' aria-label={t.theme.label} className={className} value={mounted ? theme : 'system'} onChangeValue={setTheme}>
      {OPTIONS.map((option) => (
        <SegmentedControlItem key={option.value} value={option.value}>
          <SegmentedControlItemInput aria-label={t.theme[option.value]} />
          <Icon size='xs'>{option.icon}</Icon>
        </SegmentedControlItem>
      ))}
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
};
