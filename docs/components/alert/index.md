# Alert

## Doc Profile

`advanced interactive`

## Summary

`Alert` presents short feedback or status messages with optional icon, title, and content areas. It is the message-level feedback surface when a `Badge` is too small and a `Card` would be too neutral.

## Imports

```tsx
import {
  Alert,
  AlertIcon,
  AlertMain,
  AlertTitle,
  AlertContent,
  type AlertProps,
} from '@vega-ui/react';
```

## Exported Types

- `AlertProps`
- `AlertIconProps`
- `AlertMainProps`
- `AlertTitleProps`
- `AlertContentProps`

## Minimal Composition

```tsx
<Alert variant='success'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Saved</AlertTitle>
    <AlertContent>Profile updated successfully.</AlertContent>
  </AlertMain>
</Alert>
```

## Required Parts

- `Alert`: root feedback surface
- `AlertMain`: main text wrapper

## Optional Parts

- `AlertIcon`: semantic icon surface
- `AlertTitle`: stronger visual hierarchy
- `AlertContent`: supporting message copy

## Composition Order

1. `Alert`
2. `AlertIcon`
3. `AlertMain`
4. `AlertTitle`
5. `AlertContent`

## Variants

- Semantic variants: `success`, `error`, `warning`, `info`
- Appearances: `fill`, `surface`
- Compositional variants: with or without icon, with or without title

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Use a title only when the alert needs stronger hierarchy.
- Keep content short; long-form content belongs elsewhere.
- Match the alert variant to semantics, not just visual color.
- If the content becomes procedural, multi-step, or highly interactive, the right pattern is usually no longer an alert.

## Common Mistakes

- Using alerts for persistent page layout instead of feedback.
- Encoding severity only by color or icon.
- Placing complex workflows into an alert body.
