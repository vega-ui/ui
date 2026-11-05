# CalendarBase: анатомия

## Обзор

`CalendarBase` даёт общую визуальную оболочку для компонентов семейства календаря. Он передаёт контекст общему заголовку, кнопкам управления, кнопкам пикера и подписям дней недели.

## Обязательные части

### `CalendarBase`

Обязательна. Отвечает за общий размер, вариант и компактность.

## Необязательные части

### `CalendarBaseHeader`

Необязательная строка заголовка для навигации и триггеров пикера.

### `CalendarBasePickerButton`

Необязательная кнопка для переключения пикера месяца/года.

### `CalendarBaseControlIconButton`

Необязательная кнопка «назад»/«вперёд».

### `CalendarBaseWeekLabels`

Необязательная обёртка-строка для подписей дней недели.

### `CalendarBaseWeekLabel`

Необязательная ячейка заголовка дня недели.

## Порядок композиции

1. `CalendarBase`
2. необязательный `CalendarBaseHeader`
3. встроенное содержимое пикера
4. необязательный `CalendarBaseWeekLabels` внутри пикера перед его строками: у строки подписей `role='row'`, и она принадлежит сетке

## Допустимые паттерны композиции

Рабочий календарь дней: заголовок с кнопками-иконками и подписью месяца, затем `DayPicker`, в котором строка дней недели и раскладка. Видимый месяц и активный день хранит приложение.

<!-- example: calendar-base/day-calendar-from-base-parts.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-GB';
const WEEK_START = 1;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function DayCalendarFromBaseParts() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} aria-live='polite' style={{ alignSelf: 'center' }}>
          {monthFormat.format(new Date(month))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday) => (
            <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Недопустимые паттерны композиции

### Общие части календаря отрендерены вне `CalendarBase`

Они теряют контекст размера и варианта, который сохраняет единообразие семейства.

### Календарь для пользователей собран из базовых частей без повторного использования поведения семейства

Визуальная оболочка может совпадать, но взаимодействие и семантика могут разойтись с компонентами календаря более высокого уровня.
