# Dialog

## Профиль документа

`advanced interactive`

## Кратко

`Dialog` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для модальных оверлеев с частями корня, триггера и содержимого. `DialogClose` превращает вашу собственную кнопку в кнопку закрытия; заголовки и раскладка — обычная разметка, которую вы собираете сами. `DialogContent` рендерит нативный `<dialog>`, открытый через `showModal()`, поэтому браузер помещает его в верхний слой (top layer), делает остальную страницу инертной и рисует подложку. Это самый сильный оверлей общего назначения в семействе; выбирайте его, когда модальное прерывание задумано намеренно.

## Импорты

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  type DialogProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DialogProps`
- `DialogTriggerProps`
- `DialogContentProps`
- `DialogCloseProps`

## Минимальная композиция

<!-- example: dialog/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Leave workspace</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Leave Northwind Studio?</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          You will lose access to 14 projects until an admin invites you again.
        </Text>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Stay</Button>
          <Button type='submit' value='leave' style={destructive}>Leave workspace</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Обязательные части

- `Dialog`: корневое состояние и провайдер контекста
- `DialogTrigger`: поверхность действия открытия
- `DialogContent`: контейнер модального содержимого

## Необязательные части

- `DialogClose`: закрывает диалог по клику; оборачивает вашу собственную кнопку через `asChild`

## Ваша собственная разметка

- заголовок, чей `id` передаётся в `DialogContent` как `aria-labelledby` (или `aria-label` на `DialogContent`); у диалога обязательно должно быть имя
- кнопки действий, отвечающие на диалог («Отмена», «Подтвердить»), внутри `<form method="dialog">`

## Порядок композиции

Типичная композиция:

1. `Dialog`
2. `DialogTrigger`
3. `DialogContent` с вашим заголовком, необязательным `DialogClose`, основным содержимым и `<form method="dialog">` для кнопок действий

## Варианты

- Контролируемое состояние открытия или управление через триггер
- Минимальный диалог только с содержимым или диалог со строкой шапки и кнопкой закрытия
- Диалог с фиксированным содержимым или с прокручиваемым либо резиновым содержимым

## Миграция с 2.x

`DialogHeader`, `DialogTitle` и `DialogCloseButton` удалены: библиотека оставляет только части с поведением, которое нельзя выразить обычной разметкой. `DialogClose` — замена кнопки закрытия, отвечающая только за поведение.

- `DialogHeader` → ваш собственный элемент раскладки, например flex-строка
- `DialogTitle` → `Heading` с `id`, на который ссылается `aria-labelledby` на `DialogContent`
- `DialogCloseButton` → `DialogClose asChild` вокруг вашей собственной кнопки, например `IconButton` с `aria-label`
- `useDialogContext()` больше не возвращает `contentId` и `titleId`, а `DialogTrigger` больше не выставляет `aria-controls`

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

- Вложенные оверлеи нужно проверять на восстановление фокуса и порядок наложения.
- Длинное содержимое должно прокручиваться, не скрывая основные действия.
- Диалог должен быть назван через `aria-labelledby` или `aria-label`.
- Делайте поведение закрытия явным, если в диалоге есть формы или необратимые действия.
- Если содержимое начинает выглядеть как полноценный сценарий на целую страницу, выдвижная панель (Drawer), шторка (Sheet) или отдельный маршрут могут оказаться понятнее большого диалога.

## Частые ошибки

- Оставлять `DialogContent` без `aria-labelledby` или `aria-label`.
- Помещать критичное содержимое страницы в диалог без удобной мобильной раскладки.
- Не проверять поведение диалога внутри других оверлеев.
- Считать длинное содержимое диалога статичным, не проверив прокрутку и видимость действий.
