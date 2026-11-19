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
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
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
              <Icon><ChevronLeftIcon /></Icon>
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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyPagination` передаёт свои пропсы в `Pagination`, строит ссылки для страницы `page` из `total` с адресами из `getHref` и по `siblings` страниц с каждой стороны от текущей, а стрелки называет через `previousLabel` и `nextLabel`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: pagination/recipe.tsx -->
```tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  type PaginationProps,
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

interface MyPaginationProps extends PaginationProps {
  page: number
  total: number
  getHref: (page: number) => string
  siblings?: number
  previousLabel: string
  nextLabel: string
}

export function MyPagination({ page, total, getHref, siblings = 1, previousLabel, nextLabel, ...props }: MyPaginationProps) {
  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <Pagination {...props}>
      <PaginationList>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink aria-label={previousLabel} aria-disabled='true'><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page - 1)} rel='prev' aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
        {getPageItems(page, total, siblings).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={getHref(item)} current={item === page}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          {isLast ? (
            <PaginationLink aria-label={nextLabel} aria-disabled='true'><Icon><ChevronRightIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page + 1)} rel='next' aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

const total = 24;

function getHref(page: number) {
  return `?page=${page}`;
}

export const layout = 'wide';

export default function Recipe() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get('page'));
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setPage(fromUrl);
    }
  }, []);

  return (
    <MyPagination
      aria-label='Blog archive pages'
      size='sm'
      page={page}
      total={total}
      getHref={getHref}
      siblings={0}
      previousLabel='Previous page'
      nextLabel='Next page'
    />
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

- Размер: `xs`, `sm`, `md`, `lg` или `xl` по шкале `Button`, по умолчанию `md`
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
