# TextField

## Doc Profile

`advanced interactive`

## Summary

`TextField` is a [compound component](../../glossary.md#compound-component) for single-line text entry. The root provides shared size and error state, while `TextFieldInput` owns the native input element. It is the base single-line field wrapper that other specialized text-entry controls build on.

## Imports

```tsx
import {
  TextField,
  TextFieldInput,
  type TextFieldInputProps,
  type TextFieldProps,
  type TextFieldSize,
} from '@vega-ui/react';
```

## Exported Types

- `TextFieldProps`
- `TextFieldInputProps`
- `TextFieldSize = 'sm' | 'md' | 'lg' | string`

## Minimal Composition

```tsx
<TextField>
  <TextFieldInput placeholder='name@company.com' />
</TextField>
```

## Required Parts

- `TextField`: layout wrapper with size and error context
- `TextFieldInput`: native input element

## Optional Parts

- prefix or suffix children such as `Button`, `IconButton`, counters, or status text

## Composition Order

1. `TextField`
2. optional leading child
3. `TextFieldInput`
4. optional trailing child

## Variants

- Size: `sm`, `md`, `lg`
- State: default, `error`, disabled input
- Composition: plain input, prefix/suffix controls, controlled or uncontrolled value

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

- `TextField` itself is not the input; form attributes belong on `TextFieldInput`.
- Prefix and suffix actions change hit area and layout density, so they should be intentional.
- Error visuals live on the wrapper, but input semantics still belong to the native input.
- Once masking, password reveal, numeric stepping, or phone formatting become part of the field contract, a specialized field is usually clearer than stretching `TextField`.

## Common Mistakes

- Passing `value`, `onChange`, or `name` to `TextField` instead of `TextFieldInput`.
- Rendering the wrapper without `TextFieldInput`.
- Treating prefix/suffix children as decorative when they change interaction behavior.
