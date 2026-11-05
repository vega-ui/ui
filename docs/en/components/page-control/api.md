# PageControl API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `active` | `number` | — | No | Controlled active index. |
| `defaultActive` | `number` | `0` | No | Uncontrolled initial active index. |
| `onChangeActive` | `(value: number) => void` | — | No | Callback that is triggered when the user selects a different page. Receives the new index as a number. |
| `ref` | `Ref<HTMLUListElement>` | — | No | Ref forwarded to the underlying `<ul>` element. |
| `size` | `PageControlSize` | `'md'` | No | Defines the size of the page control items. |

Also accepts all `<ul>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PageControlItem`: standard dot item.
- `PageControlProgress`: progress-style animated item.

### `PageControlItem`

<!-- AUTO-GENERATED:PART_API:PageControlItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | — | Yes | Index of the page item (zero-based). Used to identify and compare with the active index from context. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button element. |
| `current` | `boolean` | — | No | Forces this item to be marked as active, regardless of the context. If not provided, active state is determined by comparing `index` with the active index from context. |
| `size` | `PageControlSize` | — | No | Defines the size of the page control items. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PageControlItem:end -->

### `PageControlProgress`

<!-- AUTO-GENERATED:PART_API:PageControlProgress:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | — | Yes | Index of the page item (zero-based). Used to determine whether this item is currently active. |
| `duration` | `number` | `5000` | No | Duration of the progress animation in milliseconds. Controls how long the visual fill takes to complete. Defaults to 5000ms if not provided. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button element. |
| `current` | `boolean` | — | No | Whether this page item is currently active. If not provided, active state is inferred from context. |
| `size` | `PageControlSize` | — | No | Defines the size of the page control items. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PageControlProgress:end -->

## Types

- `PageControlProps`
- `PageControlItemProps`
- `PageControlProgressProps`

## State Model

- The root supports controlled and uncontrolled active state.
- Arrow keys change active item left/right.
- Pointer dragging on touch and pen can sweep across items.
