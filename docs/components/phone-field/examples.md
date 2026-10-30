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
  <PhoneField code='US' strictMask value={value} onChangeValue={setValue}>
    <PhoneFieldInput placeholder='+1 (___) ___-____' />
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
    <PhoneFieldSelectListbox>
      <PhoneFieldSelectOption value='RU'>Russia +7</PhoneFieldSelectOption>
      <PhoneFieldSelectOption value='US'>United States +1</PhoneFieldSelectOption>
      <PhoneFieldSelectOption value='FR'>France +33</PhoneFieldSelectOption>
    </PhoneFieldSelectListbox>
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
import type { CSSProperties } from 'react';

<Dialog>
  <DialogTrigger asChild>
    <Button>Add contact</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='contact-phone-title'>
    <Heading id='contact-phone-title' as='h2' size={4} fontWeight={600}>Contact phone</Heading>
    <DialogClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DialogClose>
    <PhoneField code='US'>
      <PhoneFieldInput placeholder='+1 (___) ___-____' />
    </PhoneField>
  </DialogContent>
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
