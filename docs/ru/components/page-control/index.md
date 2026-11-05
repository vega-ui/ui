# PageControl

## Профиль документа

`advanced interactive`

## Кратко

`PageControl` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для коротких индикаторов страниц или шагов, обычно в каруселях и онбординге. Поддерживает дискретные элементы и анимированные элементы прогресса.

## Импорт

```tsx
import {
  PageControl,
  PageControlItem,
  PageControlProgress,
  type PageControlItemProps,
  type PageControlProgressProps,
  type PageControlProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PageControlProps`
- `PageControlItemProps`
- `PageControlProgressProps`

## Минимальная композиция

`PageControl` рендерит `tablist`, а каждый элемент — `tab`, но видимой подписи нет ни у того, ни у другого: передайте `aria-label` корню и каждому элементу. Для неконтролируемого варианта используйте `defaultActive`, а если слайды живут в состоянии родителя — `active` вместе с `onChangeActive`.

<!-- example: page-control/minimal-composition.tsx -->
```tsx
import { PageControl, PageControlItem } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PageControl defaultActive={0} aria-label='Slides'>
      <PageControlItem index={0} aria-label='Slide 1 of 3' />
      <PageControlItem index={1} aria-label='Slide 2 of 3' />
      <PageControlItem index={2} aria-label='Slide 3 of 3' />
    </PageControl>
  );
}
```
<!-- /example -->

## Обязательные части

- `PageControl`: корневой координатор активного состояния
- `PageControlItem`: дискретный элемент-точка

## Необязательные части

- `PageControlProgress`: анимированный элемент в виде прогресса

## Порядок композиции

1. `PageControl`
2. повторяющиеся `PageControlItem` или `PageControlProgress`

## Варианты

- Размер: `sm`, `md`, `lg`
- Модель состояния: контролируемый или неконтролируемый `active`
- Вид элемента: статичная точка или индикатор прогресса

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Паттерн лучше всего работает для коротких последовательностей.
- Элементы прогресса добавляют семантику времени, которая должна соответствовать реальной автопрокрутке или переходу между шагами.
- Активное состояние не должно передаваться только цветом.

## Частые ошибки

- Использование `PageControl` для навигации по длинным спискам результатов.
- Активное состояние не синхронизировано с реальной каруселью или шагом онбординга.
- Слишком много элементов для доступного места.
