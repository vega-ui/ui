# Sheet: API

## Пропсы корня


<!-- AUTO-GENERATED:ROOT_API:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `snapPoints` | ``Array<`${number}px` \| number>`` | — | Нет | Высоты, на которых останавливается шторка, как детенты нативной шторки: доля высоты области просмотра (`0.5`) или высота в пикселях (`'200px'`). Шторка подстраивается под содержимое, если у `SheetContent` нет CSS-высоты, а точка привязки выше её высоты останавливается на её верхнем краю. Без точек привязки шторка открывается полностью. |
| `activeSnapPoint` | `number` | — | Нет | Текущая активная точка привязки (контролируемо) — индекс в `snapPoints`. |
| `defaultSnapPoint` | `number` | — | Нет | Точка привязки, в которой открывается шторка в неконтролируемом режиме, — индекс в `snapPoints`. По умолчанию — самая нижняя. |
| `onChangeActiveSnapPoint` | `(activeSnapPoint: number) => void` | — | Нет | Колбэк, вызываемый, когда пользователь перемещает шторку к другой точке привязки. |
| `steppedSnapPoints` | `boolean` | `false` | Нет | Перемещает не больше чем на одну точку привязки за одно перетаскивание, как бы далеко или быстро оно ни было. |
| `defaultOpen` | `boolean` | `false` | Нет | Определяет, открыта ли шторка изначально (неконтролируемо). |
| `open` | `boolean` | — | Нет | Управляет тем, открыта ли шторка сейчас (контролируемо). |
| `onChangeOpen` | `(value: boolean) => void` | — | Нет | Колбэк, вызываемый при изменении состояния открытия. |
| `children` | `ReactNode \| ReactNode[]` | — | Нет | Содержимое, рендерящееся внутри шторки. Может включать любые элементы раскладки или формы. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Дочерние части

## `SheetTrigger`

Действие открытия шторки. Выставляет `aria-haspopup="dialog"`.

<!-- AUTO-GENERATED:PART_API:SheetTrigger:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Нет | Если true, рендерит триггер как собственный элемент через Slot. Позволяет гибко компоновать с собственными элементами вроде `<a>`, `<div>` или кнопок-иконок. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нижележащий элемент триггера. Полезен для управления фокусом или внешнего управления. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:SheetTrigger:end -->

## `SheetContent`

Нативный модальный `<dialog>`.

