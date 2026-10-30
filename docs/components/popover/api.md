# Popover API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | No | trigger and content elements for the popover. |
| `placement` | `Placement` | `'bottom'` | No | Preferred placement of the popover relative to its trigger. |
| `open` | `boolean` | `—` | No | Controls the open state of the popover. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onChangeOpen` | `(state: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `role` | `'listbox' \\| 'dialog'` | `—` | No | Defines the ARIA role of the popover content for accessibility. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `PopoverTrigger`

The button that toggles the popover through the native `popovertarget`. Sets `aria-haspopup` from the root `role`; the browser exposes the expanded state from the native `popovertarget`, so it sets no `aria-expanded` or `aria-controls`. It must be a button: with `asChild`, the child must render a `<button>`.

## `PopoverContent`

The native `popover="auto"` panel.

- Always rendered and hidden while closed; its children render only while it is open.
- The browser closes it on an outside click or `Escape`, stacks nested popovers, and returns focus to the trigger.
- Opening does not move focus into the content; `Tab` from the trigger enters it. Safari does not do this, so keyboard users there cannot `Tab` from the trigger into the content.
- `shadowed` (default `true`) adds the surface shadow.

## Types

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`

## State Model

- Open state can be controlled or uncontrolled.
- Content positioning lives in the root model; outside click and `Escape` are handled by the browser and go through `onChangeOpen(false)`.
- `usePopoverContext` is available for advanced wrappers and open-state helpers. It no longer exposes the floating-ui context and props.
- `PopoverContent` renders in the top layer via `popover="auto"`; no portal is needed.
- A popover with a dimmed backdrop is a modal pattern: use `Dialog` or `Sheet` instead.
