# CalendarBase: стилизация

## Обзор

Стилизация `CalendarBase` в основном определяется раскладкой. Он задаёт внешнюю оболочку и позволяет общим элементам управления наследовать размер и вариант через контекст, а не предоставляет обширный локальный CSS API компонента.

## Публичные CSS-переменные

В текущей реализации нет значимых публичных переменных `--calendar-base-*`.

Общие части в основном используют существующие системные токены:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--spacing-6` | промежуток в корне | вертикальный отступ между секциями календаря |
| `--label-tertiary` | подпись дня недели | приглушённый тон дня недели |
| `--spacing-18` | подпись дня недели | минимальная высота подписи |

О слое темы, стоящем за этими значениями, см. [Темы](../../styling/themes.md) и [Токены](../../styling/tokens.md).

## Переменные частей

### Корень

Использует grid-раскладку и необязательное поведение ширины `compact`.

### Заголовок

Использует flex-строку с небольшими внутренними отступами.

### Подписи дней недели

Используют сетку из 7 колонок и приглушённый текст по центру.

`CalendarBasePickerButton` и `CalendarBaseControlIconButton` в основном наследуют визуальный контракт от общих примитивов кнопок.

## Взаимодействие состояний и вариантов

- Размер и вариант передаются общим примитивам кнопок и текста через контекст.
- `compact` ограничивает ширину значением `min-content`.
- `CalendarBase` должен визуально соответствовать слою пикера, отрендеренному внутри, а не вводить отдельную визуальную тему.

## Примеры

### Размер и вариант через контекст

`size` и `variant` задаются один раз на `CalendarBase` и доходят до кнопок заголовка и подписей дней недели через контекст. Встроенный пикер этот контекст не читает, поэтому получает те же `size` и `variant` сам.

<!-- example: calendar-base/size-and-variant.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const TODAY_MONTH = '2026-11-01';
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function SizeAndVariant() {
  const [month, setMonth] = useState(TODAY_MONTH);
  const [active, setActive] = useState(TODAY_MONTH);

  const showMonth = (next: string) => {
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact size='md' variant='primary'>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(addMonths(month, -1))}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton aria-label={`${monthFormat.format(new Date(month))}, back to ${monthFormat.format(new Date(TODAY_MONTH))}`} onClick={() => showMonth(TODAY_MONTH)}>
          {monthFormat.format(new Date(month))}
        </CalendarBasePickerButton>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(addMonths(month, 1))}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        size='md'
        variant='primary'
        active={active}
        onChangeActive={setActive}
        defaultSelected='2026-11-18'
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

## Не переопределяйте

- не изобретайте отдельный API токенов для calendar-base, ведь реализация в основном опирается на общие примитивы
- не стилизуйте базовые части так, чтобы нарушалось единообразие с остальным семейством календаря
