# Drawer: доступность

## Подписи

`DrawerContent` не задаёт себе имя сам. Дать имя выдвижной панели (Drawer) — ваша задача, и это обязательно: панель без имени недоступна, потому что скринридеры объявляют её просто как «dialog».

- Сошлитесь на видимый заголовок через `aria-labelledby` на `DrawerContent` или задайте `aria-label`, если видимого заголовка нет.
- Если панель отвечает за конкретную задачу, заголовок должен прямо её описывать.

<!-- example: drawer/side-inspector.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Badge,
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

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Items', value: '3 × Sensor kit, 1 × Charging dock' },
  { term: 'Total', value: '$1,284.00' },
  { term: 'Ship to', value: '41 Harbour Road, Bristol BS1 5TY' },
];

export default function SideInspector() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div style={{ marginBlockStart: 'var(--spacing-4)' }}>
          <Badge variant='warning' size='sm'>Awaiting payment</Badge>
        </div>
        <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
          {details.map((detail) => (
            <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
              <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
            </div>
          ))}
        </dl>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Поведение клавиатуры

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Клавиша | Действие |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | На триггере: открывает панель. Фокус получает сама панель или дочерний элемент с `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Переносит фокус на следующий или предыдущий элемент управления внутри панели. Страница за ней инертна, и фокус на неё не попадает. |
| <kbd>Escape</kbd> | Закрывает панель и возвращает фокус на элемент, который её открыл. С `closedBy='none'` ничего не делает. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

Во вложенных панелях `Escape` закрывает только верхнюю.

## Поведение фокуса

- При открытии фокус должен переходить внутрь панели.
- При закрытии фокус должен разумно возвращаться на исходный триггер или равнозначное действие.
- Стеки вложенных панелей требуют настоящего интеграционного тестирования, а не изолированных допущений.

Управление фокусом обеспечивает нативный `<dialog>`: пока панель открыта, остальная страница инертна, `Tab` остаётся внутри панели (но может попасть в интерфейс браузера), а при закрытии фокус возвращается на элемент, который был в фокусе до открытия.

При открытии фокус получает сама панель, поэтому ничего внутри не подсвечивается, а скринридеры объявляют её заголовок; `Tab` переводит фокус на первый элемент управления. Чтобы сфокусировать дочерний элемент, например первое поле формы, задайте ему `autoFocus`.

## Семантика для скринридеров

- Браузер предоставляет панель как `role=dialog` с `aria-modal`, а имя она получает из вашего `aria-labelledby` или `aria-label`.
- Триггер предоставляет `aria-haspopup='dialog'`.
- У `DrawerClose` нет подписи по умолчанию, поэтому кнопке только с иконкой внутри него нужен `aria-label`; встроенных строк в библиотеке нет.
- Назначение панели должно быть понятным.
- Длинные панели всё равно должны восприниматься как одна цельная задача в оверлее, а не как оторванный фрагмент страницы.

## Семантика форм

- Панели часто содержат формы, но семантика формы принадлежит элементам управления внутри панели.
- Состояния ошибок и обязательные поля должны оставаться видимыми, даже когда панель прокручивается.
- Кнопки в `<form method="dialog">` закрывают панель через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога. Это работает и с `closedBy='none'`.

## Риски доступности

- Панель без `aria-labelledby` или `aria-label`.
- Длинное содержимое без понятной возможности прокрутки.
- Вложенные оверлеи без повторной проверки возврата фокуса.
