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

- `Checkbox`: корень, отвечающий за стили отмеченного, неопределённого, отключённого состояний и варианта.
- `CheckboxIndicator`: видимая поверхность элемента.
- `CheckboxCheckedIcon` и `CheckboxIndeterminateIcon`: рендер иконок внутри индикатора.

## Взаимодействие состояний и вариантов

- `variant` меняет семейство цветов для отмеченного и неопределённого состояний.
- Отключённое состояние переопределяет и фон, и рамку.
- Фокус находится на визуально скрытом input, но отображается через индикатор.

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

Дочерние элементы `CheckboxCheckedIcon` и `CheckboxIndeterminateIcon` заменяют иконку по умолчанию для этого состояния. Другое состояние сохраняет свою иконку.

<!-- example: checkbox/custom-state-icons.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon>
            <Rocket />
          </CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Deploy after merge
      </Checkbox>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput indeterminate />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon>
            <Diff />
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
