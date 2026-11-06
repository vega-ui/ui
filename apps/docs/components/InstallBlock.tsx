'use client';

import { useState } from 'react';
import { Icon, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput } from '@vega-ui/react';
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
    <div className={styles.block}>
      <div className={styles.toolbar}>
        <Icon size='sm' className={styles.terminal}><SquareTerminal /></Icon>
        <SegmentedControl
          size='xs'
          name='package-manager'
          role='radiogroup'
          aria-label={t.code.managers}
          value={manager}
          onChange={(event) => setManager(event.target.value)}
          className={styles.managers}
        >
          {variants.map((variant) => (
            <SegmentedControlItem key={variant.manager} value={variant.manager}>
              <SegmentedControlItemInput />
              {variant.manager}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
        <span className={styles.copy}><CopyButton code={current.code} /></span>
      </div>
      <CodeBody code={current.code} html={highlighted[codeKey(current.code)]} />
    </div>
  );
};
