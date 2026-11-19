# ToggleGroup Anatomy

## Overview

`ToggleGroup` is the parent of its toggles. Every item is a `ToggleGroupToggle` with a `value`, its key in the group. The group owns the value of all its items, its Tab stop and its arrow keys. The items register in the order they are rendered, and that order is the order of the arrow keys.

## Required Parts

### `ToggleGroup`

Renders `<div role="radiogroup">`, or `<div role="group">` with `multiple`, laid out as an `inline-flex` row with a small gap. It takes all HTML attributes and a `ref`, keeps the value of its items, and gives its `size` and `disabled` to them. It has no name of its own: pass `aria-label` or `aria-labelledby`.

### `ToggleGroupToggle`

One item of the group under its required `value`. It renders a [Button](../button/) with the look of a [Toggle](../toggle/): `<button type="button" role="radio" aria-checked>` without `multiple`, and `<button type="button" aria-pressed>` with it, both with `data-pressed`. It gets `tabIndex={0}` when it holds the Tab stop of the group and `-1` otherwise. With `asChild` it renders its only child, which must be a button element, and passes `type="button"` to it unless the child sets its own. It has no `pressed`, `defaultPressed` or `onChangePressed`: the group decides. `size` on it overrides the `size` of the group, and `disabled` disables it alone. Inside a [Toolbar](../toolbar/) it registers with the toolbar by itself.

## Optional Parts

### `Icon`

The [Icon](../icon/) next to the text of an item, or alone in a `square` item with an `aria-label`.

### `Toolbar`

A [Toolbar](../toolbar/) around the group. The items of the group join the toolbar by themselves, without `ToolbarItem`; the group gives up its Tab stop and arrow keys and keeps its role and value.

## Composition Order

1. `ToggleGroup`
2. `ToggleGroupToggle`, each with a unique `value`, in the order they are shown
3. Its content: `Icon` and text, or an `Icon` alone with `square`

## Valid Composition Patterns

A view switcher above the content it switches: the items of the group have an icon and text, the parent keeps the value, and one view is always shown, since a pressed item cannot be released by a second press.

<!-- example: toggle-group/view-switcher.tsx -->
```tsx
import { useState, type ReactNode } from 'react';
import { Icon, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { CalendarIcon, KanbanIcon, ListIcon } from '@vega-ui/icons';

const views: { value: string, label: string, icon: ReactNode, summary: string }[] = [
  { value: 'list', label: 'List', icon: <ListIcon />, summary: '18 tasks, sorted by due date' },
  { value: 'board', label: 'Board', icon: <KanbanIcon />, summary: '4 columns: To do, In progress, Review, Done' },
  { value: 'week', label: 'Week', icon: <CalendarIcon />, summary: '6 tasks due this week' },
];

export default function ViewSwitcher() {
  const [view, setView] = useState('list');
  const current = views.find((item) => item.value === view) ?? views[0];

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 440 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <Text size={4} fontWeight={600}>Launch plan</Text>
        <ToggleGroup aria-label='View' size='xs' value={view} onChangeValue={setView}>
          {views.map((item) => (
            <ToggleGroupToggle key={item.value} value={item.value}>
              <Icon size='xs'>{item.icon}</Icon>
              {item.label}
            </ToggleGroupToggle>
          ))}
        </ToggleGroup>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: 120,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{current.summary}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Two items with the same `value`

The group tells its items apart by `value`. Two items with the same one share one key: they are pressed together and the arrow keys stop on one of them.

### Controls other than `ToggleGroupToggle` in a group

A [Toggle](../toggle/), a `Button` or a link inside the group is not an item: it keeps its own Tab stop and state, and the arrow keys skip it. Put only `ToggleGroupToggle` items inside, and other controls next to the group.

### A group without a name

The group announces its name when the focus enters it. Without `aria-label` or `aria-labelledby`, the user hears only the item, like "Align center, radio button, 2 of 3", and not what the choice is about.

