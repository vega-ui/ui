# Switch: стилизация

## Обзор

Стили `Switch` разделены между корневой дорожкой в роли label и видимым бегунком-индикатором. Изменения состояния согласуются через CSS-переменные корня и селекторы состояния скрытого input.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--switch-size` | `Switch`, `SwitchIndicator` | Общий размер контрола. |
| `--switch-background-color` | `Switch` | Текущий цвет дорожки. |
| `--switch-indicator-size` | `SwitchIndicator` | Размер бегунка. |
| `--switch-indicator-transform` | `SwitchIndicator` | Положение бегунка. |
| `--switch-padding` | `Switch` | Отступ между дорожкой и бегунком. |
| `--switch-background-color-hover` | `Switch` | Цвет дорожки при наведении. |
| `--switch-background-color-active` | `Switch` | Цвет дорожки при нажатии. |
| `--switch-indicator-color` | `SwitchIndicator` | Цвет бегунка. |

## Переменные частей

- `Switch`: корневая дорожка, отступы, размер и цветовая модель включённого состояния.
- `SwitchIndicator`: поверхность бегунка и его анимированное положение.
- `SwitchInput`: семантический носитель состояний checked, disabled и фокуса.

## Взаимодействие состояний и вариантов

- `variant` меняет семейство цветов включённого состояния.
- В активном состоянии индикатор слегка растягивается и сдвигается.
- Отключённое состояние переопределяет стили дорожки и бегунка вместе.

## Примеры

<!-- example: switch/examples.css -->
```css
.brandSwitch {
  --switch-size: 28px;
}
```
<!-- /example -->

<!-- example: switch/styling-examples.css -->
```css
.softSwitch {
  --switch-background-color: var(--fills-secondary);
}
```
<!-- /example -->

### Свой индикатор

`SwitchIndicator` принимает ваш `style` и дочерние элементы, поэтому у бегунка может быть свой цвет или иконка внутри.

<!-- example: switch/custom-indicator.tsx -->
```tsx
import { Icon, Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';
import { Moon } from '@vega-ui/icons';

export default function CustomIndicator() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-focus-mode' />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)' }} />
        </Switch>
        <Label htmlFor='custom-focus-mode'>Focus mode</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-dark-mode' defaultChecked />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size='sm'><Moon stroke='var(--color-white)' /></Icon>
          </SwitchIndicator>
        </Switch>
        <Label htmlFor='custom-dark-mode'>Dark mode</Label>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не скрывайте видимость фокуса на дорожке.
- Не ослабляйте контраст включённого и выключенного состояний до неоднозначности.
- Не переопределяйте логику transform индикатора, не перепроверив состояния взаимодействия.
