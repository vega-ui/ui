# Drawer Patterns

## Side Inspector

When to use:

- The user needs contextual details without leaving the page.

Composition notes:

- Keep the content contextual to the current selection.
- Name the drawer with a heading referenced by `aria-labelledby` so the inspector purpose stays obvious.

Trade-offs:

- Preserves context.
- Weaker for highly modal decisions.

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Inspect widget</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='widget-details-title'>
    <Heading id='widget-details-title' as='h2' size={4} fontWeight={600}>Widget details</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>Review the selected widget status, source, and owner without leaving the dashboard.</Text>
  </DrawerContent>
</Drawer>
```

## Short Form Flow

When to use:

- A small edit or invite flow should stay attached to the page.

Composition notes:

- Keep actions reachable at the bottom.
- Do not let a short form silently grow into a full-page workflow.

Trade-offs:

- Less interruptive than a dialog.
- Easier to overload with too much content.

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Invite members</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='invite-members-title'>
    <Heading id='invite-members-title' as='h2' size={4} fontWeight={600}>Invite members</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TextField>
        <TextFieldInput placeholder='name@company.com' aria-label='Email' />
      </TextField>
      <Button type='submit'>Send invite</Button>
    </form>
  </DrawerContent>
</Drawer>
```

## Activity Panel

When to use:

- The content is long and secondary.

Composition notes:

- Use inner scrolling.
- Keep title and actions stable while the body scrolls.

Trade-offs:

- Good for logs and timelines.
- Needs careful viewport testing.

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>View activity</Button>
  </DrawerTrigger>
  <DrawerContent shadowed fullHeight aria-labelledby='activity-title'>
    <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <div style={{ overflow: 'auto' }}>
      <Text size={2}>09:14 Published release notes</Text>
      <Text size={2}>09:22 Added billing contact</Text>
      <Text size={2}>09:40 Downloaded CSV export</Text>
    </div>
  </DrawerContent>
</Drawer>
```
