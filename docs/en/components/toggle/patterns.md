# Toggle Patterns

## Independent Options In A Toolbar

When to use:

- A toolbar offers a few options that turn on and off by themselves, like wrapping lines and showing line numbers in a code view.

Composition notes:

- Put each toggle in a `ToolbarItem` with `asChild`, and give an icon-only toggle `square` and an `aria-label`.
- Keep the label of the option, like "Wrap lines", in both states, and use the same `size` in the whole toolbar.
- When the toggles form one choice, like an alignment, put them in a [ToggleGroup](../toggle-group/patterns.md) instead.

Trade-offs:

- The toolbar takes one Tab stop for all its items, and the arrows move between them; each toggle still keeps its own state.

<!-- example: toggle/code-view-options.tsx -->
```tsx
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
```
<!-- /example -->

## Media And Call Controls

When to use:

- A player or a call offers states the user switches during the session, like mute, captions or a raised hand.

Composition notes:

- Control each toggle from the parent with `pressed` and `onChangePressed`, and show the combined state in a status line.
- Change the icon with the state if it helps, but never the label.
- Use `size='md'` or larger for touch, and keep the toggles in one row with equal sizes.

Trade-offs:

- Toggles keep the controls compact, but each state is shown only by the tint and the icon: a status text keeps it readable.

<!-- example: toggle/call-controls.tsx -->
```tsx
import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { CaptionsIcon, HandIcon, MicIcon, MicOffIcon } from '@vega-ui/icons';

export default function CallControls() {
  const [muted, setMuted] = useState(true);
  const [captions, setCaptions] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  const states: string[] = [muted ? 'You are muted' : 'Your microphone is on'];
  if (captions) states.push('captions on');
  if (handRaised) states.push('hand raised');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--radius-8)',
          border: '1px solid var(--separator-opaque)',
          background: 'var(--surface-primary)',
        }}
      >
        <Toggle pressed={muted} onChangePressed={setMuted} square aria-label='Mute'><Icon>{muted ? <MicOffIcon /> : <MicIcon />}</Icon></Toggle>
        <Toggle pressed={captions} onChangePressed={setCaptions} square aria-label='Captions'><Icon><CaptionsIcon /></Icon></Toggle>
        <Toggle pressed={handRaised} onChangePressed={setHandRaised} square aria-label='Raise hand'><Icon><HandIcon /></Icon></Toggle>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{states.join(' · ')}</Text>
    </div>
  );
}
```
<!-- /example -->
