# Checkbox: стилизация

## Обзор

Стилизация `Checkbox` разделена между моделью состояния корневой подписи и видимой поверхностью индикатора. Отмеченное, неопределённое, отключённое состояния и фокус согласуются через CSS-переменные уровня корня.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--checkbox-size` | `Checkbox`, `CheckboxIndicator` | Визуальный размер. |
| `--checkbox-border-color` | `Checkbox`, `CheckboxIndicator` | Текущий цвет рамки. |
| `--checkbox-background-color` | `Checkbox`, `CheckboxIndicator` | Текущий цвет фона. |
| `--checkbox-color` | `CheckboxIndicator` | Цвет иконки. |
| `--checkbox-outline` | `CheckboxIndicator` | Обводка фокуса. |
| `--checkbox-border-color-hover` | `Checkbox` | Цвет рамки при наведении. |
| `--checkbox-border-color-active` | `Checkbox` | Цвет рамки при нажатии. |

## Переменные уровня частей

- `Checkbox`: корень, отвечающий за стили отмеченного, неопределённого, отключённого состояний и варианта. Строка `inline-flex` с выравниванием по центру и `gap` `var(--spacing-4)`; для многострочных подписей переопределите `align-items`.
- `CheckboxIndicator`: видимая поверхность элемента; не сжимается в строке.
- `CheckboxCheckedIcon` и `CheckboxIndeterminateIcon`: рендер иконок внутри индикатора.

## Взаимодействие состояний и вариантов

- `variant` меняет семейство цветов для отмеченного и неопределённого состояний.
- Отключённое состояние переопределяет и фон, и рамку.
- Фокус находится на визуально скрытом input, но отображается через индикатор.
- `aria-invalid='true'` на `CheckboxInput` или его `:user-invalid`, например у `required` чекбокса, оставшегося неотмеченным после попытки отправки, переключает рамку на `--color-error`. Сам компонент `aria-invalid` не ставит.

## Примеры

<!-- example: checkbox/examples.css -->
```css
.brandCheckbox {
  --checkbox-br-ratio: 0.25;
}
```
<!-- /example -->

<!-- example: checkbox/styling-examples.css -->
```css
.compactCheckbox {
  --checkbox-size: 14px;
}
```
<!-- /example -->

### Свои иконки состояний

Ни одна из частей не рисует свою иконку, поэтому каждое состояние показывает ту, что вы передали: из любого набора иконок или свой SVG. Обычный вид — `<CheckIcon strokeWidth={4} />` и `<MinusIcon strokeWidth={4} />`; здесь их место занимают ракета и знак разницы. Чтобы писать обычную пару один раз, см. [рецепт](./index.md#свой-компонент).

<!-- example: checkbox/custom-state-icons.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, DiffIcon, MinusIcon, RocketIcon } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}>
      <Checkbox>
        <CheckboxInput defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon>
            <RocketIcon />
          </CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Deploy after merge
      </Checkbox>
      <Checkbox>
        <CheckboxInput indeterminate />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon>
            <DiffIcon />
          </CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Files with changes
      </Checkbox>
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- Не убирайте обводку фокуса без замены.
- Не скрывайте разницу между неотмеченным и отмеченным или неопределённым состояниями.
- Не навязывайте собственные цвета, ухудшающие читаемость отключённого состояния.
