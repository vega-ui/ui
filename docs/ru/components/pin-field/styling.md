# PinField: стилизация

## Обзор

Стили `PinField` разделены между сеткой слотов, видимыми слотами и необязательным разделителем. `PinFieldInput` визуально скрыт и не задаёт контракт поверхности.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | слот | базовый размер слота |
| `--input-br-ratio` | слот | коэффициент скругления слота |
| `--fills-tertiary` | слот | поверхность слота по умолчанию |
| `--fills-tertiary-hover` | слот | поверхность слота при наведении |
| `--color-primary-500` | активный слот | активный контур |
| `--color-error` | слот с ошибкой | контур ошибки |
| `--separator-opaque` | разделитель | цвет разделителя групп |
| `--cursor-height` | `PinFieldSlot` | Высота каретки в активном слоте. |

## Переменные частей

### Корень

Корень — flex-строка, расставляющая слоты с `gap: var(--spacing-3)`.

### Слот

Слоты переводят размер и в квадратные габариты, и в шкалу шрифта, а в активном состоянии с плейсхолдером рендерят мигающую каретку.

### Разделитель

Разделитель использует токены ширины для конкретного размера и линию толщиной 1px.

## Взаимодействие состояний и вариантов

- размер меняет габариты слота и шкалу шрифта
- активное состояние меняет цвет контура
- состояние плейсхолдера меняет цвет текста в слоте
- отключённое состояние и состояние ошибки переназначают цвета слотов, не меняя раскладку

## Примеры

### Сгруппированные слоты одноразового кода

Каждый слот сам задаёт `--input-br-ratio`, поэтому переопределение ставится на слоты, а промежуток — обычный CSS на корне.

<!-- example: pin-field/grouped-otp-slots.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';

const roundSlot = { '--input-br-ratio': 0.5 } as CSSProperties;

export default function GroupedOtpSlots() {
  return (
    <PinField size='lg' maxLength={6} style={{ gap: 'var(--spacing-6)' }}>
      <PinFieldInput aria-label='Sign-in code' autoComplete='one-time-code' />
      <PinFieldSlot index={0} style={roundSlot} />
      <PinFieldSlot index={1} style={roundSlot} />
      <PinFieldSlot index={2} style={roundSlot} />
      <PinFieldSeparator />
      <PinFieldSlot index={3} style={roundSlot} />
      <PinFieldSlot index={4} style={roundSlot} />
      <PinFieldSlot index={5} style={roundSlot} />
    </PinField>
  );
}
```
<!-- /example -->

## Чего не переопределять

- не нарушайте квадратное соотношение ширины и высоты слота
- не стилизуйте разделители так, будто это редактируемые слоты
- не скрывайте состояния активного фокуса и контура
