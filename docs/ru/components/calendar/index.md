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
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
} from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <Calendar locale={locale}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
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
        <CalendarMonths>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Обязательные части

- `Calendar`: состояние корня и модель выбора даты

## Необязательные части

- `CalendarHeader`, `CalendarPrevButton`, `CalendarNextButton`: элементы навигации; «назад» и «вперёд» следуют текущему виду
- `CalendarViewButtonGroup`, `CalendarViewButton`: переключатели видов месяцев и лет
- `CalendarMonthLabel`, `CalendarYearLabel`: подписи видимого месяца и года
- `CalendarContent`: обёртка для видов
- `CalendarDays`, `CalendarMonths`, `CalendarYears`: виды дней, месяцев и лет
- `CalendarDay`, `CalendarMonth`, `CalendarYear`: шаблоны ячеек видов, с `useCalendarDayContext`, `useCalendarMonthContext`, `useCalendarYearContext`

## Порядок композиции

Типичная композиция:

1. `Calendar`
2. `CalendarHeader` с `CalendarPrevButton`, `CalendarViewButtonGroup`, `CalendarNextButton`
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; видим только текущий `view`

## Варианты

- Выбор: `single`, `multiple`, `range`
- Переключение видов: дни, месяцы, годы
- Плотность: `compact` и варианты размеров
- Глубина композиции: стандартные виды или пользовательские шаблоны ячеек
- Локаль и календарная система: пропсы корня `locale` и `calendar`, по умолчанию — локаль среды выполнения и григорианский календарь; см. [Даты и календарные системы](../../i18n.md#пропсы-локали-и-календаря)

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
- `value`, `defaultValue`, `min`, `max`, `month` и `disabledDates` — ISO-строки `YYYY-MM-DD` в любой календарной системе; только сетка и подписи следуют `calendar`.
- Негригорианские календари создаются через `createCalendarSystem`; см. [Даты и календарные системы](../../i18n.md#адаптер-календарной-системы).

## Частые ошибки

- Забывать, что `selection` меняет ожидаемую модель значения.
- Передавать объекты `Date`, временные метки или строки отображаемого календаря вместо ISO-строк `YYYY-MM-DD`.
- Брать номер дня из ISO `date` ячейки вместо `label` или `fields.day`; в негригорианских календарях это неверно.
- Комбинировать `min`, `max` и `disabledDates`, не проверив итоговый UX.
