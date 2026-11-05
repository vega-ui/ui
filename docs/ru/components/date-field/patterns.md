# DateField: паттерны

## Поле даты с календарём в поповере

Когда использовать:

- Обычное поле формы должно позволять и вводить, и выбирать дату.
- Календарь должен появляться по запросу, а не быть видимым постоянно.

Заметки о композиции:

- Оставьте `DateFieldInput` основной поверхностью и дайте ему подпись.
- Смонтируйте `DateFieldCalendar` внутри `PopoverContent` и используйте `DateFieldTriggerIconButton` с `aria-label` в качестве триггера.

Компромиссы:

- Экономит место в раскладке.
- Требует проверки оверлея внутри диалогов, выдвижных панелей и прокручиваемых контейнеров.

<!-- example: date-field/typed-date-with-a-calendar-popover.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function TypedDateWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='due-date'>Payment due</Label>
      <DateField locale={locale} format='dd.MM.yyyy' separator='.' defaultValue='2026-03-31'>
        <DateFieldInput id='due-date' placeholder='dd.mm.yyyy' aria-describedby='due-date-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Choose due date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar>
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

## Поле даты в формах с насыщенной валидацией

Когда использовать:

- Дата должна участвовать в валидации при отправке.
- Тексты ошибок и подсказок важнее визуального просмотра календаря.

Заметки о композиции:

- Используйте нативные `required` и `pattern` на `DateFieldInput` для проверки наличия и полноты; `min` и `max` уже соблюдаются при вводе.
- `disabledDates` соблюдается только в календаре, поэтому повторите это правило в валидации при отправке.
- Показывайте ошибку через `error` на корне и `HelperText error`, связанный через `aria-describedby`.

Компромиссы:

- Нативная валидация ограничений без дополнительных библиотек.
- `name` на input отправляет введённый текст; чтобы отправить ISO-день, копируйте `onChangeValue` в скрытый input, как в разделе [Форма/интеграция](./examples.md#формаинтеграция).

<!-- example: date-field/required-and-incomplete-dates.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

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
        <DateField format='dd.MM.yyyy' separator='.' error={invalid}>
          <DateFieldInput
            id='renewal-date'
            name='renewalDate'
            required
            pattern='\d{2}\.\d{2}\.\d{4}'
            placeholder='dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='renewal-date-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose renewal date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='renewal-date-hint' error={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Поле даты в модальных сценариях

Когда использовать:

- Сценарии планирования или проверки находятся внутри `Dialog`, `Drawer` или `Sheet`.
- Календарь по-прежнему должен открываться по запросу.

Заметки о композиции:

- Проверьте фокус, закрытие и наложение слоёв вместе с родительским оверлеем.
- Календарь должен быть достаточно компактным для родительского контейнера.

Компромиссы:

- Сохраняет существующий модальный сценарий.
- Усложняет координацию оверлеев.

<!-- example: date-field/date-field-inside-a-dialog.tsx -->
```tsx
import { CSSProperties } from 'react';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
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
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='review-date'>Review date</Label>
            <DateField format='dd.MM.yyyy' separator='.' min='2026-01-01'>
              <DateFieldInput id='review-date' name='reviewDate' required placeholder='dd.mm.yyyy' />
              <Popover placement='bottom-end'>
                <PopoverTrigger asChild>
                  <DateFieldTriggerIconButton aria-label='Choose review date' />
                </PopoverTrigger>
                <PopoverContent>
                  <DateFieldCalendar>
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

## Поле даты в негригорианском календаре

Когда использовать:

- Пользователи вводят и читают даты в персидском, еврейском, японском, буддийском, исламском или другом календаре.

Заметки о композиции:

- Создайте календарь один раз с помощью `createCalendarSystem` вне компонента (см. [Даты и календарные системы](../../i18n.md#адаптер-календарной-системы)) и передайте его в проп `calendar` корня вместе с `locale`.
- Ввод проверяется в этом календаре, например 31-й день 6-го персидского месяца или 13-й еврейский месяц; `min` и `max` остаются ISO-строками `YYYY-MM-DD`.

Компромиссы:

- Нативная длина месяцев и високосные месяцы без изменения хранимого значения.
- Длина месяцев и эры берутся из данных `Intl` среды выполнения.

<!-- example: date-field/date-field-in-a-non-gregorian-calendar.tsx -->
```tsx
import { useState } from 'react';
import { createCalendarSystem } from '@vega-ui/i18n';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const persianCalendar = createCalendarSystem('persian');

export default function DateFieldInANonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='persian-date'>تاریخ تحویل</Label>
        <DateField
          format='yyyy/MM/dd'
          separator='/'
          calendar={persianCalendar}
          locale='fa-IR'
          min='2026-03-21'
          value={date}
          onChangeValue={setDate}
        >
          <DateFieldInput id='persian-date' placeholder='yyyy/mm/dd' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='انتخاب تاریخ' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='ماه قبل' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='ماه بعد' />
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Stored value: {date ? <code>{date}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
```
<!-- /example -->
