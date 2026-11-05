# DayPicker: примеры

## Базовый

### Базовый: дни одного месяца

`DayPicker` — низкоуровневая сетка дней без заголовка; `DayPickerLayout` рендерит месяц, заданный через `month`. Ключи ячеек — ISO-дни, поэтому `defaultSelected` — тоже ISO-день. `locale` задаёт первый день недели, а сетке нужен `aria-label`, потому что у неё нет видимого заголовка.

<!-- example: day-picker/one-month-of-days.tsx -->
```tsx
import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export default function OneMonthOfDays() {
  return (
    <DayPicker aria-label='March 2026' locale='en-GB' month='2026-03-01' defaultSelected='2026-03-15'>
      <DayPickerLayout>
        <DayPickerCell />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: выбранный день

`selected` и `onSelectCell` делают выбор контролируемым; в одиночном режиме `null` означает «контролируемый, ничего не выбрано» — на это опирается кнопка очистки.

<!-- example: day-picker/selected-day.tsx -->
```tsx
import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function SelectedDay({ locale = 'en-US' }: { locale?: string }) {
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone: 'UTC' });

  const [due, setDue] = useState<string | null>('2026-11-20');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker aria-label='Invoice due date, November 2026' locale={locale} month='2026-11-01' selected={due} onSelectCell={setDue}>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Due: {due ? dateFormat.format(new Date(due)) : 'not set'}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={due === null} onClick={() => setDue(null)}>Clear due date</Button>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: видимый месяц с собственной навигацией

Со скроллером месяц можно листать свайпом. Храните `month` в состоянии и обновляйте его из `onChangePeriod`, чтобы собственный заголовок оставался синхронизирован со свайпами, а его кнопки могли сдвигать сетку. `DayPicker` не переносит активную ячейку при смене `month`, поэтому пример хранит `active` в состоянии и переводит его в новый месяц, когда прежний активный день ушёл из вида.

<!-- example: day-picker/visible-month-with-own-navigation.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function VisibleMonthWithOwnNavigation() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (next: string) => {
    setMonth(next);
    setActive((current) => {
      if (current.slice(0, 7) === next.slice(0, 7)) return current;

      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, -1))}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(month))}</Text>
        <IconButton aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, 1))}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <DayPickerScroller onChangePeriod={showMonth}>
          <DayPickerScrollerContent>
            <DayPickerScrollerLayout>
              <DayPickerCell />
            </DayPickerScrollerLayout>
          </DayPickerScrollerContent>
        </DayPickerScroller>
      </DayPicker>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: несколько дней в форме

`selection='multiple'` выбирает независимые дни. У компонента нет значения формы, поэтому дни уходят скрытыми input с одним именем и читаются обратно через `FormData.getAll`. Проверка «хотя бы один день» выполняется при отправке и использует подсказку, связанную через `aria-describedby`; сброс очищает состояние через событие `reset` формы.

<!-- example: day-picker/several-days-in-a-form.tsx -->
```tsx
import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function SeveralDaysInAForm() {
  const [days, setDays] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);
  const hintId = useId();

  const change = (next: string[]) => {
    setDays(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shifts = new FormData(event.currentTarget).getAll('shift').map(String);

    if (shifts.length === 0) {
      setMissing(true);
      return;
    }

    setSubmitted(shifts.sort());
  };

  const reset = () => {
    setDays([]);
    setMissing(false);
    setSubmitted([]);
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Extra shifts in November</FieldsetLegend>
        <DayPicker
          aria-label='Shift days, November 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='multiple'
          month='2026-11-01'
          selected={days}
          onSelectCell={change}
        >
          <DayPickerLayout>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick at least one day.' : 'Pick every day you can work.'}
        </HelperText>
      </Fieldset>
      {days.map((day) => (
        <input key={day} type='hidden' name='shift' value={day} />
      ))}
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save {days.length} {days.length === 1 ? 'shift' : 'shifts'}</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{submitted.length > 0 ? `Sent shift=${submitted.join(', ')}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: два месяца рядом

Один `DayPicker` может содержать несколько раскладок, поэтому диапазон можно выбрать на двух месяцах. Задайте каждой раскладке свой `month` и отдельный `offset`, чтобы индексы строк оставались уникальными во всей сетке; `aria-label` на каждой раскладке называет её месяц для скринридера.

