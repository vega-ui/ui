# Toggle Anatomy

## Overview

`Toggle` is a standalone button that keeps a pressed state and owns it. The items of a [ToggleGroup](../toggle-group/) are a part of the group, `ToggleGroupToggle`, with the same look; see [ToggleGroup Anatomy](../toggle-group/anatomy.md).

## Required Parts

### `Toggle`

Renders a [Button](../button/), `<button type="button" aria-pressed>`, with `data-pressed`. With `square` it is as wide as it is high, for a single icon. With `asChild` it renders its only child, which must be a button element, with the same attributes and the look of the toggle. It takes all `Button` props except `variant`, `appearance` and `fullWidth`: the look follows the pressed state.

## Optional Parts

### `Icon`

The [Icon](../icon/) next to the text, or alone in a `square` toggle with an `aria-label`.

### `Toolbar`

A [Toolbar](../toolbar/) around toggles. Each toggle goes inside a `ToolbarItem` with `asChild`, which makes it an item of the arrow key navigation of the toolbar.

## Composition Order

1. `Toggle`
2. Its content: `Icon` and text, or an `Icon` alone with `square`

## Valid Composition Patterns

An icon-only toggle on a card: `square` makes it as wide as it is high, and the `aria-label` names the state the toggle turns on. The parent keeps `pressed` to fill the heart icon while the listing is saved.

<!-- example: toggle/save-listing.tsx -->
```tsx
import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { HeartIcon } from '@vega-ui/icons';

export default function SaveListing() {
  const [saved, setSaved] = useState(false);

  return (
    <article
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
        <Text size={3} fontWeight={600}>Cabin by the lake</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>2 guests · 1 bedroom · €120 a night</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {saved ? 'Saved to your favorites' : 'Not saved'}
        </Text>
      </div>
      <Toggle pressed={saved} onChangePressed={setSaved} square size='sm' aria-label='Save to favorites' style={{ flexShrink: 0 }}>
        <Icon><HeartIcon fill={saved ? 'currentColor' : 'none'} /></Icon>
      </Toggle>
    </article>
  );
}
```
<!-- /example -->

Toggles in a toolbar: each one is wrapped in `ToolbarItem` with `asChild`, so the arrow keys move between them and the toolbar keeps one Tab stop. Each toggle keeps its own state.

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

## Invalid Composition Patterns

### A label that changes with the state

"Mute" when released and "Unmute" when pressed make a screen reader announce two different buttons. Keep one label; `aria-pressed` announces the state.

### Separate toggles for one exclusive choice

Toggles that release each other by hand have one Tab stop each and no group role. Use a [ToggleGroup](../toggle-group/) with `ToggleGroupToggle` items.

### A link or a non-button child

With `asChild` the child must be a button element: `aria-pressed` on a link or a `<div>` is not announced as a toggle, and a `<div>` does not react to Enter and Space.
