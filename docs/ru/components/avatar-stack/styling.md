# AvatarStack: стилизация

## Обзор

Стилизация `AvatarStack` намеренно минимальна. Корень только задаёт горизонтальную раскладку, а эффект перекрытия создают маска и внешние отступы `AvatarStackItem`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--avatar-size` | расчёт перекрытия элементов | базовый размер для перекрытия и раздвигания при наведении |
| `--avatar-stack-item-gap` | расчёт перекрытия элементов | внутреннее смещение перекрытия |

## Переменные на уровне частей

### Корень

Корень использует `display: flex`.

### Элемент

Все элементы, кроме первого, вычисляют радиальную маску из `--avatar-size` и создают вырез перекрытия. При наведении маска временно снимается и добавляется горизонтальный отступ.

## Взаимодействие состояний и вариантов

- размер берётся из общего контекста аватаров
- наведение меняет отступы перекрытия у элемента под курсором и его соседа
- вариант наследуется из контекста аватаров, а не из CSS стопки

## Примеры

### Размеры стека

<!-- example: avatar-stack/small-overlapping-avatars.tsx -->
```tsx
import { AvatarFallback, AvatarStack, AvatarStackItem, Text } from '@vega-ui/react';

const sizes = ['xs', 'sm', 'md', 'lg'];
const people = [
  { name: 'Maria Chen', initials: 'MC' },
  { name: 'Omar Haddad', initials: 'OH' },
  { name: 'Lena Fischer', initials: 'LF' },
];

export default function SmallOverlappingAvatars() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={2} style={{ width: 'var(--spacing-12)', color: 'var(--label-secondary)' }}>{size}</Text>
          <AvatarStack size={size} role='group' aria-label={`Team members, size ${size}`}>
            {people.map((person) => (
              <AvatarStackItem key={person.name} role='img' aria-label={person.name}>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </AvatarStackItem>
            ))}
          </AvatarStack>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- не смешивайте размеры аватаров в одной стопке
- не убирайте маску перекрытия, не пересмотрев поведение отступов
