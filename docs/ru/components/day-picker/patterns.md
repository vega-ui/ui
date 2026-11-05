# DayPicker: паттерны

## Статичная сетка месяца

Когда использовать:

- достаточно одного известного месяца, например при выборе дня внутри расчётного периода

Заметки по композиции:

- используйте `DayPickerLayout` и передавайте `month` явно, чтобы сетка не зависела от сегодняшней даты
- ограничивайте период через `from` и `to`, а не скрывайте дни

Компромиссы:

- просто и стабильно
- нет навигации; используйте скроллер или `Calendar`, когда пользователи переходят между месяцами

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
        aria-label='Payment day, November 2026'
        locale='en-US'
        month='2026-11-01'
        from='2026-11-10'
        to='2026-11-25'
        selected={day}
        onSelectCell={setDay}
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
- `onChangePeriod` сообщает первый день месяца, прокрученного в область видимости; сохраните его и передайте обратно как `month`, чтобы заголовок и сетка совпадали
- храните в состоянии и `active` и переносите его в новый месяц, иначе сетка может потерять точку табуляции
- берите `Calendar`, когда достаточно стандартного заголовка и представлений месяца и года

Компромиссы:

- тактильно, и возможна любая раскладка заголовка
- приложение само управляет состоянием навигации, которое взял бы на себя `Calendar`

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
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays, November 2026' locale='en-US' month={MONTH} style={{ inlineSize: 'fit-content' }}>
      <CalendarBaseWeekLabels style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {WORK_DAYS.map((weekday) => (
          <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
        ))}
      </CalendarBaseWeekLabels>
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
    <DayPicker aria-label='Team events, November 2026' locale='en-US' month='2026-11-01' size='sm'>
      <DayPickerLayout>
        <EventDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->
