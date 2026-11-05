# YearPicker: примеры

## Базовый

### Базовый: страница лет

`YearPickerLayout` рендерит страницу из `rows × cols` лет (по умолчанию 12), которая начинается с года, заданного через `year`. Ключ ячейки — первый день года, поэтому `defaultSelected` — `'2026-01-01'`. У сетки нет видимого заголовка, поэтому ей передан `aria-label`.

<!-- example: year-picker/a-page-of-years.tsx -->
```tsx
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export default function APageOfYears() {
  return (
    <YearPicker aria-label='Model year' locale='en-US' year='2026-01-01' defaultSelected='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: выбранный год

`selected` и `onSelectCell` делают выбор контролируемым. Скроллер листает годы, а `year` держит в виду страницу выбранного года; `null` означает, что ничего не выбрано.

<!-- example: year-picker/selected-year.tsx -->
```tsx
import {
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SelectedYear() {
  const [year, setYear] = useState<string | null>('2024-01-01');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <YearPicker aria-label='Model year' locale='en-US' year={year ?? '2026-01-01'} selected={year} onSelectCell={setYear}>
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Model year: {year ? year.slice(0, 4) : 'not set'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: фильтр по диапазону лет

`selection='range'` выбирает промежуток лет. Форма отправляет первый год как есть, а конец — как последний день его года, читает оба значения через `FormData`, использует связанную подсказку для проверки на пустоту и очищает состояние при сбросе.

<!-- example: year-picker/year-range-filter.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getYearEnd(yearStart: string) {
  return `${yearStart.slice(0, 4)}-12-31`;
}

export default function YearRangeFilter() {
  const [years, setYears] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = years;

  const change = (next: string[]) => {
    setYears(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('from') || !data.get('to')) {
      setMissing(true);
      return;
    }

    setQuery(new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) }).toString());
  };

  const reset = () => {
    setYears([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Archive years</FieldsetLegend>
        <YearPicker
          aria-label='Archive years, 2015 to 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          year='2015-01-01'
          to='2026-01-01'
          selected={years}
          onSelectCell={change}
        >
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick the first and the last year.' : 'Pick the first and the last year of the search.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getYearEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Search</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /archive?${query}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: постраничные годы со своими кнопками

Скроллер отдаёт `prev()` и `next()` через `apiRef`, поэтому страницу можно менять кнопками вне сетки, и сообщает видимую страницу через `onChangePeriod` для подписи диапазона. Держите `period` скроллера равным `rows × cols` раскладки и переносите `active` на новую страницу, когда прежний активный год уходит из вида.

<!-- example: year-picker/paged-years-with-own-buttons.tsx -->
```tsx
import {
  Icon,
  IconButton,
  type IndexedSnapScrollerApiRef,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState } from 'react';

const PERIOD = 20;

function getYear(key: string) {
  return Number(key.slice(0, 4));
}

export default function PagedYearsWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState('2016-01-01');
  const [active, setActive] = useState('2026-01-01');
  const [selected, setSelected] = useState<string | null>(null);

  const firstYear = getYear(page);
  const lastYear = firstYear + PERIOD - 1;

  const changePage = (next: string) => {
    setPage(next);
    setActive((current) => {
      const year = getYear(current);
      if (year >= getYear(next) && year < getYear(next) + PERIOD) return current;

      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Earlier years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{firstYear}–{lastYear}</Text>
        <IconButton aria-label='Later years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <YearPicker
        aria-label='Founding year'
        locale='en-US'
        year='2016-01-01'
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <YearPickerScroller apiRef={scrollerRef} period={PERIOD} onChangePeriod={changePage}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: год рождения младше допустимого возраста

Здесь год рождения не ограничен через `from` / `to`: приложение проверяет возраст после выбора и превращает подсказку, связанную с сеткой, в ошибку. Если год никогда не может быть допустимым, предпочитайте границы (см. [Постраничный диапазон лет](./patterns.md#постраничный-диапазон-лет)); проверяйте, когда пользователю нужно увидеть причину.

<!-- example: year-picker/under-age-birth-year.tsx -->
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

const MIN_AGE = 18;
const CURRENT_YEAR = 2026;

export default function UnderAgeBirthYear() {
  const [birthYear, setBirthYear] = useState<string | null>('2010-01-01');
  const messageId = useId();

  const age = birthYear ? CURRENT_YEAR - Number(birthYear.slice(0, 4)) : null;
  const invalid = age !== null && age < MIN_AGE;

  let message = 'Pick the year you were born.';
  if (age !== null) message = `You turn ${age} this year.`;
  if (invalid) message = `You must be at least ${MIN_AGE} to open an account. You turn ${age} this year.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={messageId}
        locale='en-US'
        year={birthYear ?? '2000-01-01'}
        selected={birthYear}
        onSelectCell={setBirthYear}
      >
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: отдельные годы

Массив начал лет отключает ровно эти годы — здесь уже закрытые финансовые годы; `to` отключает будущие. Причина написана рядом с сеткой и связана через `aria-describedby`.

<!-- example: year-picker/specific-years.tsx -->
```tsx
import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedYears = ['2022-01-01', '2023-01-01'];

export default function SpecificYears() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Fiscal year to adjust'
        aria-describedby={hintId}
        locale='en-US'
        year='2018-01-01'
        to='2026-01-01'
        disabled={closedYears}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={3} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <HelperText id={hintId}>Fiscal years 2022 and 2023 are closed after the audit.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: смена эры в японском календаре

С календарной системой из `createCalendarSystem` (см. [Адаптер календарной системы](../../i18n.md#адаптер-календарной-системы)) годы следуют этому календарю. В японском календаре 2019 год разделён: Хэйсэй 31 длится с 1 января по 30 апреля, а Рэйва 1 начинается 1 мая, поэтому страница показывает для него две ячейки с ключами `'2019-01-01'` и `'2019-05-01'` и подписями 平成31年 и 令和元年. Арифметика лет, перелистывание и `from` / `to` считают их двумя годами.

<!-- example: year-picker/era-change-in-the-japanese-calendar.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const japaneseCalendar = createCalendarSystem('japanese');

export default function EraChangeInTheJapaneseCalendar() {
  return (
    <YearPicker aria-label='Year' calendar={japaneseCalendar} locale='ja-JP' year='2018-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->

### Пограничный случай: годы, отсчитываемые от другой эпохи

Календарь, который только перенумеровывает григорианские годы, может расширять `GregorianCalendar` (см. [Расширение GregorianCalendar](../../i18n.md#расширение-gregoriancalendar)). В тайском буддийском календаре ячейка с ключом `'2026-01-01'` подписана พ.ศ. 2569 в локали `th-TH`; ключи, `from` и `to` остаются григорианскими ISO-датами.

<!-- example: year-picker/years-counted-from-another-epoch.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const buddhistCalendar = createCalendarSystem('buddhist');

export default function YearsCountedFromAnotherEpoch() {
  return (
    <YearPicker aria-label='Year' calendar={buddhistCalendar} locale='th-TH' year='2026-01-01' to='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->
