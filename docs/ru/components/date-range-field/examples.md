# DateRangeField: примеры

## Базовый

### Базовый: период бронирования с календарём в поповере

Одно поле для начальной и конечной даты: введите обе или выберите два дня в календаре. `defaultValue` — пара ISO-дней `[start, end]`. Без `rangeSeparator` даты соединяются коротким тире между неразрывными пробелами.

<!-- example: date-range-field/booking-range-with-a-calendar-popover.tsx -->
```tsx
import {
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function BookingRangeWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='stay'>Stay</Label>
      <DateRangeField locale={locale} format='dd.MM.yyyy' separator='.' defaultValue={['2026-07-10', '2026-07-14']}>
        <DateRangeFieldInput id='stay' placeholder='dd.mm.yyyy – dd.mm.yyyy' aria-describedby='stay-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateRangeFieldTriggerIconButton aria-label='Choose stay dates' />
          </PopoverTrigger>
          <PopoverContent>
            <DateRangeFieldCalendar>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Previous month' />
                <CalendarViewButtonGroup>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarViewButtonGroup>
                <CalendarNextButton aria-label='Next month' />
              </CalendarHeader>
              <CalendarContent>
                <CalendarDays>
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
            </DateRangeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateRangeField>
      <HelperText id='stay-hint'>Pick the check-in day first, then the check-out day.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: число ночей

`value` и `onChangeValue` на корне держат пару `[start, end]` в состоянии родителя, поэтому число ночей и цена считаются прямо по ISO-дням. Каждая сторона равна `''`, пока дата не полная.

<!-- example: date-range-field/number-of-nights.tsx -->
```tsx
import { useState } from 'react';
import {
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const NIGHTLY_RATE = 140;

const countNights = ([checkIn, checkOut]: [string, string]) => {
  if (!checkIn || !checkOut) return 0;

  return (Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000;
};

export default function StayNights() {
  const [stay, setStay] = useState<[string, string]>(['', '']);
  const nights = countNights(stay);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='stay-nights'>Stay</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' value={stay} onChangeValue={setStay}>
          <DateRangeFieldInput id='stay-nights' placeholder='dd.mm.yyyy – dd.mm.yyyy' aria-describedby='stay-nights-total' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose stay dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='stay-nights-total' aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
          {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'} · €${nights * NIGHTLY_RATE}` : 'Choose check-in and check-out.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: <code>{JSON.stringify(stay)}</code>
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: быстрые периоды

Кнопки задают контролируемый период снаружи, а input показывает его в формате `format`. Периоды считаются от сегодняшней даты в обработчике клика, поэтому на сервере страница рендерится так же.

<!-- example: date-range-field/preset-ranges.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const toISODate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const lastDays = (count: number): [string, string] => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - count + 1);

  return [toISODate(start), toISODate(end)];
};

const thisMonth = (): [string, string] => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return [toISODate(start), toISODate(end)];
};

export default function PresetRanges() {
  const [period, setPeriod] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='report-period'>Report period</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' value={period} onChangeValue={setPeriod}>
          <DateRangeFieldInput id='report-period' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose report period' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
      </div>
      <div role='group' aria-label='Quick periods' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(lastDays(7))}>7 days</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(lastDays(30))}>30 days</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(thisMonth())}>This month</Button>
        <Button size='xs' variant='secondary' appearance='transparent' onClick={() => setPeriod(['', ''])}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: фильтр отчёта с двумя параметрами API

`onChangeValue` копирует период в два скрытых input, поэтому `FormData` содержит `from` и `to` как ISO-дни, а не введённый текст. `required` и `pattern` для полного периода не пропускают пустой или односторонний период, а кнопка сброса возвращает `defaultValue`.

<!-- example: date-range-field/report-filter-with-two-api-parameters.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const DEFAULT_PERIOD: [string, string] = ['2026-01-01', '2026-03-31'];

