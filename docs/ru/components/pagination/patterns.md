# Pagination: паттерны

## Пагинация на ссылках

Когда использовать:

- страницы — настоящие места назначения для навигации

Заметки по композиции:

- используйте `PaginationItem asChild`
- генерируйте href в родительской функции

Компромиссы:

- сильная семантика навигации
- сложность маршрутизации остаётся вне компонента

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

## Пагинация на кнопках

Когда использовать:

- состояние страницы полностью локальное или управляется на клиенте

Заметки по композиции:

- храните текущую страницу в состоянии родителя
- отключайте триггеры на границах

Компромиссы:

- простое локальное управление
- каноническим состоянием страницы всё равно должна владеть родительская функция

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

## Сокращённый большой диапазон

Когда использовать:

- страниц много и показывать каждую — слишком шумно

Заметки по композиции:

- оставляйте видимыми первую страницу, контекст текущей и последнюю
- используйте многоточие только как индикатор пропуска

Компромиссы:

- компактно и масштабируемо
- пользователь теряет прямой доступ к кнопке каждой страницы

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
