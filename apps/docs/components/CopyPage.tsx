'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { Check, Copy, FileText } from '@vega-ui/icons';
import { getMarkdownPath } from '@/lib/site';
import { useDictionary } from './LocaleProvider';
import styles from './DocPage.module.css';

export const CopyPage = () => {
  const t = useDictionary();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const markdown = getMarkdownPath(pathname.endsWith('/') ? pathname : `${pathname}/`);

  if (!markdown) return null;

  const href = `${process.env.NEXT_PUBLIC_BASE_PATH}${markdown}`;

  const copy = async () => {
    const text = fetch(href)
      .then((response) => response.text())
      .then((source) => new Blob([source], { type: 'text/plain' }));

    try {
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': text })]);
    } catch {
      return;
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.copy}>
      <Button size='xs' variant='secondary' appearance='ghost' className={styles.compact} onClick={copy} aria-label={copied ? t.doc.copied : t.doc.copyPageLabel}>
        <Icon size='xs'>{copied ? <Check /> : <Copy />}</Icon>
        <span className={styles.copyLabel}>{copied ? t.doc.copied : t.doc.copyPage}</span>
      </Button>
      <IconButton asChild size='xs' variant='secondary' appearance='ghost' className={styles.compact}>
        <a href={href} aria-label={t.doc.markdown} title={t.doc.markdown}>
          <Icon size='xs'><FileText /></Icon>
        </a>
      </IconButton>
      <VisuallyHidden asChild>
        <span role='status'>{copied ? t.doc.copied : ''}</span>
      </VisuallyHidden>
    </div>
  );
};
