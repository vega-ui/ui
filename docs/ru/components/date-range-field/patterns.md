# DateRangeField: паттерны

## Поле диапазона с календарём в поповере

Когда использовать:

- Пользователям нужно одно связанное поле диапазона в форме или панели фильтров.
- Выбор диапазона должен открываться по запросу.

Заметки по композиции:

- Оставьте `DateRangeFieldInput` основной поверхностью ввода и дайте ему подпись.
- Монтируйте `DateRangeFieldCalendar` внутри `PopoverContent`; первый выбранный день записывается как начало, второй — как конец.

Компромиссы:

- Экономит место в раскладке.
- Требует явной обработки неполного диапазона: одна дата — допустимый ввод.

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

## Поле диапазона в выдвижных панелях фильтров

Когда использовать:

- Фильтры отчётов или аналитики находятся внутри `Drawer` или `Sheet`.
- Диапазон — один из нескольких фильтров, расположенных друг под другом.

Заметки по композиции:

- Делайте поле компактным и явно обозначайте семантику диапазона.
- Проверьте расположение поповера внутри родительского оверлея.

Компромиссы:

- Хорошо работает в плотных интерфейсах фильтров.
- Добавляет сложность согласования оверлеев.

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

## Поле диапазона для форм отчётов со строгой валидацией

Когда использовать:

- Диапазон обязателен перед экспортом или формированием отчёта.
- Продукту нужны явные тексты ошибок для неполных или заблокированных диапазонов.

Заметки по композиции:

- Используйте нативный `required` и `pattern` для полного диапазона; `min` и `max` уже применяются при вводе, а перевёрнутый диапазон переставляется.
- `disabledDates` действует только в календаре, поэтому согласуйте его с правилами отчётности на бэкенде и повторите проверку при отправке.

Компромиссы:

- Более понятная валидация.
- `name` на input отправляет введённый текст; чтобы отправить `from` и `to` как ISO-дни, копируйте `onChangeValue` в скрытые input, как в разделе [Форма/интеграция](./examples.md#формаинтеграция).

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
