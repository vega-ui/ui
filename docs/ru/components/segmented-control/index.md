# SegmentedControl

## Профиль документа

`advanced interactive`

## Кратко

`SegmentedControl` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для коротких, всегда видимых наборов взаимоисключающих вариантов с нативными радиоинпутами на уровне элементов и анимированным индикатором выбранного состояния. Это контрол взаимоисключающего выбора, ставящий видимость на первое место, когда варианты должны сравниваться с одного взгляда.

## Импорты

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
  SegmentedControlItemInput,
  type SegmentedControlProps,
  type SegmentedControlSize,
  type SegmentedControlVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## Минимальная композиция

<!-- example: segmented-control/minimal-composition.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <SegmentedControl name='billing-period' defaultValue='monthly' role='radiogroup' aria-label='Billing period'>
      <SegmentedControlItem value='monthly'>
        <SegmentedControlItemInput />
        Monthly
      </SegmentedControlItem>
      <SegmentedControlItem value='yearly'>
        <SegmentedControlItemInput />
        Yearly
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Обязательные части

- `SegmentedControl`: корень, владеющий выбором и индикатором
- `SegmentedControlItem`: видимый выбираемый сегмент
- `SegmentedControlItemInput`: нативная радиокнопка в каждом сегменте — фокус, стрелки, выбор и значение в форме
- `SegmentedControlIndicator`: поверхность выбранного состояния

## Необязательные части

- Нет

## Порядок композиции

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemInput`
4. видимое содержимое элемента
5. `SegmentedControlIndicator`

## Варианты

- Размеры: `xs`, `sm`, `md`, `lg`, `xl`
- Варианты: `primary`, `secondary`
- Состояния: выбранный, невыбранный, отключённый

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

- Скрытые инпуты важны для нативной семантики формы и группы радиокнопок.
- Длинные или сильно различающиеся подписи могут нарушить визуальный баланс.
- Используйте `Select`, когда набор вариантов уже не маленький и не должен быть виден постоянно.
- Если каждому варианту нужны заголовок, описание или содержимое в виде карточки, `SegmentedControl` обычно слишком плотный для этой задачи.

## Частые ошибки

- Использовать сегментированный контрол для больших наборов вариантов.
- Пропускать `SegmentedControlItemInput`, который и является настоящей радиокнопкой.
- Допускать слишком большой разброс длины подписей и нарушать баланс сегментов.
