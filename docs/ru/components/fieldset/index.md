# Fieldset

## Профиль документа

`advanced interactive`

## Кратко

`Fieldset` объединяет связанные элементы управления в одну семантическую группу. Он предоставляет `FieldsetLegend` и `FieldsetHeader`, чтобы сгруппированные разделы формы сохраняли и нативную семантику `<fieldset>`, и структуру раскладки VegaUI, а не полагались на чисто визуальные контейнеры.

## Импорт

```tsx
import {
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  type FieldsetAppearance,
  type FieldsetHeaderProps,
  type FieldsetLegendProps,
  type FieldsetProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `FieldsetProps`
- `FieldsetLegendProps`
- `FieldsetHeaderProps`
- `FieldsetAppearance = 'transparent' | 'outlined' | string`

## Минимальная композиция

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
import { CheckIcon } from '@vega-ui/icons';
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
        <Checkbox key={channel.value}>
          <CheckboxInput name='alertChannels' value={channel.value} defaultChecked={channel.checked} />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          </CheckboxIndicator>
          {channel.label}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyFieldset` передаёт свои пропсы в `Fieldset`, выводит `legend` легендой, а `description` — в шапке и связывает её с группой через `aria-describedby`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: fieldset/recipe.tsx -->
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
  type FieldsetProps,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';
import { useId, type ReactNode } from 'react';

interface MyFieldsetProps extends FieldsetProps {
  legend: ReactNode
  description?: ReactNode
}

export function MyFieldset({ legend, description, children, ...props }: MyFieldsetProps) {
  const descriptionId = useId();

  return (
    <Fieldset aria-describedby={description ? descriptionId : undefined} {...props}>
      <FieldsetLegend>{legend}</FieldsetLegend>
      {description && (
        <FieldsetHeader>
          <Text id={descriptionId} size={2} style={{ color: 'var(--label-secondary)' }}>{description}</Text>
        </FieldsetHeader>
      )}
      {children}
    </Fieldset>
  );
}

export default function Recipe() {
  return (
    <MyFieldset
      appearance='outlined'
      legend='Payment failure alerts'
      description='Sent when a card is declined or an invoice is overdue.'
      style={{ width: '100%' }}
    >
      <Checkbox>
        <CheckboxInput name='alertChannels' value='email' defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        Email
      </Checkbox>
      <Checkbox>
        <CheckboxInput name='alertChannels' value='sms' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        SMS to the account owner
      </Checkbox>
    </MyFieldset>
  );
}
```
<!-- /example -->

## Обязательные части

- `Fieldset`: семантическая граница группы и контейнер раскладки
- `FieldsetLegend`: основная подпись группы для вспомогательных технологий

## Необязательные части

- `FieldsetHeader`: дополнительный текст заголовка между legend и сгруппированными элементами

## Порядок композиции

1. `Fieldset`
2. `FieldsetLegend`
3. `FieldsetHeader`
4. сгруппированные элементы управления

## Варианты

- Внешний вид: `outlined` или `transparent`
- Насыщенность содержимого: только legend или legend с текстом заголовка
- Композиция: простая семантическая группировка или более насыщенная раскладка раздела настроек

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `FieldsetLegend` должна оставаться первой значимой подписью внутри группы.
- `transparent` сохраняет семантику, но убирает визуальную рамку, поэтому за разделение отвечает окружающая раскладка.
- Вложенные fieldset допустимы, но иерархия legend должна оставаться очевидной.
- Вспомогательный текст или текст ошибки на уровне группы должен восприниматься как относящийся ко всей группе, а не случайно к одному элементу.

## Частые ошибки

- Замена `FieldsetLegend` обычным текстом с потерей семантики группы.
- `FieldsetHeader` как единственная подпись группы.
- `transparent` там, где раздел перестаёт восприниматься как отдельная группа формы.
