# ButtonBase: стилизация

## Обзор

`ButtonBase` отвечает за общий контракт стилей действия, который используют более высокоуровневые компоненты кнопок. Внутри он использует похожие на публичные переменные `--button-*` и сопоставляет `variant` и `appearance` с токенами темы и цветами состояний.

## Публичные CSS-переменные

| Переменная | Назначение |
| --- | --- |
| `--button-color` | цвет текста/иконки по умолчанию |
| `--button-color-hover` | цвет текста/иконки при наведении |
| `--button-color-active` | цвет текста/иконки при нажатии |
| `--button-background-color` | цвет поверхности по умолчанию |
| `--button-background-color-hover` | цвет поверхности при наведении |
| `--button-background-color-active` | цвет поверхности при нажатии |
| `--button-border-color` | цвет рамки по умолчанию |
| `--button-border-color-hover` | цвет рамки при наведении |
| `--button-border-color-active` | цвет рамки при нажатии |
| `--button-chroma-ratio` | Насыщенность, добавляемая к акцентному цвету в тонированных фонах. |

## Переменные частей

### Корень

Корневой элемент `.buttonBase` отвечает за цвета кнопки, рамку и поведение фокуса.

### Дочерний элемент в слоте

При `asChild` элемент в слоте получает те же классы и data-атрибуты. Второго слоя стилей не появляется.

## Взаимодействие состояний и вариантов

- `data-variant='primary' | 'secondary'` переключает цветовое семейство.
- `data-appearance='fill' | 'outline' | 'ghost' | 'transparent'` переключает структурное оформление.
- Стили отключённого состояния используют токены темы `--disable-*`.
- Фокус использует `--focus-color`.

## Примеры

### Переопределение скругления в локальной обёртке

У `ButtonBase` нет собственного размера, поэтому отступы и скругление задаёте вы. Цвет рамки и текста переопределяется через переменные `--button-*`, включая пары для наведения и нажатия.

<!-- example: button-base/override-radius-in-a-local-wrapper.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { ButtonBase } from '@vega-ui/react';

const pill: CSSProperties = {
  padding: 'var(--spacing-3) var(--spacing-10)',
  borderRadius: 999,
  fontSize: 'var(--font-size-2)',
};

const brand = {
  ...pill,
  '--button-border-color': 'var(--color-amethyst-accent-500)',
  '--button-border-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-border-color-active': 'var(--color-amethyst-accent-700)',
  '--button-color': 'var(--color-amethyst-accent-500)',
  '--button-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-color-active': 'var(--color-amethyst-accent-700)',
} as CSSProperties;

export default function OverrideRadiusInALocalWrapper() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <ButtonBase type='button' appearance='ghost' style={pill}>
        Invite teammates
      </ButtonBase>
      <ButtonBase type='button' appearance='outline' style={brand}>
        Join beta
      </ButtonBase>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- придуманные неподдерживаемые имена вариантов без соответствующего CSS
- `asChild` как лазейку для стилей
- семантические токены темы, заменённые жёстко заданными цветами внутри стилей переиспользуемых компонентов
