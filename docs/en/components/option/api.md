# Option API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `selected` | `boolean` | — | No | Whether this option is currently selected. |
| `children` | `ReactNode` | — | No | The content displayed for this option. Can include text, icons, or complex markup. |
| `active` | `boolean` | — | No | Whether this option is the current target of keyboard navigation. The focus stays on the owner of the list, which points here with `aria-activedescendant`. |
| `size` | `OptionSize` | `'md'` | No | Size of the option for visual styling. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root div of the option. |
| `disabled` | `boolean` | — | No | Disables the entire Option. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Option` is a single exported primitive.

## Types

- `OptionProps`
- `OptionSize`

## State Model

- `Option` does not manage selection or focus lists by itself.
- `selected` and `active` are presentational inputs from the parent pattern.
