# Pagination: стилизация

## Обзор

`PaginationLink` и `PaginationEllipsis` берут оформление у `Button`, а `size` и `variant` — у `Pagination`. Слой, специфичный для пагинации, управляет раскладкой ряда и квадратной формой ссылок и многоточий.

## Публичные CSS-переменные

В текущей реализации нет отдельных публичных переменных `--pagination-*`.

Компонент в основном опирается на:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--spacing-2` | `PaginationList` | промежуток между элементами |
| `--padding-inline` | `PaginationLink`, `PaginationEllipsis` | равна `0`, чтобы блок был квадратным |
| `--icon-size` | `PaginationLink` | размер иконки, треть высоты кнопки |

## Переменные уровня частей

### `Pagination`

У `<nav>` нет собственных стилей. Задайте ему стили раскладки, если в нём есть что-то кроме списка, например `Text` со статусом рядом с `PaginationList`.

### `PaginationList`

Flex-ряд с промежутком `--spacing-2` между элементами, без маркеров списка и без браузерных отступов.

### `PaginationItem`

Flex-элемент `<li>`, который выравнивает содержимое по центру по вертикали. Стилизуйте его, чтобы скрыть элемент или сдвинуть его в ряду, например через `margin-inline-start: auto`.

### `PaginationLink`

Квадратная `Button` с оформлением `transparent`, а при `current` — `fill`; `appearance` переопределяет оба. Ссылка с `aria-disabled='true'` и `<button disabled>`, отрендеренная через `asChild`, получают отключённый вид `Button`.

### `PaginationEllipsis`

Квадратный блок `Button` с оформлением `transparent` того же размера, что и ссылки, поэтому ряд не сдвигается, когда многоточие заменяет страницу. Не реагирует на указатель и не имеет состояний наведения и нажатия.

## Взаимодействие состояний и вариантов

- `size` и `variant` передаются из `Pagination` в каждый `PaginationLink` и `PaginationEllipsis`, которые могут их переопределить
- текущая страница меняет оформление ссылки на `fill`
- многоточие остаётся визуально пассивным; текст статуса — ваш собственный `Text`, и стилизуете его вы

## Примеры

### Второстепенная пагинация с текстом статуса

`variant='secondary'` на корне применяется к обеим стрелкам. Статус между ними — `Text` внутри `PaginationItem` со своими отступами и цветом.

<!-- example: pagination/secondary-pagination-text.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SecondaryPaginationText() {
  const total = 20;
  const [page, setPage] = useState(3);

  return (
    <Pagination aria-label='Gallery pages' variant='secondary'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Text size={3} fontWeight={500} aria-live='polite' style={{ paddingInline: 'var(--spacing-8)', color: 'var(--color-secondary-500)', whiteSpace: 'nowrap' }}>
            Page {page} of {total}
          </Text>
        </PaginationItem>
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

## Не переопределяйте

- не стилизуйте многоточие как интерактивный элемент страницы
- не делайте ссылки страниц неквадратными без продуктовой необходимости
- не убирайте визуальное различие между текущей страницей и остальными
