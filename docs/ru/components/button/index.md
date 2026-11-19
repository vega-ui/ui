# Button

## Профиль документа

`primitive`

## Кратко

`Button` — основной компонент действия на базе `ButtonBase` с размерами для типовых действий в продукте. Это выбор по умолчанию, когда интерфейсу нужна видимая поверхность действия с текстом, а с `square` — действие из одной иконки.

## Импорты

```tsx
import {
  Button,
  type ButtonName,
  type ButtonProps,
  type ButtonShape,
  type ButtonSize,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ButtonName`
- `ButtonProps`
- `ButtonShape`
- `ButtonSize`

## Базовое использование

<!-- example: button/basic-usage.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размеры: `xs`, `sm`, `md`, `lg`, `xl`
- Варианты: `primary`, `secondary`
- Оформление: `fill`, `outline`, `ghost`, `transparent`
- Раскладка: по ширине содержимого, любая ширина через `style` или класс, или `square` для одной иконки
- Композиция: обычная кнопка или `asChild`

## Квадратная кнопка

`square` делает кнопку такой же ширины, как высоты, без внутренних отступов — для одной иконки. Вложенный `Icon` занимает треть высоты, а размеры те же, что у `Button`.

<!-- example: button/square-sizes.tsx -->
```tsx
import { Button, Icon, type ButtonSize } from '@vega-ui/react';
import { SettingsIcon } from '@vega-ui/icons';

const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function SquareSizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {sizes.map((size) => (
        <Button key={size} type='button' size={size} square aria-label={`Settings, size ${size}`}>
          <Icon><SettingsIcon /></Icon>
        </Button>
      ))}
    </div>
  );
}
```
<!-- /example -->

У квадратной кнопки нет видимого текста, поэтому её тип требует имя: передайте `aria-label` или `aria-labelledby`, указывающий на видимый текст или текст в [VisuallyHidden](../visually-hidden/). С `asChild` задайте имя на дочернем элементе. Компоненты сами подписи не ставят. Используйте квадратную кнопку для привычных действий — переименовать, поделиться, ещё — и текстовую кнопку, когда одна иконка не объяснит действие.

<!-- example: button/square-header-actions.tsx -->
```tsx
import { useState } from 'react';
import { Button, Icon, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';

export default function SquareHeaderActions() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%', maxWidth: 400 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </Button>
        <Button type='button' size='sm' variant='secondary' appearance='transparent' square aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </Button>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

[Tooltip](../tooltip/) может показать зрячим пользователям подпись и сочетание клавиш. Он не заменяет `aria-label`: подсказка появляется только при наведении и фокусе.

<!-- example: button/square-tooltip-label.tsx -->
```tsx
import { type ReactNode, useState } from 'react';
import { Button, Icon, Text, Tooltip, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { PrinterIcon, Redo2Icon, Undo2Icon } from '@vega-ui/icons';

const actions: { label: string, shortcut: string, icon: ReactNode }[] = [
  { label: 'Undo', shortcut: 'Ctrl+Z', icon: <Undo2Icon /> },
  { label: 'Redo', shortcut: 'Ctrl+Shift+Z', icon: <Redo2Icon /> },
  { label: 'Print', shortcut: 'Ctrl+P', icon: <PrinterIcon /> },
];

export default function SquareTooltipLabel() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                appearance='transparent'
                square
                aria-label={action.label}
                onClick={() => setLastAction(action.label)}
              >
                <Icon>{action.icon}</Icon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {action.label} · {action.shortcut}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Hover or focus a button to see its label' : `${lastAction} done`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

Для кнопки закрытия оверлея задайте `--button-height: 24px` и `--button-br-ratio: 0.5` — получится маленькая круглая кнопка с иконкой `xs`. `flex-shrink: 0` сохраняет её квадратной рядом с длинным заголовком.

<!-- example: button/square-close-button.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const compact = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

export default function SquareCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='whats-new-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='whats-new-title' as='h2' size={4} fontWeight={600}>What’s new in 2.4</Heading>
          <DialogClose asChild>
            <Button square aria-label='Close' variant='secondary' appearance='ghost' style={compact}>
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        <Text size={3}>
          Shared libraries, faster exports, and a new dark theme. Press Escape or the cross to return to your work.
        </Text>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Связанные документы

- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- У `type` нет значения по умолчанию: внутри формы `Button` отправляет её, как нативный `<button>`. С `asChild` дочернему элементу `type` не передаётся.
- `asChild` подменяет нижележащий элемент, сохраняя стили кнопки VegaUI.
- Кастомные строки для размера, варианта или оформления требуют соответствующей поддержки в CSS.
- Если взаимодействие — в первую очередь навигация, `Link` лучше передаёт намерение. Если смысл уже понятен по иконке, кнопка с `square` экономит место.
- `square` без `aria-label` или `aria-labelledby` — ошибка типов. С `asChild` тип имя не проверяет, потому что оно задаётся на дочернем элементе.
- Текст внутри кнопки с `square` обрезается: ширина равна высоте.

## Частые ошибки

- Рассчитывать на отправку формы, не задав `type='submit'`.
- Стилизовать под кнопку чистую навигацию, когда лучше подходит семантическая ссылка.
- Передавать неподдерживаемые кастомные строки варианта без соответствующего CSS.
- Класть текст в кнопку с `square` или оставлять её без имени.
