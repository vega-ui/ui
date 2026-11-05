# Text: стилизация

## Обзор

`Text` — основной слой типографики основного текста. Он управляется общими токенами темы и одним внутренним пользовательским свойством для цвета текста.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--t-color` | корень | локальное переопределение цвета текста |
| `--default-font-family` | корень | семейство шрифтов основного текста |
| `--text-color` | запасной вариант корня | читаемый цвет текста по умолчанию |
| `--text-font-size-1` ... `--text-font-size-11` | шкала размеров | соответствие размеров основного текста |
| `--line-height-1` ... `--line-height-11` | шкала размеров | соответствие межстрочных интервалов |

## Переменные уровня частей

### Корень

Корень использует:

- `--t-color` с запасным вариантом `--text-color`
- `--default-font-family`
- токены font-size и line-height для конкретного размера

## Взаимодействие состояний и вариантов

- начертание управляется через `data-font-weight`
- размер управляется через `data-size`
- у `Text` нет отдельных вариантов ошибки или отключения; обычно их выражают переопределением цвета

## Примеры

### Локальное переопределение цвета

`--t-color` — пользовательское свойство и наследуется: заданное на обёртке, оно перекрашивает все `Text` внутри, а отдельный `Text` может переопределить его снова. Обычный `color` на обёртке до них не дойдёт, потому что каждый `Text` задаёт свой цвет.

<!-- example: text/local-color-override.tsx -->
```tsx
import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LocalColorOverride() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Text size={3}>Starter plan, billed monthly</Text>
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <Text size={2}>Renews on April 1</Text>
        <Text size={2}>Visa ending in 4242</Text>
        <Text size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          Card expires this month
        </Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Шкала размеров

Вводный абзац, основной текст и мелкий шрифт используют шаги шкалы `size`, а не произвольные размеры шрифта, поэтому межстрочные интервалы остаются согласованными.

<!-- example: text/larger-body-copy.tsx -->
```tsx
import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LargerBodyCopy() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: '60ch' }}>
      <Text asChild size={5}>
        <p>Ship design changes to every product from one set of tokens.</p>
      </Text>
      <Text asChild size={3}>
        <p>Update a color or radius once and every app that uses the theme picks it up on the next build.</p>
      </Text>
      <Text asChild size={1} style={{ '--t-color': 'var(--label-tertiary)', marginBlockStart: 'var(--spacing-2)' } as CSSProperties}>
        <p>Prices exclude VAT. Annual plans are billed upfront.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не обходите общую шкалу текста произвольными жёстко заданными размерами шрифта
- не делайте основной текст по умолчанию цветом, похожим на placeholder
