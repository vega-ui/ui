'use client';

import { useState } from 'react';
import { Icon, Tabs, TabsList, TabsPanel, TabsTab } from '@vega-ui/react';
import { SquareTerminal } from '@vega-ui/icons';
import { codeKey } from '@/lib/code';
import type { Highlighted } from '@/lib/highlight';
import type { InstallVariant } from '@/lib/install';
import { CodeBody, CopyButton } from './CodeBlock';
import { useDictionary } from './LocaleProvider';
import styles from './InstallBlock.module.css';

export const InstallBlock = ({ variants, highlighted }: { variants: InstallVariant[], highlighted: Highlighted }) => {
  const t = useDictionary();
  const [manager, setManager] = useState(variants[0].manager);
  const current = variants.find((variant) => variant.manager === manager) ?? variants[0];

  return (
    <Tabs size='sm' value={manager} onChangeValue={setManager} className={styles.block}>
      <div className={styles.toolbar}>
        <Icon size='sm' className={styles.terminal}><SquareTerminal /></Icon>
        <TabsList aria-label={t.code.managers} className={styles.managers}>
          {variants.map((variant) => (
            <TabsTab key={variant.manager} value={variant.manager}>{variant.manager}</TabsTab>
          ))}
        </TabsList>
        <span className={styles.copy}><CopyButton code={current.code} /></span>
      </div>
      {variants.map((variant) => (
        <TabsPanel key={variant.manager} value={variant.manager}>
          <CodeBody code={variant.code} html={highlighted[codeKey(variant.code)]} />
        </TabsPanel>
      ))}
    </Tabs>
  );
};
