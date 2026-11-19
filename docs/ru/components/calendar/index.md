# Calendar

## Профиль документа

`advanced interactive`

## Кратко

`Calendar` — [продвинутый интерактивный](../structure.md#advanced-interactive) [составной компонент](../../glossary.md#составной-компонент-compound-component) для согласованного выбора даты в видах дней, месяцев и лет. Это слой оркестрации для потребителей поверх низкоуровневого семейства компонентов выбора.

## Импорты

```tsx
import {
  Calendar,
  type CalendarProps,
  type CalendarView,
  type CalendarSelection,
  type CalendarDatesDisabled,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CalendarProps`
- `CalendarView`
- `CalendarSelection`
- `CalendarDatesDisabled`

## Минимальная композиция

<!-- example: calendar/minimal-composition.tsx -->
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
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <Calendar locale={locale}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
        <CalendarMonths>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <CalendarYear />
              </CalendarYearsGrid>
            </CalendarYearsScrollerContent>
          </CalendarYearsScroller>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyCalendar` передаёт свои пропсы в `Calendar`, включая значение, режим выбора и размер, а кнопки с шевронами называет через `previousLabel` и `nextLabel`, а пока показаны годы, через `previousYearsLabel` и `nextYearsLabel`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: calendar/recipe.tsx -->
```tsx
import { useState } from 'react';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  Icon,
  type CalendarProps,
  type CalendarSelection,
  type CalendarView,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

interface MyCalendarProps<SelectionMode extends CalendarSelection = 'single'> extends CalendarProps<SelectionMode> {
  previousLabel: string
  nextLabel: string
  previousYearsLabel: string
  nextYearsLabel: string
}

export function MyCalendar<SelectionMode extends CalendarSelection = 'single'>({
  previousLabel,
  nextLabel,
  previousYearsLabel,
  nextYearsLabel,
  onChangeView,
  ...props
}: MyCalendarProps<SelectionMode>) {
  const [shownView, setShownView] = useState<CalendarView>(props.defaultView ?? 'day');
  const years = (props.view ?? shownView) === 'year';

  const changeView = (view: CalendarView) => {
    onChangeView?.(view);
    setShownView(view);
  };

  return (
    <Calendar {...props} onChangeView={changeView}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label={years ? previousYearsLabel : previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label={years ? nextYearsLabel : nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
        <CalendarMonths>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <CalendarYear />
              </CalendarYearsGrid>
            </CalendarYearsScrollerContent>
          </CalendarYearsScroller>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}

export default function Recipe() {
  return (
    <MyCalendar
      compact
      locale='en-US'
      defaultValue='2026-11-24'
      previousLabel='Previous month'
      nextLabel='Next month'
      previousYearsLabel='Previous years'
      nextYearsLabel='Next years'
    />
  );
}
```
<!-- /example -->

## Обязательные части

- `Calendar`: состояние корня и модель выбора даты

## Необязательные части

- `CalendarHeader`, `CalendarPrevButton`, `CalendarNextButton`: элементы навигации; «назад» и «вперёд» следуют текущему виду
- `CalendarViewButton`: переключатели видов месяцев и лет
- `CalendarHeading`: заголовок показанного месяца, который даёт имя сетке дней; обычно оборачивает кнопки видов
- `CalendarMonthLabel`, `CalendarYearLabel`: подписи месяца и года дня в фокусе
- `CalendarContent`: обёртка для видов
- `CalendarDays`, `CalendarMonths`, `CalendarYears`: виды дней, месяцев и лет
- `CalendarDay`, `CalendarMonth`, `CalendarYear`: шаблоны ячеек видов, с `useCalendarDayContext`, `useCalendarMonthContext`, `useCalendarYearContext`

## Порядок композиции

Типичная композиция:

1. `Calendar`
2. `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` вокруг кнопок `CalendarViewButton`, `CalendarNextButton`
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; видим только текущий `view`, а виды месяцев и лет смонтированы, только пока открыты или закрываются

## Варианты

- Выбор: `single`, `multiple`, `range`
- Переключение видов: дни, месяцы, годы
- Плотность: `compact` и варианты размеров
- Глубина композиции: стандартные виды или пользовательские шаблоны ячеек
- Локаль и календарная система: пропсы корня `locale` и `calendar`, по умолчанию — `"en-US"` и григорианский календарь; см. [Даты и календарные системы](../../i18n.md#пропсы-локали-и-календаря)

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

- Режим выбора меняет форму значения.
- Ограничения отключённых дат могут задаваться списком значений или логикой предиката.
- Пользовательские шаблоны ячеек нужно перепроверять на клавиатурную навигацию, дни соседних месяцев и смену видимого периода.
- `value`, `defaultValue`, `min`, `max`, `focusedDate`, `today` и `disabledDates` — ISO-строки `YYYY-MM-DD` в любой календарной системе; только сетка и подписи следуют `calendar`.
- Негригорианские календари создаются через `createCalendarSystem`; см. [Даты и календарные системы](../../i18n.md#адаптер-календарной-системы).

## Частые ошибки

- Забывать, что `selection` меняет ожидаемую модель значения.
- Передавать объекты `Date`, временные метки или строки отображаемого календаря вместо ISO-строк `YYYY-MM-DD`.
- Брать номер дня из ISO `date` ячейки вместо `label` или `fields.day`; в негригорианских календарях это неверно.
- Комбинировать `min`, `max` и `disabledDates`, не проверив итоговый UX.
