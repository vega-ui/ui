'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Text } from '@vega-ui/react';
import { describe, matchRows, scanAria, toKeyLabel, type Announcement, type AriaNode } from '@/lib/a11y';
import type { KeyboardRow } from '@/lib/content';
import { EXAMPLES } from '@/generated/examples';
import { PREVIEWS } from './ComponentPreviews';
import { useDictionary } from './LocaleProvider';
import styles from './AccessibilityInspector.module.css';

const OVERLAYS = 'dialog[open], [popover]:popover-open';

export const AccessibilityInspector = ({ slug, example, keys }: { slug: string, example?: string, keys: string }) => {
  const rows = useMemo<KeyboardRow[]>(() => JSON.parse(keys), [keys]);
  const t = useDictionary().a11y;
  const stageRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [aria, setAria] = useState<AriaNode[]>([]);
  const [pressed, setPressed] = useState<number[]>([]);
  const Example = example ? EXAMPLES[example] : undefined;
  const preview = Example ? <Example /> : PREVIEWS[slug]?.node;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let engaged = false;
    let frame = 0;

    const inScope = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (stage.contains(target)) return true;

      return engaged && target.closest(OVERLAYS) !== null;
    };

    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const roots = [stage, ...document.querySelectorAll(OVERLAYS)].filter((root) => root === stage || engaged);
        setAria(scanAria(roots));

        const active = document.activeElement;
        if (active && inScope(active)) setAnnouncement(describe(active));
      });
    };

    const onFocusIn = (event: FocusEvent) => {
      engaged = inScope(event.target);
      refresh();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!inScope(event.target)) return;

      const label = toKeyLabel(event);
      if (label) setPressed(matchRows(rows, label));
      refresh();
    };

    const observer = new MutationObserver(refresh);
    observer.observe(stage, { attributes: true, childList: true, subtree: true });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('input', refresh, true);
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('input', refresh, true);
    };
  }, [rows]);

  return (
    <div className={styles.inspector}>
      {preview && (
        <div className={styles.top}>
          <div ref={stageRef} className={styles.stage}>{preview}</div>
          <div className={styles.readout}>
            <span className={styles.label}>{t.announcement}</span>
            {announcement ? (
              <>
                <q key={JSON.stringify(announcement)} className={styles.speech}>
                  {[announcement.name, announcement.role, ...announcement.state].filter(Boolean).join(', ')}
                </q>
                <dl className={styles.facts}>
                  <div><dt>{t.element}</dt><dd>{announcement.tag}</dd></div>
                  <div><dt>{t.name}</dt><dd>{announcement.name || '—'}</dd></div>
                  <div><dt>{t.role}</dt><dd>{announcement.role || '—'}</dd></div>
                  <div><dt>{t.state}</dt><dd>{announcement.state.join(', ') || '—'}</dd></div>
                  {announcement.active && <div><dt>{t.active}</dt><dd>{announcement.active}</dd></div>}
                </dl>
              </>
            ) : (
              <span className={styles.hint}>{rows.length > 0 ? t.hint : t.focus}</span>
            )}
          </div>
        </div>
      )}
      {rows.length > 0 && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope='col'>{t.key}</th>
                <th scope='col'>{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.keys.join()}-${index}`} data-pressed={pressed.includes(index)} className={styles.row}>
                  <td className={styles.keys}>
                    {row.keys.map((key) => <kbd key={key} className={styles.kbd}>{key}</kbd>)}
                  </td>
                  <td>
                    {row.text.split('`').map((part, partIndex) => partIndex % 2 === 1 ? <code key={partIndex}>{part}</code> : part)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Text className={styles.verified}>{t.verified}</Text>
        </>
      )}
      {preview && aria.length > 0 && (
        <details className={styles.aria}>
          <summary>{`${t.aria} · ${aria.length}`}</summary>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope='col'>{t.element}</th>
                <th scope='col'>{t.role}</th>
                <th scope='col'>{t.attributes}</th>
              </tr>
            </thead>
            <tbody>
              {aria.map((node, index) => (
                <tr key={index} className={styles.row}>
                  <td className={styles.keys}><code>{`<${node.tag}>`}</code>{node.count > 1 && ` ×${node.count}`}</td>
                  <td className={styles.keys}><code>{node.role || '—'}</code></td>
                  <td><code>{node.attributes.join(' ') || '—'}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </div>
  );
};
