# Tooltip API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `delayOpen` | `number` | `500` | No | Delay (in milliseconds) before the tooltip appears after hover/focus. |
| `delayClose` | `number` | `0` | No | Delay (in milliseconds) before the tooltip disappears after blur/unhover. |
| `open` | `boolean` | `—` | No | Controls the open state of the tooltip. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | `—` | No | Callback fired when the open state changes. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TooltipTrigger`
- `TooltipContent`
- `TooltipArrow`

## Types

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`
- `TooltipArrowProps`

## State Model

- Open state can be controlled with `open` and `onChangeOpen`, or uncontrolled with `defaultOpen`.
- Trigger and content are coordinated by the root.
- `useTooltipContext` is available for advanced wrappers and timing helpers.
- Tooltip timing should stay in service of supplemental information, not product-critical instructions.
