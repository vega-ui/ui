# Menu API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | No | The MenuTrigger and the MenuContent of the menu. |
| `open` | `boolean` | — | No | Whether the menu is shown. Enables controlled mode when set. |
| `defaultOpen` | `boolean` | — | No | Whether the menu is shown on mount. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Called when the menu is shown or hidden. |
| `placement` | `Placement` | `'bottom-start'` | No | Preferred placement of the menu relative to its trigger. The menu moves to the opposite side when there is no room. |
| `size` | `MenuSize` | `'md'` | No | Size of the menu items. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MenuTrigger`: the menu button.
- `MenuContent`: the `role="menu"` popover.
- `MenuItem`: an action or a link.
- `MenuCheckboxItem`: an item that is checked or unchecked.
- `MenuRadioGroup`: the group that holds the value of its radio items.
- `MenuRadioItem`: one choice of a radio group.
- `MenuGroup`: a group of related items.
- `MenuItemIndicator`: the check mark of a checkbox or radio item.
- `MenuSubmenu`: a submenu, with no element of its own.
- `MenuSubmenuTrigger`: the item that opens a submenu.

### `MenuTrigger`

<!-- AUTO-GENERATED:PART_API:MenuTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | Renders the only child element as the trigger instead of a `<button>`, like your own Button. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the trigger element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuTrigger:end -->

### `MenuContent`

<!-- AUTO-GENERATED:PART_API:MenuContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the `<div role="menu">` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuContent:end -->

- A native `popover="auto"` element, always rendered and hidden while closed. The browser closes it on a click outside and when another popover opens.
- It is positioned against the trigger with CSS anchor positioning and moves to the opposite side when there is no room.
- It limits its height to `--menu-max-height` (320px by default) and scrolls its items when they do not fit.

### `MenuItem`

<!-- AUTO-GENERATED:PART_API:MenuItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | Renders the only child element as the item instead of a `<button>`, like an `<a>` that navigates. |
| `label` | `string` | — | No | Plain text of the item for typeahead, used instead of the text of its content. |
| `disabled` | `boolean` | `false` | No | Keeps the item focusable with aria-disabled, as the menu pattern asks, but never activates it. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the item element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuItem:end -->

### `MenuCheckboxItem`

<!-- AUTO-GENERATED:PART_API:MenuCheckboxItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `checked` | `boolean` | — | No | Whether the item is checked. Enables controlled mode when set. |
| `defaultChecked` | `boolean` | — | No | Whether the item is checked on mount. |
| `onChangeChecked` | `(checked: boolean) => void` | — | No | Called with the new checked state when the user checks or unchecks the item. |
| `label` | `string` | — | No | Plain text of the item for typeahead, used instead of the text of its content. |
| `keepOpen` | `boolean` | `true` | No | Keeps the menu open when a click or Enter toggles the item, as Space does. Set it to false to close the menu as a plain item does. |
| `disabled` | `boolean` | `false` | No | Keeps the item focusable with aria-disabled, as the menu pattern asks, but never checks it. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the `<button role="menuitemcheckbox">` element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuCheckboxItem:end -->

### `MenuRadioGroup`

<!-- AUTO-GENERATED:PART_API:MenuRadioGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Value of the checked MenuRadioItem. Enables controlled mode when set. |
| `defaultValue` | `string` | — | No | Value of the MenuRadioItem checked on mount. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the value of the MenuRadioItem the user checks. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the `<div role="group">` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuRadioGroup:end -->

### `MenuRadioItem`

<!-- AUTO-GENERATED:PART_API:MenuRadioItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Yes | Value of the item, given to the MenuRadioGroup when the user checks it. |
| `label` | `string` | — | No | Plain text of the item for typeahead, used instead of the text of its content. |
| `keepOpen` | `boolean` | `true` | No | Keeps the menu open when a click or Enter checks the item, as Space does. Set it to false to close the menu as a plain item does. |
| `disabled` | `boolean` | `false` | No | Keeps the item focusable with aria-disabled, as the menu pattern asks, but never checks it. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the `<button role="menuitemradio">` element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuRadioItem:end -->

### `MenuGroup`

<!-- AUTO-GENERATED:PART_API:MenuGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the `<div role="group">` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuGroup:end -->

### `MenuItemIndicator`

<!-- AUTO-GENERATED:PART_API:MenuItemIndicator:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content. Accepts: icons from `@vega-ui/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:MenuItemIndicator:end -->

