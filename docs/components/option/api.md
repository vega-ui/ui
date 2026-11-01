# Option API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `selected` | `boolean` | `—` | No | this option is currently selected. |
| `children` | `ReactNode` | `—` | No | content displayed for this option. |
| `active` | `boolean` | `—` | No | this option is the current target of keyboard navigation. |
| `size` | `OptionSize` | `'md'` | No | Size of the option for visual styling. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the root div of the option. |
| `disabled` | `boolean` | `—` | No | Disables the entire Option. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `Option` is a single exported primitive.

## Types

- `OptionProps`
- `OptionSize`

## State Model

- `Option` does not manage selection or focus lists by itself.
- `selected` and `active` are presentational inputs from the parent pattern.
