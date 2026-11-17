---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
---

New `Tabs`: a list of tabs that shows one panel at a time, following the WAI-ARIA tabs pattern.

- `Tabs` holds the selected tab in `value`, `defaultValue` and `onChangeValue`. Without a value the first enabled tab is shown. `orientation` is `horizontal` or `vertical`, `size` is `sm`, `md` or `lg`, and `variant` (`primary` or `secondary`, the default) colors the line under the selected tab.
- `activation='automatic'` (the default) shows a tab as soon as the arrow keys move to it; `activation='manual'` only moves the focus, and Enter, Space or a click shows the focused tab.
- `TabsList` is the `tablist`: the arrow keys along its orientation move between the tabs and wrap around the ends, Home and End jump to the first and last tab, and the list is one Tab stop that leads to the shown panel.
- `TabsTab` is a `<button role="tab">` with a `value`; native `disabled` takes it out of the arrow keys.
- `TabsPanel` is the `tabpanel` of the tab with the same `value`. Hidden panels stay mounted with `hidden="until-found"`, so the browser's find in page and text fragment links reach their text and show their tab; a controlled parent that keeps `value` hides the panel again. They are `aria-hidden` and out of the focus order until shown.
- A line under the selected tab follows it with CSS anchor positioning and needs no extra part; a vertical list puts it on a rail along the start edge.
- `@vega-ui/widgets/tabs` is the framework-free widget behind it.
