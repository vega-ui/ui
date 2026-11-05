# NumberField Styling

## Overview

`NumberField` reuses the `TextField` surface and adds number-specific alignment plus square stepper buttons tied to the shared input height.

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

Increment and decrement buttons map `--icon-button-size` to `--input-height`.

### Input

`NumberFieldInput` reuses the `TextFieldInput` contract and adds numeric attributes and centered appearance.

## State And Variant Interaction

- size comes from inherited text-field sizing
- disabled behavior is derived from root context
- min/max state typically affects button disabled behavior rather than changing the root surface

## Examples

### Sizes

`size` on the root sets `--input-height`, and the stepper buttons follow it, so they stay square at every size.

<!-- example: number-field/stepper-sizes.tsx -->
```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function StepperSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 220 }}>
      {SIZES.map((size) => (
        <NumberField key={size} size={size} min={0} max={10} defaultValue={3}>
          <NumberFieldDecrementButton aria-label={`Decrease, size ${size}`} />
          <NumberFieldInput aria-label={`Guests, size ${size}`} />
          <NumberFieldIncrementButton aria-label={`Increase, size ${size}`} />
        </NumberField>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Custom stepper icons

Children of `NumberFieldDecrementButton` and `NumberFieldIncrementButton` replace their default icons. Icon-only buttons have no built-in name, so pass `aria-label` to each.

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
        <NumberFieldDecrementButton aria-label='Smaller'>
          <Icon><ChevronDownIcon /></Icon>
        </NumberFieldDecrementButton>
        <NumberFieldInput id={id} />
        <NumberFieldIncrementButton aria-label='Larger'>
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