<!-- AUTO-GENERATED:PART_API:SheetContent:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDialogElement>` | — | Нет | Ref, передаваемый на нативный элемент `<dialog>`. Полезен для управления фокусом, измерений или хуков анимации. |
| `shadowed` | `boolean` | — | Нет | Добавляет панели шторки тень. Создаёт глубину и отделяет её от фона. |
| `blurred` | `boolean` | `false` | Нет | Размывает страницу за шторкой. |
| `overlay` | `boolean` | `true` | Нет | Затемняет страницу за шторкой. При false страница остаётся видимой, а шторка — модальной. |
| `closedBy` | `ModalDialogClosedBy` | `'any'` | Нет | Какие действия пользователя закрывают шторку, как нативный атрибут `closedby`: `any` — клик по подложке, свайп вниз или `Escape`, `closerequest` — только `Escape`, `none` — ничего из этого. |
| `container` | `Element \| DocumentFragment \| null` | `document.body` | Нет | Элемент, в который порталится sheet. |

Также принимает все атрибуты `<dialog>`.
<!-- AUTO-GENERATED:PART_API:SheetContent:end -->

- Сам не выставляет `id` и `aria-labelledby`: назовите его через `aria-labelledby`, указывающий на `id` вашего заголовка, или через `aria-label`. `onCancel` и `onClose` выполняются после внутренних обработчиков. `ref` указывает на элемент `<dialog>`.
- `blurred` (по умолчанию `false`) размывает страницу за шторкой.
- `overlay` (по умолчанию `true`) затемняет страницу; `false` делает `::backdrop` прозрачным, при этом шторка остаётся модальной.
- `shadowed` добавляет тень поверхности.
- Имеет горизонтальные отступы (`clamp(var(--spacing-12), 3vw, var(--spacing-16))`) и нижний отступ (`var(--spacing-12)` плюс отступ безопасной зоны). Прокручиваемая область внутри — элемент с `overflow: auto`.
- Закрывается при отправке `<form method="dialog">` внутри неё, в том числе с `closedBy='none'`. Закрытие идёт через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога.
- `closedBy` задаёт, какие действия пользователя закрывают шторку, как нативный атрибут `closedby`: `'any'` (клик по подложке, свайп вниз или `Escape`, по умолчанию), `'closerequest'` (только `Escape`) или `'none'`. Используйте `closedBy='none'` для шторки, которую нельзя закрыть.
- Перетаскивание следует за пальцем, сопротивляется за верхней и нижней точками привязки и останавливается на той точке, куда донесла бы инерция, поэтому резкий взмах может проскочить точку привязки. С `closedBy='any'` перетаскивание вниз ниже самой нижней точки привязки закрывает шторку.
- Остаётся смонтированной, только пока открыта и пока идёт переход закрытия.

## `SheetHandle`

Ручка в верхней части шторки. Это всегда `<button>` без собственного имени, поэтому передайте `aria-label`, например `Resize sheet`. Если у шторки несколько точек привязки, ручка перемещает её на следующую точку, а с верхней — обратно на самую нижнюю. Иначе она `disabled` и `aria-hidden`.

<!-- AUTO-GENERATED:PART_API:SheetHandle:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на `<button>` ручки. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:SheetHandle:end -->

## `SheetClose`

Закрывает шторку по клику. У неё нет стилей, иконки и `aria-label` по умолчанию: отрендерите внутри свою кнопку через `asChild` и подпишите её.

<!-- AUTO-GENERATED:PART_API:SheetClose:start -->
| Проп | Тип | По умолчанию | Обязательный | Описание |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Нет | Если true, рендерит действие закрытия как дочерний элемент через `Slot`, поэтому любая ваша кнопка закрывает шторку. |
| `ref` | `Ref<HTMLButtonElement>` | — | Нет | Ref, передаваемый на нижележащую кнопку. |

Также принимает все атрибуты `<button>`.
<!-- AUTO-GENERATED:PART_API:SheetClose:end -->

- Закрытие идёт через `onChangeOpen(false)`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить шторку открытой.
- Используйте её для отдельной кнопки закрытия, например крестика в шапке. Для кнопок, которые отвечают на шторку (Cancel, Confirm, `returnValue`), используйте `<form method="dialog">`. она ставит `type="button"`, и с `asChild` тоже, поэтому работает и внутри вашей собственной формы, не отправляя её; чтобы кнопка отправляла форму, передайте ей `type="submit"`.

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

## Типы

- `SheetProps`
- `SheetContentProps`
- `SheetCloseProps`
- `SheetTriggerProps`
- `SheetHandleProps`

## Модель состояния

- Состояние открытия может быть контролируемым через `open` или неконтролируемым через `defaultOpen`.
- Каждый запрос на закрытие (клик по подложке, `Escape`, свайп, клик по `SheetClose`, отправка `<form method="dialog">`) идёт через `onChangeOpen(false)`; контролируемая шторка остаётся открытой, пока `open` не станет `false`. Закрытие, которое браузер делает не спрашивая, например вызов `close()` на элементе или принудительное закрытие после повторного `Escape`, окончательное: шторка остаётся закрытой, пока `open` не изменится.
- Пока шторка открыта, прокрутка страницы блокируется через CSS (`html:has(dialog:modal) { overflow: hidden }`), как у `Dialog` и `Drawer`.
- Точки привязки влияют на видимую модель взаимодействия, а не только на раскладку.
- Шторка подстраивается под содержимое вплоть до высоты вьюпорта. Задайте CSS-высоту на `SheetContent` (`style={{ height: '80dvh' }}` или класс), чтобы сделать высоту фиксированной. Точки привязки — доли высоты вьюпорта или высоты в пикселях, и точка выше высоты шторки останавливается у её верха, так что с коротким содержимым шторка остаётся по размеру содержимого. Без `snapPoints` шторка останавливается полностью открытой.
- `defaultSnapPoint`, `activeSnapPoint` и значение `onChangeActiveSnapPoint` — индексы в `snapPoints` в том порядке, в котором вы их передали, независимо от визуального порядка.
- Шторка открывается на самой нижней точке привязки, если `defaultSnapPoint` не говорит иначе, и неконтролируемая шторка снова открывается там же.
- `onChangeActiveSnapPoint` срабатывает, только когда пользователь перемещает шторку на другую точку привязки.
- `steppedSnapPoints` перемещает шторку не больше чем на одну точку привязки за перетаскивание и сопротивляется движению дальше.
- Взмах проносит шторку через точки привязки дальше, чем к закрытию: лёгкий взмах вниз с самой нижней точки оставляет её открытой, а взмах с более высокой точки останавливает её на точке привязки.
- `closedBy='none'` на `SheetContent` стоит оставлять для сценариев с понятным путём завершения.
- `useSheetContext` доступен для продвинутых обёрток и контролов. Он возвращает `{ open, changeOpen, contentRef, height, viewport, offsets, activeSnapPoint, changeActiveSnapPoint, steppedSnapPoints }` и больше не предоставляет `contentId`, `context` из floating-ui, `triggerProps`, `contentProps`, `transitionStatus` и `isMounted`.
