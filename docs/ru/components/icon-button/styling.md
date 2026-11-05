# IconButton: стилизация

## Обзор

Стили `IconButton` разделены между `ButtonBase`, который отвечает за семантические варианты и оформление, и локальным слоем размеров `IconButton` для квадратных габаритов и размера иконки.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--icon-button-size` | `IconButton` | Размер квадратного контрола. |
| `--icon-button-br-ratio` | `IconButton` | Коэффициент радиуса скругления. |
| `--icon-size` | вложенная иконка | Рекомендуемый размер иконки, производный от размера кнопки. |
| `--button-color` | `ButtonBase` | Текущий цвет содержимого. |
| `--button-background-color` | `ButtonBase` | Текущий цвет фона. |

## Переменные уровня частей

- `IconButton`: локальные квадратные размеры и радиус.
- `ButtonBase`: общие стили вариантов, оформления, отключённого состояния, наведения, нажатия и фокуса.

## Взаимодействие состояний и вариантов

- `size` напрямую соответствует размеру квадратной кнопки.
- `variant` и `appearance` обрабатывает `ButtonBase`.
- Читаемость иконки зависит и от размера контрола, и от выбора глифа.

## Примеры

`--icon-button-size` и `--icon-button-br-ratio` превращают квадрат в большую круглую кнопку звонка; вложенная иконка по-прежнему занимает треть размера. Кнопка завершения звонка переопределяет переменные фона, включая наведение и нажатие.

<!-- example: icon-button/css-variable-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Icon, IconButton } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--icon-button-size': '48px',
  '--icon-button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </IconButton>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </IconButton>
      <IconButton type='button' aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </IconButton>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не убирайте видимость фокуса без замены.
- Не навязывайте размеры иконок, которые выглядят несбалансированно в выбранном размере кнопки.
- Не используйте стили «только иконка» как замену отсутствующей доступной подписи.
