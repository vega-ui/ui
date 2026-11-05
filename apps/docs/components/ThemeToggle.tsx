'use client';

import { useEffect, useState } from 'react';
import { Icon, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from '@vega-ui/react';
import { Monitor, Moon, Sun } from '@vega-ui/icons';
import { useDictionary } from './LocaleProvider';

const OPTIONS = [
  { value: 'light', icon: <Sun /> },
  { value: 'dark', icon: <Moon /> },
  { value: 'system', icon: <Monitor /> },
] as const;

const systemTheme = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme: string) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme === 'system' ? systemTheme() : theme);
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  const t = useDictionary();
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ?? 'system');

    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') return;

      setTheme(event.newValue ?? 'system');
    };
    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const choose = (value: string) => {
    setTheme(value);
    applyTheme(value);

    if (value === 'system') {
      localStorage.removeItem('theme');
      return;
    }

    localStorage.setItem('theme', value);
  };

  return (
    <SegmentedControl size='xs' variant='secondary' name='site-theme' role='radiogroup' aria-label={t.theme.label} className={className} value={theme} onChange={(event) => choose(event.target.value)}>
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
