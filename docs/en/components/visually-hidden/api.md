# VisuallyHidden API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | Optional class name for the hidden element. Can be used to override or extend default visually hidden styles. |
| `asChild` | `boolean` | — | No | Renders the content using a child component instead of a native `<div>`. Useful for integrating into custom elements without extra wrappers. |
| `children` | `ReactNode` | — | No | The content to be hidden visually but accessible via screen readers. Often used for labels, instructions, or announcements. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the visually hidden DOM element. Useful for focus management or measurement in accessible workflows. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `VisuallyHidden` is a single exported primitive.

## Types

- `VisuallyHiddenProps`

## State Model

- `VisuallyHidden` has no internal state.
- Meaning changes only when the hidden content changes.
