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
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlHiddenInput,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardDescription,
  CheckboxCardTitle,
  type CheckboxCardContentProps,
  type CheckboxCardControlCheckedIconProps,
  type CheckboxCardControlHiddenInputProps,
  type CheckboxCardControlIndeterminateIconProps,
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
- `CheckboxCardControlHiddenInputProps`
- `CheckboxCardControlCheckedIconProps`
- `CheckboxCardControlIndeterminateIconProps`

## Minimal Composition

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Starter plan</CheckboxCardTitle>
    <CheckboxCardDescription>For small projects.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Required Parts

- `CheckboxCard`: root card surface and checkbox-card context
- `CheckboxCardContent`: text content region
- `CheckboxCardControl`: control region for input and indicator

## Optional Parts

- `CheckboxCardTitle`
- `CheckboxCardDescription`
- `CheckboxCardControlHiddenInput`
- `CheckboxCardControlCheckedIcon`
- `CheckboxCardControlIndeterminateIcon`

## Composition Order

1. `CheckboxCard`
2. `CheckboxCardContent`
3. `CheckboxCardTitle` and `CheckboxCardDescription`
4. `CheckboxCardControl`
5. optional hidden input and icons inside the control

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
- Use the hidden input control if the card belongs to a form.
- Long descriptions should not obscure the main selection affordance.
- If the group is actually exclusive, a radio-family or segmented control usually communicates intent better than checkbox cards.

## Common Mistakes

- Making only the tiny control clickable instead of the whole card.
- Using checkbox cards for single-select groups that should be radios or segmented controls.
- Letting descriptions dominate the selection affordance.
