# Pagination

## Профиль документа

`advanced interactive`

## Кратко

`Pagination` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для постраничной навигации: ориентир `<nav>` со списком ссылок на страницы контента. Он передаёт `size` и `variant` ссылкам и многоточиям внутри и не хранит состояние страницы: текущей страницей владеет приложение, в URL или в состоянии React. Какие страницы показать, когда их слишком много для полного списка, решает приложение.

## Импорты

```tsx
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  type PaginationEllipsisProps,
  type PaginationItemProps,
  type PaginationLinkProps,
  type PaginationListProps,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PaginationProps`
- `PaginationListProps`
- `PaginationItemProps`
- `PaginationLinkProps`
- `PaginationEllipsisProps`
- `PaginationSize`
- `PaginationVariant`

## Минимальная композиция

`Pagination` рендерит `<nav>`, которому имя даёт `aria-label`; `PaginationList` рендерит `<ul>`, а каждый `PaginationItem` — один `<li>` вокруг `PaginationLink`. Здесь у страниц нет адреса, поэтому родитель хранит страницу в состоянии React, а каждый `PaginationLink asChild` рендерит `<button type='button'>`; `current` отмечает текущую страницу. Кнопкам-стрелкам нужен собственный `aria-label`, а `disabled` на границах они получают сами. Если у страниц есть адрес, передайте `PaginationLink` проп `href`, и он отрендерит `<a>`.

<!-- example: pagination/minimal-composition.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MinimalComposition() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <Pagination aria-label='Pagination'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeft /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink asChild current={item === page}>
              <button type='button' onClick={() => setPage(item)}>{item}</button>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Next page' disabled={page === pages.length} onClick={() => setPage(page + 1)}>
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

## Обязательные части

- `Pagination`: ориентир `<nav>` с именем из `aria-label` и общие `size` и `variant`
- `PaginationList`: `<ul>`, который выстраивает элементы в ряд
- `PaginationItem`: `<li>` вокруг каждой ссылки или текста статуса
- `PaginationLink`: ссылка на страницу, а с `asChild` — ссылка роутера или `<button>`

## Необязательные части

- `PaginationEllipsis`: `<li aria-hidden>`, который отмечает пропущенные страницы в сокращённом диапазоне; он ставится прямо в `PaginationList`
- `Text` из `@vega-ui/react` для статуса вроде `Page 3 of 20`, внутри `PaginationItem` или вне списка

## Порядок композиции

1. `Pagination`
2. `PaginationList`
3. повторяющиеся `PaginationItem`, в каждом один `PaginationLink` или `Text`
4. `PaginationEllipsis` прямо в `PaginationList`, между элементами там, где страницы пропущены

## Варианты

- Размер: `xs`, `sm`, `md`, `lg` или `xl` по шкале `IconButton`, по умолчанию `md`
- Вариант: `primary` или `secondary`, по умолчанию `primary`
- `size` и `variant` задаются на `Pagination` и переопределяются на каждом `PaginationLink` и `PaginationEllipsis`
- Оформление: `fill` для текущей страницы и `transparent` для остальных; `appearance` на `PaginationLink` его переопределяет
- Модель взаимодействия: по умолчанию `<a href>`, через `asChild` — ссылка роутера или `<button type='button'>`

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

- Поведение на первой и последней странице должно быть явным: граничная ссылка теряет `href` и получает `aria-disabled='true'`, граничная кнопка получает `disabled`.
- Интерфейс пагинации не должен становиться источником истины для состояния данных: рендерите его из страницы в URL или в состоянии.
- Страница из URL или оставшаяся после фильтрации может выйти за пределы диапазона. Ограничьте её один раз и используйте одно и то же значение для `current` и для выборки данных.
- Усечённый диапазон, в котором число элементов не меняется при смене страницы, не даёт элементам управления сдвигаться. Многоточие, скрывающее одну-единственную страницу, не экономит места: покажите эту страницу.
- Если страниц нет, решите, нужна ли пагинация вообще.

## Частые ошибки

- Оставлять `Pagination` или ссылки-иконки без `aria-label`.
- Ставить `PaginationLink` прямо в `PaginationList` без `PaginationItem`.
- Оборачивать `PaginationEllipsis` в `PaginationItem`: он сам рендерит `<li>`.
- Передавать адрес `PaginationLink`, когда он рендерит ссылку роутера через `asChild`: адрес указывается на дочернем элементе.
- Рендерить `<button>` через `asChild` без `type='button'` внутри формы.
- Забывать про отключение на границах страниц.
- Использовать пагинацию, когда данным лучше подходят бесконечная прокрутка или фильтрация.
