# Collapsible API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | — | No | Controls whether the collapsible content is expanded. If provided, the component acts as a controlled component. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the collapsible content default is expanded. |
| `onChangeOpen` | `(value: boolean) => void` | — | No | Callback fired when the open state changes. Called with the next boolean value when toggled. |
| `onChangeHidden` | `(value: boolean) => void` | — | No | Optional callback that fires when the hidden (visibility) state changes. This can differ from `open` if animations or delays are used. |
| `children` | `ReactNode \| ReactNode[]` | — | No | The content to render inside the collapsible container. Can be a single node or a list of React nodes. |
| `contentId` | `string` | — | No | ID of the collapsible content element. Used to: link trigger and content via accessibility attributes (`aria-controls`); expose the expanded region to assistive technologies; provide a stable identifier for testing and DOM querying. If not provided, an ID generated internally. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CollapsibleTrigger`: trigger surface with `aria-expanded` and `aria-controls`.
- `CollapsibleContent`: expandable content region that manages height transitions and hidden state.

### `CollapsibleContent`

<!-- AUTO-GENERATED:PART_API:CollapsibleContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root collapsible content container. Useful for measuring height, managing animation, or setting focus. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CollapsibleContent:end -->

### `CollapsibleTrigger`

<!-- AUTO-GENERATED:PART_API:CollapsibleTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a child component using `Slot` (e.g. `<a>` or `<div>`). This allows custom semantics or styling while preserving collapsible behavior. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native trigger element (typically a button). |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:CollapsibleTrigger:end -->

## Types

- `CollapsibleProps`
- `CollapsibleTriggerProps`
- `CollapsibleContentProps`

## State Model

- `Collapsible` can be uncontrolled through `defaultOpen` or [controlled](../../glossary.md#controlled) through `open` and `onChangeOpen`.
- `onChangeHidden` tracks whether content is actually hidden, which can lag behind `open` because content height transitions first.
- `useCollapsibleContext` is available for advanced wrappers and custom compositions.
