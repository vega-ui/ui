# Pagination: примеры

## Базовый

### Базовый: окно страниц с многоточиями

Родитель хранит текущую страницу в состоянии и вычисляет, какие страницы показать, через `getPageItems(page, total, siblings)`: всегда первая и последняя страницы, текущая с одним соседом с каждой стороны и многоточие там, где скрыто хотя бы две страницы. На границах кнопки «назад» и «вперёд» отключены.

<!-- example: pagination/button-based-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

export const layout = 'wide';

export default function ButtonBasedPagination() {
  const total = 12;
  const [page, setPage] = useState(1);

  return (
    <nav aria-label='Search results pages'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
          }

          return (
            <PaginationListItem key={item}>
              <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                {item}
              </PaginationItem>
            </PaginationListItem>
          );
        })}
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}
```
<!-- /example -->

### Базовый: ссылки с настоящими href

Каждая страница — настоящая ссылка `<a href='?page=N'>`, отрендеренная через `asChild`, поэтому её можно открыть в новой вкладке, отправить коллеге и проиндексировать. Текущая страница читается из URL после монтирования и помечается `aria-current='page'`; на границах ссылка «назад» или «вперёд» теряет `href` и получает `aria-disabled`.

<!-- example: pagination/link-based-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

const total = 24;

function getHref(page: number) {
  return `?page=${page}`;
}

export const layout = 'wide';

export default function LinkBasedPagination() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get('page'));
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setPage(fromUrl);
    }
  }, []);

  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <nav aria-label='Blog archive pages'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton asChild aria-label='Previous page'>
            {isFirst ? (
              <a aria-disabled='true'><Icon><ChevronLeft /></Icon></a>
            ) : (
              <a href={getHref(page - 1)} rel='prev'><Icon><ChevronLeft /></Icon></a>
            )}
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
          }

          return (
            <PaginationListItem key={item}>
              <PaginationItem asChild current={item === page}>
                <a href={getHref(item)} aria-label={`Page ${item}`}>{item}</a>
              </PaginationItem>
            </PaginationListItem>
          );
        })}
        <PaginationListItem>
          <PaginationTriggerIconButton asChild aria-label='Next page'>
            {isLast ? (
              <a aria-disabled='true'><Icon><ChevronRight /></Icon></a>
            ) : (
              <a href={getHref(page + 1)} rel='next'><Icon><ChevronRight /></Icon></a>
            )}
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: листание таблицы

Номер страницы режет список из 47 заказов на страницы по 10. Сводка рядом с элементами управления («Showing 11–20 of 47 orders») выводится из того же состояния и вежливо зачитывается при смене страницы.

<!-- example: pagination/paginated-order-list.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const customers = ['Maya Chen', 'Omar Haddad', 'Lena Fischer', 'Tomás Ruiz', 'Aiko Tanaka', 'Priya Nair', 'Jonas Berg'];

const orders = Array.from({ length: 47 }, (_, index) => ({
  id: `#${10500 + index}`,
  customer: customers[index % customers.length],
  total: 24 + ((index * 37) % 180),
}));

const pageSize = 10;

export const layout = 'wide';