export default function ReportFilter() {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [query, setQuery] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) });
    setQuery(params.toString());
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setQuery('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='period'>Reporting period</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          rangeSeparator=' - '
          defaultValue={DEFAULT_PERIOD}
          onChangeValue={setPeriod}
        >
          <DateRangeFieldInput
            id='period'
            required
            pattern='\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}'
            aria-describedby='period-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose reporting period' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <input type='hidden' name='from' value={period[0]} />
        <input type='hidden' name='to' value={period[1]} />
        <HelperText id='period-hint'>Both days are included in the export.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Apply</Button>
      </div>
      {query && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Request: <code>/api/reports?{query}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: период в выдвижной панели фильтров

Поповер с календарём открывается поверх выдвижной панели, в которой находится поле. Форма панели использует `method='dialog'`: отправка применяет фильтр и закрывает панель.

<!-- example: date-range-field/range-in-a-filter-drawer.tsx -->
```tsx
import { CSSProperties, useState } from 'react';
import { XIcon } from '@vega-ui/icons';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const describeFilter = ([from, to]: [string, string]) => {
  if (!from) return 'No date filter';
  if (!to) return `Created on ${from}`;

  return `Created from ${from} to ${to}`;
};

export default function RangeInAFilterDrawer() {
  const [created, setCreated] = useState<[string, string]>(['', '']);
  const [applied, setApplied] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Filters</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby='order-filters-title' style={{ width: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='order-filters-title' as='h2' size={4} fontWeight={600}>Order filters</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <form
            method='dialog'
            onSubmit={() => setApplied(created)}
            style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
          >
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='created'>Created</Label>
              <DateRangeField format='dd.MM.yyyy' separator='.' value={created} onChangeValue={setCreated}>
                <DateRangeFieldInput id='created' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateRangeFieldTriggerIconButton aria-label='Choose creation dates' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateRangeFieldCalendar>
                      <CalendarHeader>
                        <CalendarPrevButton aria-label='Previous month' />
                        <CalendarViewButtonGroup>
                          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                        </CalendarViewButtonGroup>
                        <CalendarNextButton aria-label='Next month' />
                      </CalendarHeader>
                      <CalendarContent>
                        <CalendarDays>
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
                    </DateRangeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateRangeField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Button type='submit'>Show orders</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>
        {describeFilter(applied)}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: обязательны обе даты

Одна дата — допустимое значение поля. Нативные `required` и `pattern` для полного периода вызывают `invalid` при отправке, пока обе даты не введены полностью; обработчик выбирает сообщение по `validity`, а ввод сбрасывает ошибку.

<!-- example: date-range-field/both-dates-required.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const HINT = 'Choose the first and the last day of coverage.';

export default function CoverageForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Choose the coverage period.');
      return;
    }

    setError('Add the end date of the coverage period.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='coverage'>Coverage period</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - ' error={invalid}>
          <DateRangeFieldInput
            id='coverage'
            name='coverage'
            required
            pattern='\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}'
            placeholder='dd.mm.yyyy - dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='coverage-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose coverage period' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='coverage-hint' error={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: закрытый расчётный период

`disabled` на корне отключает input и триггер календаря, а вспомогательный текст объясняет причину.

<!-- example: date-range-field/locked-billing-period.tsx -->
```tsx
import {
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function LockedBillingPeriod() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='billing-period'>Billing period</Label>
      <DateRangeField format='dd.MM.yyyy' separator='.' disabled defaultValue={['2026-01-01', '2026-03-31']}>
        <DateRangeFieldInput id='billing-period' aria-describedby='billing-period-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateRangeFieldTriggerIconButton aria-label='Choose billing period' />
          </PopoverTrigger>
          <PopoverContent>
            <DateRangeFieldCalendar>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Previous month' />
                <CalendarViewButtonGroup>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarViewButtonGroup>
                <CalendarNextButton aria-label='Next month' />
              </CalendarHeader>
              <CalendarContent>
                <CalendarDays>
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
            </DateRangeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateRangeField>
      <HelperText id='billing-period-hint'>The period is closed and invoiced.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: перевёрнутые даты и даты вне диапазона

Период, введённый в обратном порядке, переставляется, поэтому `15.01.2026 - 10.01.2026` становится `10.01.2026 - 15.01.2026`. Каждая дата ограничивается `min` и `max` и длиной своего месяца; под полем видна итоговая пара.

<!-- example: date-range-field/reversed-and-out-of-range-dates.tsx -->
```tsx
import { useState } from 'react';
import {
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function ReversedAndOutOfRangeDates() {
  const [campaign, setCampaign] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='campaign-dates'>Campaign dates</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          rangeSeparator=' - '
          min='2026-01-01'
          max='2026-12-31'
          value={campaign}
          onChangeValue={setCampaign}
        >
          <DateRangeFieldInput id='campaign-dates' placeholder='dd.mm.yyyy - dd.mm.yyyy' aria-describedby='campaign-dates-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose campaign dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='campaign-dates-hint'>Within 2026. Try 15.01.2026 - 10.01.2026 or 20.12.2025 - 31.02.2026.</HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: <code>{JSON.stringify(campaign)}</code>
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: недоступные даты

`disabledDates` блокирует дни в календаре, но введённый период или период, выбранный вокруг заблокированных дней, всё равно попадает в значение. Обработчик отправки проверяет, захватывает ли период недоступный день, и показывает ошибку.

<!-- example: date-range-field/blackout-dates.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const BLACKOUT_DATES = ['2026-06-12', '2026-06-13', '2026-06-14'];

const includesBlackout = ([start, end]: [string, string]) => {
  const last = end === '' ? start : end;

  return BLACKOUT_DATES.some((date) => date >= start && date <= last);
};

export default function BlackoutDates() {
  const [rental, setRental] = useState<[string, string]>(['', '']);
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onChangeValue = (range: [string, string]) => {
    setRental(range);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (includesBlackout(rental)) {
      setError('The van is booked from 12 to 14 June. Choose dates around them.');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='rental-dates'>Rental dates</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          disabledDates={BLACKOUT_DATES}
          error={invalid}
          value={rental}
          onChangeValue={onChangeValue}
        >
          <DateRangeFieldInput
            id='rental-dates'
            required
            placeholder='dd.mm.yyyy – dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='rental-dates-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose rental dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='rental-dates-hint' error={invalid}>{invalid ? error : 'Unavailable from 12 to 14 June 2026.'}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book van</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->
