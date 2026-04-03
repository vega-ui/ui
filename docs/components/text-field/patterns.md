# TextField Patterns

## Search Row

When to use:

- a field needs a trailing submit or search action

Composition notes:

- keep the input first and the action second
- match action size to the field size

Trade-offs:

- compact and practical
- adds more horizontal density than a plain field

```tsx
<TextField>
  <TextFieldInput type='search' placeholder='Search invoices' />
  <Button size='md'>Search</Button>
</TextField>
```

## Counter Or Status Suffix

When to use:

- the current value needs lightweight inline feedback

Composition notes:

- keep suffix text short
- avoid pushing the input too narrow

Trade-offs:

- immediate feedback
- can reduce usable input width

```tsx
<TextField>
  <TextFieldInput />
  <Text size={2} style={{ opacity: 0.7, whiteSpace: 'nowrap', paddingInline: 24 }}>
    12
  </Text>
</TextField>
```

## Prefix And Suffix Controls

When to use:

- the field is part of a compact numeric or search interaction

Composition notes:

- preserve one obvious main input area
- keep control affordances clear

Trade-offs:

- efficient for dense controls
- easier to overload than a plain field

```tsx
<TextField>
  <IconButton size='md' variant='secondary' appearance='ghost' aria-label='Decrease'>
    <Icon><Minus /></Icon>
  </IconButton>
  <TextFieldInput inputMode='numeric' />
  <IconButton size='md' variant='secondary' appearance='ghost' aria-label='Increase'>
    <Icon><Plus /></Icon>
  </IconButton>
</TextField>
```
