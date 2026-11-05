# Calendar: анатомия

## Обзор

`Calendar` владеет видимым месяцем, текущим видом, состоянием выбора, правилами отключённых дат, локалью и календарной системой, а также координирует клавиатуру между видами дней, месяцев и лет.

## Обязательные части

### `Calendar`

Корневой провайдер модели выбора даты.

- Обязательна: да
- Владеет: состоянием вида, видимым месяцем, состоянием выбора, логикой отключённых дат, `locale` и `calendar`

## Необязательные части

### `CalendarHeader`

Обёртка заголовка для навигации и переключения видов.

### `CalendarPrevButton` / `CalendarNextButton`

Показывают предыдущую или следующую страницу текущего вида: предыдущий или следующий месяц в днях, предыдущую или следующую страницу лет в годах. Скрыты в виде месяцев, а в днях — когда предыдущий или следующий месяц выходит за `min` / `max`.

### `CalendarViewButtonGroup`

Держит кнопки видов вместе между кнопками «назад» и «вперёд».

### `CalendarViewButton`

`view='month'` или `view='year'` переключает этот вид; повторное нажатие возвращает к дням. Кнопка нажата (`aria-pressed`), пока показан её вид.

### `CalendarMonthLabel` / `CalendarYearLabel`

Видимые месяц и год в локали и календарной системе корня.

### `CalendarContent`

Основная обёртка содержимого для видов.

### `CalendarDays`

Вид дней. Его дочерние элементы — `CalendarWeekdays` и `CalendarWeeks`.

### `CalendarWeekdays`

Строка названий дней недели в локали корня, начиная с первого дня её недели. Проп: `format` (`'long' | 'short' | 'narrow'`, по умолчанию `'short'`). Обязательные дочерние элементы — шаблон дня недели, обычно `<CalendarWeekday />`; день недели читается через `useCalendarWeekdayContext()`.

### `CalendarWeeks`

Сетка дней по неделям с переключением месяцев свайпом. Пропсы: `format`, `includeOverflowDays`.

### `CalendarMonths`

Вид месяцев: месяцы видимого года, 12 или 13 в зависимости от календарной системы. Пропсы: `cols`, `format`.

### `CalendarYears`

Вид лет: страницы лет, переключаемые свайпом. Проп: `format`.

### `CalendarDay` / `CalendarMonth` / `CalendarYear`

Шаблоны ячеек. Дочерние элементы `CalendarWeeks`, `CalendarMonths` и `CalendarYears` обязательны и рендерятся по одному разу на ячейку внутри контекста ячейки; обычно это `<CalendarDay />`, `<CalendarMonth />` или `<CalendarYear />`, которые показывают отформатированную подпись. Ячейка читается через `useCalendarDayContext()`, `useCalendarMonthContext()` или `useCalendarYearContext()`.

## Порядок композиции

Типичная композиция:

1. `Calendar`
2. `CalendarHeader` с кнопками навигации и кнопками видов
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; видим только текущий вид

## Допустимые варианты композиции

Виды месяцев и лет необязательны. Календарь только с днями оставляет в `CalendarContent` один `CalendarDays` и показывает месяц и год простым текстом между кнопками навигации; без `CalendarMonths` и `CalendarYears` кнопке `CalendarViewButton` нечего открывать, поэтому её не используют. Полная композиция — в разделе [Минимальная композиция](./index.md#минимальная-композиция).

<!-- example: calendar/valid-composition-patterns.tsx -->
```tsx
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Calendar locale='en-US'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous month' />
        <Text fontWeight={600}>
          <CalendarMonthLabel /> <CalendarYearLabel />
        </Text>
        <CalendarNextButton aria-label='Next month' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Части видов вне `Calendar`

Виды и шаблоны ячеек зависят от контекста корня. Если вынести их за пределы `Calendar`, координация ломается.

### Пользовательские шаблоны ячеек без `CalendarDay`

Шаблон должен рендерить `CalendarDay` (или `CalendarMonth`, `CalendarYear`) в качестве ячейки, а содержимое — внутри него. Без этого сетка теряет состояния выбора, фокуса и отключения.

### Виды дней, месяцев и лет как отдельные виджеты

Это согласованные виды одной модели состояния календаря, а не несвязанные компоненты.
