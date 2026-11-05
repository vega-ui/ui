# Spinner: стилизация

## Обзор

`Spinner` стилизуется через одну локальную переменную цвета и сопоставление толщины для каждого размера.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--spinner-color` | корень | итоговый цвет спиннера |
| `--spinner-size` | корень | диаметр отрендеренного спиннера |
| `--spinner-width` | корень | толщина обводки |
| `--color-primary-500` | вариант primary | цвет спиннера primary |
| `--color-secondary-500` | вариант secondary | цвет спиннера secondary |

## Переменные частей

### Корень

Корень рисует анимированное кольцо с помощью радиального/конического градиента и маски.

## Взаимодействие состояний и вариантов

- `data-size` сопоставляется с токенами размера и толщины обводки
- `data-variant='primary'` использует `--color-primary-500`
- `data-variant='secondary'` использует `--color-secondary-500`

## Примеры

### Индикатор загрузки secondary

<!-- example: spinner/secondary-loading-indicator.tsx -->
```tsx
import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function SecondaryLoadingIndicator() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Spinner size={5} variant='secondary' aria-labelledby={labelId} />
      <Text id={labelId} size={5}>Generating preview</Text>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не нарушайте контраст между спиннером и фоном
- не используйте слишком крупные спиннеры в плотных контролах
