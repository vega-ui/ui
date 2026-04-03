# PageControl API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `active` | `number` | `—` | No | Controlled active index. |
| `defaultActive` | `number` | `0` | No | Uncontrolled initial active index. |
| `onChangeActive` | `(value: number) => void` | `—` | No | Callback that is triggered when the user selects a different page. |
| `ref` | `Ref<HTMLUListElement>` | `—` | No | Ref forwarded to the underlying <ul> element. |
| `size` | `PageControlSize` | `'md'` | No | Defines the size of the page control items. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PageControlItem`: standard dot item.
- `PageControlProgress`: progress-style animated item.

## Types

- `PageControlProps`
- `PageControlItemProps`
- `PageControlProgressProps`

## State Model

- The root supports controlled and uncontrolled active state.
- Arrow keys change active item left/right.
- Pointer dragging on touch and pen can sweep across items.
