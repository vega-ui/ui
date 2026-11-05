'use client';

import { useState } from 'react';
import { Icon, IconButton } from '@vega-ui/react';
import { Check, Copy } from '@vega-ui/icons';
import { useDictionary } from './LocaleProvider';
import styles from './CodeBlock.module.css';

export const CopyButton = ({ code }: { code: string }) => {
  const t = useDictionary();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <IconButton size='xs' appearance='transparent' variant='secondary' onClick={copy} aria-label={copied ? t.code.copied : t.code.copy}>
      <Icon>{copied ? <Check /> : <Copy />}</Icon>
    </IconButton>
  );
};

export const CodeBody = ({ code, html }: { code: string, html?: string }) => {
  if (!html) return <pre className={styles.pre}><code>{code}</code></pre>;

  return <div className={styles.highlighted} data-numbered={code.includes('\n') || undefined} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const CodeBlock = ({ code, html }: { code: string, html?: string }) => (
  <div className={styles.block}>
    <div className={styles.copy}>
      <CopyButton code={code} />
    </div>
    <CodeBody code={code} html={html} />
  </div>
);
