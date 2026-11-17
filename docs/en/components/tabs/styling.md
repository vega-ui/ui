# Tabs Styling

## Overview

`TabsList` draws a line under the selected tab; a vertical list also draws a rail along its start edge, and the line sits on it; `--tabs-separator-color: transparent` removes the rail. The selected tab is a CSS anchor (`anchor-name: --tabs-selected`), and the line is a `::after` pseudo-element of `TabsList` that follows it with CSS anchor positioning — no JS measurement. In Chromium and Safari the line slides between tabs; Firefox moves it without the animation. Hovering a tab that is not selected shows a muted line under it. Browsers without anchor positioning draw the line under the selected tab itself, without the movement.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--tabs-indicator-color` | `Tabs` | Color of the line under the selected tab; `variant` sets it. |
| `--tabs-separator-color` | `TabsList` | Color of the line along the list: transparent in a horizontal list, the rail of a vertical one. |
| `--tabs-tab-height` | `TabsTab` | Height of a tab; `size` sets it. |
| `--focus-color` | `TabsTab`, `TabsPanel` | Focus outline color. |
| `--duration-spring` | `TabsList`, `TabsTab` | Duration of the line movement and of the tab color change; both use `--ease-smooth`. |
| `--transition-fast-state-delay` | `TabsTab` | Duration of the hover line fade. |

## Part-Level Variables

- `Tabs`: the line color by `data-variant`; lays the list and the panels out in a row when `data-orientation="vertical"`, otherwise it is a plain block.
- `TabsList`: flex row (or column when vertical), the separator, the line and the spacing before the panels. The spacing is a margin on the list, not a gap on the root, because hidden panels keep a box.
- `TabsTab`: height and font size by `data-size`, no inline padding, secondary label color, primary color while selected or hovered, the muted hover line, disabled color. Vertical tabs have inline padding and align their text to the start.
- `TabsPanel`: only the focus outline. It sets no `display`, padding or margin.

## State And Variant Interaction

- `[aria-selected="true"]` or `[data-selected="true"]` marks the selected tab and its panel.
- `size` sets `data-size` on the list and the tabs: `sm`, `md` or `lg`.
- `variant` sets `data-variant` on the root: `primary` draws the line in the primary color, `secondary` (the default) in the secondary one.
- `orientation` sets `aria-orientation` on the list and `data-orientation` on the root: a vertical list has its rail and line at the inline start.
- `:disabled` on a tab uses the disabled label color and shows no hover line.
- `prefers-reduced-motion: reduce` replaces the line movement with a fade of the line under the selected tab.

## Examples

<!-- example: tabs/examples.css -->
```css
.compactTabs [role='tab'] {
  --tabs-tab-height: 28px;
}
```
<!-- /example -->

<!-- example: tabs/styling-examples.css -->
```css
.successTabs [role='tablist'] {
  --tabs-indicator-color: var(--color-green-500);
  --tabs-separator-color: var(--separator-non-opaque);
}

.railLessTabs [role='tablist'] {
  --tabs-separator-color: transparent;
}
```
<!-- /example -->

## Do Not Override

- Do not set `display`, padding, borders or margins on `TabsPanel`: hidden panels keep their box with `hidden="until-found"`. Put them on an element inside the panel.
- Do not put a flex or grid `gap` on an element that holds the panels, and do not give `TabsPanel` `flex: 1`: every hidden panel adds a gap or takes its share of the space. Size a wrapper around the panels instead.
- Do not hard-code the line geometry: its position and size come from the selected tab's anchor.
- Do not remove the focus outline of the tabs or of the shown panel.
