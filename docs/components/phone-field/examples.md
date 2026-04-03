# PhoneField Examples

## Basic

### Basic: simple ISO-based phone mask

```tsx
<PhoneField code='US'>
  <PhoneFieldInput placeholder='+1 (___) ___-____' autoComplete='tel' />
</PhoneField>
```

## Controlled/Stateful

### Controlled/Stateful: controlled value with clear action

```tsx
const [value, setValue] = useState('');

<>
  <PhoneField code='US' strictMask>
    <PhoneFieldInput
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      placeholder='+1 (___) ___-____'
    />
  </PhoneField>
  <Button variant='secondary' onClick={() => setValue('')}>
    Clear
  </Button>
</>
```

## Form/Integration

### Form/Integration: select with country options and icons

```tsx
<PhoneField defaultCode='RU' strictMask={false}>
  <PhoneFieldSelect>
    <PhoneFieldSelectHiddenSelect />
    <PhoneFieldSelectCombobox>
      <PhoneFieldSelectValue />
      <PhoneFieldSelectIcon />
    </PhoneFieldSelectCombobox>
    <PhoneFieldSelectPortal>
      <PhoneFieldSelectListbox>
        <PhoneFieldSelectOption value='RU'>Russia +7</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='US'>United States +1</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='FR'>France +33</PhoneFieldSelectOption>
      </PhoneFieldSelectListbox>
    </PhoneFieldSelectPortal>
  </PhoneFieldSelect>
  <PhoneFieldInput placeholder='+7' autoComplete='tel' />
</PhoneField>
```

### Form/Integration: uncontrolled native form submit

```tsx
<form>
  <PhoneField code='RU'>
    <PhoneFieldInput name='phone' placeholder='+7 (___) ___-__-__' />
  </PhoneField>
  <Button type='submit'>Submit</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: full field inside a dialog form

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Add contact</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact phone</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <PhoneField code='US'>
          <PhoneFieldInput placeholder='+1 (___) ___-____' />
        </PhoneField>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: invalid number state

```tsx
<PhoneField code='US' error>
  <PhoneFieldInput placeholder='+1 (___) ___-____' />
</PhoneField>
```

## Disabled

### Disabled: disabled input

```tsx
<PhoneField code='US'>
  <PhoneFieldInput disabled placeholder='+1 (___) ___-____' />
</PhoneField>
```

## Edge

### Edge: non-strict mask for lenient paste behavior

```tsx
<PhoneField code='RU' strictMask={false}>
  <PhoneFieldInput placeholder='+7 (___) ___-__-__' />
</PhoneField>
```
