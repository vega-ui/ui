# Pagination: анатомия

## Обзор

`Pagination` — композиционная система навигации. Корень предоставляет общий контекст размера и варианта, а каждый элемент списка оборачивает один видимый элемент пагинации.

## Обязательные части

### `Pagination`

Обязательна. Владеет общим контекстом размера и варианта и рендерит внешний список.

### `PaginationListItem`

Обязательна при обычной композиции. Сохраняет семантику списка для каждого видимого элемента пагинации.

### `PaginationItem` или `PaginationTriggerIconButton`

Обычно обязательны. Это основные интерактивные элементы перехода по страницам.

## Необязательные части

### `PaginationEllipsis`

Необязательна. Обозначает пропущенные диапазоны.

### `PaginationText`

Необязательна. Показывает компактный текстовый статус пагинации.

## Порядок композиции

1. `Pagination`
2. повторяющиеся `PaginationListItem`
3. по одной дочерней части в каждом элементе списка

## Допустимые варианты композиции

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

## Недопустимые варианты композиции

### Интерактивные части пагинации без `PaginationListItem`

Визуально всё может работать, но семантика списка ослабевает.

### Компонент пагинации сам хранит главное состояние страницы

Каноническое состояние страницы принадлежит родительской функции или роутеру.

### Многоточие как интерактивная замена настоящих страниц

Поставляемое многоточие — визуальный индикатор пропуска, а не навигация по страницам.
