# Tabs

## Doc Profile

`advanced interactive`

## Summary

`Tabs` is a [compound component](../../glossary.md#compound-component) that shows one panel of content at a time. `TabsList` holds the `TabsTab` buttons, and each `TabsPanel` belongs to the tab with the same `value`. It follows the WAI-ARIA tabs pattern: the list is one Tab stop, the arrow keys move between the tabs, and hidden panels stay mounted.

## Imports

```tsx
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  type TabsProps,
  type TabsListProps,
  type TabsTabProps,
  type TabsPanelProps,
} from '@vega-ui/react';
```

## Exported Types

- `TabsProps`
- `TabsListProps`
- `TabsTabProps`
- `TabsPanelProps`
- `TabsSize`
- `TabsVariant`
- `TabsActivation`
- `TabsOrientation`

## Minimal Composition

<!-- example: tabs/minimal-composition.tsx -->
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tabs defaultValue='overview' style={{ width: '100%', maxWidth: 480 }}>
      <TabsList aria-label='Project'>
        <TabsTab value='overview'>Overview</TabsTab>
        <TabsTab value='activity'>Activity</TabsTab>
        <TabsTab value='settings'>Settings</TabsTab>
      </TabsList>
      <TabsPanel value='overview'>
        <Text size={3}>Spring release: 12 of 18 launch tasks are done.</Text>
      </TabsPanel>
      <TabsPanel value='activity'>
        <Text size={3}>Mira moved “Pricing page” to review two hours ago.</Text>
      </TabsPanel>
      <TabsPanel value='settings'>
        <Text size={3}>The project is visible to everyone in the workspace.</Text>
      </TabsPanel>
    </Tabs>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyTabs` passes its props to `Tabs`, `listLabel` to the tab list as its name, and renders a tab and a panel for each item of `tabs`, so a `value` is written once. See [Component recipes](../../recipes.md).

<!-- example: tabs/recipe.tsx -->
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab, Text, type TabsProps } from '@vega-ui/react';
import type { ReactNode } from 'react';

interface MyTab {
  value: string
  label: ReactNode
  content: ReactNode
}

interface MyTabsProps extends TabsProps {
  listLabel: string
  tabs: MyTab[]
}

export function MyTabs({ listLabel, tabs, ...props }: MyTabsProps) {
  return (
    <Tabs {...props}>
      <TabsList aria-label={listLabel}>
        {tabs.map((tab) => <TabsTab key={tab.value} value={tab.value}>{tab.label}</TabsTab>)}
      </TabsList>
      {tabs.map((tab) => <TabsPanel key={tab.value} value={tab.value}>{tab.content}</TabsPanel>)}
    </Tabs>
  );
}

const productTabs: MyTab[] = [
  { value: 'description', label: 'Description', content: <Text size={3}>A merino wool sweater with a relaxed fit and ribbed cuffs.</Text> },
  { value: 'care', label: 'Care', content: <Text size={3}>Machine wash at 30 °C, dry flat, do not tumble dry.</Text> },
  { value: 'shipping', label: 'Shipping', content: <Text size={3}>Free delivery in 3–5 days, free returns within 30 days.</Text> },
];

export default function Recipe() {
  return (
    <MyTabs listLabel='Product details' tabs={productTabs} defaultValue='description' style={{ width: '100%', maxWidth: 480 }} />
  );
}
```
<!-- /example -->

## Required Parts

- `Tabs`: root that owns the selected tab, the activation mode, the orientation and the size
- `TabsList`: the `tablist` that holds the tabs and handles the arrow keys
- `TabsTab`: a `<button role="tab">` with a `value`
- `TabsPanel`: the `tabpanel` shown while the tab with the same `value` is selected

## Optional Parts

- None. The line under the selected tab is drawn by `TabsList` in CSS.

## Composition Order

1. `Tabs`
2. `TabsList`
3. `TabsTab`
4. `TabsPanel`

## Variants

- Uncontrolled through `defaultValue` versus [controlled](../../glossary.md#controlled) through `value` and `onChangeValue`
- `activation='automatic'` (moving shows the tab) versus `activation='manual'` (Enter, Space or a click shows the focused tab)
- `orientation='horizontal'` versus `orientation='vertical'`
- Size variants through `size`: `sm`, `md`, `lg`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Without `value` and `defaultValue` the first enabled tab is shown. Pass `defaultValue` so the right panel is shown on the server render too.
- Hidden panels stay mounted with `hidden="until-found"`: their state is kept, and find in page reaches their text and shows their tab.
- A selected tab can be `disabled`: its panel stays shown, and the arrow keys skip the tab.
- A `TabsPanel` without a `TabsTab` of the same `value` is never shown.

## Common Mistakes

- Forgetting `aria-label` or `aria-labelledby` on `TabsList`.
- Using tabs to switch between pages: links that change the URL are navigation, not tabs.
- Putting padding, a border or a margin on `TabsPanel` itself: hidden panels keep their box, so the spacing shows up for every hidden panel.
- Using `TabsTab` to pick a value for a form; use [SegmentedControl](../segmented-control/) or [Radio](../radio/) for that.
