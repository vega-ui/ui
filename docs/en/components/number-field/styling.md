# NumberField Styling

## Overview

`NumberField` reuses the `TextField` surface and adds number-specific alignment plus stepper buttons tied to the shared input height.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | stepper buttons | keeps controls square with the field |
| `--text-color` | stepper buttons | icon color |
| `--fills-quaternary-hover` | stepper buttons | hover state |
| `--fills-quaternary-active` | stepper buttons | active state |
| `--button-color` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button icon color. |
| `--button-color-hover` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button icon color on hover. |
| `--button-color-active` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button icon color while pressed. |
| `--button-background-color` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button background. |
| `--button-background-color-hover` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button background on hover. |
| `--button-background-color-active` | `NumberFieldIncrementButton`, `NumberFieldDecrementButton` | Button background while pressed. |

## Part-Level Variables

### Root

The root adds centered text alignment through `.numberTextField`.

### Buttons

Increment and decrement buttons map `--button-height` to `--input-height`.

### Input

`NumberFieldInput` reuses the `TextFieldInput` contract and adds numeric attributes and centered appearance.

## State And Variant Interaction

- size comes from inherited text-field sizing
- disabled behavior is derived from root context
- min/max state typically affects button disabled behavior rather than changing the root surface
- the error look follows `aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `NumberFieldInput`

`NumberField` writes the text of `NumberFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.seat-count:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Examples

### Sizes

`size` on the root sets `--input-height`, and the stepper buttons follow it; with `square` they stay square at every size.

<!-- example: number-field/stepper-sizes.tsx -->
```tsx
import {
  Icon,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function StepperSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 220 }}>
      {SIZES.map((size) => (
        <NumberField key={size} size={size} min={0} max={10} defaultValue={3}>
          <NumberFieldDecrementButton square aria-label={`Decrease, size ${size}`}><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput aria-label={`Guests, size ${size}`} />
          <NumberFieldIncrementButton square aria-label={`Increase, size ${size}`}><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Custom stepper icons

The icons of `NumberFieldDecrementButton` and `NumberFieldIncrementButton` are their children, so any icon fits. Icon-only buttons with `square` have no built-in name, so pass `aria-label` to each.

<!-- example: number-field/custom-stepper-icons.tsx -->
```tsx
import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function CustomStepperIcons() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 200 }}>
      <Label htmlFor={id}>Font size, px</Label>
      <NumberField min={8} max={72} defaultValue={16}>
        <NumberFieldDecrementButton square aria-label='Smaller'>
          <Icon><ChevronDownIcon /></Icon>
        </NumberFieldDecrementButton>
        <NumberFieldInput id={id} />
        <NumberFieldIncrementButton square aria-label='Larger'>
          <Icon><ChevronUpIcon /></Icon>
        </NumberFieldIncrementButton>
      </NumberField>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- breaking the square relationship between field height and stepper buttons
- styling steppers as unrelated icon buttons with mismatched size
