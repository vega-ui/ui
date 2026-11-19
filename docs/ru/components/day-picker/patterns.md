# DayPicker: паттерны

## Статичная сетка месяца

Когда использовать:

- достаточно одного известного месяца, например при выборе дня внутри расчётного периода

Заметки по композиции:

- используйте `DayPickerLayout` и передавайте `defaultFocusedDate`, чтобы сетка не зависела от сегодняшней даты
- ограничивайте период через `min` и `max`, а не скрывайте дни; они же удерживают навигацию с клавиатуры внутри месяца

Компромиссы:

- просто и стабильно
- нет видимой навигации; используйте скроллер или `Calendar`, когда пользователи переходят между месяцами

<!-- example: day-picker/static-month-grid.tsx -->
```tsx
import { DayPicker, DayPickerCell, DayPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function StaticMonthGrid() {
  const [day, setDay] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Payment day'
        locale='en-US'
        defaultFocusedDate='2026-11-01'
        min='2026-11-10'
        max='2026-11-25'
        value={day}
        onChangeValue={setDay}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {day ? `Payment on ${dateFormat.format(new Date(day))}` : 'Pick a day between November 10 and 25'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Перелистывание месяцев свайпом

Когда использовать:

- пользователи переходят между месяцами свайпом или постраничной прокруткой, а приложение рисует собственный заголовок

Заметки по композиции:

- используйте `DayPickerScroller` с `DayPickerScrollerContent` и `DayPickerScrollerLayout`
- скроллер следует за днём в фокусе, а свайп переносит фокус на тот же день нового месяца
- контролируйте `focusedDate` через `onChangeFocusedDate`, если собственный заголовок показывает месяц или у него свои кнопки
- берите `Calendar`, когда достаточно стандартного заголовка и представлений месяца и года

Компромиссы:

- тактильно, и возможна любая раскладка заголовка
- приложение само управляет состоянием навигации, которое взял бы на себя `Calendar`

<!-- example: day-picker/visible-month-with-own-navigation.tsx -->
```tsx
import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { addCalendarMonths, getSameDayInCalendarMonth, gregorianCalendar } from '@vega-ui/i18n';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function VisibleMonthWithOwnNavigation() {
  const [focused, setFocused] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const month = addCalendarMonths(gregorianCalendar, focused, amount);
    setFocused(getSameDayInCalendarMonth(gregorianCalendar, focused, month));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(focused))}</Text>
        <Button square aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(1)}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        focusedDate={focused}
        onChangeFocusedDate={setFocused}
        value={selected}
        onChangeValue={setSelected}
      >
        <DayPickerScroller>
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

## Собственный рендер сетки

Когда использовать:

- должна измениться сама структура строк и ячеек, чего не может шаблон ячейки

Заметки по композиции:

- стройте строки через `createDayPickerGrid`, а не пишите математику дат заново; передавайте тот же `calendar`, что и компоненту
- `date` равен `undefined` для пустой ячейки за пределами месяца; `day` — номер дня в календарной системе
- задавайте `disabled` и `excluded` ячейкам вне месяца, как это делает встроенная ячейка
- здесь сетка с понедельника по пятницу: ячейки выходных не рендерятся, а недели без рабочих дней месяца отброшены

Компромиссы:

- полный контроль над разметкой
- подписи, начало недели и обработка дней соседних месяцев — задача приложения; если меняется только содержимое, предпочитайте шаблон ячейки

<!-- example: day-picker/custom-grid-rendering.tsx -->
```tsx
import {
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  GridColumnHeader,
  Text,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays' locale='en-US' defaultFocusedDate={MONTH} style={{ inlineSize: 'fit-content' }}>
      <DayPickerRow row={-1}>
        {WORK_DAYS.map((weekday, col) => (
          <GridColumnHeader key={weekday} col={col} excluded asChild>
            <Text size={2} style={{ color: 'var(--label-tertiary)', minBlockSize: 'var(--spacing-18)' }}>
              {weekday}
            </Text>
          </GridColumnHeader>
        ))}
      </DayPickerRow>
      <DayPickerRowGroup>
        {weeks.map(({ row, data }) => (
          <DayPickerRow key={row} row={row}>
            {data.slice(0, 5).map(({ col, date, day, inCurrentMonth }) => (
              <DayPickerItem key={col} col={col} value={date} disabled={!inCurrentMonth} excluded={!inCurrentMonth}>
                {inCurrentMonth ? day : ''}
              </DayPickerItem>
            ))}
          </DayPickerRow>
        ))}
      </DayPickerRowGroup>
    </DayPicker>
  );
}
```
<!-- /example -->

## Шаблон ячейки

Когда использовать:

- ячейкам дней нужно дополнительное содержимое, например цена, статус или счётчик

Заметки по композиции:

- дочерние элементы `DayPickerLayout` и `DayPickerScrollerLayout` рендерятся по разу на каждый день внутри контекста ячейки
- читайте день через `useDayPickerCellContext()`: `{ col, date, fields, label, inMonth }`; `date` равен `undefined` для пустой ячейки за пределами месяца
- рендерите содержимое внутри `DayPickerCell`, чтобы ячейка сохраняла состояния выбора, фокуса и отключения
- берите номера дней из `label` или `fields`, а не из ISO-строки `date`; в негригорианских календарях они различаются
- ищите данные по `date` — он одинаков в любой календарной системе
- чисто визуальному содержимому (точки, цвет) нужны слова в `aria-label` ячейки

Компромиссы:

- сохраняет сетку, ключи и поведение клавиатуры раскладки
- насыщенные ячейки могут теснить содержимое на малых размерах

<!-- example: day-picker/cell-template.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  useDayPickerCellContext,
} from '@vega-ui/react';

const events: Record<string, string[]> = {
  '2026-11-04': ['Design review', 'Sprint planning'],
  '2026-11-12': ['Release 3.2'],
  '2026-11-18': ['Team offsite', 'Retro', 'Demo day'],
};

function EventDay() {
  const { date, label } = useDayPickerCellContext();
  const count = date === undefined ? 0 : (events[date]?.length ?? 0);

  if (count === 0) return <DayPickerCell />;

  return (
    <DayPickerCell aria-label={`${label}, ${count} ${count === 1 ? 'event' : 'events'}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1 }}>
        <span>{label}</span>
        <span aria-hidden style={{ fontSize: '0.6em', color: 'var(--label-secondary)' }}>{'•'.repeat(count)}</span>
      </span>
    </DayPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <DayPicker aria-label='Team events' locale='en-US' defaultFocusedDate='2026-11-01' size='sm'>
      <DayPickerLayout>
        <EventDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->
