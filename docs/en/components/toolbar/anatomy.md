# Toolbar Anatomy

## Overview

`Toolbar` is split into a root and its items. The root is the `role="toolbar"` element that owns the Tab stop and the arrow keys, and every `ToolbarItem` registers one control as an item. The items of a `ToggleGroup` inside the toolbar register by themselves. The items register in the order they are rendered, and that order is the order of the arrow keys.

## Required Parts

### `Toolbar`

Renders `<div role="toolbar" aria-orientation>` with `data-orientation`. It takes all HTML attributes and a `ref`. It lays out its children in a row, or in a column with `orientation="vertical"`, with a gap between them, and it has no name of its own: pass `aria-label` or `aria-labelledby`.

### `ToolbarItem`

Renders `<button type="button">`, or with `asChild` its only child, like a `Button`, a `Toggle`, a `MenuTrigger` or a `TextFieldInput`. It gives the control `tabIndex={0}` when it holds the Tab stop of the toolbar and `-1` otherwise, and handles the arrow keys on it. `disabled` disables the control natively and the arrow keys skip it. Outside a `Toolbar` it renders the control as it is, with no `tabIndex` of its own.

## Optional Parts

### `Toggle`

The [Toggle](../toggle/) component, a standalone button with `aria-pressed`. Put it inside a `ToolbarItem` with `asChild`; an icon-only toggle takes `square` and an `aria-label`.

### `ToggleGroup`

The [ToggleGroup](../toggle-group/) component with its `ToggleGroupToggle` items. Inside a toolbar it has no Tab stop and no arrow keys of its own: its items are items of the toolbar, in their place among the other items. It keeps its role, `radiogroup` or `group` with `multiple`, and its value.

### `Menu` and `MenuTrigger`

A [Menu](../menu/) whose `MenuTrigger` is inside a `ToolbarItem`, like a "More" button. `Menu` goes around the `ToolbarItem`, and `MenuContent` after it.

### `TextField` and `TextFieldInput`

A [TextField](../text-field/) whose `TextFieldInput` is inside a `ToolbarItem`. The field keeps the Left and Right arrows, Home and End for its caret.

### `Separator`

The [Separator](../separator/) component, a `role="separator"` line between groups of items. A vertical separator that is a direct child of the toolbar stretches to its height.

## Composition Order

1. `Toolbar`
2. `ToolbarItem`, `ToggleGroup`, `Menu` and `Separator` in the order they are shown
3. Inside a `ToolbarItem` with `asChild`: `Button`, `Toggle`, `MenuTrigger` (with its button inside it) or `TextFieldInput`

## Valid Composition Patterns

A formatting toolbar above the text it formats: a `ToggleGroup` with `multiple` for bold, italic and underline, a `ToggleGroup` for the alignment and a "More" `Menu`, the groups split by a vertical separator. The arrow keys move through all seven items, and the Down arrow on "More" opens its menu.

<!-- example: toolbar/text-editor.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuTrigger,
  Separator,
  Text,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import {
  BoldIcon,
  CheckIcon,
  EllipsisIcon,
  ItalicIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
} from '@vega-ui/icons';

type Alignment = 'start' | 'center' | 'end';

export default function TextEditor() {
  const [marks, setMarks] = useState<string[]>(['bold']);
  const [alignment, setAlignment] = useState<Alignment>('start');
  const [struckThrough, setStruckThrough] = useState(false);

  const clearFormatting = () => {
    setMarks([]);
    setAlignment('start');
    setStruckThrough(false);
  };

  const decorations: string[] = [];
  if (marks.includes('underline')) decorations.push('underline');
  if (struckThrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    textAlign: alignment,
    fontWeight: marks.includes('bold') ? 700 : 400,
    fontStyle: marks.includes('italic') ? 'italic' : 'normal',
    textDecoration: decorations.length === 0 ? 'none' : decorations.join(' '),
    overflowWrap: 'anywhere',
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Formatting' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <ToggleGroup aria-label='Text style' size='xs' multiple value={marks} onChangeValue={setMarks}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToggleGroup aria-label='Alignment' size='xs' value={alignment} onChangeValue={(value) => setAlignment(value as Alignment)}>
          <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Menu placement='bottom-end' size='sm'>
          <ToolbarItem asChild>
            <MenuTrigger asChild>
              <Button square size='xs' variant='secondary' appearance='transparent' aria-label='More formatting' style={{ marginInlineStart: 'auto' }}>
                <Icon><EllipsisIcon /></Icon>
              </Button>
            </MenuTrigger>
          </ToolbarItem>
          <MenuContent>
            <MenuCheckboxItem checked={struckThrough} onChangeChecked={setStruckThrough}>
              <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
              Strikethrough
            </MenuCheckboxItem>
            <Separator />
            <MenuItem onClick={clearFormatting}>Clear formatting</MenuItem>
          </MenuContent>
        </Menu>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### A control without `ToolbarItem`

A `Button` or `Toggle` placed directly in the toolbar keeps its own Tab stop and the arrow keys skip it. Wrap it in `ToolbarItem` with `asChild`.

### `ToolbarItem` around a `ToggleGroup` or its items

The `ToggleGroupToggle` items of a `ToggleGroup` register with the toolbar by themselves. A `ToolbarItem` around one of them registers it a second time, and around the whole group it makes the group element an item of its own: the arrow keys stop where they should not. Only a `Toggle` outside a group goes inside a `ToolbarItem`.

### `ToolbarItem` around a wrapper

`ToolbarItem` with `asChild` gives its attributes to its only child. Around a `<div>` or a `TextField`, the wrapper takes the Tab stop instead of the control: put `ToolbarItem` right around the focusable element, like `TextFieldInput` inside `TextField`.

### A toolbar without a name

Without `aria-label` or `aria-labelledby` a screen reader announces only "toolbar". Name it after what it acts on, like "Formatting".
