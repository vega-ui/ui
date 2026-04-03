# Accordion Patterns

## FAQ Group

When to use:

- Several short answers belong to one help or support block.

Composition notes:

- Keep each trigger specific enough that users can scan the list without opening every item.
- Use one root so all sections share the same disclosure model.

Trade-offs:

- Good for scannable grouped help.
- Weak fit for highly interactive form flows.

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

## Settings Sections

When to use:

- A larger settings form should be broken into manageable expandable blocks.

Composition notes:

- Keep the currently relevant section open by default.
- Make sure collapsed sections still show enough context in their trigger labels.

Trade-offs:

- Helps compress long forms.
- Can hide important validation if section state is not handled carefully.

```tsx
<Accordion defaultOpened={['security']}>
  <AccordionItem value='security'>
    <AccordionHeader>
      <AccordionTrigger>
        Security
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <Label htmlFor='security-email'>Recovery email</Label>
      <TextField>
        <TextFieldInput id='security-email' placeholder='security@company.com' />
      </TextField>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Inline Help Inside Overlays

When to use:

- A drawer or dialog needs expandable secondary guidance without leaving the current task.

Composition notes:

- Keep the accordion secondary to the main task.
- Avoid letting every section become a full-page replacement inside the overlay.

Trade-offs:

- Preserves local context and keeps help close to the task.
- Can create a visually dense panel if too many sections are expanded.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open help</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Accordion>
          <AccordionItem value='shipping'>
            <AccordionHeader>
              <AccordionTrigger>
                Shipping
                <AccordionIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Orders leave the warehouse within 24 hours.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```
