# HelperText: стилизация

## Обзор

`HelperText` использует общую текстовую систему с небольшим локальным контрактом цвета.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--label-tertiary` | корень по умолчанию | нейтральный цвет вспомогательного текста |
| `--color-error` | корень в состоянии ошибки | тон валидации или неблагоприятного исхода |

## Переменные уровня частей

### Корень

Корень задаёт `display: inline-block` и меняет цвет в зависимости от `data-error`.

## Взаимодействие состояний и вариантов

- обычное состояние использует `--label-tertiary`
- `error` использует `--color-error`
- размер шрифта по-прежнему берётся из соответствия размеров `Text`, выбранного маппером размеров вспомогательного текста

## Примеры

### Размеры и тон ошибки

`size` сопоставляется со шкалой текста (`sm`, `md`, `lg`); `error` меняет цвет с `--label-tertiary` на `--color-error` при любом размере.

<!-- example: helper-text/helper-text-sizes.tsx -->
```tsx
import { HelperText } from '@vega-ui/react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function HelperTextSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          <HelperText size={size}>Hint, {size}: shown to all members of the workspace.</HelperText>
          <HelperText size={size} error>Error, {size}: this name is already in use.</HelperText>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- не делайте цвета вспомогательного текста и основной подписи неразличимыми
- не используйте красный цвет ошибки для нейтральных подсказок по умолчанию
