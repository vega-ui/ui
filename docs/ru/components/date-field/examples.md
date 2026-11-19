# DateField: примеры

## Базовый

### Базовый: ввод даты с календарём в поповере

Поле с подписью, в которое можно ввести дату или выбрать её в календаре в поповере. `defaultValue` на корне — ISO-день `YYYY-MM-DD`; input показывает его в формате `format`, а вспомогательный текст подсказывает, в каком формате вводить.

<!-- example: date-field/typed-date-with-a-calendar-popover.tsx -->
```tsx
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function TypedDateWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='due-date'>Payment due</Label>
      <DateField locale={locale} format='dd.MM.yyyy' separator='.' defaultValue='2026-03-31'>
        <DateFieldInput id='due-date' placeholder='dd.mm.yyyy' aria-describedby='due-date-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTrigger square aria-label='Choose due date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose due date'>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='due-date-hint'>Type the date as dd.mm.yyyy or pick it in the calendar.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: быстрые даты

`value` и `onChangeValue` на корне держат ISO-день в состоянии родителя. Кнопки задают его снаружи, а input показывает его в формате `format`; пока введённый текст неполный, значение равно `''`.

<!-- example: date-field/preset-dates.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const toISODate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const daysFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return toISODate(date);
};

export default function PresetDates() {
  const [publishOn, setPublishOn] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='publish-on'>Publish on</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={publishOn} onChangeValue={setPublishOn}>
          <DateFieldInput id='publish-on' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose publish date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose publish date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <div role='group' aria-label='Quick dates' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(0))}>Today</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(1))}>Tomorrow</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(7))}>In a week</Button>
        <Button size='xs' variant='secondary' appearance='transparent' onClick={() => setPublishOn('')}>Clear</Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {publishOn ? <code>{publishOn}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: выезд не раньше заезда

День заезда задаёт `min` поля выезда. Когда заезд сдвигается на уже введённый выезд или за него, его `onChangeValue` переносит выезд на следующий день, поэтому число ночей остаётся верным. Выезд, введённый раньше этого дня, остаётся как введён и делает input невалидным, а `[data-user-edited]:invalid` помечает поле.

<!-- example: date-field/check-out-starts-after-check-in.tsx -->
```tsx
import { useState } from 'react';
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Fieldset,
  FieldsetLegend,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
};

const countNights = (checkIn: string, checkOut: string) => {
  return (Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000;
};

const describeStay = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 'Choose both dates';

  const nights = countNights(checkIn, checkOut);
  if (nights < 1) return 'Check-out must be after check-in';

  return `${nights} ${nights === 1 ? 'night' : 'nights'}`;
};

export default function StayDates() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const checkOutMin = checkIn ? addDays(checkIn, 1) : undefined;

  const changeCheckIn = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);

    if (nextCheckIn !== '' && checkOut !== '' && checkOut <= nextCheckIn) {
      setCheckOut(addDays(nextCheckIn, 1));
    }
  };

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <FieldsetLegend>Stay</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='check-in'>Check-in</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={checkIn} onChangeValue={changeCheckIn}>
          <DateFieldInput id='check-in' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose check-in date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose check-in date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='check-out'>Check-out</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          min={checkOutMin}
          value={checkOut}
          onChangeValue={setCheckOut}
        >
          <DateFieldInput id='check-out' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose check-out date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose check-out date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {describeStay(checkIn, checkOut)}
      </Text>
    </Fieldset>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: отправка ISO-даты

`DateFieldInput` отправляет введённое `15.01.2026`, как нативный input, поэтому форма хранит ISO-день из `onChangeValue` в состоянии и отправляет его через свой скрытый input: `FormData` получает `2026-01-15`. `required` не пропускает пустую дату, поле само делает неполную дату невалидной, а обработчик сброса возвращает начальный день.

<!-- example: date-field/submitting-an-iso-date.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const DEFAULT_INVOICE_DATE = '2026-01-15';

