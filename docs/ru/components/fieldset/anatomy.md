# Fieldset: анатомия

## Обзор

`Fieldset` — небольшой [составной компонент](../../glossary.md#составной-компонент-compound-component). Корень даёт нативную семантику группы, `FieldsetLegend` называет группу, а `FieldsetHeader` добавляет необязательный вспомогательный текст.

## Обязательные части

### `Fieldset`

Обязательна. Рендерит элемент `<fieldset>` и отвечает за внешний вид.

### `FieldsetLegend`

Обязательна для доступной подписи группы. Рендерит название группы в нативном слоте legend.

## Необязательные части

### `FieldsetHeader`

Необязательный описательный блок после legend. Используйте его для вспомогательного текста, а не вместо legend.

## Порядок композиции

1. `Fieldset`
2. `FieldsetLegend`
3. `FieldsetHeader`
4. сгруппированные элементы управления

## Допустимые паттерны композиции

<!-- example: fieldset/notification-channels.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';
import { useId } from 'react';

const CHANNELS = [
  { value: 'email', label: 'Email', checked: true },
  { value: 'slack', label: 'Slack #billing-alerts', checked: true },
  { value: 'sms', label: 'SMS to the account owner', checked: false },
];

export default function NotificationChannels() {
  const id = useId();

  return (
    <Fieldset appearance='outlined' aria-describedby={`${id}-description`} style={{ width: '100%' }}>
      <FieldsetLegend>Payment failure alerts</FieldsetLegend>
      <FieldsetHeader>
        <Text id={`${id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
          Sent when a card is declined or an invoice is overdue.
        </Text>
      </FieldsetHeader>
      {CHANNELS.map((channel) => (
        <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='alertChannels' value={channel.value} defaultChecked={channel.checked} />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {channel.label}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

## Недопустимые паттерны композиции

### Нет `FieldsetLegend`

Элементы управления остаются визуально сгруппированными, но семантическая подпись группы пропадает.

### Декоративный заголовок вне корня как единственная подпись

Визуально выглядит правильно, но не даёт нативной семантики legend.

### Глубоко вложенные группы без понятного текста

Вложенные fieldset трудно понять, когда legend не задают ясную иерархию.
