# Button Troubleshooting

## Button Does Not Submit The Form

### Symptom

The button is inside a form, but clicking it does not submit.

### Likely Cause

`Button` defaults to `type='button'`.

### How To Verify

- Inspect the rendered `type`.
- Check whether submit behavior was expected but never configured.

### Fix

- Set `type='submit'` when the button should submit the form.

## Polymorphic Button Behaves Strangely

### Symptom

The control renders, but the child element does not support the forwarded props as expected.

### Likely Cause

`asChild` was used with an incompatible child element.

### How To Verify

- Inspect the rendered child element.
- Check whether it supports the intended props and semantics.

### Fix

- Use a child that matches the intended semantics, such as an anchor for navigation.
- Keep plain button rendering when polymorphism is unnecessary.

## Button Should Probably Be A Link

### Symptom

The control works visually, but the interaction is really navigation.

### Likely Cause

`Button` was chosen for a navigation pattern that should keep link semantics.

### How To Verify

- Ask whether the primary job is action or navigation.
- Compare the flow with `Link` or `Button asChild`.

### Fix

- Use `Link` for plain text navigation.
- Use `Button asChild` with a real anchor when button visuals are still needed.
