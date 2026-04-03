# Popover API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | No | trigger and content elements for the popover. |
| `placement` | `Placement` | `'bottom'` | No | Preferred placement of the popover relative to its trigger. |
| `open` | `boolean` | `—` | No | Controls the open state of the popover. |
| `defaultOpen` | `boolean` | `false` | No | Initial open state for uncontrolled usage. |
| `onOpenChange` | `(state: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `role` | `'listbox' \\| 'dialog'` | `—` | No | Defines the ARIA role of the popover content for accessibility. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PopoverTrigger`
- `PopoverContent`
- `PopoverBackdrop`

## Types

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`
- `PopoverBackdropProps`

## State Model

- Open state can be controlled or uncontrolled.
- Content positioning and outside-click behavior live in the root model.
- `usePopoverContext` is available for advanced wrappers and open-state helpers.
- Backdrop usage should stay exceptional rather than becoming the default for every popover.
