# Link Troubleshooting

## Link Should Probably Be A Button

### Symptom

The interaction looks fine, but the element performs an action instead of navigation.

### Likely Cause

`Link` was chosen for something that mutates state or submits data.

### How To Verify

- Ask whether the primary job is navigation or action.
- Check whether the interaction changes local or remote state.

### Fix

- Use `Button` for actions.
- Keep `Link` for real navigation.

## Link Text Is Too Vague

### Symptom

Users cannot tell where the link goes from the text alone.

### Likely Cause

The visible copy is generic, such as "Click here".

### How To Verify

- Read the link text without surrounding explanation.
- Check whether the destination is still understandable.

### Fix

- Rewrite the link text so it describes the destination or result clearly.

## Router-Composed Link Loses Semantics

### Symptom

The link looks correct but the rendered child no longer behaves like a link.

### Likely Cause

`asChild` was used with a child that does not preserve link semantics.

### How To Verify

- Inspect the rendered root element.
- Check whether it still behaves as a real link.

### Fix

- Use a router component that preserves link-like rendering and behavior.
- Keep plain anchor rendering when polymorphism is unnecessary.
