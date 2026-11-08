# Popover API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | No | The trigger and content elements for the popover. Should include `PopoverTrigger` and `PopoverContent` components. |
| `placement` | `Placement` | `'bottom'` | No | Preferred placement of the popover relative to its trigger. Follows the Floating UI `Placement` type (e.g., 'top', 'bottom-start'). |
| `open` | `boolean` | — | No | Controls the open state of the popover. When set, the component becomes controlled. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | — | No | Callback fired when the open state changes. |
| `role` | `'listbox' \| 'dialog'` | — | No | Defines the ARIA role of the popover content for accessibility. 'listbox': Used for dropdown menus or selects; 'dialog': Used for focus-trapped modal-like content |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `PopoverTrigger`

The button that toggles the popover through the native `popovertarget`. Sets `aria-haspopup` from the root `role`; the browser exposes the expanded state from the native `popovertarget`, so it sets no `aria-expanded` or `aria-controls`. It must be a button: with `asChild`, the child must render a `<button>`.

<!-- AUTO-GENERATED:PART_API:PopoverTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the trigger as its child element using a `Slot`. The child must be a button: the browser opens the popover through its `popovertarget`. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying trigger element. Useful for focus control, measurement, or integrations. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PopoverTrigger:end -->

## `PopoverContent`

The native `popover="auto"` panel.

<!-- AUTO-GENERATED:PART_API:PopoverContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `shadowed` | `boolean` | `true` | No | Applies a visual shadow to the component container. Adds elevation and depth, visually separating the content from the background. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the native `[popover]` element. Useful for focus management, animations, or measuring position. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PopoverContent:end -->

- Always rendered and hidden while closed; its children render only while it is open.
- The browser closes it on an outside click or `Escape`, stacks nested popovers, and returns focus to the trigger.
- Opening does not move the focus into the content; put `autoFocus` on the element that should take it. Without it, `Tab` from the trigger enters the content; Safari does not do this.
- It does not limit its height. For long content, set `max-height` and `overflow: auto` on it.
- `shadowed` (default `true`) adds the surface shadow.

## `PopoverAnchor`

An element to position the content against instead of the trigger, such as a whole field with a small button inside it as the trigger.

<!-- AUTO-GENERATED:PART_API:PopoverAnchor:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the anchor as its child element using `Slot`. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the anchor element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PopoverAnchor:end -->

## `PopoverClose`

Closes the popover when clicked. It has no styles or default `aria-label`: render your own button inside it with `asChild` and label it.

<!-- AUTO-GENERATED:PART_API:PopoverClose:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the close action as its child element using `Slot`, so any button of your own closes the popover. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PopoverClose:end -->

## Types

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`
- `PopoverAnchorProps`
- `PopoverCloseProps`

## State Model

- Open state can be controlled or uncontrolled.
- Content positioning lives in the root model; outside click and `Escape` are handled by the browser and go through `onChangeOpen(false)`.
- A close made by the browser (outside click, `Escape`, a trigger click, another popover opening) is final, as a native popover cannot be kept open: a controlled popover stays hidden until `open` changes, so set `open={false}` in `onChangeOpen`. An open from the trigger is final the same way: a controlled popover stays shown until `open` changes, so set `open={true}` in `onChangeOpen`.
- `usePopoverContext` is available for advanced wrappers and open-state helpers. It no longer exposes the floating-ui context and props.
- `PopoverContent` renders in the top layer via `popover="auto"`; no portal is needed.
- A popover with a dimmed backdrop is a modal pattern: use `Dialog` or `Sheet` instead.
