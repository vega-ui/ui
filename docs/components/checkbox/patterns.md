# Checkbox Patterns

## Independent Settings List

When to use:

- Several options can be enabled independently in the same form.

Composition notes:

- Keep each checkbox and its text in one label row.
- Use hidden inputs when the form submits natively.

Trade-offs:

- Strong form semantics.
- Can feel visually repetitive in long settings lists.

```tsx
<Checkbox>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Incident alerts
</Checkbox>
```

## Parent Selection With Indeterminate State

When to use:

- A parent item summarizes partial child selection.

Composition notes:

- Treat indeterminate as visual partial state, not a separate persisted value.
- Align parent and child selection logic before wiring the UI.

Trade-offs:

- Good for nested selection models.
- Easy to misuse if the data model does not really support partial selection.

```tsx
<Checkbox indeterminate>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Select all
</Checkbox>
```

## Agreement Checkbox

When to use:

- A single independent confirmation is required before submit.

Composition notes:

- Keep validation explicit.
- Do not confuse agreement semantics with a switch-like settings toggle.

Trade-offs:

- Clear form convention.
- Weak fit for immediate preference toggles.

```tsx
<Checkbox>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Accept terms
</Checkbox>
```
