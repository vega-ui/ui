# Separator: стилизация

## Обзор

У `Separator` очень маленький контракт стилизации, который определяется ориентацией и одним общим токеном цвета.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--color-gray-accent-200` | корень | цвет разделителя |

## Переменные уровня частей

### Корень

По умолчанию корень — горизонтальная линия на всю ширину; размеры переключаются в зависимости от `data-orientation`.

## Взаимодействие состояний и вариантов

- `horizontal` использует `width: 100%` и `height: 1px`
- `vertical` использует `width: 1px` и `height: 100%`
- локальных вариантов состояния у компонента нет

## Примеры

### Разделитель списка с отступом

Цвет линии переопределён через `background` и токен `--separator-non-opaque`, а `width: 'auto'` с `marginInlineStart` начинает линию после аватара, как в нативных списках. Разделители декоративные, поэтому скрыты через `aria-hidden`.

<!-- example: separator/subtle-horizontal-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';
import { Fragment } from 'react';

const contacts = ['Alicia Gómez', 'Ben Carter', 'Chen Wei', 'Dana Novak'];

export default function SubtleHorizontalDivider() {
  return (
    <div style={{ display: 'grid', width: '100%' }}>
      {contacts.map((name, index) => (
        <Fragment key={name}>
          {index > 0 && (
            <Separator
              aria-hidden
              style={{ width: 'auto', marginInlineStart: 'var(--spacing-24)', background: 'var(--separator-non-opaque)' }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', paddingBlock: 'var(--spacing-5)' }}>
            <div
              aria-hidden
              style={{ width: 'var(--spacing-18)', height: 'var(--spacing-18)', flexShrink: 0, borderRadius: '50%', background: 'var(--fills-secondary)' }}
            />
            <Text size={3}>{name}</Text>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Короткий вертикальный разделитель

В строке с выравниванием по центру явная `height` задаёт вертикальному разделителю фиксированную длину короче строки текста.

<!-- example: separator/vertical-toolbar-divider.tsx -->
```tsx
import { Separator, Text } from '@vega-ui/react';

export default function VerticalToolbarDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Edited 2 hours ago</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>3 comments</Text>
      <Separator orientation='vertical' style={{ height: 'var(--spacing-6)' }} />
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shared with team</Text>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не рассчитывайте, что разделитель сам создаст отступы
- не используйте декоративный разделитель там, где нужна семантическая группировка