- Its size follows the size of the menu: `xs` in a `sm` menu, `sm` in a `md` menu, `md` in a `lg` menu. Pass `size` to change it.
- Without children it renders a check icon; pass another icon, such as a dot for radio items, as its children.

### `MenuSubmenu`

<!-- AUTO-GENERATED:PART_API:MenuSubmenu:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | No | The MenuSubmenuTrigger and the MenuContent of the submenu. |
| `open` | `boolean` | — | No | Whether the submenu is shown. Enables controlled mode when set. |
| `defaultOpen` | `boolean` | — | No | Whether the submenu is shown on mount. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Called when the submenu is shown or hidden. |
<!-- AUTO-GENERATED:PART_API:MenuSubmenu:end -->

### `MenuSubmenuTrigger`

<!-- AUTO-GENERATED:PART_API:MenuSubmenuTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | — | No | Plain text of the item for typeahead, used instead of the text of its content. |
| `disabled` | `boolean` | `false` | No | Keeps the item focusable with aria-disabled, as the menu pattern asks, but never opens the submenu. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the `<button role="menuitem" aria-haspopup="menu">` element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:MenuSubmenuTrigger:end -->

## Types

- `MenuProps`
- `MenuTriggerProps`
- `MenuContentProps`
- `MenuItemProps`
- `MenuCheckboxItemProps`
- `MenuRadioGroupProps`
- `MenuRadioItemProps`
- `MenuGroupProps`
- `MenuItemIndicatorProps`: the props of [Icon](../icon/)
- `MenuSubmenuProps`
- `MenuSubmenuTriggerProps`
- `MenuSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `Placement`, the type of `placement`: a side (`'top' | 'right' | 'bottom' | 'left'`), optionally followed by `-start` or `-end`

## State Model

- `Menu` can be uncontrolled through `defaultOpen` or [controlled](../../glossary.md#controlled) through `open` and `onChangeOpen`. `onChangeOpen` is called when the menu is shown or hidden for any reason: the trigger, an item, Escape, Tab or a click outside.
- A close made by the menu or the browser (running an item, Escape, Tab, a click outside, another popover opening) is final, as a native popover cannot be kept open: a controlled menu stays hidden until `open` changes, so set `open={false}` in `onChangeOpen`. An open from the trigger is final the same way, so set `open={true}` in `onChangeOpen`.
- When a controlled parent sets `open` to `true`, the menu opens with the focus on its first item.
- A `MenuCheckboxItem` is uncontrolled through `defaultChecked` or controlled through `checked` and `onChangeChecked`. A `MenuRadioGroup` is uncontrolled through `defaultValue` or controlled through `value` and `onChangeValue`; a disabled radio item is never checked.
- The items take their `id`, `role`, `tabIndex`, `aria-disabled` and `aria-checked` from the menu; `id` is not a prop of the trigger, the content or the items.
- `aria-expanded` and `data-open` mark the trigger of a shown menu, `data-checked` and `aria-checked` a checked item, `data-size` the content and the items, and `data-side` and `data-align` the content.

## Integration Notes

- The trigger and the items are buttons with `type="button"`, so they never submit a form around them.
- The `onClick` of an item runs before the menu reacts. Call `event.preventDefault()` in it to keep the menu open, for example to let the user press the same item several times.
- A link item with `asChild` keeps its native navigation: the menu closes and the browser follows the link. Space opens it too.
