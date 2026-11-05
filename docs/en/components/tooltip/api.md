# Tooltip API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `delayOpen` | `number` | `500` | No | Delay (in milliseconds) before the tooltip appears on hover. It shows at once on keyboard focus, and right after another tooltip closes. |
| `delayClose` | `number` | `0` | No | Delay (in milliseconds) before the tooltip disappears after blur/unhover. |
| `open` | `boolean` | — | No | Controls the open state of the tooltip. When set, the component becomes controlled. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | — | No | Callback fired when the open state changes. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `TooltipTrigger`

The element the tooltip describes. It shows the tooltip on hover with a mouse or pen and on keyboard focus (`:focus-visible`), never on a tap, and hides it when the trigger is pressed, on pointer leave, on blur, and on `Escape`. While the tooltip is open, the trigger points to it through `aria-describedby`.

<!-- AUTO-GENERATED:PART_API:TooltipTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a slotted child element using `asChild`. Enables integration with custom elements (e.g., `<a>`, `<div>`, icon buttons) that serve as tooltip triggers. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button or slotted element. Useful for focus control, programmatic access, or accessibility enhancements. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:TooltipTrigger:end -->

## `TooltipContent`

The `role="tooltip"` surface. It renders in the top layer with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container does not clip or cover it. It lets the pointer through to the page (`pointer-events: none`) and grows out of its arrow.

<!-- AUTO-GENERATED:PART_API:TooltipContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the tooltip content element. Useful for positioning, measuring, or managing focus. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TooltipContent:end -->

## `TooltipArrow`

Optional arrow pointing back to the trigger.

<!-- AUTO-GENERATED:PART_API:TooltipArrow:start -->
Also accepts `ref` and all `<svg>` attributes.
<!-- AUTO-GENERATED:PART_API:TooltipArrow:end -->

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
