# Radio API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `checked` | `boolean` | — | No | Controlled checked state of the radio. Used in controlled components for full state management. |
| `defaultChecked` | `boolean` | — | No | Initial checked state for uncontrolled usage. Mirrors the native `defaultChecked` HTML behavior. |
| `variant` | `RadioVariant` | `'primary'` | No | Visual variant of the radio, for theme or context switching. |
| `size` | `RadioSize` | `'md'` | No | Size of the radio input. |
| `disabled` | `boolean` | — | No | Disables the radio, making it non-interactive. Also applies a visually disabled style. |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref to the native `<input type="radio">` element. Useful for managing focus. |

Also accepts all `<input>` attributes.
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
