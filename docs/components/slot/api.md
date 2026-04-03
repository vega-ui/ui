# Slot API

## Root Props

| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | - | yes | Must resolve to exactly one valid React element. |
| merged props | generic | - | no | Props are merged into the child element. |

## Child Parts

- None. `Slot` is a single exported utility.

## Types

- `SlotProps<T>`

## State Model

- `Slot` has no state.
- Behavior comes from prop merging plus the semantics of the chosen child element.
