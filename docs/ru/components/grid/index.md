# Grid

## Профиль документа

`advanced interactive`

## Кратко

`Grid` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для навигации по строкам и ячейкам сетки с клавиатуры. С `selection` она добавляет одиночный, множественный или диапазонный выбор. `GridItem` придаёт ячейкам вид пикера VegaUI, а `GridScroller` разбивает их на страницы. Это базовый слой, на котором построены пикеры дат.

## Импорты

```tsx
import {
  Grid,
  GridRowGroup,
  GridRow,
  GridCell,
  GridColumnHeader,
  GridRowHeader,
  GridItem,
  GridScroller,
  type GridProps,
  type GridKey,
  type GridWrap,
  type GridSelection,
  type GridKeys,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `GridProps`
- `GridKey`
- `GridWrap`
- `GridIntent`
- `GridKeys<K>`: ключ, массив ключей или предикат
- `GridKeyMatcher<K>`: предикат `(key) => boolean`
- `GridApiRef`
- `GridSelection = 'single' | 'multiple' | 'range'`
- `GridRangePosition`
- `GridColumnHeaderProps`
- `GridRowHeaderProps`
- `GridItemProps`
- `GridItemSize`
- `GridItemVariant`
- `GridScrollerProps`

## Минимальная композиция

<!-- example: grid/minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <Grid aria-label='Release checklist' defaultActive='0:0' className='gridSheet'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0}>Design</GridCell>
          <GridCell col={1}>Build</GridCell>
          <GridCell col={2}>Ship</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0}>Done</GridCell>
          <GridCell col={1}>In progress</GridCell>
          <GridCell col={2}>Not started</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

С `selection` ячейки получают `aria-selected`, а клик, Enter или Space выбирают их:

<!-- example: grid/selection-minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function SelectionMinimalComposition() {
  return (
    <Grid aria-label='Quarter' selection='single' defaultActive='q1' className='selectableGrid'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='q1'>Q1</GridCell>
          <GridCell col={1} value='q2'>Q2</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0} value='q3'>Q3</GridCell>
          <GridCell col={1} value='q4'>Q4</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

`GridItem` внутри `<GridCell asChild>` придаёт ячейке вид пикера: размер, выбранное и диапазонное состояния и отключённое состояние:

<!-- example: grid/item-minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

export default function ItemMinimalComposition() {
  return (
    <Grid aria-label='Plan length' selection='single' wrap='horizontal' defaultActive='1m' style={{ width: 240 }}>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='1m' asChild>
            <GridItem>1 mo</GridItem>
          </GridCell>
          <GridCell col={1} value='6m' asChild>
            <GridItem>6 mo</GridItem>
          </GridCell>
          <GridCell col={2} value='12m' asChild>
            <GridItem>12 mo</GridItem>
          </GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

## Обязательные части

- `Grid`: корневая модель клавиатуры и активной ячейки
- `GridRowGroup`: контейнер для группировки строк
- `GridRow`: регистрация строки
- `GridCell`: фокусируемая или навигируемая ячейка

## Необязательные части

- кастомное содержимое внутри `GridCell`
- контролируемая логика активной ячейки на уровне родителя
- `apiRef` для продвинутой координации фокуса и измерений
- `selection` вместе с `disabled`, `min`, `max`, функциями сравнения и резолвером диапазона
- `GridColumnHeader` и `GridRowHeader` для ячеек-заголовков (`columnheader`, `rowheader`)
- `asChild` у всех частей, чтобы собрать сетку на `table`, `tbody`, `tr`, `th` и `td`
- интерактивное содержимое в ячейках: поля ввода, кнопки, меню
- `GridItem` внутри `<GridCell asChild>` для вида ячейки пикера
- `GridScroller` с `IndexedSnapScrollerContent` для постраничных сеток

## Порядок композиции

Типичная композиция:

1. `Grid`
2. необязательный `GridScroller` с `IndexedSnapScrollerContent`
3. `GridRowGroup`
4. `GridRow`
5. `GridColumnHeader` или `GridRowHeader`, где строке нужен заголовок
6. `GridCell`, при необходимости с `GridItem` в качестве дочернего элемента

## Варианты

- Режимы переноса из `GridWrap`
- Неконтролируемая активная ячейка по умолчанию или контролируемая активная ячейка
- Выбор: нет (по умолчанию), `single`, `multiple`, `range`
- Ограничения: `exclude`, `disabled`, `min`, `max`, собственные функции сравнения
- Размер `GridItem`: `xs`, `sm`, `md`, `lg`, `xl`; вариант: `primary`, `secondary`
- Раскладка: статичная сетка или постраничная через скроллер

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

- Разреженным сеткам нужны правила исключений, которые совпадают с видимой раскладкой.
- Интерактивное содержимое ячейки имеет `tabIndex={-1}`, в него входят по Enter или F2 и выходят по Escape; Tab выводит из сетки, а не останавливается на каждой кнопке. Ячейка из одного виджета — это `<GridCell asChild><button /></GridCell>`.
- Заголовку, с которым нечего делать, например названию дня недели, нужен `excluded`; заголовок с кнопкой сортировки остаётся фокусируемым.
- Сетке, которая отрисовывает только часть строк, нужны `aria-rowcount` на `Grid` и `aria-rowindex` на каждой `GridRow`; они передаются как есть.
- Большим наборам данных может понадобиться виртуализация за пределами компонента.
- Расширение диапазона использует логику указателя и клавиатуры, которую стоит проверять на реальной форме сетки.
- Отключённые ячейки остаются фокусируемыми и только блокируют выбор; чтобы пропускать их, передайте их и в `exclude`. `DayPicker`, `MonthPicker` и `YearPicker` сами пропускают недоступные даты.
- `min` и `max` ограничивают пространство выбора, а не только видимую раскладку.

## Частые ошибки

- Использовать `Grid` для статичных таблиц, которые должны оставаться `Table`.
- Игнорировать логику исключений при разреженной визуальной раскладке.
- Давать каждой кнопке внутри ячеек свою остановку Tab вместо Enter, F2 и Escape.
- Оставлять статичный заголовок фокусируемым без `excluded`.
- Использовать выбор без стабильной модели ключей.
- Забывать, что логика диапазона зависит от `compare` и `resolveRange`.
- Вручную воссоздавать вид выбранной, диапазонной и отключённой ячейки, когда он уже есть у `GridItem`.
