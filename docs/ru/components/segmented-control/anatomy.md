# SegmentedControl: анатомия

## Обзор

`SegmentedControl` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для всегда видимых взаимоисключающих вариантов с общим индикатором, нативными радиоинпутами на уровне элементов и индикатором выбранного состояния, привязанным через CSS-якоря.

## Обязательные части

### `SegmentedControl`

Обязателен. Отвечает за `name` группы, контролируемое `value` или начальное `defaultValue`, размер, вариант и отключённое состояние.

### `SegmentedControlItem`

Обязателен. Рендерит один выбираемый сегмент и его видимое содержимое.

### `SegmentedControlIndicator`

Обязателен для анимированной поверхности выбранного состояния.

### `SegmentedControlItemInput`

Обязателен в каждом сегменте. Визуально скрытая нативная радиокнопка: от неё берутся фокус, стрелки, выбор, стиль выбранного сегмента и значение в форме.

## Необязательные части

Необязательных частей нет. Дайте группе имя через `role='radiogroup'` и `aria-label` или `aria-labelledby` на корне.

## Порядок композиции

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemInput`
4. видимое содержимое элемента
5. `SegmentedControlIndicator`

## Корректные варианты композиции

Группа с текстовыми сегментами, получающая имя от видимой подписи через `aria-labelledby`, и группа из одних иконок, где каждый `SegmentedControlItemInput` получает собственный `aria-label`.

<!-- example: segmented-control/valid-composition-patterns.tsx -->
```tsx
import {
  Icon,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { LayoutGridIcon, ListIcon } from '@vega-ui/icons';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='orders-filter-label'>Orders</Label>
        <SegmentedControl name='orders-filter' defaultValue='open' role='radiogroup' aria-labelledby='orders-filter-label'>
          <SegmentedControlItem value='open'>
            <SegmentedControlItemInput />
            Open
          </SegmentedControlItem>
          <SegmentedControlItem value='shipped'>
            <SegmentedControlItemInput />
            Shipped
          </SegmentedControlItem>
          <SegmentedControlItem value='returned'>
            <SegmentedControlItemInput />
            Returned
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <SegmentedControl name='orders-layout' defaultValue='list' size='sm' role='radiogroup' aria-label='Layout'>
        <SegmentedControlItem value='list'>
          <SegmentedControlItemInput aria-label='List' />
          <Icon size='sm'><ListIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlItem value='grid'>
          <SegmentedControlItemInput aria-label='Grid' />
          <Icon size='sm'><LayoutGridIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlIndicator />
      </SegmentedControl>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Элементы без общего корня

Это ломает контекст выбранного состояния и позиционирование индикатора.

### Скрытые инпуты пропущены в сценариях с формами

Контрол может выглядеть правильно, но терять нативную семантику группы радиокнопок.

### Большие или сильно разнородные наборы вариантов

Сегментированный контрол предназначен для коротких, всегда видимых взаимоисключающих вариантов, а не для длинных меню.
