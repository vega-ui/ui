# Option: стилизация

## Обзор

Стили `Option` построены на токенах и сосредоточены на высоте строки, цвете текста и цветах фона для разных состояний.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--option-height` | корень | высота строки |
| `--option-br-ratio` | корень | коэффициент скругления |
| `--option-color` | корень | цвет текста |
| `--option-background-color` | корень | фон по умолчанию |
| `--option-background-color-hover` | корень | фон при наведении |
| `--option-background-color-active` | корень | фон в активном состоянии |

## Переменные частей

### Корень

Корень сопоставляет размер с высотой строки, отступами и масштабом текста. Выбранное состояние переназначает токены цвета и фона на основную палитру.

## Взаимодействие состояний и вариантов

- размер управляет высотой и типографикой
- `aria-selected='true'` переназначает вариант на основные цвета выбранного состояния
- отключённое состояние делает строку неинтерактивной

## Примеры

### Поверхность выбранного варианта

Выбранное состояние задаёт цвета с нулевой специфичностью, поэтому класс на списке может перекрасить выбранные строки из `examples.css`, не затрагивая остальные.

<!-- example: option/selected-option-surface.tsx -->
```tsx
import { Option } from '@vega-ui/react';
import './examples.css';

export default function SelectedOptionSurface() {
  return (
    <div
      role='listbox'
      aria-label='Delivery speed'
      className='option-brand-list'
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
    >
      <Option>Standard, 5–7 days</Option>
      <Option selected>Express, 2 days</Option>
      <Option>Same day</Option>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не делайте выбранные и невыбранные строки визуально неразличимыми
- не вкладывайте в строку конкурирующие интерактивные элементы
