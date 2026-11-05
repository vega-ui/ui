'use client';

import type { CSSProperties } from 'react';
import { SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from '@vega-ui/react';
import { useRootAttribute } from '@/hooks/useRootAttribute';
import { RADII, RADIUS_VALUES } from '@/lib/theme';
import { useDictionary } from './LocaleProvider';
import styles from './RadiusPicker.module.css';

export const RadiusPicker = ({ name = 'radius' }: { name?: string }) => {
  const t = useDictionary();
  const radius = useRootAttribute('data-radius') ?? 'default';

  const choose = (value: string) => {
    document.documentElement.dataset.radius = value;
    localStorage.setItem('radius', value);
  };

  return (
    <SegmentedControl
      size='xs'
      variant='secondary'
      name={name}
      role='radiogroup'
      aria-label={t.settings.radius}
      value={radius}
      onChange={(event) => choose(event.target.value)}
      className={styles.control}
    >
      {RADII.map((step) => (
        <SegmentedControlItem key={step} value={step}>
          <SegmentedControlItemInput aria-label={t.radii[step]} />
          <span className={styles.glyph} style={{ '--glyph-radius': `${RADIUS_VALUES[step] * 1.5}px` } as CSSProperties} />
        </SegmentedControlItem>
      ))}
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
};
