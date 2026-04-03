# Drawer Patterns

## Side Inspector

When to use:

- The user needs contextual details without leaving the page.

Composition notes:

- Keep the content contextual to the current selection.
- Use `DrawerHeader` and `DrawerTitle` so the inspector purpose stays obvious.

Trade-offs:

- Preserves context.
- Weaker for highly modal decisions.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Inspect widget</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <DrawerHeader>
          <DrawerTitle>Widget details</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text size={3}>Review the selected widget status, source, and owner without leaving the dashboard.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
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
<Drawer>
  <DrawerTrigger asChild>
    <Button>Invite members</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <DrawerHeader>
          <DrawerTitle>Invite members</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <TextField>
          <TextFieldInput placeholder='name@company.com' />
        </TextField>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
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
<Drawer>
  <DrawerTrigger asChild>
    <Button>View activity</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <DrawerHeader>
          <DrawerTitle>Activity</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <div style={{ maxHeight: 360, overflow: 'auto' }}>
          <Text size={2}>09:14 Published release notes</Text>
          <Text size={2}>09:22 Added billing contact</Text>
          <Text size={2}>09:40 Downloaded CSV export</Text>
        </div>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```
