# Sheet: доступность

## Именование

`SheetContent` не называет себя сам. Назвать шторку — ваша задача, и это обязательно: шторка без имени недоступна, потому что скринридеры объявляют её только как «dialog». Сошлитесь на видимый заголовок через `aria-labelledby` на `SheetContent` или задайте `aria-label`, если видимого заголовка нет. Незакрываемые шторки должны объяснять, зачем пользователь оказался в этом сценарии и как его завершить.

<!-- example: sheet/sheet-with-heading-and-close-button.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
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
import { CopyIcon, MailIcon, MessageCircleIcon, XIcon } from '@vega-ui/icons';

const link = 'https://maps.example.com/p/blue-harbor-cafe';

export default function SheetWithHeadingAndCloseButton() {
  const titleId = useId();
  const descriptionId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Sheet onChangeOpen={() => setCopied(false)}>
      <SheetTrigger asChild>
        <Button>Share place</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share Blue Harbor Cafe</Heading>
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
        <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>12 Quay Street · Open until 22:00</Text>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} onClick={copy}>
            <Icon size='sm'><CopyIcon /></Icon>
            Copy link
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`mailto:?subject=Blue%20Harbor%20Cafe&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MailIcon /></Icon>
              Send by email
            </a>
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`sms:?&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MessageCircleIcon /></Icon>
              Send as message
            </a>
          </Button>
        </div>
        <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{copied ? 'The link is on your clipboard.' : ''}</Text>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Поведение клавиатуры

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Клавиша | Действие |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | На триггере: открывает шторку. Фокус получает сама шторка или дочерний элемент с `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Переносит фокус на следующий или предыдущий элемент управления внутри шторки. Страница за ней инертна, и фокус на неё не попадает. `SheetHandle` без нескольких точек остановки отключён и пропускается. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | На `SheetHandle` с несколькими точками остановки: переводит шторку в следующую, более высокую точку, а из самой высокой — обратно в самую низкую. |
| <kbd>Escape</kbd> | Закрывает шторку и возвращает фокус на элемент, который её открыл. С `closedBy='none'` ничего не делает. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

`SheetHandle` — всегда `<button>` без собственного имени: дайте его через `aria-label`, например `Resize sheet`. Без нескольких точек привязки она `disabled` и `aria-hidden`, поэтому не объявляется, но шторку за неё всё ещё можно перетаскивать.

## Поведение фокуса

- При открытии фокус должен переходить в шторку.
- При закрытии фокус должен разумно восстанавливаться.

Работа с фокусом обеспечивается нативным `<dialog>`: пока шторка открыта, остальная страница инертна, `Tab` остаётся внутри шторки (но может дойти до интерфейса браузера), а закрытие возвращает фокус на элемент, который был в фокусе до открытия.

При открытии фокус получает сама шторка, поэтому внутри ничего не подсвечено, а скринридеры объявляют её заголовок; `Tab` переходит к первому контролу. Поставьте `autoFocus` на дочерний элемент, чтобы фокусировать его, — например, на первое поле формы.

## Семантика для скринридеров

- Браузер предоставляет шторку как `role=dialog` с `aria-modal`, а имя ей дают ваши `aria-labelledby` или `aria-label`.
- Триггер предоставляет `aria-haspopup='dialog'`.
- У `SheetClose` нет метки по умолчанию, поэтому кнопке только с иконкой внутри неё нужен `aria-label`; встроенных строк библиотека не поставляет.
- Шторка должна восприниматься как одна цельная поверхность оверлея.
- Незакрываемым шторкам нужна особенно понятная цель.

## Семантика формы

- Если в шторке есть форма, обязательные поля и сообщения об ошибках должны оставаться видимыми на каждой точке привязки.
- Раскладка, удобная для жестов, не должна скрывать настоящую семантику отправки и закрытия.
- Кнопки в `<form method="dialog">` закрывают шторку через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога. Это работает и с `closedBy='none'`, так что у незакрываемой шторки всё равно есть путь завершения.

## Риски доступности

- Шторка без `aria-labelledby` или `aria-label`.
- Опора только на понимание жестов.
- Точки привязки, при которых частично видимое содержимое становится непригодным.
- Незакрываемые сценарии без понятного пути завершения.
