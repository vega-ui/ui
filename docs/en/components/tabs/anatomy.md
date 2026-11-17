# Tabs Anatomy

## Overview

`Tabs` is split into a root, a list of tabs and the panels. The root owns the state, `TabsList` handles the keyboard, and each `TabsTab` and `TabsPanel` pair is matched by `value`. The panels do not have to sit next to the list: any element between them is fine.

## Required Parts

### `Tabs`

Owns the selected tab (`value`, `defaultValue`, `onChangeValue`), the activation mode, the orientation and the size. Renders a `<div>` with `data-orientation`.

### `TabsList`

Renders `<div role="tablist">` with `aria-orientation`. It is the one Tab stop of the tabs, moves the focus between them with the arrow keys, Home and End, and draws the line under the selected tab. It needs an accessible name from `aria-label` or `aria-labelledby`.

### `TabsTab`

Renders `<button type="button" role="tab">` with `aria-selected` and `aria-controls`. Its `value` matches a `TabsPanel`. Native `disabled` takes it out of the arrow keys and the pointer.

### `TabsPanel`

Renders `<div role="tabpanel">` labelled by its tab. While the tab is not selected it has `hidden="until-found"` and `aria-hidden`, and it stays mounted.

## Optional Parts

There are no optional parts. The indicator under the selected tab is a pseudo-element of `TabsList` that follows the selected tab with CSS anchor positioning.

## Composition Order

1. `Tabs`
2. `TabsList`
3. `TabsTab`, one per panel
4. `TabsPanel`, one per tab, after the list

## Valid Composition Patterns

<!-- example: tabs/valid-composition-patterns.tsx -->
```tsx
import { useId } from 'react';
import { Heading, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  const titleId = useId();

  return (
    <section style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 480 }}>
      <Heading id={titleId} as='h3' size={4} fontWeight={600}>Issues</Heading>
      <Tabs defaultValue='open' size='sm'>
        <TabsList aria-labelledby={titleId}>
          <TabsTab value='open'>Open</TabsTab>
          <TabsTab value='closed'>Closed</TabsTab>
        </TabsList>
        <Text size={2} style={{ display: 'block', marginBlockEnd: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Updated 5 minutes ago</Text>
        <TabsPanel value='open'>
          <Text size={3}>3 open issues, the oldest from 12 November.</Text>
        </TabsPanel>
        <TabsPanel value='closed'>
          <Text size={3}>41 issues closed this month.</Text>
        </TabsPanel>
      </Tabs>
    </section>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### `TabsTab` outside `TabsList`

A tab outside the list is not part of the `tablist`, so the arrow keys and screen readers do not treat it as one of the tabs.

### Links as tabs

A tab that changes the URL is navigation. Use a `<nav>` with links and `aria-current="page"` on the current one instead.

### Spacing on `TabsPanel`

Hidden panels keep their box, so padding, borders and margins on `TabsPanel` show up for every hidden panel. Put the spacing on an element inside the panel.
