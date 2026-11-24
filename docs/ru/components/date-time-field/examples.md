# DateTimeField: примеры

## Базовый

### Базовый: дата и время с календарём в поповере

Одно поле для даты и времени. Календарь выбирает день и сохраняет введённое время, а пока полного времени нет — подставляет `00:00`. `dateSeparator`, `separator` и `timeFormat` здесь равны значениям по умолчанию и указаны явно; `defaultValue` — строка `YYYY-MM-DDTHH:mm`.

<!-- example: date-time-field/date-and-time-with-a-calendar-popover.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DateAndTimeWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='starts-at'>Webinar starts at</Label>
      <DateTimeField
        locale={locale}
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        timeFormat='HH:mm'
        defaultValue='2026-07-15T18:30'
      >
        <DateTimeFieldInput id='starts-at' placeholder='dd.mm.yyyy, hh:mm' aria-describedby='starts-at-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTrigger square aria-label='Choose webinar date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose webinar date'>
            <DateTimeFieldCalendar>
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
            </DateTimeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateTimeField>
      <HelperText id='starts-at-hint'>24-hour time. Picking a day keeps the typed time.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Базовый: календарь с кнопкой времени

День и время в одном поповере, как в iOS: выбор дня оставляет поповер открытым, а кнопка времени под календарём показывает `DateTimeFieldTime` и открывает колёса во вложенном поповере. `DateTimeFieldColumn` с `unit='hour'` и `unit='minute'` крутит время и сохраняет день, минуты идут по `timeStep`; пока поле пустое, колёса берут дату из `today`. `Escape` закрывает только колёса и возвращает фокус на кнопку времени. Кнопка называется подписью «Time» и своим текстом, поэтому читается как «Time 18:30». Строки используют шаблон `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`, как в `TimeField`.

<!-- example: date-time-field/calendar-and-time-wheels.tsx -->
```tsx
import { useId, useState } from 'react';
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldColumn,
  DateTimeFieldInput,
  DateTimeFieldTime,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TimeFieldOption,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function CalendarAndTimeWheels() {
  const [startsAt, setStartsAt] = useState('2026-07-15T18:30');
  const timeLabelId = useId();
  const timeButtonId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='call-starts-at'>Call starts at</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeStep={5}
          today='2026-07-15'
          value={startsAt}
          onChangeValue={setStartsAt}
        >
          <DateTimeFieldInput id='call-starts-at' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose call date and time'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose call date and time'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', padding: '0 var(--spacing-6) var(--spacing-6)' }}>
                <Text id={timeLabelId}>Time</Text>
                <Popover placement='top-end'>
                  <PopoverTrigger asChild>
                    <Button id={timeButtonId} aria-labelledby={`${timeLabelId} ${timeButtonId}`} aria-haspopup='dialog' variant='secondary' appearance='ghost'>
                      <DateTimeFieldTime placeholder='--:--' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent role='dialog' aria-label='Choose call time' style={{ padding: 'var(--spacing-6)' }}>
                    <WheelPicker aria-label='Call time'>
                      <DateTimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                      <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                      <DateTimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                    </WheelPicker>
                  </PopoverContent>
                </Popover>
              </div>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {startsAt ? <code>{startsAt}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: окончание встречи следует за началом

Оба поля контролируемые. Начало — это `min` поля окончания, поэтому окончание, введённое раньше начала, делает input окончания невалидным, а `[data-user-edited]:invalid` помечает поле. Когда начало сдвигается за окончание, его `onChangeValue` переносит окончание на час после нового начала; длительность считается по двум ISO-значениям.

<!-- example: date-time-field/meeting-end-follows-the-start.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
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

const addHours = (iso: string, hours: number) => {
  const date = new Date(`${iso}Z`);
  date.setUTCHours(date.getUTCHours() + hours);

  return date.toISOString().slice(0, 16);
};

const describeDuration = (start: string, end: string) => {
  if (!start || !end) return 'Choose the start and the end';

  const minutes = (Date.parse(end) - Date.parse(start)) / 60_000;
  if (minutes < 0) return 'The end is before the start';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;

  return `${hours} h ${rest} min`;
};

export default function MeetingTimes() {
  const [start, setStart] = useState('2026-07-15T10:00');
  const [end, setEnd] = useState('2026-07-15T11:00');

  const changeStart = (nextStart: string) => {
    setStart(nextStart);

    if (nextStart !== '' && end !== '' && end < nextStart) {
      setEnd(addHours(nextStart, 1));
    }
  };

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <FieldsetLegend>Meeting</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='meeting-start'>Starts</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} value={start} onChangeValue={changeStart}>
          <DateTimeFieldInput id='meeting-start' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose start date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose start date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='meeting-end'>Ends</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeStep={15}
          min={start}
          value={end}
          onChangeValue={setEnd}
        >
          <DateTimeFieldInput id='meeting-end' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose end date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose end date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        Duration: {describeDuration(start, end)}
      </Text>
    </Fieldset>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: быстрые напоминания

Кнопки задают контролируемое значение снаружи, а input показывает его в формате поля. Текущее время читается в обработчике клика, а не во время рендера.

<!-- example: date-time-field/snooze-presets.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const toISODateTime = (date: Date) => {
  const pad = (part: number) => String(part).padStart(2, '0');
  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  return `${day}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const inOneHour = () => {
  const date = new Date();
  date.setHours(date.getHours() + 1, 0, 0, 0);

  return toISODateTime(date);
};