export default function InvoiceForm() {
  const [invoiceDate, setInvoiceDate] = useState(DEFAULT_INVOICE_DATE);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  const onReset = () => {
    setInvoiceDate(DEFAULT_INVOICE_DATE);
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='invoice-date'>Invoice date</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={invoiceDate} onChangeValue={setInvoiceDate}>
          <DateFieldInput id='invoice-date' required aria-describedby='invoice-date-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose invoice date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose invoice date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <input type='hidden' name='invoiceDate' value={invoiceDate} />
        <HelperText id='invoice-date-hint'>Used as the accounting reference date.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: поле даты внутри диалога

Поповер с календарём открывается поверх диалога, в котором находится поле. Форма использует `method='dialog'`, поэтому валидная отправка закрывает диалог.

<!-- example: date-field/date-field-inside-a-dialog.tsx -->
```tsx
import { CSSProperties } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@vega-ui/icons';
import {
  Button,
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function DateFieldInsideADialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Schedule review</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='schedule-review-title' style={{ minWidth: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='schedule-review-title' as='h2' size={4} fontWeight={600}>Schedule review</Heading>
          <DialogClose asChild>
            <Button
              square
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='review-date'>Review date</Label>
            <DateField format='dd.MM.yyyy' separator='.' min='2026-01-01'>
              <DateFieldInput name='reviewDate' id='review-date' required placeholder='dd.mm.yyyy' />
              <Popover placement='bottom-end'>
                <PopoverTrigger asChild>
                  <DateFieldTrigger square aria-label='Choose review date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
                </PopoverTrigger>
                <PopoverContent>
                  <DateFieldCalendar aria-label='Choose review date'>
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
                  </DateFieldCalendar>
                </PopoverContent>
              </Popover>
            </DateField>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <Button type='submit'>Schedule</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Раскладка/оверлей: оставить календарь открытым после выбора

Выбор дня закрывает поповер и возвращает фокус на триггер. Чтобы оставить его открытым, сделайте `open` у `Popover` контролируемым и снова откройте его из `onChangeValue` у `DateFieldCalendar`: он вызывается после того, как поле закрыло поповер, в том же обновлении, поэтому поповер не скрывается. Переход по месяцам его не вызывает.

<!-- example: date-field/keep-calendar-open-after-pick.tsx -->
```tsx
import { useState } from 'react';
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function KeepCalendarOpenAfterPick() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='delivery-date'>Delivery date</Label>
      <DateField format='dd.MM.yyyy' separator='.'>
        <DateFieldInput id='delivery-date' placeholder='dd.mm.yyyy' />
        <Popover placement='bottom-end' open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <DateFieldTrigger square aria-label='Choose delivery date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose delivery date' onChangeValue={() => setOpen(true)}>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: обязательные и неполные даты

`required` — нативное ограничение input, а поле делает неполную дату невалидной через `setCustomValidity`: при отправке срабатывает `invalid`, пока поле пустое или дата неполная. Обработчик выбирает сообщение по `validity` (`valueMissing` или `customError`), `aria-invalid` на input помечает поле, а ввод сбрасывает ошибку. Маска ограничивает каждую полную дату реальным днём.

<!-- example: date-field/required-and-incomplete-dates.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const HINT = 'Enter the full date as dd.mm.yyyy.';

export default function RenewalForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Enter the renewal date.');
      return;
    }

    setError('The date is incomplete. Use dd.mm.yyyy.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='renewal-date'>Renewal date</Label>
        <DateField format='dd.MM.yyyy' separator='.'>
          <DateFieldInput
            name='renewalDate'
            id='renewal-date'
            required
            placeholder='dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='renewal-date-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose renewal date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose renewal date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='renewal-date-hint' invalid={invalid}>{invalid ? error : HINT}</HelperText>
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

### Отключённый: заблокированная дата договора

`disabled` на корне отключает input и триггер календаря. Вспомогательный текст объясняет, почему дату нельзя изменить.

<!-- example: date-field/locked-contract-date.tsx -->
```tsx
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function LockedContractDate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='signed-on'>Signed on</Label>
      <DateField format='dd.MM.yyyy' separator='.' disabled defaultValue='2026-01-15'>
        <DateFieldInput id='signed-on' aria-describedby='signed-on-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTrigger square aria-label='Choose signing date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose signing date'>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='signed-on-hint'>The contract is signed. Create an amendment to change the date.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Отключённый: отключение через fieldset

Нативный `<fieldset disabled>` отключает input и кнопку-триггер внутри себя, поэтому календарь тоже не открыть. Чекбокс переключает всю группу, не передавая `disabled` в поле.

<!-- example: date-field/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
import {
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
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Fieldset,
  FieldsetLegend,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, MinusIcon } from '@vega-ui/icons';

export default function DisabledByFieldset() {
  const [asap, setAsap] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <Checkbox>
        <CheckboxInput checked={asap} onChange={(event) => setAsap(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Ship as soon as possible
      </Checkbox>
      <Fieldset disabled={asap} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend>Scheduled shipping</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='ship-on'>Ship on</Label>
          <DateField format='dd.MM.yyyy' separator='.'>
            <DateFieldInput name='shipOn' id='ship-on' placeholder='dd.mm.yyyy' />
            <Popover placement='bottom-end'>
              <PopoverTrigger asChild>
                <DateFieldTrigger square aria-label='Choose shipping date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
              </PopoverTrigger>
              <PopoverContent>
                <DateFieldCalendar aria-label='Choose shipping date'>
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
                </DateFieldCalendar>
              </PopoverContent>
            </Popover>
          </DateField>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

### Отключённый: дата только для чтения

`readOnly` на `DateFieldInput` оставляет значение фокусируемым, выделяемым и отправляемым с формой. У поля нет своего `readOnly`, а `DateFieldCalendar` пишет в input, даже если он только для чтения, поэтому триггер календаря здесь не нужен.

<!-- example: date-field/read-only-date.tsx -->
```tsx
import { DateField, DateFieldInput, HelperText, Label } from '@vega-ui/react';

export default function ReadOnlyDate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='account-created'>Account created</Label>
      <DateField format='dd.MM.yyyy' separator='.' readOnly defaultValue='2024-09-02'>
        <DateFieldInput name='accountCreated' id='account-created' aria-describedby='account-created-hint' />
      </DateField>
      <HelperText id='account-created-hint'>Set by the system. The value is still submitted with the form.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: дни за концом месяца и даты вне диапазона

Введённый день после конца месяца ограничивается длиной месяца, поэтому `31.02.2026` становится `28.02.2026`. Полная дата вне `min` и `max` остаётся как введена и делает input невалидным, как у нативного поля даты, поэтому `05.01.2026` не меняется, а `aria-invalid` помечает поле. Календарь отключает те же дни.

<!-- example: date-field/overflowing-and-out-of-range-dates.tsx -->
```tsx
import { useState } from 'react';
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const FIRST_DAY = '2026-01-10';
const LAST_DAY = '2026-12-31';

export default function OverflowingAndOutOfRangeDates() {
  const [startDate, setStartDate] = useState('');
  const outOfRange = startDate !== '' && (startDate < FIRST_DAY || startDate > LAST_DAY);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='campaign-start'>Campaign start</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          min={FIRST_DAY}
          max={LAST_DAY}
         
          value={startDate}
          onChangeValue={setStartDate}
        >
          <DateFieldInput id='campaign-start' placeholder='dd.mm.yyyy' aria-invalid={outOfRange} aria-describedby='campaign-start-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose campaign start'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose campaign start'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='campaign-start-hint' invalid={outOfRange}>
          {outOfRange ? 'The campaign starts between 10.01.2026 and 31.12.2026.' : 'Between 10.01.2026 and 31.12.2026. Try 31.02.2026 or 05.01.2026.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {startDate ? <code>{startDate}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: выходные недоступны

`disabledDates` принимает ISO-дни или функцию. Календарь блокирует эти дни, а введённый выходной делает input невалидным с сообщением браузера, поэтому форма не отправляется, а `[data-user-edited]:invalid` помечает поле.

<!-- example: date-field/weekends-unavailable.tsx -->
```tsx
import {
  Button,
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const isWeekend = (iso: string) => {
  const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();

  return weekday === 0 || weekday === 6;
};

export default function WeekendsUnavailable() {
  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='delivery-date'>Delivery date</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          disabledDates={isWeekend}
        >
          <DateFieldInput
            id='delivery-date'
            required
            placeholder='dd.mm.yyyy'
            aria-describedby='delivery-date-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose delivery date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose delivery date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='delivery-date-hint'>Monday to Friday only.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book delivery</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

### Пограничный случай: всплывающий календарь в другой локали

`locale` задаёт названия месяцев и дней недели и первый день недели в календаре. Формат ввода по-прежнему берётся из `format`, а подписи триггера и кнопок месяца переводите сами.

<!-- example: date-field/calendar-popup-in-another-locale.tsx -->
```tsx
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function CalendarPopupInAnotherLocale() {
  return (
    <div lang='de-DE' style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='liefertermin'>Liefertermin</Label>
      <DateField format='dd.MM.yyyy' separator='.' locale='de-DE'>
        <DateFieldInput id='liefertermin' placeholder='TT.MM.JJJJ' aria-describedby='liefertermin-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTrigger square aria-label='Datum auswählen'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Datum auswählen'>
              <CalendarHeader>
                <CalendarPrevButton square aria-label='Vorheriger Monat'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                <CalendarHeading>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarHeading>
                <CalendarNextButton square aria-label='Nächster Monat'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='liefertermin-hint'>Die Woche beginnt im Kalender am Montag.</HelperText>
    </div>
  );
}
```
<!-- /example -->
