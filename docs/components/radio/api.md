# Radio API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `checked` | `boolean` | `—` | No | Controlled checked state of the checkbox. |
| `defaultChecked` | `boolean` | `—` | No | Initial checked state for uncontrolled usage. |
| `variant` | `RadioVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `RadioSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `disabled` | `boolean` | `—` | No | Disables the checkbox, making it non-interactive. |
| `ref` | `Ref<HTMLInputElement>` | `—` | No | Ref to the native `<input type="radio">` element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

`Radio` does not expose public child parts.

## Types

- `RadioProps`
- `RadioSize`
- `RadioVariant`

## State Model

- `Radio` can be controlled through `checked` or uncontrolled through `defaultChecked`.
- Mutual exclusivity depends on consumer-supplied native group semantics through shared `name`.
- The component itself is one native input, not a root-plus-parts composition model.
