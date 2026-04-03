# PhoneField Patterns

## Country-Aware Contact Form

When to use:

- the product stores international phone numbers

Composition notes:

- keep the country select visible
- normalize values at submit time

Trade-offs:

- better international correctness
- more complex form behavior than a plain text input

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
        <PhoneFieldSelectOption value='RU'>Russia</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='US'>United States</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='DE'>Germany</PhoneFieldSelectOption>
      </PhoneFieldSelectListbox>
    </PhoneFieldSelectPortal>
  </PhoneFieldSelect>
  <PhoneFieldInput />
</PhoneField>
```

## Strict Mask Entry

When to use:

- the entry format should stay tightly constrained

Composition notes:

- use `strictMask`
- retest caret movement and paste behavior

Trade-offs:

- cleaner formatted input
- less forgiving editing

```tsx
<PhoneField code='RU' strictMask>
  <PhoneFieldInput />
</PhoneField>
```

## Lenient Paste Flow

When to use:

- users often paste phone numbers from external systems

Composition notes:

- use `strictMask={false}`
- normalize at the feature boundary

Trade-offs:

- better paste tolerance
- weaker in-field formatting guarantees

```tsx
<PhoneField code='US' strictMask={false}>
  <PhoneFieldInput />
</PhoneField>
```
