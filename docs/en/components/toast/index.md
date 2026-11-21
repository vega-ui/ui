# Toast

## Doc Profile

`advanced interactive`

## Summary

`Toast` is a short message about something that happens away from the focus of the user, like a conversation archived with an Undo, a file that failed to upload or a change made by someone else. A queue you make once with `createToastQueue()` holds the toasts, and `add()` shows one from anywhere, React or not. `ToastRegion` shows the toasts of the queue as a named live region above the page, a modal dialog included, and renders its children once per toast as a template that reads the toast with `useToastContext()`. `Toast` is one toast, read by the screen reader as it appears, and `ToastClose` closes it. The toasts stack as a deck that expands under the pointer or the focus, pause their timers while the user is on them or away from the page, and close on a swipe or Escape. The library draws no icons and sets no labels: the look, the icons and the names are yours.

## Imports

```tsx
import {
  Toast,
  ToastRegion,
  ToastClose,
  createToastQueue,
  useToastContext,
  type ToastProps,
  type ToastRegionProps,
  type ToastPlacement,
  type ToastCloseProps,
  type ToastContextState,
  type ToastQueue,
  type ToastOptions,
  type QueuedToast,
  type SwipeDirection,
} from '@vega-ui/react';
```

## Exported Types

- `ToastProps`
- `ToastRegionProps`
- `ToastPlacement`
- `ToastCloseProps`
- `ToastContextState`
- `ToastQueue`
- `ToastOptions`
- `QueuedToast`
- `SwipeDirection`

## Minimal Composition

<!-- example: toast/minimal-composition.tsx -->
```tsx
import { Button, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

const toasts = createToastQueue<string>();

function Message() {
  const { content } = useToastContext<string>();

  return (
    <Toast style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
      <Text size={2} fontWeight={500}>{content}</Text>
      <ToastClose asChild>
        <Button size='xs' variant='secondary' appearance='ghost'>Dismiss</Button>
      </ToastClose>
    </Toast>
  );
}

export default function MinimalComposition() {
  return (
    <>
      <Button size='xs' onClick={() => toasts.add('Changes saved', { timeout: 5000 })}>Save changes</Button>
      <ToastRegion queue={toasts} aria-label='Notifications'>
        <Message />
      </ToastRegion>
    </>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, make the queue once in a module of its own, like `toasts.ts`, compose the template once with your icon set, and render the region once near the root, so any screen, store or request handler shows a toast with `notices.add()`. `notices` is the queue of `Notice` objects. `MyToastRegion` passes its props to `ToastRegion`, including the `aria-label` of the region, and renders `MyToast` as the template. `MyToast` reads the toast with `useToastContext()`, names it by its title with `aria-labelledby`, makes an error a `role="alert"`, renders the action of the notice as a `ToastClose` that runs it and closes the toast, and an icon dismiss button that takes its `aria-label` from the `dismissLabel` prop. See [Component recipes](../../recipes.md).

<!-- example: toast/recipe.tsx -->
```tsx
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import {
  Button,
  Icon,
  Spinner,
  Text,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
  type ToastRegionProps,
} from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, FileTextIcon, InfoIcon, TriangleAlertIcon, XIcon } from '@vega-ui/icons';

type Tone = 'success' | 'info' | 'warning' | 'error' | 'loading'

export interface Notice {
  title: string
  description?: string
  tone?: Tone
  action?: { label: string, onAction: () => void }
}

export const notices = createToastQueue<Notice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;
const topCorner: CSSProperties = { alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)' };

const tones: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  info: { icon: <InfoIcon />, color: 'var(--color-blue-accent-500)' },
  warning: { icon: <TriangleAlertIcon />, color: 'var(--color-amber-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
};

const smallIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, height: 'var(--spacing-16)' };
const largeIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' };

function ToneIcon({ tone, large }: { tone: Tone, large: boolean }) {

  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={large ? largeIcon : smallIcon}>
        <Spinner size={3} />
      </span>
    );
  }

  return (
    <span aria-hidden='true' style={{ ...(large ? largeIcon : smallIcon), color: tones[tone].color }}>
      <Icon size='sm'>{tones[tone].icon}</Icon>
    </span>
  );
}

