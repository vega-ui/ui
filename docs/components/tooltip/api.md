# Tooltip API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `delayOpen` | `number` | `500` | No | Delay (in milliseconds) before the tooltip appears after hover/focus. |
| `delayClose` | `number` | `0` | No | Delay (in milliseconds) before the tooltip disappears after blur/unhover. |
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

- Open state is internal to the root.
- Trigger and content are coordinated by the root.
- `useTooltipContext` is available for advanced wrappers and timing helpers.
- Tooltip timing should stay in service of supplemental information, not product-critical instructions.
