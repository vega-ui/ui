# Drawer: анатомия

## Обзор

`Drawer` управляет состоянием открытия, положением и правилами закрытия для всех своих экспортируемых частей. `DrawerContent` — нативный модальный `<dialog>`, который отвечает за фокус, подложку и переходы.

## Обязательные части

### `Drawer`

Корневой провайдер состояния выдвижной панели (Drawer).

### `DrawerTrigger`

Действие, открывающее панель.

### `DrawerContent`

Основная панель, прикреплённая к краю экрана.

- Отвечает за нативный модальный `<dialog>`, его `::backdrop` и переходы открытия и закрытия
- Рендерится в `document.body`, поэтому отдельная часть-портал не нужна

## Необязательные части

### `DrawerClose`

Закрывает панель по клику.

- Обязательна: нет
- Рендерит `<button type="button">` без стилей, иконки и подписи; с `asChild` рендерит вашу собственную кнопку
- Вызывает `onChangeOpen(false)` до вашего `onClick`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить панель открытой
- Дайте кнопке закрытия только с иконкой `aria-label`

## Ваша собственная разметка

Библиотека не поставляет части для шапки и заголовка. У них нет поведения, которое нельзя выразить обычной разметкой, поэтому вы собираете их сами.

### Заголовок

Задаёт имя панели. Имя обязательно: сошлитесь на `id` заголовка через `aria-labelledby` на `DrawerContent` или задайте `aria-label` на `DrawerContent`.

### Кнопки действий

Кнопки, которые дают ответ панели, размещайте в `<form method="dialog">`: её отправка закрывает панель через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога. Для отдельной кнопки закрытия используйте `DrawerClose`.

## Порядок композиции

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerContent`
4. Ваш заголовок, необязательный `DrawerClose`, тело и `<form method="dialog">` с кнопками действий

## Допустимые варианты композиции

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

## Недопустимые варианты композиции

### `DrawerContent` вне `Drawer`

Ломает корневой контекст и поведение оверлея.

### Содержимое без имени

`DrawerContent` не задаёт себе имя сам. Без `aria-labelledby` или `aria-label` скринридеры объявляют безымянный диалог.

### Длинное содержимое панели без стратегии прокрутки

Действия или важное содержимое уходят за пределы экрана.

### Панель для полностью модального сценария подтверждения

Обычно это признак того, что лучше подойдёт `Dialog`.
