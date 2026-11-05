# Pagination

## Профиль документа

`advanced interactive`

## Кратко

`Pagination` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для постраничной навигации. Он координирует элементы страниц, кнопки-триггеры, заполнители-многоточия и необязательный поясняющий текст, оставляя каноническое состояние страницы в родительской функции.

## Импорты

```tsx
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationListItemProps,
  type PaginationProps,
  type PaginationSize,
  type PaginationTextProps,
  type PaginationTriggerIconButtonProps,
  type PaginationVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PaginationProps`
- `PaginationItemProps`
- `PaginationTriggerIconButtonProps`
- `PaginationEllipsisProps`
- `PaginationListItemProps`
- `PaginationTextProps`
- `PaginationSize`
- `PaginationVariant`

## Минимальная композиция

`Pagination` рендерит обычный `<ul>` и не хранит номер страницы: текущей страницей владеет родитель, а `<nav>` со своим `aria-label` делает список ориентиром. Каждый элемент и триггер оборачивайте в `PaginationListItem`, кроме `PaginationText` — он сам рендерит `<li>`. Триггерам-иконкам нужны иконка внутри и `aria-label`.

<!-- example: pagination/minimal-composition.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MinimalComposition() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <nav aria-label='Pagination'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {pages.map((item) => (
          <PaginationListItem key={item}>
            <PaginationItem current={item === page} onClick={() => setPage(item)}>{item}</PaginationItem>
          </PaginationListItem>
        ))}
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page' disabled={page === pages.length} onClick={() => setPage(page + 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}
```
<!-- /example -->

## Обязательные части

- `Pagination`: контекст корня и контейнер списка
- `PaginationListItem`: обёртка списка для каждого видимого элемента
- одна из частей: `PaginationItem`, `PaginationTriggerIconButton`, `PaginationEllipsis` или `PaginationText`

## Необязательные части

- `PaginationText`: компактная текстовая сводка, например `Page 3 of 20`
- `PaginationEllipsis`: индикатор пропуска для сокращённых диапазонов страниц

## Порядок композиции

1. `Pagination`
2. повторяющиеся `PaginationListItem`
3. внутри каждого элемента — одна дочерняя часть пагинации

## Варианты

- Размер: унаследован от размеров button/icon-button
- Вариант: `primary` или `secondary`
- Модель взаимодействия: пагинация на ссылках или на кнопках

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Поведение на первой и последней странице должно быть явным.
- Интерфейс пагинации не должен становиться источником истины для состояния данных.
- Многоточие должно сохранять контекст текущей страницы, а не скрывать его полностью.

## Частые ошибки

- Забывать про отключение на границах страниц.
- Считать отображение пагинации единственной моделью состояния.
- Использовать пагинацию, когда данным лучше подходят бесконечная прокрутка или фильтрация.
