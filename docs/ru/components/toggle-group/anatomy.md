# ToggleGroup: анатомия

## Обзор

`ToggleGroup` — родитель своих переключателей. Каждый элемент — `ToggleGroupToggle` с `value`, его ключом в группе. Значением всех элементов, остановкой табуляции и стрелками владеет группа. Элементы регистрируются в том порядке, в котором рендерятся, и в этом же порядке по ним ходят стрелки.

## Обязательные части

### `ToggleGroup`

Рендерит `<div role="radiogroup">` или, с `multiple`, `<div role="group">`, выложенный строкой `inline-flex` с небольшим промежутком. Принимает все HTML-атрибуты и `ref`, хранит значение своих элементов и передаёт им свои `size` и `disabled`. Своего имени у неё нет: передайте `aria-label` или `aria-labelledby`.

### `ToggleGroupToggle`

Один элемент группы под своим обязательным `value`. Рендерит [Button](../button/) с видом [Toggle](../toggle/): `<button type="button" role="radio" aria-checked>` без `multiple` и `<button type="button" aria-pressed>` с ним, в обоих случаях с `data-pressed`. Получает `tabIndex={0}`, когда держит остановку табуляции группы, и `-1` в остальных случаях. С `asChild` рендерит свой единственный дочерний элемент, который должен быть кнопкой, и передаёт ему `type="button"`, если тот не задаёт свой. У него нет `pressed`, `defaultPressed` и `onChangePressed`: решает группа. `size` на нём перебивает `size` группы, а `disabled` отключает только его. Внутри [Toolbar](../toolbar/) он сам регистрируется в панели.

## Необязательные части

### `Icon`

[Icon](../icon/) рядом с текстом элемента или один в элементе с `square` и `aria-label`.

### `Toolbar`

[Toolbar](../toolbar/) вокруг группы. Элементы группы входят в панель сами, без `ToolbarItem`; группа отдаёт свою остановку табуляции и стрелки и сохраняет роль и значение.

## Порядок композиции

1. `ToggleGroup`
2. `ToggleGroupToggle`, каждый со своим `value`, в том порядке, в котором они показаны
3. Его содержимое: `Icon` и текст или один `Icon` с `square`

## Корректные варианты композиции

Переключатель вида над содержимым, которое он переключает: у элементов группы есть иконка и текст, значение хранит родитель, и какой-то вид показан всегда, потому что повторное нажатие не отжимает нажатый элемент.

<!-- example: toggle-group/view-switcher.tsx -->
```tsx
import { useState, type ReactNode } from 'react';
import { Icon, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { CalendarIcon, KanbanIcon, ListIcon } from '@vega-ui/icons';

const views: { value: string, label: string, icon: ReactNode, summary: string }[] = [
  { value: 'list', label: 'List', icon: <ListIcon />, summary: '18 tasks, sorted by due date' },
  { value: 'board', label: 'Board', icon: <KanbanIcon />, summary: '4 columns: To do, In progress, Review, Done' },
  { value: 'week', label: 'Week', icon: <CalendarIcon />, summary: '6 tasks due this week' },
];

export default function ViewSwitcher() {
  const [view, setView] = useState('list');
  const current = views.find((item) => item.value === view) ?? views[0];

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 440 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <Text size={4} fontWeight={600}>Launch plan</Text>
        <ToggleGroup aria-label='View' size='xs' value={view} onChangeValue={setView}>
          {views.map((item) => (
            <ToggleGroupToggle key={item.value} value={item.value}>
              <Icon size='xs'>{item.icon}</Icon>
              {item.label}
            </ToggleGroupToggle>
          ))}
        </ToggleGroup>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: 120,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{current.summary}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Два элемента с одинаковым `value`

Группа различает элементы по `value`. Два элемента с одинаковым `value` делят один ключ: они нажимаются вместе, а стрелки останавливаются только на одном из них.

### Контролы, кроме `ToggleGroupToggle`, в группе

[Toggle](../toggle/), `Button` или ссылка внутри группы — не её элемент: у него остаются своя остановка табуляции и своё состояние, а стрелки его пропускают. Кладите в группу только элементы `ToggleGroupToggle`, а остальные контролы — рядом с ней.

### Группа без имени

Группа объявляет своё имя, когда в неё входит фокус. Без `aria-label` или `aria-labelledby` пользователь слышит только элемент, например «Align center, радиокнопка, 2 из 3», но не то, о чём этот выбор.

