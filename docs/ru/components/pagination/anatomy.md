# Pagination: анатомия

## Обзор

`Pagination` — ориентир `<nav>` со списком ссылок на страницы. Корень передаёт `size` и `variant` частям внутри, `PaginationList` выстраивает ряд, каждый `PaginationItem` содержит одну ссылку или текст статуса, а `PaginationEllipsis` отмечает пропущенные страницы.

## Обязательные части

### `Pagination`

Обязательна. Рендерит `<nav>` и передаёт `size` и `variant` ссылкам и многоточиям. Дайте ему имя через `aria-label`; библиотека его не задаёт.

### `PaginationList`

Обязательна. Рендерит `<ul>` и выстраивает элементы в ряд, без браузерных отступов списка.

### `PaginationItem`

Обязательна вокруг каждой ссылки или текста статуса. Рендерит `<li>`; задайте ему `className` или `style`, чтобы скрыть элемент или сдвинуть его в ряду.

### `PaginationLink`

Обязательна для каждой страницы и стрелки. Рендерит `<a>`, оформленный как квадратная `Button`. `current` отмечает текущую страницу через `aria-current='page'`. С `asChild` рендерит вместо себя дочерний элемент: ссылку роутера или `<button type='button'>`, когда у страниц нет адреса.

## Необязательные части

### `PaginationEllipsis`

Необязательна. Рендерит `<li aria-hidden>` с `…` шириной со ссылку того же размера. Ставится прямо в `PaginationList`, а не внутрь `PaginationItem`, и не интерактивна.

### `Text`

Необязательна. `Text` из `@vega-ui/react` показывает статус вроде `Page 3 of 20`, внутри `PaginationItem` или вне списка.

## Порядок композиции

1. `Pagination`
2. `PaginationList`
3. повторяющиеся `PaginationItem`, в каждом один `PaginationLink` или `Text`
4. `PaginationEllipsis` прямо в `PaginationList`, между элементами там, где страницы пропущены

## Допустимые варианты композиции

Элементы строятся локальной функцией `getPageItems`: каждое число становится `PaginationItem` с `PaginationLink`, каждый маркер многоточия — `PaginationEllipsis`. Страницы и стрелки — кнопки, отрендеренные через `asChild`.

<!-- example: pagination/button-based-pagination.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
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
    <Pagination aria-label='Search results pages' size='sm'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {getPageItems(page, total, 0).map((item) => {
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
              <Icon><ChevronRightIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Ссылка прямо в `PaginationList`

В `<ul>` могут быть только `<li>`. Оборачивайте каждую ссылку и текст статуса в `PaginationItem`.

### `PaginationEllipsis` внутри `PaginationItem`

`PaginationEllipsis` сам рендерит `<li>`, поэтому обёртка вкладывает один элемент списка в другой.

### Компонент пагинации сам хранит главное состояние страницы

`Pagination` не хранит состояние страницы. Текущая страница принадлежит родительской функции или роутеру.

### Многоточие в виде ссылки или кнопки

Многоточие — индикатор пропуска, а не навигация по страницам. Используйте `PaginationEllipsis`; чтобы пользователь мог попасть на скрытую страницу, добавьте форму перехода к странице или ссылки на первую и последнюю.
