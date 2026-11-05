# Slot

## Профиль документа

`primitive`

## Кратко

`Slot` — низкоуровневый примитив полиморфной композиции, на котором построены API `asChild` в VegaUI. Он клонирует ровно один валидный React-элемент и сливает с ним пропсы родителя.

## Импорты

```tsx
import { Slot, type SlotProps } from '@vega-ui/react/Slot';
```

## Экспортируемые типы

- `SlotProps<T>`

## Базовое использование

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

## Варианты

- У самого `Slot` нет визуальных вариантов.
- На практике вариативность задаёт родительский компонент, использующий `asChild`.

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Дочерний элемент должен быть ровно одним валидным React-элементом.
- `Slot` меняет рендер, а не семантику; итоговую HTML-семантику по-прежнему определяет выбранный дочерний элемент.
- Слияние пропсов может давать неожиданное поведение, если родитель и дочерний элемент задают конкурирующие обработчики или атрибуты.

## Частые ошибки

- Использовать `Slot` напрямую, когда уже есть высокоуровневый API `asChild`.
- Передавать текст или фрагменты вместо одного валидного элемента.
- Непреднамеренно менять семантику, помещая в слот элемент не того типа.