<!-- example: day-picker/two-months-side-by-side.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const months = ['2026-11-01', '2026-12-01'];
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const rangeFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function TwoMonthsSideBySide() {
  const [range, setRange] = useState<string[]>([]);
  const [start, end] = range;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Travel dates'
        locale='en-US'
        selection='range'
        month={months[0]}
        selected={range}
        onSelectCell={setRange}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-16)', width: '100%' }}
      >
        {months.map((month, index) => (
          <div key={month} role='presentation' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            <Text aria-hidden fontWeight={600} style={{ textAlign: 'center' }}>{monthFormat.format(new Date(month))}</Text>
            <DayPickerLayout aria-label={monthFormat.format(new Date(month))} month={month} offset={index}>
              <DayPickerCell />
            </DayPickerLayout>
          </div>
        ))}
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {start && end ? rangeFormat.formatRange(new Date(start), new Date(end)) : 'Pick departure and return'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: слишком длинный диапазон

Пикер диапазона сам не ограничивает его длину. Считайте ночи в приложении и превращайте подсказку, связанную с сеткой, в ошибку, пока диапазон слишком длинный.

<!-- example: day-picker/range-too-long.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const DAY = 86_400_000;
const MAX_NIGHTS = 14;

function countNights(start?: string, end?: string) {
  if (!start || !end) return 0;

  return (Date.parse(end) - Date.parse(start)) / DAY;
}

export default function RangeTooLong() {
  const [range, setRange] = useState<string[]>(['2026-11-03', '2026-11-24']);
  const messageId = useId();

  const [start, end] = range;
  const nights = countNights(start, end);
  const invalid = nights > MAX_NIGHTS;

  let message = `Up to ${MAX_NIGHTS} nights.`;
  if (nights > 0) message = `${nights} nights selected. Up to ${MAX_NIGHTS} nights.`;
  if (invalid) message = `${nights} nights is too long. Shorten the rental to ${MAX_NIGHTS} nights or less.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Rental period, November 2026'
        aria-describedby={messageId}
        locale='en-US'
        selection='range'
        month='2026-11-01'
        selected={range}
        onSelectCell={setRange}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: окно бронирования и закрытые дни

`from` и `to` отключают все дни вне окна, а предикат `disabled` закрывает воскресенья и праздник; если закрыты только отдельные дни, подойдёт и массив ISO-дней. Отключённые дни нельзя выбрать или сфокусировать, поэтому правило написано рядом с сеткой и связано через `aria-describedby`.

<!-- example: day-picker/booking-window-and-closed-weekdays.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
} from '@vega-ui/react';
import { useId } from 'react';

const holidays = ['2026-11-26'];

function isClosed(day: string) {
  if (new Date(day).getUTCDay() === 0) return true;

  return holidays.includes(day);
}

export default function BookingWindowAndClosedWeekdays() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Pickup day, November 2026'
        aria-describedby={hintId}
        locale='en-US'
        month='2026-11-01'
        from='2026-11-03'
        to='2026-11-28'
        disabled={isClosed}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <HelperText id={hintId}>
        Pickup from November 3 to 28, Monday to Saturday. Closed on November 26 for Thanksgiving.
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: месяц другой календарной системы

С календарной системой из `createCalendarSystem` (см. [Адаптер календарной системы](../../i18n.md#адаптер-календарной-системы)) сетка показывает месяц этого календаря: в фарвардине 1405 года 31 день, он начинается с ISO-дня `2026-03-21`, а неделя в `fa-IR` начинается с субботы. `month` — любой ISO-день внутри месяца; `dir='rtl'` на предке отражает сетку и стрелки.

<!-- example: day-picker/month-of-another-calendar-system.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { DayPicker, DayPickerCell, DayPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const persianCalendar = createCalendarSystem('persian');
const persianMonth = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthOfAnotherCalendarSystem() {
  const [day, setDay] = useState<string | null>('2026-03-21');

  return (
    <div dir='rtl' lang='fa-IR' style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Text fontWeight={600}>{persianMonth.format(new Date('2026-04-01'))}</Text>
      <DayPicker
        aria-label={persianMonth.format(new Date('2026-04-01'))}
        calendar={persianCalendar}
        locale='fa-IR'
        month='2026-04-01'
        selected={day}
        onSelectCell={setDay}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text dir='ltr' lang='en' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {day ?? 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: дни соседних месяцев

`includeOverflowDays` заполняет пустые ячейки днями соседних месяцев. `DayPickerCell` рендерит их отключёнными и исключёнными из выбора; шаблон приглушает их через `inMonth`.

<!-- example: day-picker/overflow-days.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  useDayPickerCellContext,
} from '@vega-ui/react';

function OverflowDay() {
  const { inMonth } = useDayPickerCellContext();

  if (inMonth) return <DayPickerCell />;

  return <DayPickerCell style={{ color: 'var(--label-quaternary)' }} />;
}

export default function OverflowDays() {
  return (
    <DayPicker aria-label='February 2026' locale='en-US' month='2026-02-01'>
      <DayPickerLayout includeOverflowDays>
        <OverflowDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->
