# Collapsible API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | `—` | No | Controls whether the collapsible content is expanded. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the collapsible content default is expanded. |
| `onChangeOpen` | `(value: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `onChangeHidden` | `(value: boolean) => void` | `—` | No | callback that fires when the hidden (visibility) state changes. |
| `children` | `ReactNode \\| ReactNode[]` | `—` | No | content to render inside the collapsible container. |
| `contentId` | `string` | `—` | No | ID of the collapsible content element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CollapsibleTrigger`: trigger surface with `aria-expanded` and `aria-controls`.
- `CollapsibleContent`: expandable content region that manages height transitions and hidden state.

## Types

- `CollapsibleProps`
- `CollapsibleTriggerProps`
- `CollapsibleContentProps`

## State Model

- `Collapsible` can be uncontrolled through `defaultOpen` or [controlled](../../glossary.md#controlled) through `open` and `onChangeOpen`.
- `onChangeHidden` tracks whether content is actually hidden, which can lag behind `open` because content height transitions first.
- `useCollapsibleContext` is available for advanced wrappers and custom compositions.
