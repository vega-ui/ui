# TimeField

## Профиль документа

`advanced interactive`

## Кратко

`TimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для ввода времени по маске. Он построен на `TextField` и добавляет ограничения формата, min/max и шага для строк времени, когда продуктовое значение — только время.

## Импорты

```tsx
import {
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  useTimeFieldOptionContext,
  type TimeFieldColumnProps,
  type TimeFieldInputProps,
  type TimeFieldOptionContextData,
  type TimeFieldOptionProps,
  type TimeFieldProps,
  type TimeFieldTriggerProps,
  type TimeFieldUnit,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TimeFieldProps`
- `TimeFieldInputProps`
- `TimeFieldTriggerProps`
- `TimeFieldColumnProps`
- `TimeFieldOptionProps`
- `TimeFieldOptionContextData`
- `TimeFieldUnit`

## Минимальная композиция

<!-- example: time-field/minimal-composition.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <TimeField>
      <TimeFieldInput aria-label='Reminder time' placeholder='hh:mm' />
    </TimeField>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyTimeField` передаёт свои пропсы в `TimeField`, `id` и `name` — полю ввода, а имена кнопки с часами и колонок времени принимает пропсами; колонка секунд следует за `format`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: time-field/recipe.tsx -->
```tsx
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
  type TimeFieldProps,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyTimeFieldProps extends TimeFieldProps {
  name?: string
  pickerLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyTimeField({ id, name, pickerLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyTimeFieldProps) {
  const seconds = props.format === 'HH:mm:ss';

  return (
    <TimeField {...props}>
      <TimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <TimeFieldTrigger square aria-label={pickerLabel}><Icon><ClockIcon /></Icon></TimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel} style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label={pickerLabel}>
            <TimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
            <TimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
            {seconds && <TimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>}
          </WheelPicker>
        </PopoverContent>
      </Popover>
    </TimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Alarm</Label>
      <MyTimeField
        id={id}
        name='alarmAt'
        step={5}
        defaultValue='07:00'
        pickerLabel='Choose alarm time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `TimeField`: корень, предоставляющий ограничения времени и формат
- `TimeFieldInput`: текстовое поле ввода с маской

## Необязательные части

- `TimeFieldTrigger`: кнопка, которая открывает [Popover](../popover/) с колёсами
- `TimeFieldColumn`: колонка [WheelPicker](../wheel-picker/) с часами, минутами по `step` или секундами, по `unit`, которая записывает выбранное время в поле ввода
- `TimeFieldOption`: обязательный шаблон опций колонки времени, `WheelPickerOption` для своего класса, стиля или содержимого

## Порядок композиции

1. `TimeField`
2. `TimeFieldInput`
3. Необязательный `Popover` с `TimeFieldTrigger` в `PopoverTrigger` и `WheelPicker` из колонок времени, в каждой шаблон `TimeFieldOption`, в `PopoverContent`

## Варианты

- Формат: `HH:mm` или `HH:mm:ss`
- Границы: необязательные `min` и `max`
- Состояние: контролируемое или неконтролируемое `value` на корне, `disabled` и `readOnly` на корне блокируют поле ввода, кнопку и колёса

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

- Формат, `min` и `max` должны согласовываться друг с другом.
- Частично введённые значения не следует слишком рано считать полным временем.
- В текстах продукта пользователям нужно ясно сообщать, что ожидается 24-часовой формат.
- Колёса отключают время вне `min` и `max`, а поворот, который вывел бы за них, останавливается на границе.
- Если функция на самом деле хранит временную метку, `DateTimeField` обычно понятнее, чем разделять правила для даты и времени вручную.

## Частые ошибки

- Полагаться на форматирование по локали вместо того, чтобы описать ожидаемую маску.
- Передавать границы, не соответствующие выбранному формату.
- Считать неполный текст в маске валидными данными для отправки.
