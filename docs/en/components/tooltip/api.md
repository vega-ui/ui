# Tooltip API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `placement` | `Placement` | `'bottom'` | No | Preferred placement of the tooltip relative to its trigger (e.g., 'top', 'bottom-start'). It flips to the opposite side when there is no room. |
| `delayOpen` | `number` | `500` | No | Delay (in milliseconds) before the tooltip appears on hover. It shows at once on keyboard focus, and right after another tooltip closes. |
| `delayClose` | `number` | `250` | No | Delay (in milliseconds) before the tooltip disappears after the pointer leaves the trigger or the tooltip, long enough to move the pointer onto the tooltip. It hides at once on blur. |
| `group` | `TooltipGroup` | `the group of all tooltips on the page` | No | The tooltips that warm each other up: right after one of them closes, the next one opens without `delayOpen`. Create a separate group with `createTooltipGroup()`. |
| `open` | `boolean` | — | No | Controls the open state of the tooltip. When set, the component becomes controlled. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | — | No | Callback fired when the open state changes. |
| `children` | `ReactNode` | — | No | The trigger and content of the tooltip. Should include `TooltipTrigger` and `TooltipContent` components. |
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

The `role="tooltip"` surface. It renders in the top layer with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container does not clip or cover it. It stays open while the pointer moves from the trigger onto it, so its text can be selected.

<!-- AUTO-GENERATED:PART_API:TooltipContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the tooltip content element. Useful for positioning, measuring, or managing focus. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TooltipContent:end -->

## Types

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`
- `TooltipGroup`, created by `createTooltipGroup()`

## State Model

- Open state can be controlled with `open` and `onChangeOpen`, or uncontrolled with `defaultOpen`.
- Trigger and content are coordinated by the root.
- `delayOpen` applies to hover only. On keyboard focus, and right after another tooltip of its `group` closes, the tooltip shows without a delay. All tooltips share one group unless they get their own from `createTooltipGroup()`, such as the tooltips of one toolbar.
- A group shows one tooltip at a time: when the next one shows, the previous one hides at once instead of waiting for `delayClose`.
- The user's handlers on `TooltipTrigger` and `TooltipContent` run first: `event.preventDefault()` in `onKeyDown` keeps the tooltip open on `Escape`.
- `useTooltipContext()` returns the widget `handle` for advanced wrappers: `useSnapshot(handle, (state) => state.open)` reads the open state. It no longer exposes `show`, `hide` and the other timing functions.
- Tooltip timing should stay in service of supplemental information, not product-critical instructions.
