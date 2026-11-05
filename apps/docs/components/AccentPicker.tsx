'use client';

import type { CSSProperties } from 'react';
import { Radio } from '@vega-ui/react';
import { useRootAttribute } from '@/hooks/useRootAttribute';
import { ACCENTS } from '@/lib/accent';
import { useDictionary } from './LocaleProvider';
import styles from './AccentPicker.module.css';

export const AccentPicker = ({ name = 'accent' }: { name?: string }) => {
  const t = useDictionary();
  const accent = useRootAttribute('data-accent') ?? 'blue';

  const choose = (color: string) => {
    document.documentElement.dataset.accent = color;
    localStorage.setItem('accent', color);
  };

  return (
    <div role='radiogroup' aria-label={t.settings.accent} className={styles.picker}>
      {ACCENTS.map((color) => (
        <Radio
          key={color}
          name={name}
          value={color}
          aria-label={t.colors[color]}
          checked={accent === color}
          onChange={() => choose(color)}
          className={styles.swatch}
          style={{ '--swatch': `var(--color-${color}-accent-500)` } as CSSProperties}
        />
      ))}
    </div>
  );
};
