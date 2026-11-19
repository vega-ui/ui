import { useState } from 'react';
import { Icon, Toggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { ListOrderedIcon, WrapTextIcon } from '@vega-ui/icons';

const lines = [
  'import { defineConfig } from "vite";',
  'export default defineConfig({ build: { lib: { entry: "src/index.ts", formats: ["es"] } } });',
];

export default function CodeViewOptions() {
  const [wrap, setWrap] = useState(false);
  const [numbers, setNumbers] = useState(true);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 440,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Code view' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <ToolbarItem asChild>
          <Toggle square size='xs' aria-label='Wrap lines' pressed={wrap} onChangePressed={setWrap}><Icon><WrapTextIcon /></Icon></Toggle>
        </ToolbarItem>
        <ToolbarItem asChild>
          <Toggle square size='xs' aria-label='Line numbers' pressed={numbers} onChangePressed={setNumbers}><Icon><ListOrderedIcon /></Icon></Toggle>
        </ToolbarItem>
      </Toolbar>
      <pre
        tabIndex={0}
        role='region'
        aria-label='vite.config.ts'
        style={{
          margin: 0,
          padding: 'var(--spacing-6)',
          overflowX: 'auto',
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'anywhere' : 'normal',
          fontFamily: 'var(--code-font-family), monospace',
          fontSize: 'var(--font-size-2)',
          lineHeight: 1.6,
          color: 'var(--label-primary)',
        }}
      >
        {lines.map((line, index) => (
          <div key={line} style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            {numbers && <span aria-hidden style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}>{index + 1}</span>}
            <span style={{ minWidth: 0 }}>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
