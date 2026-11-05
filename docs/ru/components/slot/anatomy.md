# Slot: анатомия

## Обзор

`Slot` — низкоуровневая утилита из одной части. Она клонирует свой единственный дочерний элемент и сливает переданные пропсы с пропсами этого элемента.

## Обязательные части

### `Slot`

Обязателен. Отвечает за слияние пропсов и клонирование.

## Необязательные части

Экспортируемых дочерних частей нет.

## Порядок композиции

1. `Slot`
2. один валидный дочерний React-элемент

## Корректные варианты композиции

<!-- example: slot/basic-usage.tsx -->
```tsx
import type { HTMLAttributes } from 'react';
import { Slot } from '@vega-ui/react';

interface TagProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const tagStyle = {
  display: 'inline-flex',
  padding: 'var(--spacing-1) var(--spacing-5)',
  border: 'none',
  borderRadius: 999,
  background: 'var(--fills-secondary)',
  color: 'var(--label-primary)',
  font: 'inherit',
  fontSize: 'var(--font-size-2)',
  textDecoration: 'none',
  cursor: 'pointer',
};

function Tag({ asChild, children, ...props }: TagProps) {
  if (asChild) {
    return <Slot style={tagStyle} {...props}>{children}</Slot>;
  }

  return <span style={tagStyle} {...props}>{children}</span>;
}

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <Tag>Design</Tag>
      <Tag asChild>
        <a href='/tags/accessibility'>Accessibility</a>
      </Tag>
      <Tag asChild>
        <button type='button' onClick={() => alert('Filtering by React')}>React</button>
      </Tag>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Больше одного дочернего элемента

`Children.only` отклонит такую композицию.

### Дочерний узел, не являющийся элементом

Обычный текст или невалидные узлы нельзя клонировать.
