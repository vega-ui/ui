# Drawer Accessibility

## Labeling

`DrawerContent` does not name itself. Naming the drawer is your job, and it is required: a drawer without a name is inaccessible, because screen readers announce it only as "dialog".

- Reference a visible heading with `aria-labelledby` on `DrawerContent`, or set `aria-label` when there is no visible heading.
- If the drawer owns a focused task, the heading should describe that task directly.

<!-- example: drawer/side-inspector.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Items', value: '3 × Sensor kit, 1 × Charging dock' },
  { term: 'Total', value: '$1,284.00' },
  { term: 'Ship to', value: '41 Harbour Road, Bristol BS1 5TY' },
];

export default function SideInspector() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <div style={{ marginBlockStart: 'var(--spacing-4)' }}>
          <Badge variant='warning' size='sm'>Awaiting payment</Badge>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
          {details.map((detail) => (
            <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger: opens the drawer. The drawer itself takes the focus, or the child with `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the next or previous control inside the drawer. The page behind is inert, so the focus does not reach it. |
| <kbd>Escape</kbd> | Closes the drawer and returns the focus to the element that opened it. With `closedBy='none'` it does nothing. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

In nested drawers `Escape` closes only the top one.

## Focus Behavior

- Focus should move into the drawer on open.
- Focus should return sensibly to the original trigger or equivalent action on close.
- Nested drawer stacks need real integration testing instead of isolated assumptions.

Focus handling comes from the native `<dialog>`: the rest of the page is inert while the drawer is open, `Tab` stays inside the drawer (it can still reach the browser UI), and closing restores focus to the element that was focused before opening.

On open the drawer itself takes focus, so nothing inside is highlighted and screen readers announce its title; `Tab` moves to the first control. Put `autoFocus` on a child to focus it instead, for example the first field of a form.

## Screen Reader Semantics

- The drawer is exposed as `role=dialog` with `aria-modal` by the browser and is named by your `aria-labelledby` or `aria-label`.
- The trigger exposes `aria-haspopup='dialog'` and `aria-expanded`.
- `DrawerClose` has no default label, so an icon-only button inside it needs an `aria-label`; the library ships no built-in strings.
- The drawer should expose a clear panel purpose.
- Long panels should still read as one coherent overlay task rather than a disconnected page fragment.

## Form Semantics

- Drawers often contain forms, but the form semantics belong to the controls inside the panel.
- Error states and required fields should remain visible even when the panel scrolls.
- Buttons in a `<form method="dialog">` close the drawer through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`. This also works with `closedBy='none'`.

## Accessibility Risks

- A drawer without `aria-labelledby` or `aria-label`.
- Long content with poor scroll affordance.
- Nested overlays without retesting focus restoration.
