# Button

## Doc Profile

`primitive`

## Summary

`Button` is the primary action component built on top of `ButtonBase`, with sizes for common product actions. It is the default choice when the UI needs a visible action surface with text, and with `square` it is the icon-only action of the library.

## Imports

```tsx
import {
  Button,
  type ButtonName,
  type ButtonProps,
  type ButtonShape,
  type ButtonSize,
} from '@vega-ui/react';
```

## Exported Types

- `ButtonName`
- `ButtonProps`
- `ButtonShape`
- `ButtonSize`

## Basic Usage

<!-- example: button/basic-usage.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
```
<!-- /example -->

## Variants

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Variants: `primary`, `secondary`
- Appearances: `fill`, `outline`, `ghost`, `transparent`
- Layout: as wide as its content, any width you set with `style` or a class, or `square` for a single icon
- Composition: default button or `asChild`

## Square Button

`square` makes the button as wide as it is high, with no padding, for a single icon. The nested `Icon` takes a third of the height, and the sizes are the sizes of `Button`.

<!-- example: button/square-sizes.tsx -->
```tsx
import { Button, Icon, type ButtonSize } from '@vega-ui/react';
import { SettingsIcon } from '@vega-ui/icons';

const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function SquareSizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {sizes.map((size) => (
        <Button key={size} type='button' size={size} square aria-label={`Settings, size ${size}`}>
          <Icon><SettingsIcon /></Icon>
        </Button>
      ))}
    </div>
  );
}
```
<!-- /example -->

A square button has no visible text, so its type requires a name: pass `aria-label`, or `aria-labelledby` pointing at visible or [VisuallyHidden](../visually-hidden/) text. With `asChild`, put the name on the child element. The components never set a label themselves. Use a square button for familiar actions, like rename, share or more, and a text button when the icon alone would not tell the action.

<!-- example: button/square-header-actions.tsx -->
```tsx
import { useState } from 'react';
import { Button, Icon, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';

export default function SquareHeaderActions() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%', maxWidth: 400 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </Button>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

A [Tooltip](../tooltip/) can show the label and a shortcut to sighted users. It does not replace `aria-label`: the tooltip appears only on hover and focus.

<!-- example: button/square-tooltip-label.tsx -->
```tsx
import { type ReactNode, useState } from 'react';
import { Button, Icon, Text, Tooltip, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { PrinterIcon, Redo2Icon, Undo2Icon } from '@vega-ui/icons';

const actions: { label: string, shortcut: string, icon: ReactNode }[] = [
  { label: 'Undo', shortcut: 'Ctrl+Z', icon: <Undo2Icon /> },
  { label: 'Redo', shortcut: 'Ctrl+Shift+Z', icon: <Redo2Icon /> },
  { label: 'Print', shortcut: 'Ctrl+P', icon: <PrinterIcon /> },
];

export default function SquareTooltipLabel() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                appearance='transparent'
                square
                aria-label={action.label}
                onClick={() => setLastAction(action.label)}
              >
                <Icon>{action.icon}</Icon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {action.label} · {action.shortcut}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Hover or focus a button to see its label' : `${lastAction} done`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

For the close button of an overlay, set `--button-height` to `24px` and `--button-br-ratio` to `0.5` for a small round button, with an `xs` icon. `flex-shrink: 0` keeps it square next to a long title.

<!-- example: button/square-close-button.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const compact = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

export default function SquareCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='whats-new-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='whats-new-title' as='h2' size={4} fontWeight={600}>What’s new in 2.4</Heading>
          <DialogClose asChild>
            <Button square aria-label='Close' variant='secondary' appearance='ghost' style={compact}>
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        <Text size={3}>
          Shared libraries, faster exports, and a new dark theme. Press Escape or the cross to return to your work.
        </Text>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `type` has no default: inside a form, `Button` submits it like a native `<button>`. With `asChild`, no `type` is passed to the child.
- `asChild` swaps the underlying element while preserving VegaUI button styling.
- Custom size, variant, or appearance strings require matching CSS support.
- If the interaction is primarily navigation, `Link` communicates intent better. If the meaning is already icon-recognizable, a `square` button saves space.
- `square` without `aria-label` or `aria-labelledby` is a type error. With `asChild` the type does not check the name, because it belongs on the child.
- `square` with text inside clips the text: the width equals the height.

## Common Mistakes

- Assuming submit behavior without setting `type='submit'`.
- Using button styling for pure navigation when a semantic link is better.
- Passing unsupported custom variant strings without matching CSS.
- Putting text inside a `square` button, or leaving it without a name.
