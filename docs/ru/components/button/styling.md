# Button: стилизация

## Обзор

Стили `Button` разделены между `ButtonBase`, который отвечает за семантические варианты и оформление, и локальным слоем размеров `Button`, который отвечает за отступы, высоту и ширину.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | `Button` | Высота контрола и ширина кнопки с `square`. |
| `--button-br-ratio` | `Button` | Коэффициент скругления углов. |
| `--button-color` | `ButtonBase` | Текущий цвет текста. |
| `--button-background-color` | `ButtonBase` | Текущий цвет фона. |
| `--button-border-color` | `ButtonBase` | Текущий цвет рамки. |
| `--icon-size` | вложенный `Icon` | Размер иконки; кнопка с `square` задаёт его как треть высоты. |

## Переменные частей

- `Button`: локальные размер, внутренние отступы и поведение `square`. `[data-square]` задаёт ширину равной `--button-height` и убирает внутренние отступы по горизонтали.
- `ButtonBase`: общие стили вариантов, оформления, отключённого состояния, наведения, нажатия и фокуса.

## Взаимодействие состояний и вариантов

- `size` меняет высоту, внутренние отступы и размер шрифта.
- `variant` и `appearance` в основном обрабатывает `ButtonBase`.
- Отключённое состояние обрабатывается на уровне `ButtonBase` для всех вариантов оформления.

## Примеры

Переопределяйте публичные переменные инлайном или в своём классе. Для цвета задавайте и переменные `-hover` и `-active`, иначе наведение и нажатие вернутся к цветам варианта.

<!-- example: button/css-variable-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Button } from '@vega-ui/react';

const pill = {
  '--button-br-ratio': 0.5,
} as CSSProperties;

const compact = {
  '--button-height': '32px',
} as CSSProperties;

const success = {
  '--button-background-color': 'var(--color-green-accent-800)',
  '--button-background-color-hover': 'var(--color-green-accent-900)',
  '--button-background-color-active': 'var(--color-green-accent-1000)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' style={pill}>Follow</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={compact}>Filter</Button>
      <Button type='button' style={success}>Approve</Button>
    </div>
  );
}
```
<!-- /example -->

`--button-height` и `--button-br-ratio` превращают кнопку с `square` в большую круглую кнопку звонка; вложенная иконка по-прежнему занимает треть высоты. Кнопка завершения звонка переопределяет переменные фона, включая hover и active.

<!-- example: button/square-round-controls.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Button, Icon } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--button-height': '48px',
  '--button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function SquareRoundControls() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </Button>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </Button>
      <Button type='button' square aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не убирайте видимость фокуса без замены.
- Не придумывайте кастомные строки оформления без соответствующей поддержки в CSS.
- Не смешивайте семантическую навигацию и стилизацию кнопки в одну задачу.
