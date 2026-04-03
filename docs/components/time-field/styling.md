# TimeField Styling

## Overview

`TimeField` inherits the `TextField` styling contract. Its distinct behavior is masking and parsing, not a separate visual surface.

## Public CSS Variables

There are no dedicated public `--time-field-*` variables in the current implementation.

The component inherits the relevant `TextField` surface tokens:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | inherited wrapper/input | field height |
| `--fills-tertiary` | inherited wrapper | default surface |
| `--color-primary-500` | inherited wrapper | focus outline |
| `--color-error` | inherited wrapper | error outline |

## Part-Level Variables

### Root

The root is a `TextField` wrapper with time-specific context only.

### Input

`TimeFieldInput` is a masked `TextFieldInput` and inherits its typography and spacing.

## State And Variant Interaction

- format changes input behavior, not visual styling
- bounds and step affect masking logic, not the surface
- error and disabled visuals come from the inherited field/input contract

## Examples

### Seconds precision field

```tsx
<TimeField format='HH:MM:SS'>
  <TimeFieldInput placeholder='HH:MM:SS' />
</TimeField>
```

## Do Not Override

- treating format changes as a styling concern
- documenting time-specific styling variables that do not exist in source
