# Collapsible Examples

## Basic

### Basic: inline billing details

Use this when one secondary block should expand inline without grouped accordion behavior.

```tsx
<Collapsible>
  <CollapsibleTrigger>Billing details</CollapsibleTrigger>
  <CollapsibleContent>
    Tax ID, address, and invoice preferences.
  </CollapsibleContent>
</Collapsible>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned open state

Use a controlled wrapper when parent logic needs to synchronize the disclosure state.

```tsx
const [open, setOpen] = useState(false);

<Collapsible open={open} onChangeOpen={setOpen}>
  <CollapsibleTrigger>Advanced filters</CollapsibleTrigger>
  <CollapsibleContent>
    Status, environment, and owner filters appear here.
  </CollapsibleContent>
</Collapsible>
```

## Form/Integration

### Form/Integration: optional filter section

Use this when a form has one secondary block that should stay hidden by default.

```tsx
<Collapsible>
  <CollapsibleTrigger>Advanced filters</CollapsibleTrigger>
  <CollapsibleContent>
    <TextField>
      <TextFieldInput placeholder='Owner' />
    </TextField>
  </CollapsibleContent>
</Collapsible>
```

## Layout/Overlay

### Layout/Overlay: collapsible notes inside a drawer

Use this when one expandable detail block lives inside another layout or overlay surface.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open details</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Collapsible>
          <CollapsibleTrigger>Audit log details</CollapsibleTrigger>
          <CollapsibleContent>
            Actor, timestamp, IP address, and affected resource.
          </CollapsibleContent>
        </Collapsible>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: invalid optional section

Use this when an expandable section contains optional advanced fields that can still become invalid.

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger>Advanced billing settings</CollapsibleTrigger>
  <CollapsibleContent>
    <FormRow label='VAT ID' error='VAT ID is invalid.'>
      <TextField>
        <TextFieldInput aria-invalid='true' />
      </TextField>
    </FormRow>
  </CollapsibleContent>
</Collapsible>
```

## Disabled

### Disabled: disabled trigger rendered as child

Use this when the extra section is visible in the UI model but unavailable in the current state.

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button disabled>Advanced billing options</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Extra billing content.</CollapsibleContent>
</Collapsible>
```

## Edge

### Edge: hidden-state lifecycle callback

Use this when layout code depends on whether the content is actually hidden after transition.

```tsx
<Collapsible onChangeHidden={(hidden) => console.log(hidden)}>
  <CollapsibleTrigger>Transition-aware details</CollapsibleTrigger>
  <CollapsibleContent>
    Content visibility lifecycle can differ from the open state during animation.
  </CollapsibleContent>
</Collapsible>
```
