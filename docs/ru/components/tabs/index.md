# Tabs

## Профиль документа

`advanced interactive`

## Кратко

`Tabs` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который показывает одну панель содержимого за раз. `TabsList` содержит кнопки `TabsTab`, а каждая `TabsPanel` принадлежит вкладке с тем же `value`. Компонент следует паттерну вкладок WAI-ARIA: список — одна остановка табуляции, стрелки переключают вкладки, а скрытые панели остаются смонтированными.

## Импорт

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

## Экспортируемые типы

- `TabsProps`
- `TabsListProps`
- `TabsTabProps`
- `TabsPanelProps`
- `TabsSize`
- `TabsVariant`
- `TabsActivation`
- `TabsOrientation`

## Минимальная композиция

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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyTabs` передаёт свои пропсы в `Tabs`, `listLabel` — списку вкладок как его имя, и рисует вкладку и панель для каждого элемента `tabs`, так что `value` пишется один раз. См. [Рецепты компонентов](../../recipes.md).

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

## Обязательные части

- `Tabs`: корень, который хранит выбранную вкладку, режим активации, ориентацию и размер
- `TabsList`: `tablist`, который содержит вкладки и обрабатывает стрелки
- `TabsTab`: `<button role="tab">` со значением `value`
- `TabsPanel`: `tabpanel`, которая показана, пока выбрана вкладка с тем же `value`

## Необязательные части

- Нет. Линию под выбранной вкладкой рисует `TabsList` средствами CSS.

## Порядок композиции

1. `Tabs`
2. `TabsList`
3. `TabsTab`
4. `TabsPanel`

## Варианты

- Неконтролируемый через `defaultValue` или [контролируемый](../../glossary.md#контролируемый-controlled) через `value` и `onChangeValue`
- `activation='automatic'` (переход показывает вкладку) или `activation='manual'` (вкладку в фокусе показывают Enter, пробел или щелчок)
- `orientation='horizontal'` или `orientation='vertical'`
- Размеры через `size`: `sm`, `md`, `lg`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Без `value` и `defaultValue` показана первая доступная вкладка. Передавайте `defaultValue`, чтобы нужная панель была показана и при серверном рендере.
- Скрытые панели остаются смонтированными с `hidden="until-found"`: их состояние сохраняется, а поиск по странице находит их текст и показывает их вкладку.
- Выбранная вкладка может быть `disabled`: её панель остаётся показанной, а стрелки пропускают вкладку.
- `TabsPanel` без `TabsTab` с тем же `value` никогда не показывается.

## Частые ошибки

- Нет `aria-label` или `aria-labelledby` у `TabsList`.
- Вкладки для перехода между страницами: ссылки, которые меняют URL, — это навигация, а не вкладки.
- Отступы, рамка или внешний отступ на самой `TabsPanel`: скрытые панели сохраняют свой блок, и отступы появляются у каждой скрытой панели.
- `TabsTab` для выбора значения в форме; для этого есть [SegmentedControl](../segmented-control/) и [Radio](../radio/).
