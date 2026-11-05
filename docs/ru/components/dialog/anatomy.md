# Dialog: анатомия

## Обзор

`Dialog` — [составной компонент](../../glossary.md#составной-компонент-compound-component). Корень отвечает за состояние открытия, управление фокусом, поведение закрытия и модальную координацию всех экспортируемых дочерних частей.

## Обязательные части

### `Dialog`

Корневой провайдер состояния диалога.

- Обязателен: да
- Отвечает за: состояние открытия, закрытие, жизненный цикл фокуса
- Должен оборачивать все остальные части `Dialog*`

### `DialogTrigger`

Действие пользователя, открывающее диалог.

- Обязателен: в обычных продуктовых сценариях фактически да
- Типичное использование: `asChild` с `Button`
- Должен оставаться внутри `Dialog`

### `DialogContent`

Основная модальная поверхность.

- Обязателен: да
- Отвечает за: нативный модальный `<dialog>`, его `::backdrop`, переходы открытия и закрытия
- Рендерится в `document.body`, поэтому отдельная часть-портал не нужна

## Необязательные части

### `DialogClose`

Закрывает диалог по клику.

- Обязателен: нет
- Рендерит `<button type="button">` без стилей, иконки и метки; с `asChild` рендерит вашу собственную кнопку
- Вызывает `onChangeOpen(false)` до вашего `onClick`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить диалог открытым
- Дайте кнопке закрытия из одной иконки `aria-label`

## Ваша собственная разметка

Библиотека не поставляет части для шапки и заголовка. У них нет поведения, которое нельзя выразить обычной разметкой, поэтому вы собираете их сами.

### Заголовок

Задаёт имя диалога.

- Обязателен: имя обязательно — либо заголовок, на который ссылается `aria-labelledby` на `DialogContent`, либо `aria-label` на `DialogContent`
- Типичное использование: `Heading` с `id`

### Кнопки действий

Кнопки, которые отвечают на диалог, например «Отмена» и «Подтвердить».

- Поместите их в `<form method="dialog">`; её отправка закрывает диалог через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога
- Для отдельной кнопки закрытия, например крестика в шапке, используйте `DialogClose`

## Порядок композиции

Типичная композиция:

1. `Dialog`
2. `DialogTrigger`
3. `DialogContent`
4. Ваш заголовок, необязательный `DialogClose`, основное содержимое и `<form method="dialog">` с кнопками действий

## Корректные варианты композиции

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

Это надёжная композиция по умолчанию для модальных сценариев в продакшене.

## Некорректные варианты композиции

### `DialogContent` вне `Dialog`

Дочерние части зависят от контекста корня. Если рендерить их вне `Dialog`, поведение ломается.

### Содержимое без имени

`DialogContent` не задаёт себе имя сам. Без `aria-labelledby`, указывающего на ваш заголовок, или без `aria-label` скринридеры объявят безымянный диалог.

### Вложенные диалоги без повторной проверки фокуса

Вложенные стеки оверлеев допустимы, но их нужно рассматривать как пограничный случай интеграции, а не считать, что они работают, только потому что компонент прошёл изолированное тестирование.
