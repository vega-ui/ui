# Sheet: анатомия

## Обзор

`Sheet` владеет состоянием открытия, поведением закрытия и координацией панели между экспортируемыми частями. Это [составной компонент](../../glossary.md#составной-компонент-compound-component), потому что корень и дочерние части разделяют одну модель взаимодействия.

## Обязательные части

### `Sheet`

Обязательная. Владеет состоянием открытия и жизненным циклом взаимодействия.

### `SheetTrigger`

Обязательна для сценариев с триггером. Открывает шторку из кнопки или другой поверхности действия.

### `SheetContent`

Обязательная. Рендерит видимую поверхность панели.

- Владеет: нативным модальным `<dialog>`, его `::backdrop`, жестами перетаскивания и переходами открытия и закрытия
- Рендерится в `document.body`, поэтому часть-портал не нужна

## Необязательные части

### `SheetHandle`

Необязательный элемент для перетаскивания, особенно полезный для мобильных шторок. При нескольких точках привязки это кнопка, которая перемещает шторку на следующую точку; иначе она скрыта от вспомогательных технологий.

### `SheetClose`

Закрывает шторку по клику.

- Обязательна: нет
- Рендерит `<button type="button">` без стилей, иконки и метки; с `asChild` вместо этого рендерит вашу собственную кнопку
- Вызывает `onChangeOpen(false)` до вашего `onClick`, поэтому проигрывается переход закрытия, а контролирующий родитель может оставить шторку открытой
- Дайте кнопке закрытия только с иконкой `aria-label`

## Ваша собственная разметка

Библиотека не поставляет части для шапки и тела. У них нет поведения, которое нельзя выразить обычной разметкой, поэтому вы собираете их сами. Горизонтальные и нижний отступы даёт `SheetContent`.

### Заголовок

Даёт шторке имя. Имя обязательно: сошлитесь на `id` заголовка через `aria-labelledby` на `SheetContent` или задайте `aria-label` на `SheetContent`.

### Прокручиваемая область

Элемент с `overflow: auto`. Как flex-элемент внутри `SheetContent` он сам сжимается до доступной высоты.

### Кнопки действий

Кнопки, которые отвечают на шторку, помещаются в `<form method="dialog">`: её отправка закрывает шторку через `onChangeOpen(false)`, а `value` кнопки отправки становится `returnValue` диалога. Для отдельной кнопки закрытия используйте `SheetClose`.

## Порядок композиции

1. `Sheet`
2. `SheetTrigger`
3. `SheetContent`
4. `SheetHandle`
5. Ваш заголовок, необязательный `SheetClose` и тело

## Корректные паттерны композиции

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

## Некорректные паттерны композиции

### `SheetContent` вне `Sheet`

Это ломает общее состояние и поведение закрытия.

### Содержимое без имени

`SheetContent` не называет себя сам. Без `aria-labelledby` или `aria-label` скринридеры объявят безымянный диалог.

### Сложный десктопный модальный сценарий в тесной нижней шторке

Обычно это значит, что лучше подходит `Dialog` или `Drawer`.

### Раскладка с точками привязки без проверки реальной высоты содержимого

Промежуточные состояния могут стать непригодными, если поля формы или действия обрезаются.
