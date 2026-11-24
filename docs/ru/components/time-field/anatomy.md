# TimeField: анатомия

## Обзор

`TimeField` — небольшая составная обёртка вокруг `TextField`. Корень предоставляет контекст формата и границ, `TimeFieldInput` применяет поведение маски, а необязательные колонки-колёса выбирают время в поповере.

## Обязательные части

### `TimeField`

Обязателен. Отвечает за контекст `format`, `min`, `max` и `step`, а также за `disabled` и `readOnly` поля ввода, кнопки и колёс.

### `TimeFieldInput`

Обязателен. Рендерит само поле ввода с маской.

## Необязательные части

### `TimeFieldTrigger`

Рендерит `Button` с `aria-haspopup="dialog"`, который отключается вместе с полем. Поместите его в `PopoverTrigger asChild` и передайте иконку и `aria-label`.

### `TimeFieldColumn`

Рендерит [WheelPickerColumn](../wheel-picker/) с той частью времени, которую называет обязательный `unit`: `hour` — часы от 00 до 23, `minute` и `second` — минуты и секунды по `step`, а также минуту введённого времени вне шага. Колонка показывает время поля, а у пустого — `min`, отключает опции вне `min` и `max` и записывает время, на которое повернулась, в поле ввода с `input` и `change`, удерживая его в границах. `unit='second'` используется с `format='HH:mm:ss'`. По умолчанию колонки зациклены. Поместите их в `WheelPicker` и назовите каждую через `aria-label`; `autoFocus` на первой переводит фокус в поповер при открытии.

Дети колонки обязательны: это шаблон опции, он рендерится один раз на каждую опцию, обычно `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`. Опцию читайте через `useTimeFieldOptionContext()`: её `unit`, двузначное `value` и признак `disabled`. Колонка по-прежнему объявляет и ищет при наборе двузначное значение.

### `TimeFieldOption`

Рендерит [WheelPickerOption](../wheel-picker/) со значением и признаком недоступности опции вокруг него: `className`, `style`, `ref` и любые атрибуты попадают на строку. Положите в него `WheelPickerFace`: без детей грань показывает двузначное значение, с детьми — их. Шаблон колонки времени должен рендерить его как строку.

## Порядок композиции

1. `TimeField`
2. `TimeFieldInput`
3. Необязательно `Popover` > `PopoverTrigger` > `TimeFieldTrigger` и `PopoverContent` > `WheelPicker` > колонки времени > `TimeFieldOption`

## Корректные варианты композиции

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

<!-- example: time-field/wheels-in-a-popover.tsx -->
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
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function WheelsInAPopover() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='pickup-time'>Pickup time</Label>
      <TimeField defaultValue='12:30' min='09:00' max='21:00' step={15}>
        <TimeFieldInput id='pickup-time' name='pickupTime' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose pickup time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose pickup time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Pickup time'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
              <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Границы, не соответствующие формату

Пример: `format='HH:mm'` с `max`, содержащим секунды.

### Колонка времени без `TimeFieldOption`

Колонка рендерит своих детей как строку каждой опции; без `TimeFieldOption` среди них ей нечего крутить.

### Колонка секунд без секунд в формате

При `format='HH:mm'` в значении нет секунд, поэтому `TimeFieldColumn` с `unit='second'` крутится, но ничего не записывает. Добавляйте её только с `format='HH:mm:ss'`.

### Колонки времени вне `TimeField` или `WheelPicker`

Колонка читает время из `TimeField`, а строки — из `WheelPicker`, и вне любого из них не работает: без поля она крутит время, которого нет ни в одном поле, а без пикера теряет высоту строк и барабан.

### Обёртка без `TimeFieldInput`

Корень рендерится, но контрола с маской нет.