const tomorrowMorning = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);

  return toISODateTime(date);
};

export default function SnoozePresets() {
  const [remindAt, setRemindAt] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='remind-at'>Remind me at</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' value={remindAt} onChangeValue={setRemindAt}>
          <DateTimeFieldInput id='remind-at' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose reminder date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose reminder date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <div role='group' aria-label='Snooze presets' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setRemindAt(inOneHour())}>In 1 hour</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setRemindAt(tomorrowMorning())}>Tomorrow 09:00</Button>
        <Button size='xs' variant='secondary' appearance='transparent' onClick={() => setRemindAt('')}>Clear</Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {remindAt ? <code>{remindAt}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: отправка локальных даты и времени

Форма хранит значение из `onChangeValue` в состоянии и отправляет его через свой скрытый input, поэтому `FormData` содержит `2026-07-15T09:30`, а не введённый текст. Это время по часам без смещения, поэтому обработчик отправки добавляет часовой пояс пользователя. `required` не пропускает пустое значение, а поле делает неполное значение невалидным.

<!-- example: date-time-field/submitting-a-local-date-time.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function SchedulePostForm() {
  const [publishAt, setPublishAt] = useState('');
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('timeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  const onReset = () => {
    setPublishAt('');
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='publish-at'>Publish at</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} min='2026-07-01T00:00' value={publishAt} onChangeValue={setPublishAt}>
          <DateTimeFieldInput
            id='publish-at'
            required
            placeholder='dd.mm.yyyy, hh:mm'
            aria-describedby='publish-at-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose publish date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose publish date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
        <input type='hidden' name='publishAt' value={publishAt} />
        <HelperText id='publish-at-hint'>Your local time. The time zone is sent with the post.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Schedule</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: перенос внутри шторки

Поповер с календарём открывается поверх шторки, в которой находится поле. Шторка редактирует черновик, который при каждом открытии берётся из сохранённого значения, а форма с `method='dialog'` сохраняет его и закрывает шторку.

<!-- example: date-time-field/rescheduling-inside-a-sheet.tsx -->
```tsx
import { CSSProperties, useState } from 'react';
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Heading,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

export default function ReschedulingInsideASheet() {
  const [draft, setDraft] = useState('2026-07-15T14:00');
  const [appointment, setAppointment] = useState('2026-07-15T14:00');

  const onChangeOpen = (open: boolean) => {
    if (open) setDraft(appointment);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>Appointment: <code>{appointment}</code></Text>
      <Sheet onChangeOpen={onChangeOpen}>
        <SheetTrigger asChild>
          <Button>Reschedule</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby='reschedule-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='reschedule-title' as='h2' size={4} fontWeight={600}>Reschedule appointment</Heading>
            <SheetClose asChild>
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </SheetClose>
          </div>
          <form
            method='dialog'
            onSubmit={() => setAppointment(draft)}
            style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
          >
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='new-time'>New time</Label>
              <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} value={draft} onChangeValue={setDraft}>
                <DateTimeFieldInput id='new-time' required />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateTimeFieldTrigger square aria-label='Choose new date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
                  </PopoverTrigger>
                  <PopoverContent role='dialog' aria-label='Choose new date'>
                    <DateTimeFieldCalendar>
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
                    </DateTimeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateTimeField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: обязательная и неполная временная метка

Нативный `required` и собственный `setCustomValidity` поля вызывают `invalid` при отправке, пока поле пустое или дата либо время неполные. Обработчик выбирает сообщение по `validity`, `aria-invalid` помечает поле, а ввод сбрасывает ошибку.

<!-- example: date-time-field/required-and-incomplete-timestamp.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const HINT = 'Date and 24-hour time, for example 15.07.2026, 09:30.';

export default function MaintenanceWindowForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Enter when the maintenance starts.');
      return;
    }

    setError('The date or the time is incomplete.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='maintenance-start'>Maintenance starts</Label>
        <DateTimeField dateFormat='dd.MM.yyyy'>
          <DateTimeFieldInput
            name='maintenanceStart'
            id='maintenance-start'
            required
            placeholder='dd.mm.yyyy, hh:mm'
            aria-invalid={invalid}
            aria-describedby='maintenance-start-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose maintenance date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose maintenance date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
        <HelperText id='maintenance-start-hint' invalid={invalid}>{invalid ? error : HINT}</HelperText>
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

### Отключённый: зафиксированное время выполнения

`disabled` на корне отключает input и триггер календаря, а вспомогательный текст объясняет причину.

<!-- example: date-time-field/locked-execution-time.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function LockedExecutionTime() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='executed-at'>Executed at</Label>
      <DateTimeField dateFormat='dd.MM.yyyy' disabled defaultValue='2026-07-15T09:30'>
        <DateTimeFieldInput id='executed-at' aria-describedby='executed-at-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTrigger square aria-label='Choose execution date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose execution date'>
            <DateTimeFieldCalendar>
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
            </DateTimeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateTimeField>
      <HelperText id='executed-at-hint'>The job has already run and cannot be rescheduled.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: рабочие часы

`min` и `max` включают время: полное значение вне их остаётся как введено и делает input невалидным, поэтому `01.07.2026, 08:30` не меняется, а `aria-invalid` помечает поле. Часы и минуты ограничиваются своим диапазоном, поэтому `25:30` становится `23:30`.

<!-- example: date-time-field/business-hours-window.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const FIRST_SLOT = '2026-07-01T09:00';
const LAST_SLOT = '2026-07-31T18:00';

export default function BusinessHoursWindow() {
  const [slot, setSlot] = useState('');
  const outsideWindow = slot !== '' && (slot < FIRST_SLOT || slot > LAST_SLOT);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='delivery-slot'>Delivery slot</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          min={FIRST_SLOT}
          max={LAST_SLOT}
         
          value={slot}
          onChangeValue={setSlot}
        >
          <DateTimeFieldInput id='delivery-slot' placeholder='dd.mm.yyyy, hh:mm' aria-invalid={outsideWindow} aria-describedby='delivery-slot-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose delivery day'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose delivery day'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
        <HelperText id='delivery-slot-hint' invalid={outsideWindow}>
          {outsideWindow ? 'We deliver from 01.07.2026, 09:00 to 31.07.2026, 18:00.' : 'From 01.07.2026, 09:00 to 31.07.2026, 18:00. Try 01.07.2026, 08:30 or 25:30.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {slot ? <code>{slot}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: шаг в четверть часа

`timeStep` задаёт, на сколько `ArrowUp` и `ArrowDown` сдвигают минуты под кареткой, переходя от `45` к `00` без смены часа. На часах стрелки по-прежнему двигают на единицу, как нативный `datetime-local` со `step`. Введённые минуты остаются как есть.

<!-- example: date-time-field/quarter-hour-steps.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function QuarterHourSteps() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='pickup-time'>Pickup</Label>
      <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} defaultValue='2026-07-15T12:45'>
        <DateTimeFieldInput id='pickup-time' aria-describedby='pickup-time-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTrigger square aria-label='Choose pickup date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose pickup date'>
            <DateTimeFieldCalendar>
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
            </DateTimeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateTimeField>
      <HelperText id='pickup-time-hint'>Put the caret in the minutes and press ↑ or ↓ to move by 15 minutes.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: точность до секунд

`timeFormat='HH:mm:ss'` добавляет сегмент секунд; значение тогда тоже содержит секунды, и `min` и `max` могут их включать.

<!-- example: date-time-field/seconds-precision.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function SecondsPrecision() {
  const [loggedAt, setLoggedAt] = useState('2026-07-01T23:59:58');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='logged-at'>Log entry time</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeFormat='HH:mm:ss'
          min='2026-07-01T00:00:00'
          value={loggedAt}
          onChangeValue={setLoggedAt}
        >
          <DateTimeFieldInput id='logged-at' placeholder='dd.mm.yyyy, hh:mm:ss' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose log date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose log date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {loggedAt ? <code>{loggedAt}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: только будние дни

`disabledDates` принимает ISO-дни или функцию. Календарь блокирует эти дни, а введённый выходной делает input невалидным с сообщением браузера, поэтому форма не отправляется, а `[data-user-edited]:invalid` помечает поле.

<!-- example: date-time-field/weekdays-only.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const isWeekend = (iso: string) => {
  const weekday = new Date(`${iso.slice(0, 10)}T00:00:00Z`).getUTCDay();

  return weekday === 0 || weekday === 6;
};

export default function WeekdaysOnly() {
  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='office-meeting'>Office meeting</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          disabledDates={isWeekend}
        >
          <DateTimeFieldInput
            id='office-meeting'
            required
            placeholder='dd.mm.yyyy, hh:mm'
            aria-describedby='office-meeting-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose meeting date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose meeting date'>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
        <HelperText id='office-meeting-hint'>Monday to Friday.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book room</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->
