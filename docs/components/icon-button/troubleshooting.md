# IconButton Troubleshooting

## Action Meaning Is Unclear

### Symptom

Users see the icon but do not know what the action does.

### Likely Cause

`IconButton` was used for an action that needs visible text or stronger context.

### How To Verify

- Hide surrounding context and inspect whether the action is still obvious.
- Check whether the same icon has a stable meaning elsewhere in the product.

### Fix

- Switch to `Button` if visible text improves clarity.
- Keep icon-only treatment for familiar actions.

## Missing Accessible Name

### Symptom

The button works visually but has no clear accessible label.

### Likely Cause

No `aria-label` or equivalent supported labeling was provided.

### How To Verify

- Inspect the rendered markup.
- Test with accessibility tooling or screen reader output.

### Fix

- Provide an explicit accessible label.

## Polymorphic IconButton Behaves Strangely

### Symptom

The icon-button visuals render, but the child element does not support the intended semantics or props.

### Likely Cause

`asChild` was used with an incompatible child element.

### How To Verify

- Inspect the rendered child element.
- Check whether it matches the intended action or navigation semantics.

### Fix

- Use a child that supports the intended behavior.
- Keep default rendering when polymorphism is unnecessary.
