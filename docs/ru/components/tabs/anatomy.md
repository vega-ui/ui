# Tabs: анатомия

## Обзор

`Tabs` состоит из корня, списка вкладок и панелей. Корень хранит состояние, `TabsList` обрабатывает клавиатуру, а каждая пара `TabsTab` и `TabsPanel` связана через `value`. Панели не обязаны стоять сразу после списка: между ними может быть любой элемент.

## Обязательные части

### `Tabs`

Хранит выбранную вкладку (`value`, `defaultValue`, `onChangeValue`), режим активации, ориентацию и размер. Рендерит `<div>` с `data-orientation`.

### `TabsList`

Рендерит `<div role="tablist">` с `aria-orientation`. Это единственная остановка табуляции вкладок: он переносит фокус между ними стрелками, Home и End и рисует линию под выбранной вкладкой. Ему нужно доступное имя из `aria-label` или `aria-labelledby`.

### `TabsTab`

Рендерит `<button type="button" role="tab">` с `aria-selected` и `aria-controls`. Его `value` совпадает с `value` панели. Нативный `disabled` исключает вкладку из перехода стрелками и из нажатий указателем.

### `TabsPanel`

Рендерит `<div role="tabpanel">`, подписанный своей вкладкой. Пока вкладка не выбрана, у панели есть `hidden="until-found"` и `aria-hidden`, и она остаётся смонтированной.

## Необязательные части

Необязательных частей нет. Индикатор под выбранной вкладкой — псевдоэлемент `TabsList`, который следует за выбранной вкладкой через CSS anchor positioning.

## Порядок композиции

1. `Tabs`
2. `TabsList`
3. `TabsTab`, по одной на панель
4. `TabsPanel`, по одной на вкладку, после списка

## Корректные варианты композиции

<!-- example: tabs/valid-composition-patterns.tsx -->
```tsx
import { useId } from 'react';
import { Heading, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  const titleId = useId();

  return (
    <section style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 480 }}>
      <Heading id={titleId} as='h3' size={4} fontWeight={600}>Issues</Heading>
      <Tabs defaultValue='open' size='sm'>
        <TabsList aria-labelledby={titleId}>
          <TabsTab value='open'>Open</TabsTab>
          <TabsTab value='closed'>Closed</TabsTab>
        </TabsList>
        <Text size={2} style={{ display: 'block', marginBlockEnd: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Updated 5 minutes ago</Text>
        <TabsPanel value='open'>
          <Text size={3}>3 open issues, the oldest from 12 November.</Text>
        </TabsPanel>
        <TabsPanel value='closed'>
          <Text size={3}>41 issues closed this month.</Text>
        </TabsPanel>
      </Tabs>
    </section>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### `TabsTab` вне `TabsList`

Вкладка вне списка не входит в `tablist`, поэтому стрелки и скринридеры не считают её одной из вкладок.

### Ссылки вместо вкладок

Вкладка, которая меняет URL, — это навигация. Используйте `<nav>` со ссылками и `aria-current="page"` на текущей.

### Отступы на `TabsPanel`

Скрытые панели сохраняют свой блок, поэтому отступы, рамки и внешние отступы `TabsPanel` появляются у каждой скрытой панели. Ставьте их на элемент внутри панели.
