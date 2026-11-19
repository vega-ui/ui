# ContextMenu API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | No | The ContextMenuTrigger and the MenuContent of the menu. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Called when the menu is shown or hidden. |
| `size` | `MenuSize` | `'md'` | No | Size of the menu items. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `ContextMenuTrigger`: the area that opens the menu.
- `MenuContent`, `MenuItem`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuGroup`, `MenuItemIndicator`, `MenuSubmenu` and `MenuSubmenuTrigger`: the menu and its items, the parts of [Menu](../menu/api.md#child-parts) with the same props.

### `ContextMenuTrigger`

<!-- AUTO-GENERATED:PART_API:ContextMenuTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | Renders the only child element as the area instead of a `<div>`, like a row or a card of your own. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the area element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:ContextMenuTrigger:end -->

- A `<div>` by default; with `asChild` it renders its only child, which gets the attributes and the handlers of the area.
- It has no role, no `aria-haspopup` and no `aria-expanded`, and `data-open` while the menu is shown.
- It sets `-webkit-touch-callout: none`, so iOS shows no callout on a long press.

### `MenuContent` in a `ContextMenu`

- A native `popover="auto"` element, always rendered and hidden while closed. The browser closes it on a click outside and when another popover opens.
- It opens at the point with its top-left corner, top-right in a right-to-left page, overlapping the point slightly so the pointer is over the menu. Near the edges of the viewport it flips up or toward the start of the line to stay visible.
- It has no `aria-labelledby` of its own: pass `aria-label` or `aria-labelledby`.
- It limits its height to `--menu-max-height` (320px by default) and scrolls its items when they do not fit.

## Types

- `ContextMenuProps`
- `ContextMenuTriggerProps`
- `MenuSize`, the type of `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- The props of the menu parts are the types of [Menu](../menu/api.md#types)

## State Model

- `ContextMenu` has no `open` or `defaultOpen`: a menu opens only at a point the user gives, so the parent follows it through `onChangeOpen`, which is called when the menu is shown or hidden for any reason: a right click, a long touch, the context menu key, an item, Escape, Tab, Shift+Tab or a click outside.
- `data-open` marks the area while the menu is shown, `data-size` the content and the items, and `aria-checked` and `data-checked` a checked item.

## Integration Notes

- The items are buttons with `type="button"`, so they never submit a form around them.
- The `onClick` of an item runs before the menu reacts. Call `event.preventDefault()` in it to keep the menu open. A checkbox or radio item keeps the menu open by itself; `keepOpen={false}` makes it close the menu.
- The area keeps its own handlers: an `onClick` on a row still runs on a click, and only the `contextmenu` of the area, a long touch and the click that ends it are taken by the menu.
- `@vega-ui/widgets/menu` exports `contextMenuWidget`, the framework-free behavior of the context menu.
