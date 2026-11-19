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

<!-- example: alert/minimal-composition.tsx -->
```tsx
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
} from '@vega-ui/react';
import { CircleCheckIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Alert variant='success' style={{ width: '100%' }}>
      <AlertIcon><CircleCheckIcon /></AlertIcon>
      <AlertMain>
        <AlertTitle>Saved</AlertTitle>
        <AlertContent>Profile updated successfully.</AlertContent>
      </AlertMain>
    </Alert>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyAlert` passes its props to `Alert` and picks the icon by `variant`: an info sign for info, a check for success, a triangle for warning and a circled mark for error. See [Component recipes](../../recipes.md).

<!-- example: alert/recipe.tsx -->
```tsx
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  type AlertProps,
} from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

const icons: Record<string, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlertIcon />,
  error: <CircleAlertIcon />,
};

export function MyAlert({ variant = 'info', children, ...props }: AlertProps) {
  return (
    <Alert variant={variant} {...props}>
      <AlertIcon>{icons[variant]}</AlertIcon>
      {children}
    </Alert>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <MyAlert>
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard is read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='success'>
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='warning'>
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB.</AlertContent>
        </AlertMain>
      </MyAlert>
      <MyAlert variant='error'>
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </MyAlert>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Alert`: root feedback surface
- `AlertMain`: main text wrapper

## Optional Parts

- `AlertIcon`: the icon you pass for the message, in the color of the variant
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
