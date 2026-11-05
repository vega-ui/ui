'use client';

import { useEffect, useState } from 'react';
import { Icon, IconButton, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from '@vega-ui/react';
import { Monitor, Moon, RotateCcw, Smartphone, Sun, Tablet } from '@vega-ui/icons';
import { EXAMPLES } from '@/generated/examples';
import { useDictionary } from './LocaleProvider';
import styles from './TemplatePreview.module.css';

const readTheme = () => document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export const TemplatePreview = ({ name }: { name: string }) => {
  const t = useDictionary().templates;
  const Template = EXAMPLES[`templates/${name}.tsx`];
  const [theme, setTheme] = useState('light');
  const [dir, setDir] = useState('ltr');
  const [viewport, setViewport] = useState('desktop');
  const [run, setRun] = useState(0);

  useEffect(() => {
    setTheme(readTheme());

    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  if (!Template) return null;

  return (
    <div role='group' aria-label={t.preview} className={styles.preview}>
      <div className={styles.toolbar}>
        <SegmentedControl size='xs' variant='secondary' name={`${name}-theme`} role='radiogroup' aria-label={t.theme} value={theme} onChange={(event) => setTheme(event.target.value)}>
          <SegmentedControlItem value='light'>
            <SegmentedControlItemInput aria-label={t.light} />
            <Icon size='xs'><Sun /></Icon>
          </SegmentedControlItem>
          <SegmentedControlItem value='dark'>
            <SegmentedControlItemInput aria-label={t.dark} />
            <Icon size='xs'><Moon /></Icon>
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <SegmentedControl size='xs' variant='secondary' className={styles.viewports} name={`${name}-viewport`} role='radiogroup' aria-label={t.viewport} value={viewport} onChange={(event) => setViewport(event.target.value)}>
          <SegmentedControlItem value='desktop'>
            <SegmentedControlItemInput aria-label={t.desktop} />
            <Icon size='xs'><Monitor /></Icon>
          </SegmentedControlItem>
          <SegmentedControlItem value='tablet'>
            <SegmentedControlItemInput aria-label={t.tablet} />
            <Icon size='xs'><Tablet /></Icon>
          </SegmentedControlItem>
          <SegmentedControlItem value='mobile'>
            <SegmentedControlItemInput aria-label={t.mobile} />
            <Icon size='xs'><Smartphone /></Icon>
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <SegmentedControl size='xs' variant='secondary' name={`${name}-dir`} role='radiogroup' aria-label={t.direction} value={dir} onChange={(event) => setDir(event.target.value)}>
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
        <IconButton size='xs' variant='secondary' appearance='ghost' aria-label={t.reset} onClick={() => setRun(run + 1)}>
          <Icon size='xs'><RotateCcw /></Icon>
        </IconButton>
      </div>
      <div className={styles.stage}>
        <div key={run} dir={dir} lang='en' data-viewport={viewport} className={`${styles.frame} ${theme}`}>
          <Template />
        </div>
      </div>
    </div>
  );
};
