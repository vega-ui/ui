# Dialog: API

## API корня

`Dialog` — корневой контейнер состояния для модального поведения.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | — | Нет | Открыто ли модальное окно сейчас. Если задан, модальное окно становится контролируемым компонентом. |
| `defaultOpen` | `boolean` | `false` | Нет | Открыто ли модальное окно по умолчанию. |
| `onChangeOpen` | `(state: boolean) => void` | — | Нет | Колбэк, вызываемый при изменении состояния открытия модального окна. Получает следующее состояние в виде boolean. |
| `children` | `ReactNode \| ReactNode[]` | — | Нет | Содержимое, рендерящееся внутри диалога. Может включать заголовки, текст, действия и вложенные компоненты. |
| `fluid` | `boolean` | — | Нет | Делает диалог резиновым, позволяя ему адаптивно растягиваться в контейнере. Полезно для адаптации к разным размерам экрана и раскладкам. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## API дочерних частей

## `DialogTrigger`

Действие, открывающее диалог.

<!-- AUTO-GENERATED:PART_API:DialogTrigger:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Если true, рендерит триггер как дочерний элемент через `Slot`. Позволяет собственным элементам-обёрткам (например, `<a>`, `<div>`) работать как триггеры модального окна. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нижележащий элемент триггера (обычно `<button>`). Полезен для управления фокусом или императивного доступа. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:DialogTrigger:end -->

- Типичное использование: `asChild` с `Button`
- Должен оставаться внутри `Dialog`
- Выставляет `aria-haspopup='dialog'` и `aria-expanded`

## `DialogContent`

Нативный модальный `<dialog>`.

<!-- AUTO-GENERATED:PART_API:DialogContent:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `shadowed` | `boolean` | `true` | Нет | Добавляет панели диалога тень. Создаёт глубину и отделяет её от фона. |
| `blurred` | `boolean` | `true` | Нет | Размывает страницу за диалогом. |
| `overlay` | `boolean` | `true` | Нет | Затемняет страницу за диалогом. При false страница остаётся видимой, а диалог — модальным. |
| `closedBy` | `ModalDialogClosedBy` | `'closerequest'` | Нет | Какие действия пользователя закрывают диалог, как нативный атрибут `closedby`: `any` — клик по подложке или `Escape`, `closerequest` — только `Escape`, `none` — ни то, ни другое. |
| `ref` | `Ref<HTMLDialogElement>` | — | Нет | Ref, передаваемый на нативный элемент `<dialog>`. Полезен для управления фокусом, анимациями или измерений. |
| `children` | `ReactNode` | — | Нет | Дочерние узлы для рендера внутри диалога. |

Также принимает все атрибуты `<dialog>`.
<!-- AUTO-GENERATED:PART_API:DialogContent:end -->

- Сам не задаёт ни `id`, ни `aria-labelledby`: назовите его через `aria-labelledby`, указывающий на `id` вашего заголовка, или через `aria-label`. `onCancel` и `onClose` выполняются после внутренних обработчиков.
- `blurred` (по умолчанию `true`) размывает страницу за диалогом; `overlay` (по умолчанию `true`) затемняет её, а с `overlay={false}` диалог остаётся модальным над прозрачной подложкой; `shadowed` (по умолчанию `true`) добавляет поверхности тень.
- `closedBy` задаёт, какие действия пользователя закрывают диалог, как нативный атрибут `closedby`: `'any'` (клик по подложке или `Escape`), `'closerequest'` (только `Escape`, по умолчанию) или `'none'`. Клик по подложке не закрывает диалог, если не задан `closedBy='any'`.
- Закрывается при отправке `<form method="dialog">` внутри него, в том числе с `closedBy='none'`. Закрытие проходит через `onChangeOpen(false)`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить диалог открытым; `value` кнопки отправки становится `returnValue` диалога.
- Остаётся смонтированным, только пока открыт и пока проигрывается переход закрытия.

## `DialogClose`

Закрывает диалог по клику. У него нет стилей, иконки и `aria-label` по умолчанию: отрендерите внутри свою кнопку через `asChild` и задайте ей метку.

<!-- AUTO-GENERATED:PART_API:DialogClose:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Если true, рендерит действие закрытия как дочерний элемент через `Slot`, поэтому любая ваша кнопка закрывает диалог. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нижележащую кнопку. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:DialogClose:end -->

- Закрытие проходит через `onChangeOpen(false)`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить диалог открытым.
- Используйте его для отдельной кнопки закрытия, например крестика в шапке. Для кнопок, которые отвечают на диалог («Отмена», «Подтвердить», `returnValue`), используйте `<form method="dialog">`. Без `asChild` он рендерит `type="button"`, поэтому работает и внутри вашей собственной формы, не отправляя её; с `asChild` задайте своей кнопке `type="button"`.
- Ваш `onClick` срабатывает после запроса на закрытие, поэтому в нём можно запомнить, какой кнопкой закрыли диалог.

<!-- example: dialog/close-with-handler.tsx -->
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

export default function CloseWithHandler() {
  const titleId = useId();
  const [reminder, setReminder] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>What’s new in 3.0</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>What’s new in 3.0</Heading>
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
            Overlays now use the native dialog and popover elements, and the sheet follows your finger without re-rendering.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild onClick={() => setReminder('We will remind you tomorrow.')}>
              <Button variant='secondary' appearance='ghost'>Remind me later</Button>
            </DialogClose>
            <DialogClose asChild onClick={() => setReminder('')}>
              <Button>Got it</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{reminder}</Text>
    </div>
  );
}
```
<!-- /example -->

## Хуки

## `useDialogContext`

Продвинутый хук для кастомных обёрток и действий закрытия. Возвращает `{ open, changeOpen, fluid }`.

Используйте его, только если экспортируемых частей недостаточно для нужной композиции.

## Типы

| Тип | Определение | Примечания |
| --- | --- | --- |
| `DialogProps` | Тип пропсов корня | Здесь находится API состояния открытия. |
| `DialogTriggerProps` | Тип пропсов триггера | Контракт композиции триггера. |
| `DialogContentProps` | Тип пропсов содержимого | Пропсы контейнера содержимого. |
| `DialogCloseProps` | Тип пропсов части закрытия | Атрибуты `<button>` плюс `asChild`. |

## Модель состояния

- Состояние открытия может быть контролируемым через `open` или неконтролируемым через `defaultOpen`.
- `DialogTrigger` — обычный способ открытия в неконтролируемом режиме.
- Каждый запрос на закрытие, разрешённый `closedBy` (клик по подложке, `Escape`), каждый клик по `DialogClose` и каждая отправка `<form method="dialog">` проходят через `onChangeOpen(false)`; контролируемый диалог остаётся открытым, пока `open` не станет `false`.
- Если браузер сам закрывает диалог, а `open` всё ещё `true`, диалог открывается снова.

## Замечания по интеграции

- Называйте каждый диалог через `aria-labelledby` или `aria-label` на `DialogContent`.
- Чтобы закрыть диалог изнутри, используйте `DialogClose` для отдельной кнопки закрытия, кнопки в `<form method="dialog">` для действий, отвечающих на диалог, или контролируемый `open` и кнопку, вызывающую `setOpen(false)`.
- Перепроверяйте вложенные оверлеи в реальной композиции, а не только изолированно.
- Делайте длинное содержимое прокручиваемым, чтобы закрытие и действия оставались доступными.
