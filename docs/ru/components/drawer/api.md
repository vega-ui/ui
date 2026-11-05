# Drawer: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `defaultOpen` | `boolean` | `false` | Нет | Определяет, открыта ли выдвижная панель по умолчанию. |
| `open` | `boolean` | — | Нет | Управляет тем, открыта ли выдвижная панель. Если задан, компонент становится контролируемым. |
| `onChangeOpen` | `(value: boolean) => void` | — | Нет | Колбэк, вызываемый при изменении состояния открытия выдвижной панели. Получает новое состояние в виде boolean. |
| `position` | `DrawerPosition` | `'end'` | Нет | Определяет, с какой стороны экрана появляется выдвижная панель. `start` и `end` следуют направлению письма, как логические CSS-свойства: в тексте справа налево `end` — это левая сторона. |
| `children` | `ReactNode` | — | Нет | Содержимое для отображения внутри выдвижной панели. Обычно включает навигацию, настройки или формы. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

## `DrawerTrigger`

Действие, открывающее выдвижную панель (Drawer). Устанавливает `aria-haspopup="dialog"` и `aria-expanded`.

<!-- AUTO-GENERATED:PART_API:DrawerTrigger:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Если true, рендерит триггер как дочерний элемент через `Slot`. Это позволяет собственным обёрткам (например, `<a>`, `<div>`) наследовать поведение открытия выдвижной панели. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нативную кнопку или элемент в слоте. Полезен для управления фокусом или интеграций. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:DrawerTrigger:end -->

## `DrawerContent`

Нативный модальный `<dialog>`, расположение которого задаёт `position` корня.

<!-- AUTO-GENERATED:PART_API:DrawerContent:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDialogElement>` | — | Нет | Ref, передаваемый на нативный элемент `<dialog>`. Полезен для измерений, фокуса или хуков анимации. |
| `shadowed` | `boolean` | — | Нет | Добавляет выдвижной панели тень для глубины и отделения от фона. |
| `blurred` | `boolean` | `true` | Нет | Размывает страницу за выдвижной панелью. |
| `overlay` | `boolean` | `true` | Нет | Затемняет страницу за выдвижной панелью. При false страница остаётся видимой, а панель — модальной. |
| `closedBy` | `ModalDialogClosedBy` | `'any'` | Нет | Какие действия пользователя закрывают выдвижную панель, как нативный атрибут `closedby`: `any` — клик по подложке, свайп к её краю или `Escape`, `closerequest` — только `Escape`, `none` — ничего из этого. |
| `fullWidth` | `boolean` | — | Нет | Растягивает выдвижную панель на всю ширину родительского контейнера. |
| `fullHeight` | `boolean` | — | Нет | Растягивает выдвижную панель на всю высоту родительского контейнера. |

Также принимает все атрибуты `<dialog>`.
<!-- AUTO-GENERATED:PART_API:DrawerContent:end -->

- Сам не задаёт `id` или `aria-labelledby`: дайте ему имя через `aria-labelledby`, указывающий на `id` вашего заголовка, или через `aria-label`. `onCancel` и `onClose` вызываются после внутренних обработчиков. `ref` указывает на элемент `<dialog>`.
- `blurred` (по умолчанию `true`) размывает страницу за панелью.
- `overlay` (по умолчанию `true`) затемняет страницу; `false` делает `::backdrop` прозрачным, но панель остаётся модальной.
- `shadowed` добавляет тень поверхности; `fullWidth` и `fullHeight` растягивают панель.
- `closedBy` задаёт, какие действия пользователя закрывают панель, как нативный атрибут `closedby`: `'any'` (клик по подложке, свайп пальцем к её краю или `Escape`, значение по умолчанию), `'closerequest'` (только `Escape`) или `'none'`.
- Закрывается при отправке `<form method="dialog">` внутри неё, в том числе с `closedBy='none'`. Закрытие проходит через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога.
- С `closedBy='any'` свайп пальцем к краю панели перетаскивает её и закрывает, если она сдвинута больше чем на половину своего размера или после резкого взмаха. Перетаскивание мышью оставлено для выделения текста.
- Остаётся смонтированной, только пока открыта и пока проигрывается переход закрытия.

## `DrawerClose`

Закрывает панель по клику. У него нет стилей, иконки и `aria-label` по умолчанию: отрендерите внутри свою кнопку через `asChild` и подпишите её.

<!-- AUTO-GENERATED:PART_API:DrawerClose:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | Нет | Если true, рендерит действие закрытия как дочерний элемент через `Slot`, поэтому любая ваша кнопка закрывает выдвижную панель. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нижележащую кнопку. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:DrawerClose:end -->

- Закрытие проходит через `onChangeOpen(false)`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить панель открытой.
- Используйте его для отдельной кнопки закрытия, например крестика в шапке. Для кнопок, которые дают ответ панели (Cancel, Confirm, `returnValue`), используйте `<form method="dialog">`. Без `asChild` он рендерит `type="button"`, поэтому работает и внутри вашей собственной формы, не отправляя её; с `asChild` задайте своей кнопке `type="button"`.

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

## Хуки

## `useDrawerContext`

Возвращает `{ open, changeOpen, position }` для продвинутых обёрток и собственных элементов управления.

## Типы

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerContentProps`
- `DrawerCloseProps`

## Модель состояния

- Состояние открытия может быть контролируемым через `open` или неконтролируемым через `defaultOpen`.
- Любой запрос на закрытие (клик по подложке, свайп, `Escape`, клик по `DrawerClose`, отправка `<form method="dialog">`) проходит через `onChangeOpen(false)`; контролируемая панель остаётся открытой, пока `open` не станет `false`.
- `closedBy='none'` на `DrawerContent` отключает закрытие кликом по подложке, свайпом и `Escape`; закрывайте её кнопкой в `<form method="dialog">` или изменением `open`.
- `position` использует логические стороны, которые следуют направлению письма: `'top-start'`, `'top'`, `'top-end'`, `'end-start'`, `'end'`, `'end-end'`, `'bottom-start'`, `'bottom'`, `'bottom-end'`, `'start-start'`, `'start'`, `'start-end'`. В тексте справа налево `end` — это левая сторона.
- Пока панель открыта, прокрутка страницы заблокирована.
- Панель всегда модальная; `overlay={false}` только убирает затемнение.