function MyToast({ dismissLabel }: { dismissLabel: string }) {
  const { content } = useToastContext<Notice>();
  const titleId = useId();
  const action = content.action && (
    <ToastClose asChild onClick={content.action.onAction}>
      <Button
        size='xs'
        variant='primary'
        appearance='ghost'
        style={{ flexShrink: 0, justifySelf: 'start', marginBlockStart: content.description ? 'var(--spacing-4)' : undefined }}
      >
        {content.action.label}
      </Button>
    </ToastClose>
  );

  return (
    <Toast
      role={content.tone === 'error' ? 'alert' : 'status'}
      aria-labelledby={titleId}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
    >
      {content.tone && <ToneIcon tone={content.tone} large={Boolean(content.description)} />}
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={muted}>{content.description}</Text>}
        {content.description && action}
      </div>
      {!content.description && action}
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label={dismissLabel}
          variant='secondary'
          appearance='ghost'
          style={content.description ? { ...closeStyle, ...topCorner } : closeStyle}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

interface MyToastRegionProps extends Omit<ToastRegionProps<Notice>, 'queue' | 'children'> {
  dismissLabel: string
}

export function MyToastRegion({ dismissLabel, ...props }: MyToastRegionProps) {
  return (
    <ToastRegion queue={notices} {...props}>
      <MyToast dismissLabel={dismissLabel} />
    </ToastRegion>
  );
}

export default function Recipe() {
  const [trashed, setTrashed] = useState(false);
  const publishing = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(publishing.current), []);

  const moveToTrash = () => {
    setTrashed(true);
    notices.add(
      { title: 'Moved to Trash', description: 'Launch plan', action: { label: 'Undo', onAction: () => setTrashed(false) } },
      { timeout: 6000 },
    );
  };

  const publish = () => {
    const progress = notices.add({ title: 'Publishing Launch plan…', tone: 'loading' });
    publishing.current = setTimeout(() => {
      notices.close(progress);
      notices.add({
        title: 'Could not publish',
        description: 'You are offline. Your changes are kept on this device.',
        tone: 'error',
        action: { label: 'Try again', onAction: publish },
      });
    }, 1500);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-6)',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 400,
          padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Icon size='lg' style={muted}><FileTextIcon /></Icon>
        <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
          <Text size={3} fontWeight={500}>Launch plan</Text>
          <Text size={2} style={muted}>{trashed ? 'In Trash' : 'Edited 5 min ago'}</Text>
        </div>
        {trashed ? (
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setTrashed(false)}>Restore</Button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={moveToTrash}>Move to Trash</Button>
            <Button size='xs' onClick={publish}>Publish</Button>
          </div>
        )}
      </div>
      <MyToastRegion aria-label='Notifications' dismissLabel='Dismiss' />
    </>
  );
}
```
<!-- /example -->

## Required Parts

- `createToastQueue()`: the queue, made once outside React; `add(content, { timeout })` shows a toast and returns its key, `close(key)` closes it
- `ToastRegion`: the named `role="region"` live region in the top layer that shows the toasts of the queue, rendered once
- `Toast`: one toast, the root of the template, a `role="status"` by default

## Optional Parts

- `ToastClose`: a button that closes its toast after your `onClick`, or with `asChild` your own button, like an Undo or an icon dismiss button
- `useToastContext()`: the content, the key, the place in the stack and `close()` of the toast, read in the template

## Composition Order

1. `createToastQueue()` in a module, outside any component
2. `ToastRegion` with `queue` and `aria-label`, once, near the root of the app
3. The template as the children of the region: your component that calls `useToastContext()`
4. `Toast` at the root of the template
5. The text, icons and `ToastClose` buttons inside `Toast`

## Variants

- `role="status"` (the default) for news that can wait, `role="alert"` for an urgent toast, like an error
- With `timeout` in `add()` the toast closes by itself; without it the toast stays until it is closed. There is no default timeout.
- `placement` on the region: `top-start`, `top`, `top-end` (the default), `bottom-start`, `bottom` or `bottom-end`; at the start and the end they follow the direction of the page, and on a screen up to 40rem wide they are always centered
- `limit` on the region: how many of the newest toasts are shown at once, 3 by default
- `swipeDirections` on the region: the directions a swipe closes a toast in, by default away to the edge the toasts sit at and to the nearer side edge
- Content of any shape: the queue is typed by its content, like `createToastQueue<Notice>()`, and the template decides the look

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

- The timers pause while the pointer is on the toasts, while the focus is inside them, while the window has no focus and while the tab is hidden, and run on with the time they had left. A page in an iframe without the focus, like a preview, keeps its toasts until the user comes to it.
- Over an open modal `<dialog>`, `Dialog`, `Drawer` and `Sheet` included, the region moves into the dialog, so the toasts stay above it and the user can still press them and focus them. When the dialog closes, the region moves back.
- The region shows the `limit` newest toasts. The older ones wait with their timers paused and appear as shown toasts close.
- When the focused toast closes, the focus moves into the next toast, or back to the element that had it before the focus entered the toasts once the last one closes.
- The region is in the document before the first toast, so the screen reader reads the first toast too.
- The toasts have `user-select: none`, so a mouse swipe selects no text. Do not put text the user needs to copy, like a code, into a toast.
- With reduced motion the toasts only fade in and out.
- On a screen up to 40rem wide the region is centered at the top; on a wider one it sits in the top-right corner. Other positions are not part of this version.
- The queue has no `update`: to change a toast, close it and add a new one.
- No hotkey that moves the focus to the toasts is built in; see the [hotkey recipe](./patterns.md#a-hotkey-to-the-newest-toast).

## Common Mistakes

- Making the queue inside a component: every render would make a new, empty queue. Make it once in a module and import it.
- Rendering `ToastRegion` on every screen or next to every button that adds a toast: render it once near the root; `add()` reaches it from anywhere.
- Leaving `ToastRegion` without `aria-label`: the landmark has no name, and the components never set a label themselves.
- Putting the only way to an action in a toast: a toast can time out, be swiped away or never be seen. Every action in a toast, like Undo or Try again, needs a second way, like a "Move to inbox" button in the list.
- Showing a toast as the answer to what the user just did right there, like a saved field or a copied link: show the feedback in place first; a toast is for what happens away from the focus.
- A short timeout on an error or on a toast with an action: give errors no timeout, and actions enough time to read and reach them.
- Looking for `ToastTitle` or `ToastDescription`: name the toast with `aria-labelledby` pointing at your title.
