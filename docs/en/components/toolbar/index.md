# Toolbar

## Doc Profile

`advanced interactive`

## Summary

`Toolbar` is a [compound component](../../glossary.md#compound-component) that groups controls, like the formatting buttons of an editor, into one Tab stop, following the [WAI-ARIA toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/). `ToolbarItem` makes a control one of its items: the arrow keys of the `orientation` move the focus between the items and wrap around the ends, Home and End jump to the first and last item, and Tab comes back to the item that had the focus last. The items of a [ToggleGroup](../toggle-group/) inside it join the same navigation.

## Imports

```tsx
import {
  Toolbar,
  ToolbarItem,
  type ToolbarProps,
  type ToolbarItemProps,
  type ToolbarOrientation,
} from '@vega-ui/react';
```

## Exported Types

- `ToolbarProps`
- `ToolbarItemProps`
- `ToolbarOrientation`

## Minimal Composition

<!-- example: toolbar/minimal-composition.tsx -->
```tsx
import { Button, Icon, Separator, Toggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toolbar aria-label='Formatting'>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Bold'><Icon><BoldIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Italic'><Icon><ItalicIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Underline'><Icon><UnderlineIcon /></Icon></Toggle>
      </ToolbarItem>
      <Separator orientation='vertical' />
      <ToolbarItem asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert link'>
          <Icon><LinkIcon /></Icon>
        </Button>
      </ToolbarItem>
    </Toolbar>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyToolbarToggle` passes its props to a square `Toggle` that is a `ToolbarItem`, takes its name from `label`, and wraps its child glyph in `Icon`. See [Component recipes](../../recipes.md).

<!-- example: toolbar/recipe.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Text,
  Toggle,
  Toolbar,
  ToolbarItem,
  type ToggleProps,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from '@vega-ui/icons';

interface MyToolbarToggleProps extends ToggleProps {
  label: string
}

export function MyToolbarToggle({ label, children, ...props }: MyToolbarToggleProps) {
  return (
    <ToolbarItem asChild>
      <Toggle square size='xs' aria-label={label} {...props}>
        <Icon>{children}</Icon>
      </Toggle>
    </ToolbarItem>
  );
}

export default function Recipe() {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);

  const decorations: string[] = [];
  if (underline) decorations.push('underline');
  if (strikethrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    fontWeight: bold ? 700 : 400,
    fontStyle: italic ? 'italic' : 'normal',
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
        <MyToolbarToggle label='Bold' pressed={bold} onChangePressed={setBold}><BoldIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Italic' pressed={italic} onChangePressed={setItalic}><ItalicIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Underline' pressed={underline} onChangePressed={setUnderline}><UnderlineIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Strikethrough' pressed={strikethrough} onChangePressed={setStrikethrough}><StrikethroughIcon /></MyToolbarToggle>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Toolbar`: the `role="toolbar"` root that owns the Tab stop and the arrow keys, named by your `aria-label`
- `ToolbarItem`: makes a control one of the items, a `<button>` or your own control with `asChild`

## Optional Parts

- [Toggle](../toggle/): a button that stays pressed, inside a `ToolbarItem`
- [ToggleGroup](../toggle-group/) with `ToggleGroupToggle`: a set of toggles whose items join the navigation of the toolbar by themselves
- [Menu](../menu/) with `MenuTrigger` inside a `ToolbarItem`: a "More" button that opens a menu
- [TextField](../text-field/) with `TextFieldInput` inside a `ToolbarItem`: a field, like a search
- [Separator](../separator/): a line between groups of items

## Composition Order

1. `Toolbar`
2. `ToolbarItem`, `ToggleGroup` and `Separator` in the order they are shown
3. Inside a `ToolbarItem` with `asChild`, the control: `Button`, `Toggle`, `MenuTrigger` or `TextFieldInput`

## Variants

- Orientation through `orientation`: `horizontal` (default) with the Left and Right arrows, or `vertical` with the Up and Down arrows
- Items as a plain `<button>`, or with `asChild` your own `Button`, `Toggle`, `MenuTrigger` or `TextFieldInput`
- Disabled items through `disabled` on `ToolbarItem`, or on a `ToggleGroup` or its items
- Groups of toggles through `ToggleGroup`, one pressed at a time or each by itself with `multiple`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- The Tab stop is on the first enabled item until the focus enters the toolbar, then on the item that had the focus last. When that item becomes disabled, the Tab stop goes back to the first enabled item.
- `disabled` on `ToolbarItem` disables the control natively and the arrow keys skip it. A `disabled` set only on the child is not known to the toolbar.
- A text field keeps the Left and Right arrows, Home and End for its caret, so in a horizontal toolbar the arrow keys never move the focus out of it. Put it last, so the arrow keys reach every other item.
- The Down arrow on a `MenuTrigger` item opens its menu, and the Up arrow opens it on the last item, as the trigger of a [Menu](../menu/) does. While the menu is open, the arrow keys stay inside it; Escape closes it and gives the focus back to the item.
- The arrow keys follow the writing direction: in a right-to-left page the Left arrow moves to the next item.
- The items of a `ToggleGroup` inside a toolbar are items of the toolbar: Tab enters the toolbar on its first item or the one that had the focus last, not on the pressed item of the group.
- A vertical `Separator` that is a direct child of the toolbar stretches to its height, and a horizontal one gets a margin in a vertical toolbar.

## Common Mistakes

- Leaving the toolbar without `aria-label` or `aria-labelledby`: the components never set a label themselves, and a screen reader announces only "toolbar".
- Putting a control in the toolbar without `ToolbarItem`: it keeps its own Tab stop, and the arrow keys never reach it.
- Wrapping the items of a `ToggleGroup` in `ToolbarItem`: they are items of the toolbar already.
- Setting `disabled` on the child instead of on `ToolbarItem`: the toolbar still counts the item, and the Tab stop can land on a control that cannot take the focus.
- Using a toolbar for a single control, or for navigation links: a toolbar is for a set of three or more controls that act on something, like the text of an editor.
