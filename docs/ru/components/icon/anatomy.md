# Icon: анатомия

## Обзор

`Icon` — примитив из одной части, который передаёт размер и SVG-пропсы дочернему элементу через `Slot`.

## Обязательные части

### `Icon`

Обязательна. Владеет общим контрактом размерных токенов и пробросом SVG-пропсов.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Icon`
2. один дочерний SVG

## Корректные варианты композиции

<!-- example: icon/basic-usage.tsx -->
```tsx
import { Icon } from '@vega-ui/react';
import { CalendarIcon, MessageSquareIcon, PaperclipIcon } from '@vega-ui/icons';

export default function BasicUsage() {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none', color: 'var(--label-secondary)' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><CalendarIcon /></Icon>
        Due May 14
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><MessageSquareIcon /></Icon>
        12 comments
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><PaperclipIcon /></Icon>
        3 files
      </li>
    </ul>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Дочернее содержимое, не являющееся SVG

Обёртка предназначена для проброса SVG-пропсов и размеров.

### Самостоятельная смысловая иконка без подписи или контекста

Поведение `aria-hidden` по умолчанию может сделать её смысл недоступным.
