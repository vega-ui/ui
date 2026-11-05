# CheckboxCard: стилизация

## Обзор

`CheckboxCard` построен на `Card` и добавляет небольшой слой стилей, специфичный для карточки: ориентацию и оформление границы при наведении, в отмеченном, неопределённом и отключённом состояниях.

## Публичные CSS-переменные

| Переменная | Назначение |
| --- | --- |
| `--checkbox-card-background-color` | точка переопределения фона карточки |
| `--card-border-color` | основной цвет границы, меняется в зависимости от состояния |

## Переменные уровня частей

### Корень

Корневой элемент `.checkboxCard` отвечает за ориентацию и стили границы при наведении, нажатии, в отмеченном и отключённом состояниях.

### Содержимое

`CheckboxCardContent`, `CheckboxCardTitle` и `CheckboxCardDescription` в основном опираются на слой текста и отступов `Card`.

### Контрол

Внешний вид контрола определяется составными частями контрола карточки-чекбокса.

## Взаимодействие состояний и вариантов

- `data-orientation='vertical' | 'horizontal'` меняет направление раскладки и отступы.
- `data-variant='primary' | 'secondary'` меняет цвет границы в отмеченном и неопределённом состояниях.
- `:has(input[type='checkbox']:checked)` и `:has(...:indeterminate)` управляют состоянием границы выбранной карточки.
- В отключённом состоянии цвет границы переключается на токены темы для отключённых элементов.

## Примеры

### Локальное переопределение минимальной ширины

У корня `min-width: 220px`. Уменьшите его локальным классом, когда несколько коротких карточек должны поместиться в одну строку; пример импортирует таблицу стилей, лежащую рядом.

<!-- example: checkbox-card/local-minimum-width-override.css -->
```css
.compactPlanCard {
  min-width: 104px;
}
```
<!-- /example -->

<!-- example: checkbox-card/local-minimum-width-override.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import './local-minimum-width-override.css';

const regions = [
  { value: 'eu', title: 'Europe', description: 'Frankfurt' },
  { value: 'us', title: 'US', description: 'Virginia' },
  { value: 'apac', title: 'Asia', description: 'Singapore' },
];

export default function LocalMinimumWidthOverride() {
  return (
    <div role='group' aria-label='Backup regions' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', width: '100%' }}>
      {regions.map((region) => (
        <CheckboxCard key={region.value} size='sm' className='compactPlanCard'>
          <CheckboxCardContent>
            <CheckboxCardTitle>{region.title}</CheckboxCardTitle>
            <CheckboxCardDescription>{region.description}</CheckboxCardDescription>
          </CheckboxCardContent>
          <CheckboxCardControl>
            <CheckboxCardControlInput name='regions' value={region.value} defaultChecked={region.value === 'eu'} />
            <CheckboxIndicator>
              <CheckboxCardControlCheckedIcon />
              <CheckboxCardControlIndeterminateIcon />
            </CheckboxIndicator>
          </CheckboxCardControl>
        </CheckboxCard>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Свои иконки состояний

Дочерние элементы `CheckboxCardControlCheckedIcon` и `CheckboxCardControlIndeterminateIcon` заменяют иконку по умолчанию для этого состояния. Другое состояние сохраняет свою иконку.

<!-- example: checkbox-card/custom-state-icons.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Deploy after merge</CheckboxCardTitle>
          <CheckboxCardDescription>Ship to production as soon as checks pass.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput defaultChecked />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon>
              <Rocket />
            </CheckboxCardControlCheckedIcon>
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Review changed files</CheckboxCardTitle>
          <CheckboxCardDescription>3 of 12 files are already reviewed.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput indeterminate />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon>
              <Diff />
            </CheckboxCardControlIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не ломайте область клика подписанной карточки хаками с pointer-events
- не стилизуйте отмеченные карточки так, чтобы скрывалось отключённое или неопределённое состояние
- не считайте отступы описательного текста независимыми от ориентации карточки
