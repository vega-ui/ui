# Dialog: доступность

## Именование

`DialogContent` не задаёт себе имя сам. Назвать диалог — ваша задача, и это обязательно: диалог без имени недоступен, потому что скринридеры объявляют его просто как «диалог».

Рекомендуемый паттерн:

- видимый заголовок с `id`, на который ссылается `aria-labelledby` на `DialogContent`
- `aria-label` на `DialogContent`, если видимого заголовка нет
- `aria-describedby` на предложение, которое объясняет последствия, чтобы его объявили вместе с именем

<!-- example: dialog/confirm-action.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
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

export default function ConfirmAction() {
  const titleId = useId();
  const descriptionId = useId();
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 72,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {deleted ? (
        <>
          <Text size={3} role='status' style={{ color: 'var(--label-secondary)' }}>Q3 board deck.pdf moved to trash.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>Undo</Button>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>Q3 board deck.pdf</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>4.2 MB · Edited yesterday</Text>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Delete</Button>
            </DialogTrigger>
            <DialogContent
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClose={(event) => setDeleted(event.currentTarget.returnValue === 'delete')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete Q3 board deck.pdf?</Heading>
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
              <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                The file stays in trash for 30 days. Shared links stop working right away.
              </Text>
              <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
                <Button type='submit' value='delete' style={destructive}>Delete file</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Работа с клавиатурой

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Клавиша | Действие |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | На триггере: открывает диалог. Фокус получает сам диалог или дочерний элемент с `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Переносит фокус на следующий или предыдущий элемент управления внутри диалога. Страница за ним инертна, и фокус на неё не попадает. |
| <kbd>Escape</kbd> | Закрывает диалог и возвращает фокус на элемент, который его открыл. С `closedBy='none'` ничего не делает. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

Во вложенных диалогах `Escape` закрывает только верхний.

## Поведение фокуса

- при открытии фокус должен попадать в диалог
- при закрытии фокус должен возвращаться на осмысленный триггер
- в стеке вложенных диалогов восстановление фокуса должно оставаться предсказуемым

Управление фокусом обеспечивает нативный `<dialog>`: пока диалог открыт, остальная страница инертна, а при закрытии фокус возвращается на элемент, который был в фокусе до открытия. В Safari клик мышью не переводит фокус на кнопку, поэтому после закрытия диалога, открытого мышью, фокус возвращается на body страницы; при активации с клавиатуры он возвращается на триггер.

При открытии фокус получает сам диалог, поэтому ничего внутри не подсвечивается, а скринридеры объявляют его заголовок; `Tab` переводит фокус на первый контрол. Чтобы сфокусировать дочерний элемент, поставьте на него `autoFocus` — например, на первое поле формы.

## Семантика для скринридеров

- браузер представляет диалог как `role=dialog` с `aria-modal`, а имя он получает из вашего `aria-labelledby` или `aria-label`
- триггер выставляет `aria-haspopup='dialog'`
- содержимое должно восприниматься как единый модальный блок
- контролы закрытия должны оставаться явными, когда закрытие важно; у `DialogClose` нет метки по умолчанию, поэтому кнопке-иконке внутри него нужен `aria-label`; библиотека не поставляет встроенных строк

## Семантика формы

Если в диалоге есть поля, относитесь к нему как к обычной границе формы и перепроверяйте отправку с клавиатуры, закрытие и возврат фокуса в реальном сценарии.

Кнопки в `<form method="dialog">` закрывают диалог через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога — как у нативного `<dialog>`. Это работает и с `closedBy='none'`, когда `Escape` и подложка диалог не закрывают.

## Риски доступности

- открытие диалога без `aria-labelledby` или `aria-label`
- вложенные диалоги без повторной проверки восстановления фокуса
- длинное содержимое в диалоге без рабочей стратегии прокрутки
- закрытие важных сценариев только кликом снаружи
