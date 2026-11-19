# Calendar: паттерны

## Календарь бронирования

Когда использовать:

пользователь выбирает период проживания или аренды на видимом календаре, и некоторые дни нельзя забронировать.

Заметки по композиции:

Используйте `selection='range'` с `min` для первого доступного для бронирования дня, `max` для конца окна бронирования и предикатом `disabledDates` для недоступных дней. Предикат получает ISO-дни, поэтому может искать их напрямую в данных о доступности. Диапазон может охватывать отключённый день, поэтому проверяйте диапазон, прежде чем принять его (см. [Ошибка: диапазон через заблокированный день](./examples.md#ошибка-диапазон-через-заблокированный-день)); здесь одно сообщение, связанное с сеткой дней, показывает подсказку, ошибку или сводку, а кнопка «Reserve» ждёт корректного диапазона.

Компромиссы:

Пользователь видит доступность до выбора, но календарь занимает гораздо больше места, чем поле даты, а проверка диапазона остаётся на приложении.

<!-- example: calendar/booking-calendar.tsx -->
```tsx
import {
  Button,
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
  HelperText,
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const DAY = 86_400_000;
const booked = new Set(['2026-11-12', '2026-11-13', '2026-11-20', '2026-11-21', '2026-12-05']);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function isBooked(date: string) {
  return booked.has(date);
}

function spansBookedNight(start: string, end: string) {
  for (let time = Date.parse(start); time < Date.parse(end); time += DAY) {
    if (booked.has(new Date(time).toISOString().slice(0, 10))) return true;
  }

  return false;
}

export default function BookingCalendar() {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);
  const messageId = useId();

  const complete = start !== '' && end !== '';
  const invalid = complete && spansBookedNight(start, end);
  const nights = complete ? (Date.parse(end) - Date.parse(start)) / DAY : 0;

  let message = 'Pick check-in and check-out. Unavailable days are booked.';
  if (invalid) message = 'These dates include a booked night. Pick another range.';
  if (complete && !invalid) message = `${dateFormat.formatRange(new Date(start), new Date(end))}, ${nights} nights`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start' }}>
        <Calendar
          compact
          locale='en-US'
          selection='range'
          min='2026-11-01'
          max='2027-04-30'
          defaultFocusedDate='2026-11-01'
          disabledDates={isBooked}
          value={[start, end]}
          onChangeValue={setRange}
        >
          <CalendarHeader>
            <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
            <CalendarHeading>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Stay dates' aria-describedby={messageId}>
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
        <HelperText id={messageId} invalid={invalid} aria-live='polite'>{message}</HelperText>
      </div>
      <Button disabled={!complete || invalid}>Reserve</Button>
    </div>
  );
}
```
<!-- /example -->

## Пользовательский рендер ячейки дня

Когда использовать:

дням нужно дополнительное содержимое: цена, статус или количество событий.

Заметки по композиции:

Дочерние элементы `CalendarWeeks` — шаблон ячейки дня: они рендерятся по одному разу на день внутри контекста ячейки. Читайте день через `useCalendarDayContext()` и размещайте содержимое внутри `CalendarDay`, чтобы ячейка сохранила поведение выбора, фокуса, отключения и соседних месяцев. То же работает для `CalendarMonths` с `CalendarMonth` и `useCalendarMonthContext()` и для `CalendarYears` с `CalendarYear` и `useCalendarYearContext()`.

Контекст дня — `{ col, date, fields, label, inMonth, isToday }`; `date` равен `undefined` для пустой ячейки соседнего месяца. Берите номер дня из `label` или `fields.day`, а не из ISO-строки `date`: в негригорианских календарях они различаются. Ищите данные по `date` — он одинаков в любом календаре.

Компромиссы:

Пользователь сравнивает дни с одного взгляда, но на маленьких размерах ячейки перегружаются (в примере — `size='md'`), а дополнительное содержимое не озвучивается, если не входит в текст ячейки. Объявляйте компонент шаблона вне рендера, чтобы React не пересоздавал ячейки при каждом рендере.

<!-- example: calendar/day-cell-custom-rendering.tsx -->
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
  useCalendarDayContext,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const fares: Record<string, number> = {
  '2026-11-02': 89,
  '2026-11-03': 89,
  '2026-11-05': 112,
  '2026-11-06': 129,
  '2026-11-09': 74,
  '2026-11-10': 74,
  '2026-11-13': 149,
  '2026-11-16': 89,
  '2026-11-19': 99,
  '2026-11-20': 139,
};

const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function hasNoFare(date: string) {
  return fares[date] === undefined;
}

function FareDay() {
  const { date, label } = useCalendarDayContext();
  const fare = date === undefined ? undefined : fares[date];

  if (fare === undefined) return <CalendarDay />;

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
      <span>{label}</span>
      <small style={{ fontSize: '0.7em', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{price.format(fare)}</small>
    </CalendarDay>
  );
}

export default function DayCellCustomRendering() {
  return (
    <Calendar size='md' locale='en-US' defaultFocusedDate='2026-11-01' disabledDates={hasNoFare}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Departure date'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarDaysScroller>
            <CalendarDaysScrollerContent>
              <CalendarWeeks>
                <FareDay />
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

## Шаблоны дней недели, месяцев и годов

Когда использовать:

заголовкам дней недели, месяцам или годам нужен собственный вид: приглушённые выходные, кварталы у месяцев или отмеченные високосные годы.

Заметки по композиции:

Дочерние элементы `CalendarWeekdays`, `CalendarMonthsGrid` и `CalendarYearsGrid` — шаблоны, как и ячейка дня. Читайте элемент через `useCalendarWeekdayContext()`, `useCalendarMonthContext()` или `useCalendarYearContext()` и рендерите `CalendarWeekday`, `CalendarMonth` или `CalendarYear`, чтобы элемент сохранил поведение по умолчанию.

Компромиссы:

Каждое представление может нести свою подсказку, но чисто визуальные отметки вроде цвета или жирного шрифта не озвучиваются; в примере квартал и високосный год повторены в `aria-label` элемента.

<!-- example: calendar/weekday-month-year-templates.tsx -->
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
  useCalendarMonthContext,
  useCalendarWeekdayContext,
  useCalendarYearContext,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

function isLeapYear(year: number) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;

  return year % 4 === 0;
}

function Weekday() {
  const { weekday } = useCalendarWeekdayContext();
  const isWeekend = weekday === 0 || weekday === 6;

  if (!isWeekend) return <CalendarWeekday />;

  return <CalendarWeekday style={{ color: 'var(--label-quaternary)' }} />;
}

function QuarterMonth() {
  const { label, fields } = useCalendarMonthContext();

  if (!fields) return <CalendarMonth />;

  const quarter = Math.ceil(fields.month / 3);

  return <CalendarMonth aria-label={`${label}, quarter ${quarter}`}>{label} · Q{quarter}</CalendarMonth>;
}

function LeapYear() {
  const { label, fields } = useCalendarYearContext();

  if (!fields || !isLeapYear(fields.year)) return <CalendarYear />;

  return <CalendarYear aria-label={`${label}, leap year`} style={{ fontWeight: 700 }}>{label}*</CalendarYear>;
}

export default function WeekdayMonthYearTemplates() {
  return (
    <Calendar locale='en-US' defaultFocusedDate='2026-11-01' defaultView='month'>
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
            <Weekday />
          </CalendarWeekdays>
          <CalendarDaysScroller>
            <CalendarDaysScrollerContent>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDaysScrollerContent>
          </CalendarDaysScroller>
        </CalendarDays>
        <CalendarMonths aria-label='Months'>
          <CalendarMonthsGrid format='short'>
            <QuarterMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears aria-label='Years'>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <LeapYear />
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

## Негригорианский календарь

Когда использовать:

аудитория продукта пользуется персидским, еврейским, японским, буддийским, исламским или другим календарём.

Заметки по композиции:

Создайте календарь один раз через `createCalendarSystem` вне рендера (см. [Даты и календарные системы](../../i18n.md#адаптер-календарной-системы)) и передайте его в `calendar` вместе с подходящим `locale`. Длина месяцев, их количество, эры и подписи следуют календарю; `value`, `min`, `max` и `disabledDates` остаются ISO-днями `YYYY-MM-DD`. `Calendar` выставляет `lang` из `locale`, но не `dir`: для локали с письмом справа налево, например `fa-IR`, задайте `dir='rtl'` на корне или предке — кнопки навигации и шевроны развернутся вместе с ним.

Компромиссы:

Нативная длина месяцев, високосные месяцы и эры без изменения хранимого значения и без новых зависимостей; данные календаря берутся из `Intl` среды выполнения.

<!-- example: calendar/non-gregorian-calendar.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
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
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useState } from 'react';

const persianCalendar = createCalendarSystem('persian');

export default function NonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar dir='rtl' locale='fa-IR' calendar={persianCalendar} value={date} onChangeValue={setDate}>
        <CalendarHeader>
          <CalendarPrevButton square aria-label='ماه قبل'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
          <CalendarHeading>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarHeading>
          <CalendarNextButton square aria-label='ماه بعد'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeekdays format='narrow'>
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
          <CalendarMonths aria-label='ماه‌ها'>
            <CalendarMonthsGrid>
              <CalendarMonth />
            </CalendarMonthsGrid>
          </CalendarMonths>
          <CalendarYears aria-label='سال‌ها'>
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
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date || 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Одна дата в двух календарях

Когда использовать:

пользователю нужно видеть дату сразу в двух календарных системах, например в григорианском календаре и календаре хиджры в туристической или государственной форме.

Заметки по композиции:

Используйте одно ISO-значение в двух контролируемых корнях с разными `calendar` и `locale`. Выбор дня в любом из календарей выбирает тот же день в другом. Каждый корень хранит свой видимый месяц. Здесь корни показывают только дни с простой подписью месяца, а арабский календарь — с `dir='rtl'`.

Компромиссы:

Никакого кода преобразования в приложении, но два календаря занимают вдвое больше места; на узких экранах лучше показывать один календарь, а другую дату выводить текстом через `formatCalendarDate`.

<!-- example: calendar/one-date-in-two-calendars.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
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
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useState } from 'react';

const islamicCalendar = createCalendarSystem('islamic-umalqura');

export default function OneDateInTwoCalendars() {
  const [date, setDate] = useState('2026-10-23');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
        <Calendar compact locale='en-GB' value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
            <CalendarHeading>
              <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            </CalendarHeading>
            <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Gregorian date'>
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
        <Calendar compact dir='rtl' locale='ar-SA' calendar={islamicCalendar} value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton square aria-label='الشهر السابق'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
            <CalendarHeading>
              <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            </CalendarHeading>
            <CalendarNextButton square aria-label='الشهر التالي'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='التاريخ الهجري'>
              <CalendarWeekdays format='narrow'>
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
      </div>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date}</Text>
    </div>
  );
}
```
<!-- /example -->

## Локаль для всего приложения

Когда использовать:

все календари приложения используют одну локаль или календарную систему.

Заметки по композиции:

В библиотеке нет глобальных провайдеров. Один раз оберните `Calendar` с настройками приложения и частями и используйте обёртку везде; пропсы, переданные обёртке, по-прежнему имеют приоритет, как `locale='fr-FR'` у второго календаря.

Компромиссы:

Одно место для изменения настроек, но по дополнительному компоненту на каждый корень дат, который использует приложение.

<!-- example: calendar/app-wide-locale.tsx -->
```tsx
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
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
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  CalendarYearsGrid,
  type CalendarProps,
  type CalendarSelection,
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const appSettings = { locale: 'en-GB', min: '1900-01-01', max: '2099-12-31' };

function AppCalendar<S extends CalendarSelection = 'single'>(props: Omit<CalendarProps<S>, 'children'>) {
  return (
    <Calendar<S> locale={appSettings.locale} min={appSettings.min} max={appSettings.max} {...props}>
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

export default function AppWideLocale() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start', justifyContent: 'center', width: '100%' }}>
      <AppCalendar compact defaultValue='2026-11-03' />
      <AppCalendar compact selection='range' locale='fr-FR' defaultValue={['2026-11-09', '2026-11-13']} />
    </div>
  );
}
```
<!-- /example -->
