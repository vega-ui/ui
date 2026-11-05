'use client';

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Icon,
  Label,
  Radio,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { Moon, Sun } from '@vega-ui/icons';
import { ACCENTS } from '@/lib/accent';
import { DEFAULT_THEME, previewVars, type Scheme } from '@/lib/theme';
import { useRootAttribute } from '@/hooks/useRootAttribute';
import { HeroShowcase } from './HeroShowcase';
import { useDictionary } from './LocaleProvider';
import styles from './HeroLab.module.css';

const readScheme = (): Scheme => document.documentElement.classList.contains('dark') ? 'dark' : 'light';

interface HeroLabProps {
  intro: ReactNode
  caption: ReactNode
  template: string
}

export const HeroLab = ({ intro, caption, template }: HeroLabProps) => {
  const t = useDictionary();
  const lab = t.home.lab;
  const id = useId();
  const siteAccent = useRootAttribute('data-accent') ?? 'blue';
  const [accent, setAccent] = useState<string | null>(null);
  const [radius, setRadius] = useState(DEFAULT_THEME.radius);
  const [scheme, setScheme] = useState<Scheme>('light');
  const [dir, setDir] = useState('ltr');
  const [inspect, setInspect] = useState(false);

  useEffect(() => {
    setScheme(readScheme());

    const observer = new MutationObserver(() => setScheme(readScheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const chosen = accent ?? siteAccent;
  const tuned = accent !== null || radius !== DEFAULT_THEME.radius;
  const vars = previewVars({ ...DEFAULT_THEME, accent: chosen, radius }, scheme) as CSSProperties;

  return (
    <div className={styles.lab} data-inspect={inspect}>
      {intro}
      <div role='group' aria-label={lab.label} className={styles.panel}>
        <div role='radiogroup' aria-label={lab.accent} className={styles.swatches}>
          {ACCENTS.map((color) => (
            <Radio
              key={color}
              name={`${id}-accent`}
              value={color}
              aria-label={t.colors[color]}
              checked={chosen === color}
              onChange={() => setAccent(color)}
              className={styles.swatch}
              style={{ '--swatch': `var(--color-${color}-accent-500)` } as CSSProperties}
            />
          ))}
        </div>
        <span className={styles.divider} />
        <SegmentedControl size='xs' variant='secondary' name={`${id}-scheme`} role='radiogroup' aria-label={lab.scheme} value={scheme} onChange={(event) => setScheme(event.target.value as Scheme)}>
          <SegmentedControlItem value='light'>
            <SegmentedControlItemInput aria-label={lab.light} />
            <Icon size='xs'><Sun /></Icon>
          </SegmentedControlItem>
          <SegmentedControlItem value='dark'>
            <SegmentedControlItemInput aria-label={lab.dark} />
            <Icon size='xs'><Moon /></Icon>
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <span className={styles.divider} />
        <div className={styles.radius}>
          <Label htmlFor={`${id}-radius`} className={styles.label}>{lab.radius}</Label>
          <Slider size='sm' min={0} max={8} step={2} value={radius} onChangeValue={(value: number) => setRadius(value)} className={styles.slider}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput id={`${id}-radius`} aria-valuetext={`${radius}px`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </div>
        <span className={styles.divider} />
        <SegmentedControl size='xs' variant='secondary' name={`${id}-dir`} role='radiogroup' aria-label={lab.direction} value={dir} onChange={(event) => setDir(event.target.value)}>
          <SegmentedControlItem value='ltr'>
            <SegmentedControlItemInput />
            LTR
          </SegmentedControlItem>
          <SegmentedControlItem value='rtl'>
            <SegmentedControlItemInput />
            RTL
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <span className={styles.divider} />
        <div className={styles.inspect}>
          <Label htmlFor={`${id}-inspect`} className={styles.label}>{lab.inspect}</Label>
          <Switch size='sm'>
            <SwitchInput id={`${id}-inspect`} checked={inspect} onChange={(event) => setInspect(event.currentTarget.checked)} />
            <SwitchIndicator />
          </Switch>
        </div>
      </div>
      <figure className={styles.figure}>
        <span className={styles.star} aria-hidden='true' />
        <HeroShowcase name={template} scheme={scheme} style={vars} tuned={tuned} dir={dir} inspect={inspect} watch={radius} />
        {caption}
      </figure>
    </div>
  );
};
