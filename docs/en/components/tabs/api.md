# Tabs API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Value of the selected tab. Enables controlled mode when set. |
| `defaultValue` | `string` | — | No | Value of the tab selected on mount. Without it the first enabled tab is shown. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the value of the tab the user selects. |
| `activation` | `TabsActivation` | `'automatic'` | No | `automatic` shows a tab as soon as the arrow keys move to it; `manual` only moves the focus, and Enter or Space shows the focused tab. A click shows the clicked tab in both. |
| `orientation` | `TabsOrientation` | `'horizontal'` | No | Direction of the tab list: the arrow keys follow it. |
| `size` | `TabsSize` | `'md'` | No | Size of the tabs. |
| `variant` | `TabsVariant` | `'secondary'` | No | Color of the line under the selected tab. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root `<div>` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TabsList`: the `tablist` that holds the tabs.
- `TabsTab`: one tab button with a `value`.
- `TabsPanel`: the content of the tab with the same `value`.

### `TabsList`

<!-- AUTO-GENERATED:PART_API:TabsList:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the `<div role="tablist">` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TabsList:end -->

### `TabsTab`

<!-- AUTO-GENERATED:PART_API:TabsTab:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Yes | Value of the tab, matched by the `value` of its TabsPanel. |
| `size` | `TabsSize` | — | No | Size of the tab. Falls back to the size of Tabs. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the `<button role="tab">` element. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:TabsTab:end -->

### `TabsPanel`

<!-- AUTO-GENERATED:PART_API:TabsPanel:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Yes | Value of the TabsTab that shows this panel. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the `<div role="tabpanel">` element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TabsPanel:end -->

## Types

- `TabsProps`
- `TabsListProps`
- `TabsTabProps`
- `TabsPanelProps`
- `TabsSize`: `'sm' | 'md' | 'lg'`
- `TabsVariant`: `'primary' | 'secondary'`
- `TabsActivation`: `'automatic' | 'manual'`
- `TabsOrientation`: `'horizontal' | 'vertical'`

## State Model

- `Tabs` can be uncontrolled through `defaultValue` or [controlled](../../glossary.md#controlled) through `value` and `onChangeValue`. `onChangeValue` receives the value of the tab the user picks; a controlled parent that keeps `value` keeps the tab shown.
- Without a value the first enabled tab is shown, and `onChangeValue` is not called for it.
- `activation='automatic'` shows a tab as soon as the arrow keys move to it. `activation='manual'` only moves the focus; Enter, Space or a click shows the focused tab. Use it when showing a panel is slow, for example when it loads data.
- Hidden panels stay mounted with `hidden="until-found"`. When find in page or a text fragment link reveals text in one, its tab is selected and `onChangeValue` is called; a controlled parent that keeps `value` hides that panel again.
- `TabsTab` and `TabsPanel` take their `id`, `role`, `aria-selected`, `aria-controls`, `aria-labelledby` and `tabIndex` from the tabs; `id` is not a prop of either.
- `data-selected` marks the selected tab and its panel, `data-size` the list and the tabs, and `data-orientation` and `data-variant` the root.

## Integration Notes

- The tabs are buttons with `type="button"`, so they never submit a form around them. Fields in hidden panels stay in the form and are submitted with it.
- An invalid field in a hidden panel cannot get the focus. Show its tab from an `invalid` handler on the form, as in the [account settings example](./examples.md#formintegration-account-settings-split-into-tabs).
