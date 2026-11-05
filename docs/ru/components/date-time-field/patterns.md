# DateTimeField: паттерны

## Поле метки времени с календарём в поповере

Когда использовать:

- Пользователям нужно одно поле, в которое вводятся и дата, и время.
- Календарь должен открываться по запросу, а не быть постоянно видимым.

Заметки о композиции:

- Оставьте `DateTimeFieldInput` основной поверхностью и подпишите его.
- Монтируйте `DateTimeFieldCalendar` внутри `PopoverContent`; выбор дня сохраняет введённое время.

Компромиссы:

- Форма остаётся компактной.
- Нужны понятные указания о формате и часовом поясе.

<!-- example: date-time-field/date-and-time-with-a-calendar-popover.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

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
            <DateTimeFieldTriggerIconButton aria-label='Choose webinar date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateTimeFieldCalendar>
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

## Поле метки времени в формах планирования

Когда использовать:

- Публикация, напоминания или расписания запуска зависят от одной метки времени.
- Валидация и сериализация происходят непосредственно перед отправкой.

Заметки о композиции:

- Текст подсказки должен явно указывать часовой пояс и ожидаемый формат.
- Согласуйте `min`, `max` и `timeStep` с бизнес-правилами планирования; `min` и `max` ограничивают введённые значения, а `timeStep` управляет только шагом клавиш-стрелок.
- `name` на input отправляет введённый текст; чтобы отправить значение `YYYY-MM-DDTHH:mm`, копируйте `onChangeValue` в скрытый input, как в разделе [Форма/интеграция](./examples.md#формаинтеграция).

Компромиссы:

- Полный контроль над меткой времени в одной строке поля.
- Больше сложности с валидацией и текстами, чем у простого поля даты.

<!-- example: date-time-field/submitting-a-local-date-time.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function SchedulePostForm() {
  const [publishAt, setPublishAt] = useState('');
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('timeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='publish-at'>Publish at</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} min='2026-07-01T00:00' onChangeValue={setPublishAt}>
          <DateTimeFieldInput
            id='publish-at'
            required
            pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}'
            placeholder='dd.mm.yyyy, hh:mm'
            aria-describedby='publish-at-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose publish date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar>
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

## Поле метки времени в мобильных шторках

Когда использовать:

- Планирование происходит внутри `Sheet` или другого стеснённого оверлея.
- Пользователю всё равно нужен доступ к календарю.

Заметки о композиции:

- Проверьте позиционирование поповера и прокрутку внутри родительского оверлея.
- Делайте поле достаточно компактным для узких раскладок.

Компромиссы:

- Сохраняет модальный контекст.
- Усложняет согласование оверлеев и фокуса.

<!-- example: date-time-field/rescheduling-inside-a-sheet.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Heading,
  Icon,
  IconButton,
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
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
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
                <DateTimeFieldInput id='new-time' required pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}' />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateTimeFieldTriggerIconButton aria-label='Choose new date' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateTimeFieldCalendar>
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
