# Listbox Examples

## Basic

### Basic: one choice

```tsx
<Listbox aria-label='Delivery method' defaultValue='courier'>
  <ListboxOption value='pickup'>Pickup point</ListboxOption>
  <ListboxOption value='courier'>Courier</ListboxOption>
  <ListboxOption value='post'>Post office</ListboxOption>
</Listbox>
```

## Controlled/Stateful

### Controlled/Stateful: value with a reset

```tsx
const [font, setFont] = useState<string | null | undefined>('serif');

<>
  <Listbox aria-label='Font' value={font} onChangeValue={setFont}>
    <ListboxOption value='serif'>Serif</ListboxOption>
    <ListboxOption value='sans'>Sans-serif</ListboxOption>
  </Listbox>
  <Button onClick={() => setFont(null)}>Clear</Button>
</>
```

### Controlled/Stateful: several choices

```tsx
const [toppings, setToppings] = useState(['cheese']);

<Listbox aria-label='Pizza toppings' multiple value={toppings} onChangeValue={setToppings}>
  <ListboxOption value='cheese'>Extra cheese</ListboxOption>
  <ListboxOption value='olives'>Olives</ListboxOption>
</Listbox>
```

## Form/Integration

### Form/Integration: visible label

```tsx
<>
  <Text id='airport-label'>Airport</Text>
  <Listbox aria-labelledby='airport-label'>
    <ListboxOption value='cdg'>Paris Charles de Gaulle</ListboxOption>
    <ListboxOption value='hnd'>Tokyo Haneda</ListboxOption>
  </Listbox>
</>
```

## Layout/Overlay

### Layout/Overlay: groups and a scrolling list

```tsx
<Listbox aria-label='Airport' style={{ maxHeight: 240 }}>
  <ListboxGroup aria-labelledby='france'>
    <Text id='france'>France</Text>
    <ListboxOption value='cdg'>Paris Charles de Gaulle</ListboxOption>
  </ListboxGroup>
  <ListboxGroup aria-labelledby='japan'>
    <Text id='japan'>Japan</Text>
    <ListboxOption value='hnd'>Tokyo Haneda</ListboxOption>
  </ListboxGroup>
</Listbox>
```

## Error

### Error: explain an empty required choice

```tsx
<>
  <Listbox aria-label='Plan' aria-describedby='plan-error' aria-invalid>
    <ListboxOption value='free'>Free</ListboxOption>
    <ListboxOption value='team'>Team</ListboxOption>
  </Listbox>
  <HelperText id='plan-error' error>Choose a plan to continue.</HelperText>
</>
```

## Disabled

### Disabled: the whole list and one option

```tsx
<Listbox aria-label='Plan' disabled defaultValue='team'>
  <ListboxOption value='team'>Team</ListboxOption>
</Listbox>

<Listbox aria-label='Plan'>
  <ListboxOption value='legacy' disabled>Legacy</ListboxOption>
  <ListboxOption value='team'>Team</ListboxOption>
</Listbox>
```

## Edge

### Edge: rich content with a label for typeahead

```tsx
<Listbox aria-label='Assignee'>
  <ListboxOption value='boris' label='Boris'>
    <span>Developer</span> <strong>Boris</strong>
  </ListboxOption>
</Listbox>
```
