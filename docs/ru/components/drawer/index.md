# Drawer

## Профиль документа

`advanced interactive`

## Кратко

`Drawer` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для выдвижных панелей (Drawer), прикреплённых к краю экрана: они сохраняют больше контекста страницы, чем модальное окно по центру. `DrawerContent` рендерит нативный `<dialog>`, открытый через `showModal()`, поэтому браузер помещает его в верхний слой (top layer), делает остальную страницу инертной и рисует подложку. В семействе оверлеев это боковая панель; обычно она подходит для второстепенного редактирования, фильтров и контекстных сценариев в рабочем пространстве. `DrawerClose` превращает вашу собственную кнопку в кнопку закрытия; заголовки и раскладку вы собираете сами из обычной разметки.

## Импорт

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  type DrawerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerContentProps`
- `DrawerCloseProps`

## Минимальная композиция

<!-- example: drawer/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Keyboard shortcuts</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Keyboard shortcuts</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          Press ⌘K to search, C to create a task and ? to open this panel again.
        </Text>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Обязательные части

- `Drawer`: корневое состояние и провайдер контекста
- `DrawerTrigger`: действие открытия
- `DrawerContent`: модальная панель, прикреплённая к краю

## Необязательные части

- `DrawerClose`: закрывает панель по клику; оборачивает вашу собственную кнопку через `asChild`

## Ваша собственная разметка

- заголовок, чей `id` передаётся в `DrawerContent` как `aria-labelledby` (или `aria-label` на `DrawerContent`); у панели обязательно должно быть имя
- кнопки действий, которые дают ответ панели (Cancel, Confirm), внутри `<form method="dialog">`

## Порядок композиции

Типичная композиция:

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerContent` с вашим заголовком, необязательным `DrawerClose`, телом и `<form method="dialog">` для кнопок действий

## Варианты

- Положение — основной вариант панели на уровне исходного кода.
- Типичные продуктовые варианты — навигационная панель, панель фильтров и панель деталей.
- Затемнённая и прозрачная подложка (`overlay` на `DrawerContent`); панель в любом случае остаётся модальной.

## Миграция с 2.x

`DrawerHeader`, `DrawerTitle` и `DrawerCloseButton` удалены: библиотека оставляет только части с поведением, которое нельзя выразить обычной разметкой. `DrawerClose` — замена кнопки закрытия, содержащая только поведение.

- `DrawerHeader` → ваш собственный элемент раскладки, например flex-строка
- `DrawerTitle` → `Heading` с `id`, на который ссылается `aria-labelledby` на `DrawerContent`
- `DrawerCloseButton` → `DrawerClose asChild` вокруг вашей собственной кнопки, например `IconButton` с `aria-label`
- `useDrawerContext()` больше не возвращает `contentId` и `titleId`, а `DrawerTrigger` больше не устанавливает `aria-controls`

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

- Проверьте раскладку и анимацию для каждого положения.
- Узкие вьюпорты требуют дополнительной проверки на переполнение содержимого.
- Используйте панель, только когда сохранить контекст страницы важнее полной модальной изоляции.
- Если содержимое превращается в длинный многошаговый сценарий, отдельная страница с маршрутом или выделенный экран могут оказаться понятнее, чем постоянно растущая панель.

## Частые ошибки

- Оставлять `DrawerContent` без `aria-labelledby` или `aria-label`.
- Использовать панель там, где диалог был бы проще и сфокусированнее.
- Позволять содержимому панели превратиться в целую страницу внутри тесной боковой панели.
- Позволять кнопкам действий уезжать из поля зрения при длинном содержимом.
