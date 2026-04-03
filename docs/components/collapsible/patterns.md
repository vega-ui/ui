# Collapsible Patterns

## Advanced Filters Block

When to use:

- One secondary form block should stay hidden until needed.

Composition notes:

- Keep the trigger explicit about what becomes available after expansion.
- Treat hidden form errors carefully if the section can be collapsed.

Trade-offs:

- Keeps the main form compact.
- Can hide complexity or validation too effectively if labels are weak.

```tsx
<Collapsible>
  <CollapsibleTrigger>Advanced filters</CollapsibleTrigger>
  <CollapsibleContent>
    <TextField>
      <TextFieldInput placeholder='Assignee' />
    </TextField>
    <TextField>
      <TextFieldInput placeholder='Tag' />
    </TextField>
  </CollapsibleContent>
</Collapsible>
```

## Inline Help Details

When to use:

- One secondary explanation block should stay close to the current content.

Composition notes:

- Keep the hidden content short enough that the trigger still feels like an inline disclosure.
- Prefer `Collapsible` over `Popover` when the explanation should stay in document flow.

Trade-offs:

- Preserves reading flow and layout continuity.
- Weaker fit for richly interactive or task-heavy content.

```tsx
<Collapsible>
  <CollapsibleTrigger>Billing details</CollapsibleTrigger>
  <CollapsibleContent>
    <Text size={2}>Invoices are generated on the first day of each month and emailed to billing contacts.</Text>
  </CollapsibleContent>
</Collapsible>
```

## Secondary Details In Overlays

When to use:

- A drawer or dialog contains one optional detail block that should stay hidden by default.

Composition notes:

- Keep the collapsible content clearly secondary to the main task.
- Test dynamic height with realistic overlay content.

Trade-offs:

- Adds progressive disclosure without introducing another overlay.
- Can make dense panels harder to scan if overused.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open details</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Collapsible>
          <CollapsibleTrigger>Show technical details</CollapsibleTrigger>
          <CollapsibleContent>
            <Text size={2}>The export runs with cached filters and may take up to 30 seconds.</Text>
          </CollapsibleContent>
        </Collapsible>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```
