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

### Compact stepper

```tsx
<NumberField size='sm'>
  <NumberFieldDecrementButton />
  <NumberFieldInput />
  <NumberFieldIncrementButton />
</NumberField>
```

## Do Not Override

- breaking the square relationship between field height and stepper buttons
- styling steppers as unrelated icon buttons with mismatched size
