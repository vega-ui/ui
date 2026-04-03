# Label Patterns

## Explicit Label And Input Id

When to use:

- the label and control are rendered as separate siblings

Composition notes:

- give the control a stable `id`
- connect `Label` with `htmlFor`

Trade-offs:

- clear and explicit
- requires id management

```tsx
<>
  <Label htmlFor='email'>Email</Label>
  <TextField id='email'>
    <TextFieldInput />
  </TextField>
</>
```

## Wrapped Checkbox Label

When to use:

- the label and indicator should form one click target

Composition notes:

- wrap the checkbox inside `Label`
- keep the text concise

Trade-offs:

- improves hit area
- less suitable for complex nested layouts

```tsx
<Label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox />
  Email me weekly updates
</Label>
```

## Label With Helper Copy

When to use:

- the field needs visible labeling plus secondary guidance

Composition notes:

- keep the actual label separate from helper text
- place helper copy below the control or nearby

Trade-offs:

- preserves clear semantics
- requires an extra text element for guidance

```tsx
<div style={{ display: 'grid', gap: 4 }}>
  <Label htmlFor='slug'>Workspace slug</Label>
  <TextField id='slug'>
    <TextFieldInput />
  </TextField>
  <Text size={2}>Used in public URLs.</Text>
</div>
```
