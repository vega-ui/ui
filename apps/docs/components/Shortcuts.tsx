'use client';

import { useEffect, useId, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { Dialog, DialogClose, DialogContent, Heading, Icon, IconButton } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { isPageShortcut } from '@/lib/shortcuts';
import { useDictionary } from './LocaleProvider';
import styles from './Shortcuts.module.css';

const CLOSE_STYLE = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const subscribe = () => () => {};

const modifierLabel = () => /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';

export const Shortcuts = () => {
  const t = useDictionary().shortcuts;
  const id = useId();
  const modifier = useSyncExternalStore(subscribe, modifierLabel, () => 'Ctrl');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '?' || !isPageShortcut(event)) return;

      event.preventDefault();
      setOpen(true);
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const rows = [
    { label: t.search, keys: [[modifier, 'K'], ['/']] },
    { label: t.previous, keys: [['[']] },
    { label: t.next, keys: [[']']] },
    { label: t.help, keys: [['?']] },
  ];

  return (
    <Dialog open={open} onChangeOpen={setOpen}>
      <DialogContent closedBy='any' blurred={false} aria-labelledby={id} className={styles.dialog}>
        <div className={styles.header}>
          <Heading id={id} as='h2' className={styles.title}>{t.title}</Heading>
          <DialogClose asChild>
            <IconButton aria-label={t.close} variant='secondary' appearance='ghost' style={CLOSE_STYLE}>
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <dl className={styles.list}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt>{row.label}</dt>
              <dd className={styles.keys}>
                {row.keys.map((combo, index) => (
                  <span key={combo.join()} className={styles.combo}>
                    {index > 0 && <span className={styles.or}>{t.or}</span>}
                    {combo.map((key) => <kbd key={key} className={styles.key}>{key}</kbd>)}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
};
