# MonthPicker: паттерны

## Стандартная сетка месяцев

Когда использовать:

- пользователь выбирает месяц: расчётный период, месяц отчёта или месяц окончания срока действия карты

Заметки о композиции:

- дайте `MonthPickerLayout` сгенерировать сетку; он рендерит 12 или 13 месяцев в зависимости от календарной системы
- передайте `locale` корню один раз; раскладка берёт из него названия месяцев
- помните, что ключ ячейки — первый день каждого месяца

Компромиссы:

- просто и надёжно
- один год за раз; переключение года добавляет приложение (см. [Controlled/Stateful](./examples.md#контролируемыйс-состоянием-месяц-оплаты-с-переключением-года))

<!-- example: month-picker/months-of-one-year.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function MonthsOfOneYear() {
  return (
    <MonthPicker aria-label='Start month, 2026' locale='en-US' year='2026-01-01' defaultSelected='2026-03-01' style={{ width: '100%' }}>
      <MonthPickerLayout>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Плотный встроенный выбор месяца

Когда использовать:

- выбор месяца — часть тулбара, поповера с фильтрами или боковой панели

Заметки о композиции:

- используйте четыре колонки и `format='short'`, чтобы год поместился в три строки
- оставьте `size` корня маленьким и разместите переключатель года рядом с сеткой
- в примере полное название месяца и год остаются в триггере и в его доступном имени

Компромиссы:

- компактно
- в некоторых локалях короткие названия неоднозначны; держите полное название в триггере или сводке

<!-- example: month-picker/month-filter-in-a-popover.tsx -->
```tsx
import {
  Button,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { ChevronDown } from '@vega-ui/icons';
import { useState } from 'react';

const triggerFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthFilterInAPopover() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('2026-10-01');

  const pick = (next: string) => {
    setMonth(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={`Statement month, ${triggerFormat.format(new Date(month))}`}>
          {triggerFormat.format(new Date(month))}
          <Icon size='sm'><ChevronDown /></Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a statement month'>
        <MonthPicker
          aria-label='Statement month, 2026'
          locale='en-US'
          year='2026-01-01'
          to='2026-10-01'
          selected={month}
          onSelectCell={pick}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Собственный рендер сетки

Когда использовать:

- нужно изменить саму структуру строк, чего шаблон ячейки сделать не может

Заметки о композиции:

- стройте строки через `createMonthPickerGrid`, а не упорядочивайте месяцы вручную; передайте тот же `calendar`, что и пикеру
- форматируйте метки через `formatCalendarDate` в этом календаре (или `Intl.DateTimeFormat` для григорианских ключей), а не из ISO-ключа
- если метка сокращена, как узкие названия здесь, передайте полное название в `aria-label`

Компромиссы:

- полный контроль над разметкой
- метки и локаль — забота приложения; если меняется только содержимое, предпочтите шаблон ячейки

<!-- example: month-picker/custom-grid-rendering.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
} from '@vega-ui/react';

const YEAR = '2026-01-01';
const narrowFormat = new Intl.DateTimeFormat('en-US', { month: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const rows = createMonthPickerGrid({ year: YEAR, cols: 6 });

export default function CustomGridRendering() {
  return (
    <MonthPicker aria-label='Month, 2026' locale='en-US' year={YEAR} style={{ width: '100%' }}>
      <MonthPickerRowGroup>
        {rows.map(({ row, data }) => (
          <MonthPickerRow key={row} row={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem key={month} col={col} value={month} aria-label={longFormat.format(new Date(month))}>
                {narrowFormat.format(new Date(month))}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Шаблон ячейки

Когда использовать:

- ячейкам месяцев нужно дополнительное содержимое: сумма, статус или подсказка

Заметки о композиции:

- children у `MonthPickerLayout` рендерятся по одному разу на месяц внутри контекста ячейки
- читайте месяц через `useMonthPickerCellContext()`: `{ col, date, fields, label }`; `date` — первый день месяца
- рендерьте содержимое внутри `MonthPickerCell`, чтобы ячейка сохраняла состояния выбора, фокуса и отключения
- номер месяца берите из `label` или `fields`, но никогда из ISO-строки `date`; в негригорианских календарях они различаются
- ищите данные по `date` — он одинаков во всех календарных системах

Компромиссы:

- сохраняются сетка, ключи и поведение клавиатуры раскладки
- насыщенные ячейки могут не помещаться в маленьких размерах

<!-- example: month-picker/cell-template.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  useMonthPickerCellContext,
} from '@vega-ui/react';

const spending: Record<string, number> = {
  '2026-01-01': 1240,
  '2026-02-01': 980,
  '2026-03-01': 1415,
  '2026-04-01': 1102,
  '2026-05-01': 1630,
  '2026-06-01': 2210,
  '2026-07-01': 1875,
  '2026-08-01': 1490,
  '2026-09-01': 1320,
  '2026-10-01': 1160,
};

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

function SpendingMonth({ locale }: { locale: string }) {
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', notation: 'compact' });
  const { date, label } = useMonthPickerCellContext();
  const amount = spending[date];

  if (amount === undefined) return <MonthPickerCell />;

  return (
    <MonthPickerCell aria-label={`${label}, ${money.format(amount)}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{money.format(amount)}</small>
      </span>
    </MonthPickerCell>
  );
}

export default function CellTemplate({ locale = 'en-US' }: { locale?: string }) {
  return (
    <MonthPicker aria-label='Spending by month, 2026' locale={locale} year='2026-01-01' size='lg' to='2026-10-01' style={{ width: '100%' }}>
      <MonthPickerLayout format='short' cols={4}>
        <SpendingMonth locale={locale} />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->
