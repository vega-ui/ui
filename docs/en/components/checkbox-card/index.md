# CheckboxCard

## Doc Profile

`advanced interactive`

## Summary

`CheckboxCard` combines checkbox behavior with a richer card surface for plans, templates, and selectable settings tiles. It wraps `Card`, exposes card-specific content parts, and syncs control state through checkbox-card context. It is the rich-content multi-select option layer when compact checkbox rows are no longer enough.

## Imports

```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  type CheckboxCardContentProps,
  type CheckboxCardControlInputProps,
  type CheckboxCardControlProps,
  type CheckboxCardDescriptionProps,
  type CheckboxCardProps,
  type CheckboxCardTitleProps,
} from '@vega-ui/react';
```

## Exported Types

- `CheckboxCardProps`
- `CheckboxCardContentProps`
- `CheckboxCardTitleProps`
- `CheckboxCardDescriptionProps`
- `CheckboxCardControlProps`
- `CheckboxCardControlInputProps`

## Minimal Composition

<!-- example: checkbox-card/minimal-composition.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <CheckboxCard>
      <CheckboxCardContent>
        <CheckboxCardTitle>Daily backups</CheckboxCardTitle>
        <CheckboxCardDescription>Snapshots are kept for 30 days.</CheckboxCardDescription>
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlInput name='backups' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyCheckboxCard` passes its props to the native checkbox, renders its children as the title and `description` under it, and adds the indicator with the state icons. See [Component recipes](../../recipes.md).

<!-- example: checkbox-card/recipe.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  type CheckboxCardControlInputProps,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

interface MyCheckboxCardProps extends CheckboxCardControlInputProps {
  description?: ReactNode
}

export function MyCheckboxCard({ description, children, ...props }: MyCheckboxCardProps) {
  return (
    <CheckboxCard>
      <CheckboxCardContent>
        <CheckboxCardTitle>{children}</CheckboxCardTitle>
        {description && <CheckboxCardDescription>{description}</CheckboxCardDescription>}
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlInput {...props} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <MyCheckboxCard name='addons' value='backups' description='Snapshots are kept for 30 days.' defaultChecked>
        Daily backups
      </MyCheckboxCard>
      <MyCheckboxCard name='addons' value='audit-log' description='A 365-day history of every change.'>
        Audit log
      </MyCheckboxCard>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `CheckboxCard`: root card surface and checkbox-card context
- `CheckboxCardContent`: text content region
- `CheckboxCardControl`: control region for input and indicator
- `CheckboxCardControlInput`: the native checkbox inside the control
- `CheckboxIndicator` (from `Checkbox`): the visible box inside the control

## Optional Parts

- `CheckboxCardTitle`
- `CheckboxCardDescription`
- `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon` (from `Checkbox`): inside `CheckboxIndicator`, they show the check mark and the minus you pass as children

## Composition Order

1. `CheckboxCard`
2. `CheckboxCardContent`
3. `CheckboxCardTitle` and `CheckboxCardDescription`
4. `CheckboxCardControl`
5. `CheckboxCardControlInput` and `CheckboxIndicator` with the state icons inside the control

## Variants

- Variant: `primary`, `secondary`
- Orientation: `vertical`, `horizontal`
- State: checked, unchecked, indeterminate, disabled

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Ensure the card communicates checked and disabled states clearly across the whole surface.
- Give `CheckboxCardControlInput` a `name` if the card belongs to a form.
- Long descriptions should not obscure the main selection affordance.
- If the group is actually exclusive, a radio-family or segmented control usually communicates intent better than checkbox cards.

## Common Mistakes

- Making only the tiny control clickable instead of the whole card.
- Using checkbox cards for single-select groups that should be radios or segmented controls.
- Letting descriptions dominate the selection affordance.
