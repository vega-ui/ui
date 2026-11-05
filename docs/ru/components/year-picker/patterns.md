# YearPicker: паттерны

## Статичная сетка лет

Когда использовать:

- нужные годы помещаются на одну страницу — например, ближайшие финансовые годы или недавние модельные годы

Заметки о композиции:

- используйте `YearPickerLayout`; страница начинается с года, заданного в `year`
- задайте `rows` и `cols` так, чтобы страница вмещала ровно нужные годы, и ограничьте их через `from` и `to`

Компромиссы:

- просто и стабильно
- нет перелистывания; для длинных диапазонов, например годов рождения, используйте скроллер

<!-- example: year-picker/static-year-grid.tsx -->
```tsx
import { Text, YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';
import { useState } from 'react';

export default function StaticYearGrid() {
  const [year, setYear] = useState<string | null>('2026-01-01');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Budget year'
        locale='en-US'
        year='2025-01-01'
        from='2025-01-01'
        to='2030-01-01'
        selected={year}
        onSelectCell={setYear}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={2} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Budget for {year ? `FY${year.slice(0, 4)}` : '—'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Постраничный диапазон лет

Когда использовать:

- диапазон лет длинный, например годы рождения, и выигрывает от постраничной прокрутки с привязкой (snap)

Заметки о композиции:

- используйте `YearPickerScroller`, `YearPickerScrollerContent` и `YearPickerScrollerLayout`
- держите `period` у `YearPickerScroller` равным `rows × cols` раскладки; оба по умолчанию равны 12
- начинайте рядом с вероятным ответом через `year` и ограничивайте диапазон через `from` и `to`
- объясняйте границы рядом с сеткой и связывайте текст через `aria-describedby`

Компромиссы:

- масштабируется на любой диапазон
- больше движущихся частей, чем у статичной сетки

<!-- example: year-picker/paged-year-range.tsx -->
```tsx
import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function PagedYearRange() {
  const [birthYear, setBirthYear] = useState<string | null>(null);
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={hintId}
        locale='en-US'
        year='1990-01-01'
        from='1926-01-01'
        to='2008-01-01'
        selected={birthYear}
        onSelectCell={setBirthYear}
      >
        <YearPickerScroller period={20}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={hintId}>Members must be 18 to 100 years old in 2026.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Собственный рендеринг сетки

Когда использовать:

- нужно изменить саму структуру строк, чего шаблон ячейки сделать не может

Заметки о композиции:

- собирайте страницы через `createYearPickerGrid`, а не считайте годы вручную; передавайте тот же `calendar`, что и пикеру
- `start` — первый год страницы `0`, а `offset` — индекс страницы
- форматируйте подписи через `formatCalendarDate` в этом календаре (или `Intl.DateTimeFormat` для григорианских ключей), а не из ISO-ключа
- если подпись сокращена, как двузначные годы здесь, передайте полный год в `aria-label`

Компромиссы:

- полный контроль над разметкой
- подписи и локаль — забота приложения; если меняется только содержимое, предпочитайте шаблон ячейки

<!-- example: year-picker/custom-grid-rendering.tsx -->
```tsx
import {
  YearPicker,
  YearPickerItem,
  YearPickerRow,
  YearPickerRowGroup,
  createYearPickerGrid,
} from '@vega-ui/react';

const START = '2020-01-01';
const shortFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'UTC' });
const rows = createYearPickerGrid({ start: START, rows: 2, cols: 5 });

export default function CustomGridRendering() {
  return (
    <YearPicker aria-label='Season, 2020s' locale='en-US' year={START} style={{ width: '100%' }}>
      <YearPickerRowGroup>
        {rows.map(({ row, data }) => (
          <YearPickerRow key={row} row={row}>
            {data.map(({ col, year }) => (
              <YearPickerItem key={year} col={col} value={year} aria-label={longFormat.format(new Date(year))}>
                ’{shortFormat.format(new Date(year))}
              </YearPickerItem>
            ))}
          </YearPickerRow>
        ))}
      </YearPickerRowGroup>
    </YearPicker>
  );
}
```
<!-- /example -->

## Шаблон ячейки

Когда использовать:

- ячейкам лет нужно дополнительное содержимое: счётчик, статус или подсказка

Заметки о композиции:

- дочерние элементы `YearPickerLayout` и `YearPickerScrollerLayout` рендерятся по одному разу на каждый год внутри контекста ячейки
- читайте год через `useYearPickerCellContext()`: `{ col, date, fields, label }`; `date` — первый день года
- рендерите содержимое внутри `YearPickerCell`, чтобы ячейка сохраняла состояния выбора, фокуса и отключения
- берите номера лет из `label` или `fields`, а не из ISO-строки `date`; в негригорианских календарях они отличаются, а смена эры даёт две ячейки в одном григорианском году
- ищите данные по `date` — он одинаков во всех календарных системах

Компромиссы:

- сохраняет сетку, ключи и клавиатурное поведение раскладки
- насыщенные ячейки могут быть тесными в маленьких размерах

<!-- example: year-picker/cell-template.tsx -->
```tsx
import {
  useYearPickerCellContext,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';

const reports: Record<string, number> = {
  '2019-01-01': 4,
  '2020-01-01': 12,
  '2021-01-01': 11,
  '2022-01-01': 12,
  '2023-01-01': 12,
  '2024-01-01': 9,
};

function ReportYear() {
  const { date, label } = useYearPickerCellContext();
  const count = reports[date] ?? 0;

  return (
    <YearPickerCell aria-label={`${label}, ${count} reports`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{count}</small>
      </span>
    </YearPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <YearPicker aria-label='Report year' locale='en-US' year='2019-01-01' size='lg' to='2024-01-01' style={{ width: '100%' }}>
      <YearPickerLayout rows={2} cols={4}>
        <ReportYear />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->
