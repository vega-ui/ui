# NumberField Examples

## Basic

### Basic: bounded quantity field

```tsx
<NumberField min={0} max={10} defaultValue={0}>
  <NumberFieldDecrementButton />
  <NumberFieldInput />
  <NumberFieldIncrementButton />
</NumberField>
```

## Controlled/Stateful

### Controlled/Stateful: controlled value with reset

```tsx
const [value, setValue] = useState(3);

<>
  <NumberField min={0} max={10} value={value} onChangeValue={setValue}>
    <NumberFieldDecrementButton />
    <NumberFieldInput />
    <NumberFieldIncrementButton />
  </NumberField>
  <Button variant='secondary' onClick={() => setValue(0)}>
    Reset to 0
  </Button>
</>
```

## Form/Integration

### Form/Integration: native form submit

```tsx
<form>
  <NumberField min={0} max={99} defaultValue={2}>
    <NumberFieldDecrementButton />
    <NumberFieldInput name='quantity' />
    <NumberFieldIncrementButton />
  </NumberField>
  <Button type='submit'>Submit</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: compact quantity row

```tsx
<NumberField min={1} max={12} defaultValue={1}>
  <NumberFieldDecrementButton />
  <NumberFieldInput />
  <NumberFieldIncrementButton />
</NumberField>
```

## Error

### Error: invalid numeric range

```tsx
<>
  <NumberField error min={0} max={99}>
    <NumberFieldDecrementButton />
    <NumberFieldInput />
    <NumberFieldIncrementButton />
  </NumberField>
  <HelperText error>Enter a value between 0 and 99.</HelperText>
</>
```

## Disabled

### Disabled: locked numeric field

```tsx
<NumberField disabled>
  <NumberFieldDecrementButton />
  <NumberFieldInput placeholder='Disabled' />
  <NumberFieldIncrementButton />
</NumberField>
```

## Edge

### Edge: decimal stepping

```tsx
<NumberField min={0} max={5} step={0.25} defaultValue={1}>
  <NumberFieldDecrementButton />
  <NumberFieldInput />
  <NumberFieldIncrementButton />
</NumberField>
```
