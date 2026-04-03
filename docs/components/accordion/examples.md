# Accordion Examples

## Basic

### Basic: FAQ-style group

Use this as the default pattern when several short sections belong to one grouped disclosure UI.

```tsx
<Accordion>
  <AccordionItem value='shipping'>
    <AccordionHeader>
      <AccordionTrigger>
        Shipping
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Delivery takes 2-5 business days.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Controlled/Stateful

### Controlled/Stateful: externally managed open sections

Use a controlled wrapper when parent state needs to synchronize which items are open.

```tsx
const [opened, setOpened] = useState<string[]>(['security']);

<Accordion opened={opened} onChangeOpened={setOpened} multiple>
  <AccordionItem value='security'>
    <AccordionHeader>
      <AccordionTrigger>
        Security
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>MFA, active sessions, and device restrictions.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Form/Integration

### Form/Integration: settings sections

Use this when a larger form is broken into expandable sections.

```tsx
<Accordion defaultOpened={['profile']}>
  <AccordionItem value='profile'>
    <AccordionHeader>
      <AccordionTrigger>
        Profile
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <TextField>
        <TextFieldInput placeholder='Display name' />
      </TextField>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Layout/Overlay

### Layout/Overlay: accordion inside a drawer

Use this when secondary sections should stay collapsible inside an overlay panel.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open help</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Accordion defaultOpened={['billing']}>
          <AccordionItem value='billing'>
            <AccordionHeader>
              <AccordionTrigger>
                Billing
                <AccordionIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Invoice and payment guidance.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: invalid state inside an expanded section

Use this when a section contains a form row with explicit validation.

```tsx
<Accordion defaultOpened={['password']}>
  <AccordionItem value='password'>
    <AccordionHeader>
      <AccordionTrigger>
        Password
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <FormRow label='Current password' error='Password is required.'>
        <TextField>
          <TextFieldInput aria-invalid='true' />
        </TextField>
      </FormRow>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Disabled

### Disabled: archived section trigger

Use a disabled trigger only when the section is visible but intentionally unavailable.

```tsx
<Accordion>
  <AccordionItem value='archive'>
    <AccordionHeader>
      <AccordionTrigger aria-disabled='true'>
        Archived settings
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Archived content.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Edge

### Edge: custom icon with multiple opened items

Use this when disclosure state should stay visible with a brand-specific or domain-specific icon.

```tsx
<Accordion multiple defaultOpened={['one', 'two']}>
  <AccordionItem value='one'>
    <AccordionHeader>
      <AccordionTrigger>
        First section
        <AccordionIcon>
          <ArrowDown />
        </AccordionIcon>
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>First content.</AccordionContent>
  </AccordionItem>
</Accordion>
```
