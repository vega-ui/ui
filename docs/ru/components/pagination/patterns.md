# Pagination: паттерны

## Пагинация на ссылках

Когда использовать:

- страницы — настоящие места назначения для навигации со своим адресом

Заметки по композиции:

- `PaginationLink` рендерит `<a>`, поэтому передавайте `href`
- для роутера поместите его `Link` внутрь `PaginationLink asChild`, а адрес укажите на дочернем элементе; текущую страницу отмечайте через `current`
- на границах рендерите стрелку без `href` и с `aria-disabled='true'`
- генерируйте href в родительской функции

Компромиссы:

- сильная семантика навигации: страницы открываются в новой вкладке, ими можно поделиться, их видят поисковики
- сложность маршрутизации остаётся вне компонента

<!-- example: pagination/link-based-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map((offset) => from + offset);
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
    <Pagination aria-label='Blog archive pages'>
      <PaginationList>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink aria-label='Previous page' aria-disabled='true'><Icon><ChevronLeft /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page - 1)} rel='prev' aria-label='Previous page'><Icon><ChevronLeft /></Icon></PaginationLink>
          )}
        </PaginationItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={getHref(item)} current={item === page} aria-label={`Page ${item}`}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          {isLast ? (
            <PaginationLink aria-label='Next page' aria-disabled='true'><Icon><ChevronRight /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page + 1)} rel='next' aria-label='Next page'><Icon><ChevronRight /></Icon></PaginationLink>
          )}
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
```
<!-- /example -->

## Пагинация на кнопках

Когда использовать:

- состояние страницы полностью локальное или управляется на клиенте, и у страниц нет адреса

Заметки по композиции:

- рендерите `<button type='button'>` через `PaginationLink asChild`
- храните текущую страницу в состоянии родителя
- отключайте стрелки на границах через `disabled` на `<button>`

Компромиссы:

- простое локальное управление
- страницу нельзя открыть в новой вкладке или отправить ссылкой
- каноническим состоянием страницы всё равно должна владеть родительская функция

<!-- example: pagination/button-based-pagination.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map((offset) => from + offset);
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
    <Pagination aria-label='Search results pages'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeft /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {getPageItems(page, total, 1).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink asChild current={item === page}>
                <button type='button' aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                  {item}
                </button>
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
              <Icon><ChevronRight /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
```
<!-- /example -->

## Сокращённый большой диапазон

Когда использовать:

- страниц много и показывать каждую — слишком шумно

Заметки по композиции:

- вычисляйте элементы сами: первая и последняя страницы, текущая с соседями и маркер многоточия на месте каждого пропуска; `getPageItems` из примера — отправная точка
- рендерите каждое число как `PaginationItem` с `PaginationLink`, а каждый маркер многоточия — как `PaginationEllipsis` прямо в `PaginationList`
- добавьте стрелки на первую и последнюю страницу или форму перехода, если пользователю нужно попадать на далёкие страницы

Компромиссы:

- компактно и масштабируемо; число элементов в ряду не меняется при смене страницы
- пользователь теряет прямой доступ к каждой странице

<!-- example: pagination/truncated-large-range.tsx -->
```tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map((offset) => from + offset);
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
      <Pagination aria-label='Log pages' size='xs'>
        <PaginationList>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='First page' disabled={page === 1} onClick={() => setPage(1)}>
                <Icon><ChevronsLeft /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          {getPageItems(page, total, siblings).map((item) => {
            if (typeof item === 'string') {
              return <PaginationEllipsis key={item} />;
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink asChild current={item === page}>
                  <button type='button' aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                    {item}
                  </button>
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Last page' disabled={page === total} onClick={() => setPage(total)}>
                <Icon><ChevronsRight /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </div>
  );
}
```
<!-- /example -->
