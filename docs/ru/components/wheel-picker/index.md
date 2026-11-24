# WheelPicker

## Профиль документа

`advanced interactive`

## Кратко

`WheelPicker` выстраивает колонки опций, которые крутятся как колёса вокруг одной полосы выбора: для времени, длительности или значения с единицей. Каждая `WheelPickerColumn` — [spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) над своими дочерними `WheelPickerOption`, как `select` над своими опциями: она хранит своё значение, крутится свайпом, колёсиком мыши или клавишами, а с `loop` переходит с последней опции на первую. Колонки прокручиваются нативным scroll snap, поэтому свайп сохраняет инерцию платформы. Используйте его там, где колесо читается лучше списка, в основном на сенсорных экранах; для значения, которое вводят с клавиатуры, берите [TimeField](../time-field/), [DateField](../date-field/) или [NumberField](../number-field/).

## Импорт

```tsx
import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';
```

## Экспортируемые типы

- `WheelPickerProps`
- `WheelPickerColumnProps`
- `WheelPickerFaceProps`
- `WheelPickerOptionProps`
- `WheelPickerSize`

## Минимальная композиция

<!-- example: wheel-picker/minimal-composition.tsx -->
```tsx
import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const minutes = Array.from({ length: 60 }, (_, minute) => minute);
const pad = (value: number) => String(value).padStart(2, '0');

export default function MinimalComposition() {
  return (
    <WheelPicker aria-label='Alarm time'>
      <WheelPickerColumn aria-label='Hours' loop defaultValue={7}>
        {hours.map((hour) => <WheelPickerOption key={hour} value={hour}><WheelPickerFace>{pad(hour)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
      <WheelPickerColumn aria-label='Minutes' loop defaultValue={30}>
        {minutes.map((minute) => <WheelPickerOption key={minute} value={minute}><WheelPickerFace>{pad(minute)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
    </WheelPicker>
  );
}
```
<!-- /example -->

## Обязательные части

- `WheelPicker`: группа колонок, число видимых строк и полоса выбора
- `WheelPickerColumn`: одно колесо, spinbutton со своим значением
- `WheelPickerOption`: одна опция колонки со своим `value`
- `WheelPickerFace`: то, что показывает опция, поворачивается вместе с колесом

## Необязательные части

- Текст между колонками, например единица или слово фразы: любой элемент внутри `WheelPicker`, скрытый от вспомогательных технологий, когда имена колонок уже это говорят
- [Popover](../popover/) или [Sheet](../sheet/) вокруг пикера, который открывает кнопка со значением

## Порядок композиции

1. `WheelPicker`
2. `WheelPickerColumn`, по одной на каждую часть значения
3. `WheelPickerOption`, по одной на опцию, в порядке колеса
4. `WheelPickerFace`, по одной в каждой опции

## Варианты

- Неконтролируемая колонка через `defaultValue` или контролируемая через `value` и `onChangeValue`, у каждой своя
- Зацикленная через `loop` или ограниченная, где колесо останавливается на первой и последней опции
- Число видимых строк через `rows` у `WheelPicker`, по умолчанию 5; берите нечётное число
- Размер через `size` у `WheelPicker`, от `xs` до `xl`, по умолчанию `md`: строки и текст повторяют высоту и текст полей того же размера
- Недоступные опции через `disabled` у `WheelPickerOption`: колесо и клавиши их пропускают
- Колонки только для чтения и отключённые через `readOnly` и `disabled` у `WheelPickerColumn`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- [SnapScroller](../snap-scroller/)

## Пограничные случаи

- `onChangeValue` вызывается, когда прокрутка остановилась на опции, а не пока колесо крутится; клавиша сообщает значение сразу.
- Прокрутка, остановившаяся на недоступной опции, доезжает до ближайшей доступной и сообщает её.
- Колонка без `value` и `defaultValue` начинает с первой доступной опции и ничего не сообщает, пока пользователь её не повернёт.
- Когда родитель задаёт другое `value`, колонка поворачивается к нему: плавно, если оно рядом, и сразу, если далеко. Зацикленная колонка выбирает короткий путь.
- Когда выбранная родителем опция становится недоступной, например 31-е число после переключения на февраль, колонка держит её, пока родитель не задаст другое значение: ограничьте значение в родителе.
- Когда родитель убирает выбранную опцию, колонка переходит к опции, вставшей на её место, или к последней и сообщает её. Когда меняется число опций, выбранная опция остаётся в полосе.
- Колонки не рендерят полей формы. Если форма должна отправить значения, продублируйте их в `<input type="hidden">` сами.

## Частые ошибки

- Пикер или колонка без имени: компоненты никогда не задают подпись сами. Назовите `WheelPicker` и каждую `WheelPickerColumn` через `aria-label` или `aria-labelledby`.
- Сложное содержимое опции без `label`: поиск по набору и `aria-valuetext` читают текст опции, а у иконки его нет, поэтому они берут сырой `value`.
- Колесо для длинного свободного значения, например цены или года, который удобнее ввести с клавиатуры: используйте [NumberField](../number-field/) или [DateField](../date-field/). Каждая строка колонки анимируется, поэтому держите в колонке не больше нескольких сотен опций.
- Ожидание `onChangeValue` на каждой строке, мимо которой проходит колесо: колонка сообщает, где колесо остановилось.
