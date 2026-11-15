# Calendar: анатомия

## Обзор

`Calendar` владеет днём в фокусе (а с ним и показанным месяцем), текущим видом, состоянием выбора, правилами отключённых дат, локалью и календарной системой, а также координирует клавиатуру между видами дней, месяцев и лет.

## Обязательные части

### `Calendar`

Корневой провайдер модели выбора даты.

- Обязательна: да
- Владеет: состоянием вида, днём в фокусе, состоянием выбора, логикой отключённых дат, `locale` и `calendar`

## Необязательные части

### `CalendarHeader`

Обёртка заголовка для навигации и переключения видов.

### `CalendarPrevButton` / `CalendarNextButton`

Показывают предыдущую или следующую страницу текущего вида. В днях переносят день в фокусе на тот же день предыдущего или следующего месяца, а фокус остаётся на кнопке; в годах показывают предыдущую или следующую страницу лет. Скрыты в виде месяцев, а в днях — когда предыдущий или следующий месяц выходит за `min` / `max`.

### `CalendarHeading`

Заголовок показанного месяца, по умолчанию `<h2 aria-live="polite">`; `as` выбирает другой уровень заголовка под структуру страницы. Он даёт имя сетке дней: `CalendarDays` получает `aria-labelledby` на него, если вы не передали свои `aria-label` или `aria-labelledby`. Обычно оборачивает кнопки `CalendarViewButton`, и тогда видимые месяц и год — это они; без дочерних элементов показывает месяц и год.

### `CalendarViewButton`

`view='month'` или `view='year'` переключает этот вид; повторное нажатие возвращает к дням. Кнопка нажата (`aria-pressed`), пока показан её вид.

### `CalendarMonthLabel` / `CalendarYearLabel`

Месяц и год дня в фокусе в локали и календарной системе корня.

### `CalendarContent`

Основная обёртка содержимого для видов.

### `CalendarDays`

Вид дней. Его дочерние элементы — `CalendarWeekdays` и `CalendarWeeks` или `CalendarDaysScroller` со страницами `CalendarWeeks`. Пока открыт вид месяцев или лет, он остаётся смонтированным (с `inert`), чтобы календарь сохранял размер.

### `CalendarWeekdays`

Строка названий дней недели в локали корня, начиная с первого дня её недели. Проп: `format` (`'long' | 'short' | 'narrow'`, по умолчанию `'short'`). Обязательные дочерние элементы — шаблон дня недели, обычно `<CalendarWeekday />`; день недели читается через `useCalendarWeekdayContext()`.

### `CalendarDaysScroller` / `CalendarDaysScrollerContent`

Необязательное переключение месяцев свайпом: скроллер содержит по `CalendarDaysScrollerContent` на месяц, и свайп к месяцу переносит день в фокусе на тот же день этого месяца. Кнопки «назад» и «вперёд» прокручивают его. Проп скроллера: `onChangePeriod`. Без скроллера вид дней показывает только месяц дня в фокусе, и кнопки переключают его сразу.

### `CalendarWeeks`

Сетка дней месяца по неделям: внутри `CalendarDaysScrollerContent` — месяц страницы, прямо в `CalendarDays` — месяц дня в фокусе. Пропсы: `format`, `includeOverflowDays`.

### `CalendarMonths` / `CalendarMonthsGrid`

Вид месяцев: месяцы года дня в фокусе, 12 или 13 в зависимости от календарной системы. Смонтирован, пока вид открыт и до конца анимации закрытия. `CalendarMonthsGrid` раскладывает их; пропсы: `cols`, `format`.

### `CalendarYears` / `CalendarYearsScroller` / `CalendarYearsScrollerContent` / `CalendarYearsGrid`

Вид лет: страницы по 12 лет. Смонтирован, пока вид открыт и до конца анимации закрытия. `CalendarYearsGrid` раскладывает страницу (проп: `format`); внутри `CalendarYearsScroller` и `CalendarYearsScrollerContent` страницы листаются свайпом, прямо в `CalendarYears` показывается страница года в фокусе, и кнопки переключают страницы сразу.

### `CalendarDay` / `CalendarMonth` / `CalendarYear`

Шаблоны ячеек. Дочерние элементы `CalendarWeeks`, `CalendarMonthsGrid` и `CalendarYearsGrid` обязательны и рендерятся по одному разу на ячейку внутри контекста ячейки; обычно это `<CalendarDay />`, `<CalendarMonth />` или `<CalendarYear />`, которые показывают отформатированную подпись. Ячейка читается через `useCalendarDayContext()`, `useCalendarMonthContext()` или `useCalendarYearContext()`.

## Порядок композиции

Типичная композиция:

1. `Calendar`
2. `CalendarHeader` с кнопками навигации и `CalendarHeading`, внутри которого кнопки видов
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; видим только текущий вид, а виды месяцев и лет смонтированы, только пока открыты или закрываются

## Допустимые варианты композиции

Виды месяцев и лет необязательны. Календарь только с днями оставляет в `CalendarContent` один `CalendarDays` и показывает месяц и год текстом внутри `CalendarHeading` между кнопками навигации; без `CalendarMonths` и `CalendarYears` кнопке `CalendarViewButton` нечего открывать, поэтому её не используют. Полная композиция — в разделе [Минимальная композиция](./index.md#минимальная-композиция).

<!-- example: calendar/valid-composition-patterns.tsx -->
```tsx
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
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
        <CalendarHeading>
          <Text fontWeight={600}>
            <CalendarMonthLabel /> <CalendarYearLabel />
          </Text>
        </CalendarHeading>
        <CalendarNextButton aria-label='Next month' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarDaysScroller>
            <CalendarDaysScrollerContent>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDaysScrollerContent>
          </CalendarDaysScroller>
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
