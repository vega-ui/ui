# Tooltip API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `delayOpen` | `number` | `500` | No | Delay (in milliseconds) before the tooltip appears on hover. |
| `delayClose` | `number` | `0` | No | Delay (in milliseconds) before the tooltip disappears after blur/unhover. |
| `open` | `boolean` | `—` | No | Controls the open state of the tooltip. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | `—` | No | Callback fired when the open state changes. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `TooltipTrigger`

The element the tooltip describes. It shows the tooltip on hover with a mouse or pen and on keyboard focus (`:focus-visible`), never on a tap, and hides it when the trigger is pressed, on pointer leave, on blur, and on `Escape`. While the tooltip is open, the trigger points to it through `aria-describedby`.

## `TooltipContent`

The `role="tooltip"` surface. It renders in the top layer with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container does not clip or cover it. It lets the pointer through to the page (`pointer-events: none`) and grows out of its arrow.

## `TooltipArrow`

Optional arrow pointing back to the trigger.

## Types

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`
- `TooltipArrowProps`

## State Model

- Open state can be controlled with `open` and `onChangeOpen`, or uncontrolled with `defaultOpen`.
- Trigger and content are coordinated by the root.
- `delayOpen` applies to hover only. On keyboard focus, and right after another tooltip closes, the tooltip shows without a delay.
- `useTooltipContext` is available for advanced wrappers and timing helpers. It no longer exposes the floating-ui props.
- Tooltip timing should stay in service of supplemental information, not product-critical instructions.