export default function PaginatedOrderList() {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(orders.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = orders.slice(start, start + pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              <TableHeading scope='col'>Order</TableHeading>
              <TableHeading scope='col' dataAlign='start'>Customer</TableHeading>
              <TableHeading scope='col'>Total</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((order) => (
              <TableRow key={order.id}>
                <TableData>{order.id}</TableData>
                <TableData dataAlign='start'>{order.customer}</TableData>
                <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>${order.total}.00</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <nav aria-label='Orders pages'>
          <Pagination size='sm'>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Showing {start + 1}–{start + visible.length} of {orders.length} orders
        </Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: переход к странице

Небольшая форма рядом с пагинацией переходит сразу на нужную из 48 страниц. У числового поля есть `min`, `max` и `required`, поэтому браузер отклоняет значения вне диапазона ещё до отправки; обработчик читает значение через `FormData` и очищает поле.

<!-- example: pagination/page-jump-form.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Label,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

export const layout = 'wide';

export default function PageJumpForm() {
  const fieldId = useId();
  const total = 48;
  const [page, setPage] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPage(Number(data.get('page')));
    event.currentTarget.reset();
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-8)' }}>
      <nav aria-label='Catalog pages'>
        <Pagination>
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeft /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
          {getPageItems(page, total, 1).map((item) => {
            if (typeof item === 'string') {
              return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
            }

            return (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            );
          })}
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
              <Icon><ChevronRight /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
        </Pagination>
      </nav>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={fieldId} size='sm'>Go to page (1–{total})</Label>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <TextField size='sm' style={{ width: 'var(--spacing-40)' }}>
            <TextFieldInput id={fieldId} name='page' type='number' inputMode='numeric' min={1} max={total} step={1} required />
          </TextField>
          <Button type='submit' size='sm' variant='secondary' appearance='ghost'>Go</Button>
        </div>
      </form>
    </div>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: компактные элементы в подвале таблицы

В плотном подвале таблицы номера страниц уступают место диапазону в `PaginationText` («6–10 of 23») и двум триггерам-иконкам. `PaginationText` сам рендерит элемент списка, поэтому стоит прямо внутри `Pagination`.

<!-- example: pagination/dense-footer-controls.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { useState } from 'react';

const members = Array.from({ length: 23 }, (_, index) => ({
  id: index,
  name: ['Maya Chen', 'Omar Haddad', 'Lena Fischer', 'Tomás Ruiz', 'Aiko Tanaka'][index % 5],
  role: index % 4 === 0 ? 'Admin' : 'Member',
}));

const pageSize = 5;

export default function DenseFooterControls() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(members.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = members.slice(start, start + pageSize);

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Name</TableHeading>
            <TableHeading scope='col'>Role</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map((member) => (
            <TableRow key={member.id}>
              <TableData>{member.name}</TableData>
              <TableData>{member.role}</TableData>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableData colSpan={2} style={{ paddingBlock: 'var(--spacing-3)' }}>
              <nav aria-label='Members pages' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination size='sm' variant='secondary' style={{ alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <PaginationText size={2} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {start + 1}–{start + visible.length} of {members.length}
                  </PaginationText>
                  <PaginationListItem>
                    <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                      <Icon><ChevronLeft /></Icon>
                    </PaginationTriggerIconButton>
                  </PaginationListItem>
                  <PaginationListItem>
                    <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setPage(page + 1)}>
                      <Icon><ChevronRight /></Icon>
                    </PaginationTriggerIconButton>
                  </PaginationListItem>
                </Pagination>
              </nav>
            </TableData>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: текущая страница исчезла после фильтрации

Запрошенная страница хранится в состоянии отдельно от фактически показанной. Если после фильтрации страниц стало меньше, пример показывает последнюю существующую страницу и `HelperText` с ошибкой, связанный с навигацией; после сброса фильтра запрошенная страница возвращается, а сообщение исчезает.

<!-- example: pagination/stale-page-hint-after-filter-change.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  HelperText,
  Icon,
  Label,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const firstNames = ['Maya', 'Omar', 'Lena', 'Tomás', 'Aiko', 'Priya', 'Jonas', 'Sofia'];
const lastNames = ['Chen', 'Haddad', 'Fischer', 'Ruiz', 'Tanaka', 'Nair', 'Berg'];
const customers = firstNames.flatMap((first) => lastNames.map((last) => `${first} ${last}`));
const pageSize = 12;

export const layout = 'wide';

export default function StalePageHintAfterFilterChange() {
  const fieldId = useId();
  const hintId = useId();
  const [query, setQuery] = useState('');
  const [requestedPage, setRequestedPage] = useState(5);

  const matches = customers.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));
  const pageCount = Math.max(Math.ceil(matches.length / pageSize), 1);
  const stale = requestedPage > pageCount;
  const page = stale ? pageCount : requestedPage;
  const visible = matches.slice((page - 1) * pageSize, page * pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>Filter customers</Label>
        <TextField>
          <TextFieldInput id={fieldId} type='search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Try “ber”' />
        </TextField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {visible.length > 0 ? visible.join(', ') : 'No customers match this filter.'}
      </Text>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <nav aria-label='Customer pages' aria-describedby={stale ? hintId : undefined}>
          <Pagination size='sm'>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setRequestedPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setRequestedPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setRequestedPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
        {stale && (
          <HelperText id={hintId} error role='status' style={{ textAlign: 'center', textWrap: 'balance' }}>
            Page {requestedPage} no longer exists for this filter. Showing page {page} of {pageCount}.
          </HelperText>
        )}
      </div>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: блокировка на время загрузки страницы

Пока грузится следующая страница, нативный `<fieldset disabled>` разом отключает все кнопки страниц и триггеры, и пользователь не может поставить в очередь несколько запросов. Строка статуса ниже сообщает, какая страница загружается.

<!-- example: pagination/disabled-while-loading.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Spinner,
  Text,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

const total = 5;

export const layout = 'wide';

export default function DisabledWhileLoading() {
  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState<number | null>(null);

  useEffect(() => {
    if (loadingPage === null) return;

    const timer = setTimeout(() => {
      setPage(loadingPage);
      setLoadingPage(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingPage]);

  const loading = loadingPage !== null;
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <fieldset disabled={loading} style={{ margin: 0, padding: 0, border: 'none', minInlineSize: 0 }}>
        <nav aria-label='Invoice pages'>
          <Pagination>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setLoadingPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setLoadingPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setLoadingPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
      </fieldset>
      <div role='status' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 'var(--spacing-12)' }}>
        {loading && <Spinner size={2} aria-hidden='true' />}
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{loading ? `Loading page ${loadingPage}…` : `Page ${page} of ${total}`}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: очень большие диапазоны

Тот же алгоритм окна с триггерами первой и последней страницы на 7, 20 и 1000 страницах и с 0–2 соседями. Число элементов при перемещении не меняется, поэтому элементы управления не прыгают; при малом числе страниц показываются все страницы без многоточий.

<!-- example: pagination/truncated-large-range.tsx -->
```tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

const totals = [7, 20, 1000];
const siblingOptions = [0, 1, 2];

export const layout = 'wide';

export default function TruncatedLargeRange() {
  const [total, setTotal] = useState(1000);
  const [siblings, setSiblings] = useState(1);
  const [page, setPage] = useState(500);

  const changeTotal = (next: number) => {
    setTotal(next);
    setPage(Math.min(page, next));
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-4) var(--spacing-12)' }}>
        <div role='group' aria-label='Total pages' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)', marginInlineEnd: 'var(--spacing-2)' }}>Pages</Text>
          {totals.map((item) => (
            <Button key={item} size='xs' variant={item === total ? 'primary' : 'secondary'} appearance='ghost' aria-pressed={item === total} onClick={() => changeTotal(item)}>
              {item}
            </Button>
          ))}
        </div>
        <div role='group' aria-label='Siblings' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)', marginInlineEnd: 'var(--spacing-2)' }}>Siblings</Text>
          {siblingOptions.map((item) => (
            <Button key={item} size='xs' variant={item === siblings ? 'primary' : 'secondary'} appearance='ghost' aria-pressed={item === siblings} onClick={() => setSiblings(item)}>
              {item}
            </Button>
          ))}
        </div>
      </div>
      <nav aria-label='Log pages'>
        <Pagination size='xs' style={{ gap: 'var(--spacing-2)' }}>
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='First page' disabled={page === 1} onClick={() => setPage(1)}>
              <Icon><ChevronsLeft /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeft /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
          {getPageItems(page, total, siblings).map((item) => {
            if (typeof item === 'string') {
              return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
            }

            return (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            );
          })}
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
              <Icon><ChevronRight /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
          <PaginationListItem>
            <PaginationTriggerIconButton aria-label='Last page' disabled={page === total} onClick={() => setPage(total)}>
              <Icon><ChevronsRight /></Icon>
            </PaginationTriggerIconButton>
          </PaginationListItem>
        </Pagination>
      </nav>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: раскладка справа налево и арабские цифры

Внутри `dir='rtl'` flex-ряд разворачивается сам, а иконки-стрелки — нет: «назад» указывает вправо, «вперёд» — влево. Номера страниц и их подписи форматируются через `Intl.NumberFormat('ar-EG')`.

<!-- example: pagination/rtl-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

const numbers = new Intl.NumberFormat('ar-EG');

export const layout = 'wide';

export default function RtlPagination() {
  const total = 15;
  const [page, setPage] = useState(6);

  return (
    <nav dir='rtl' lang='ar' aria-label='الصفحات'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='الصفحة السابقة' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationListItem key={item}><PaginationEllipsis /></PaginationListItem>;
          }

          return (
            <PaginationListItem key={item}>
              <PaginationItem current={item === page} aria-label={`الصفحة ${numbers.format(item)}`} onClick={() => setPage(item)}>
                {numbers.format(item)}
              </PaginationItem>
            </PaginationListItem>
          );
        })}
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='الصفحة التالية' disabled={page === total} onClick={() => setPage(page + 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}
```
<!-- /example -->
