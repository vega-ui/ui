# Toolbar API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `ToolbarOrientation` | `'horizontal'` | No | Lays the items out in a row or a column; the arrow keys of that axis move the focus between them. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the toolbar element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `ToolbarItem`: makes a control one of the items of the toolbar.
- `ToggleGroup` and `ToggleGroupToggle`: a set of toggles whose items join the toolbar, with the props of [ToggleGroup](../toggle-group/api.md).

### `ToolbarItem`

<!-- AUTO-GENERATED:PART_API:ToolbarItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | Renders the only child element as the item instead of a `<button>`, like a Button, a MenuTrigger or a Toggle. |
| `disabled` | `boolean` | `false` | No | Disables the item and its child, and the arrow keys skip it. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the item element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:ToolbarItem:end -->

- A `<button type="button">` by default; with `asChild` it renders its only child, which gets the `tabIndex`, the `ref` and the key handlers of the item.
- `disabled` sets the native `disabled` on the button or the child, and the arrow keys skip the item.
- Outside a `Toolbar` it renders the control with no `tabIndex` and no key handlers of its own.

## Types

- `ToolbarProps`
- `ToolbarItemProps`
- `ToolbarOrientation`, the type of `orientation`: `'horizontal' | 'vertical'`

## State Model

- The toolbar has no value of its own and no props to control it: it keeps which item had the focus last, and that item holds the Tab stop. Before the focus enters, and when that item becomes disabled, the first enabled item holds it.
- `aria-orientation` and `data-orientation` on the root follow `orientation`.
- Every item has `tabIndex={0}` when it holds the Tab stop and `tabIndex={-1}` otherwise.
- The state of the controls stays with them: a `Toggle` keeps `pressed`, a `ToggleGroup` keeps `value`, a `Menu` keeps whether it is open.

## Integration Notes

- The default `<button>` of `ToolbarItem` has `type="button"`, so it never submits a form. With `asChild` the type is the type of your child: a `Button` has none and submits a form around it unless you pass `type="button"`.
- The handlers of the child run as usual: an `onClick` on a `Button` inside a `ToolbarItem` runs on a click, Enter and Space.
- An element that is not an item, like a [Badge](../badge/) or a counter, can sit between the items; the arrow keys pass over it.
- `@vega-ui/widgets/toolbar` exports `toolbarWidget`, the framework-free behavior of the toolbar.
