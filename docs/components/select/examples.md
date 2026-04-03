# Select Examples

## Basic

### Basic: field variant

```tsx
<Select defaultValue='react'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='react'>React</SelectOption>
      <SelectOption value='vue'>Vue</SelectOption>
      <SelectOption value='svelte'>Svelte</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## Controlled/Stateful

### Controlled/Stateful: controlled value with clear action

```tsx
const [value, setValue] = useState<string | number | undefined>('medium');

<>
  <Button
    variant='secondary'
    appearance='ghost'
    disabled={value === undefined}
    onClick={() => setValue(undefined)}
  >
    Clear
  </Button>

  <Select value={value} onSelectValue={setValue}>
    <SelectHiddenSelect />
    <SelectCombobox>
      <SelectValue placeholder='Select incident priority' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='low'>Low</SelectOption>
        <SelectOption value='medium'>Medium</SelectOption>
        <SelectOption value='high'>High</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
</>
```

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<>
  <Button variant='secondary' onClick={() => setOpen((v) => !v)}>
    {open ? 'Close' : 'Open'}
  </Button>

  <Select open={open} onOpenChange={setOpen} defaultValue='beta'>
    <SelectHiddenSelect />
    <SelectCombobox>
      <SelectValue placeholder='Pick an option' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='alpha'>Alpha</SelectOption>
        <SelectOption value='beta'>Beta</SelectOption>
        <SelectOption value='gamma'>Gamma</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
</>
```

## Form/Integration

### Form/Integration: searchable listbox

```tsx
<Select typeMatchEnabled={false}>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select country' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <TextField>
        <TextFieldInput placeholder='Search country' />
      </TextField>
      <SelectOption value='fr'>France</SelectOption>
      <SelectOption value='de'>Germany</SelectOption>
      <SelectOption value='jp'>Japan</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

### Form/Integration: native form participation

```tsx
<form>
  <Label htmlFor='framework'>Framework</Label>
  <Select defaultValue='react'>
    <SelectHiddenSelect />
    <SelectCombobox id='framework'>
      <SelectValue placeholder='Select framework' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='react'>React</SelectOption>
        <SelectOption value='vue'>Vue</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
  <Button type='submit'>Submit</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: inline variant inside sentence-like UI

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
  <Text size={3}>Notify me</Text>
  <Select variant='inline' defaultValue='weekly'>
    <SelectHiddenSelect />
    <SelectCombobox>
      <SelectValue placeholder='frequency' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='daily'>Daily</SelectOption>
        <SelectOption value='weekly'>Weekly</SelectOption>
        <SelectOption value='monthly'>Monthly</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
  <Text size={3}>about updates.</Text>
</div>
```

### Layout/Overlay: select inside dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open settings</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Template</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>

        <Select defaultValue='template-a'>
          <SelectHiddenSelect />
          <SelectCombobox>
            <SelectValue placeholder='Select template' />
            <SelectIcon />
          </SelectCombobox>
          <SelectPortal>
            <SelectListbox>
              <SelectOption value='template-a'>Template A</SelectOption>
              <SelectOption value='template-b'>Template B</SelectOption>
              <SelectOption value='template-c'>Template C</SelectOption>
            </SelectListbox>
          </SelectPortal>
        </Select>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Disabled

### Disabled: fully disabled field

```tsx
<Select disabled defaultValue='alpha'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='alpha'>React</SelectOption>
      <SelectOption value='beta'>Vue</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## Edge

### Edge: read-only field

```tsx
<Select readOnly defaultValue='beta'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='alpha'>React</SelectOption>
      <SelectOption value='beta'>Vue</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

### Edge: long scrollable option list

```tsx
<Select defaultValue='item-12'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select an item' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox style={{ maxHeight: 280, overflow: 'auto' }}>
      {Array.from({ length: 40 }).map((_, i) => {
        const value = `item-${i + 1}`;
        return (
          <SelectOption key={value} value={value}>
            Item #{i + 1}
          </SelectOption>
        );
      })}
    </SelectListbox>
  </SelectPortal>
</Select>
```
