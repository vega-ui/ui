---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
---

New `ContextMenu`: a menu that opens where the user asks for it, built from the parts of `Menu`.

- `ContextMenu` reports whether the menu is shown through `onChangeOpen` and takes a `size`; it renders only a hidden point for the menu to open at and has no `open` or `defaultOpen`, as the menu opens only at a point the user gives. `ContextMenuTrigger` is the area, a `<div>` or your own element with `asChild`, without menu button semantics.
- A right click, the context menu key or Shift+F10 on the area opens the `MenuContent` at the point instead of the menu of the browser, with the focus on the first item; a long touch that stays in place opens it on touch screens, also on iOS, which has no `contextmenu` event. The menu flips to stay in the viewport. A text field inside the area keeps the menu of the browser and its selection on a long touch.
- The items, groups, checkbox and radio items and submenus are the ones of `Menu`. Escape, Tab, Shift+Tab, a click outside or an item that runs closes the menu, and the browser gives the focus back to where it was. Name the menu with `aria-label` on `MenuContent`.
- `@vega-ui/widgets/menu` adds `contextMenuWidget`.
