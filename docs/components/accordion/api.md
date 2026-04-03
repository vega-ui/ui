# Accordion API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `className` | `string` | `—` | No | custom CSS class to apply to the accordion wrapper. |
| `size` | `AccordionSize` | `'md'` | No | Defines the size of the accordion. |
| `children` | `ReactElement<AccordionItemProps> \\| ReactElement<AccordionItemProps>[]` | `—` | No | Accordion items to render. |
| `opened` | `string[]` | `—` | No | IDs of currently open items. |
| `onChangeOpened` | `(opened?: string[]) => void` | `—` | No | Called when open item IDs change. |
| `defaultOpened` | `string[]` | `[]` | No | An array of item `id's that should be open by default when the accordion mounts. |
| `multiple` | `boolean` | `false` | No | Allows multiple accordion items to be open at the same time. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AccordionItem`: one expandable item with a stable `value`.
- `AccordionHeader`: semantic header wrapper for each item.
- `AccordionTrigger`: toggle button for the item.
- `AccordionContent`: expandable content region.
- `AccordionIcon`: optional visual state indicator.

## Types

- `AccordionProps`
- `AccordionItemProps`
- `AccordionHeaderProps`
- `AccordionTriggerProps`
- `AccordionContentProps`
- `AccordionIconProps`

## State Model

- `Accordion` can be uncontrolled through `defaultOpened` or [controlled](../../glossary.md#controlled) through `opened` and `onChangeOpened`.
- `multiple={false}` behaves like a classic accordion where opening one item closes the others.
- `multiple={true}` allows the root to behave like a grouped disclosure surface.
- `useAccordionContext` and `useAccordionItemContext` are available for advanced wrappers and custom compositions.
