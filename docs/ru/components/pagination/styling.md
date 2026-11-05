# Pagination: стилизация

## Обзор

Стилизация `Pagination` в основном делегирована вложенным примитивам `Button`, `IconButton` и `Text`. Слой, специфичный для пагинации, в основном управляет раскладкой списка и несколькими настройками формы элементов страниц.

## Публичные CSS-переменные

В текущей реализации нет большого набора отдельных публичных переменных `--pagination-*`.

Компонент в основном опирается на:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--spacing-6` | корневой список | промежуток между элементами |
| `--padding-block` | элементы страниц / многоточие | квадратные пропорции |
| `--spacing-8` | текст пагинации | горизонтальные отступы текста |
| `--color-primary-500` | текст пагинации | основной тон текста |
| `--color-secondary-500` | текст пагинации | второстепенный тон текста |

## Переменные уровня частей

### Корень

Корень задаёт горизонтальную раскладку списка и промежутки.

### `PaginationItem`

Делает пропорции квадратными, сопоставляя горизонтальные отступы с вертикальными.

### `PaginationEllipsis`

Использует стили кнопки, но убирает изменения фона, из-за которых элемент выглядел бы интерактивным.

### `PaginationText`

Добавляет боковые отступы и цвет текста в зависимости от варианта.

## Взаимодействие состояний и вариантов

- размер и вариант в основном передаются из контекста пагинации в `Button`, `IconButton` и `Text`
- состояние текущей страницы меняет оформление кнопки на `fill`
- многоточие остаётся визуально пассивным

## Примеры

### Второстепенный текст пагинации

<!-- example: pagination/secondary-pagination-text.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SecondaryPaginationText() {
  const total = 20;
  const [page, setPage] = useState(3);

  return (
    <nav aria-label='Gallery pages'>
      <Pagination variant='secondary' style={{ alignItems: 'center' }}>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationText aria-live='polite'>Page {page} of {total}</PaginationText>
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

## Не переопределяйте

- не стилизуйте многоточие как интерактивный элемент страницы
- не делайте элементы страниц неквадратными без продуктовой необходимости
