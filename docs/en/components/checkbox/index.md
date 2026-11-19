# Checkbox

## Doc Profile

`advanced interactive`

## Summary

`Checkbox` is a [compound component](../../glossary.md#compound-component) for independent selectable options, with optional native form participation, indicator rendering, and indeterminate state support. It is the selection-family primitive for independent or combinable choices rather than immediate setting toggles.

## Imports

```tsx
import {
  Checkbox,
  CheckboxInput,
  CheckboxIndicator,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxVariant,
} from '@vega-ui/react';
```

## Exported Types

- `CheckboxProps`
- `CheckboxInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxSize`
- `CheckboxVariant`

## Minimal Composition

<!-- example: checkbox/minimal-composition.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Checkbox>
      <CheckboxInput name='remember' />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      Remember me on this device
    </Checkbox>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyCheckbox` passes its props to the native `CheckboxInput`, like an `<input type="checkbox">`, and its children become the label. See [Component recipes](../../recipes.md).

<!-- example: checkbox/recipe.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  type CheckboxInputProps,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export function MyCheckbox({ children, ...props }: CheckboxInputProps) {
  return (
    <Checkbox>
      <CheckboxInput {...props} />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      {children}
    </Checkbox>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <MyCheckbox name='remember' defaultChecked>Remember me on this device</MyCheckbox>
      <MyCheckbox name='files' indeterminate>Some files are selected</MyCheckbox>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Checkbox`: root state and label surface
- `CheckboxInput`: the native checkbox — focus, keyboard, state and form value
- `CheckboxIndicator`: visible checkbox surface

## Optional Parts

- `CheckboxCheckedIcon`: shows the check mark you pass while checked
- `CheckboxIndeterminateIcon`: shows the minus you pass while indeterminate

## Composition Order

1. `Checkbox`
2. `CheckboxInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. label text

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: unchecked, checked, indeterminate, disabled

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

- Give `CheckboxInput` a `name` for native form submission.
- Indeterminate usually represents partial selection rather than a third final value.
- Keep indicator and text inside one unified clickable row.
- If the control represents one immediate system setting, `Switch` is usually clearer than a checkbox row.

## Common Mistakes

- Leaving out `CheckboxInput`, which is the actual control.
- Treating indeterminate as a final persisted state by default.
- Using checkbox UI for mutually exclusive options.
