# MonthPicker: стилизация

## Обзор

У `MonthPicker` нет большого собственного CSS-контракта корня. Бо́льшая часть внешнего вида унаследована от базовых примитивов пикера и сетки, а также от частей раскладки, которые рендерятся внутри корня.

## Публичные CSS-переменные

В текущей реализации нет значимых публичных CSS-переменных, специфичных для MonthPicker.

Глобальная семантика цветов и поверхностей должна приходить из [тем](../../styling/themes.md), а не из собственных переменных MonthPicker.

## Переменные частей

### Корень

Корень отвечает за поведение и нейтрален к раскладке. Он владеет состоянием выбора месяца, а не отдельным слоем стилей.

### Раскладка

Визуальное расположение месяцев задают составные части строк и элементов сетки, а также форматирование по локали.

## Взаимодействие состояний и вариантов

- Стили выбора, отключения и активного состояния приходят из базовых примитивов пикера.
- Форма сетки меняется пропом раскладки `cols`, а не отдельными CSS-переменными.

## Примеры

### Размер и вариант

`size` задаёт размер ячеек и шрифта, `variant` — вид выбранного месяца; форму сетки задают `cols` и `format` раскладки. Всё это пропсы, а не CSS-переменные.

<!-- example: month-picker/size-and-variant.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <MonthPicker aria-label='Secondary, extra small' locale='en-US' year='2026-01-01' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <MonthPicker aria-label='Primary, medium' locale='en-US' year='2026-01-01' size='md' variant='primary' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={3}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не описывайте CSS API MonthPicker, которого нет в исходном коде
- не считайте пропсы раскладки дизайн-токенами
