# Sheet

## Профиль документа

`advanced interactive`

## Кратко

`Sheet` (шторка) — [составной компонент](../../glossary.md#составной-компонент-compound-component) для оверлеев в виде панели, обычно прикреплённых к низу экрана или рассчитанных в первую очередь на мобильные устройства, с частями для триггера, содержимого и ручки. `SheetClose` превращает вашу собственную кнопку в кнопку закрытия; заголовки и раскладка — обычная разметка, которую вы собираете сами. `SheetContent` рендерит нативный `<dialog>`, открытый через `showModal()`, поэтому браузер помещает его в верхний слой (top layer), делает остальную страницу инертной и рисует подложку. Это оверлей семейства, ориентированный на касания и панели, особенно когда важны точки привязки (snap points) или появление снизу.

## Импорт

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHandle,
  type SheetProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SheetProps`
- `SheetTriggerProps`
- `SheetHandleProps`
- `SheetContentProps`
- `SheetCloseProps`

## Минимальная композиция

<!-- example: sheet/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Order summary</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order summary</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>2 × Flat white, 1 × Almond croissant · $13.40</Text>
        <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
          <Button type='submit' value='pay'>Pay $13.40</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Обязательные части

- `Sheet`: корневое состояние и провайдер контекста
- `SheetTrigger`: поверхность действия открытия
- `SheetContent`: поверхность модальной шторки

## Необязательные части

- `SheetHandle`: элемент для перетаскивания и жестов
- `SheetClose`: закрывает шторку по клику; оборачивает вашу собственную кнопку через `asChild`

## Ваша собственная разметка

- заголовок, `id` которого передаётся в `SheetContent` как `aria-labelledby` (или `aria-label` на `SheetContent`); у шторки обязательно должно быть имя
- кнопки, которые отвечают на шторку, внутри `<form method="dialog">`
- прокручиваемая область: элемент с `overflow: auto`

## Порядок композиции

1. `Sheet`
2. `SheetTrigger`
3. `SheetContent`
4. `SheetHandle`
5. Ваш заголовок, необязательный `SheetClose` и тело

## Варианты

- Раскладки нижней шторки и обычные раскладки панели
- Открытие через триггер и [контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия
- Шторки с точками привязки и полностью открытые шторки
- `closedBy` на `SheetContent`: закрывается любым действием, только по `Escape` или вовсе не закрывается пользователем
- Затемнённая или прозрачная подложка (`overlay` на `SheetContent`); шторка в любом случае остаётся модальной
- Подача с приоритетом мобильных устройств и использование панели на разных устройствах

## Миграция с 2.x

`SheetHeader` и `SheetMain` удалены: библиотека оставляет только части с поведением, которое нельзя выразить обычной разметкой. Отступы, которые они давали, теперь есть у `SheetContent`.

- `SheetHeader` → `Heading` с `id`, на который ссылается `aria-labelledby` на `SheetContent`
- `SheetMain` → обычное содержимое или элемент с `overflow: auto` для прокручиваемой области
- Новое: `SheetClose` — часть закрытия без собственных стилей (раньше у Sheet не было кнопки закрытия)
- `useSheetContext()` больше не возвращает `contentId`, а `SheetTrigger` больше не выставляет `aria-controls`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Проверяйте жесты на сенсорных устройствах.
- Точки привязки нужно проверять на реальной высоте содержимого.
- Вложенным оверлеям нужны проверки восстановления фокуса и наложения.
- Незакрываемым шторкам нужны особенно понятные пути выхода.

## Частые ошибки

- `SheetContent` без `aria-labelledby` или `aria-label`.
- Обращение со шторкой как с модальным диалогом для десктопа.
- Точки привязки без проверки удобства содержимого на каждой остановке.
- Жесты, фокус и закрытие не проверены вместе.
