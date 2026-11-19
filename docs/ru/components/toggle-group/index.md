# ToggleGroup

## Профиль документа

`advanced interactive`

## Кратко

`ToggleGroup` хранит значение своих элементов `ToggleGroupToggle` — кнопок-переключателей, у каждой из которых свой `value`. По умолчанию нажат один элемент за раз, как `radiogroup` из элементов `radio` в [примере WAI-ARIA toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/); с `multiple` каждый элемент включается и выключается сам по себе, а значение становится массивом. Группа — одна остановка табуляции, а стрелки переносят фокус между её элементами, не нажимая их. Используйте её для выбора, который применяется сразу: выравнивание, режим вида или набор фильтров.

## Импорт

```tsx
import {
  ToggleGroup,
  ToggleGroupToggle,
  type ToggleGroupProps,
  type ToggleGroupToggleProps,
  type ToggleGroupValue,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ToggleGroupProps`
- `ToggleGroupToggleProps`
- `ToggleGroupValue`

## Минимальная композиция

<!-- example: toggle-group/minimal-composition.tsx -->
```tsx
import { Icon, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <ToggleGroup aria-label='Alignment' size='sm' defaultValue='start'>
      <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
    </ToggleGroup>
  );
}
```
<!-- /example -->

## Обязательные части

- `ToggleGroup`: группа с вашим `aria-label` или `aria-labelledby`
- `ToggleGroupToggle`: элемент группы со своим `value`

## Необязательные части

- `Icon` внутри элемента: рядом с текстом или один с `square` и `aria-label`
- [Toolbar](../toolbar/) вокруг группы: её элементы входят в навигацию панели

## Порядок композиции

1. `ToggleGroup`
2. `ToggleGroupToggle`, каждый со своим `value`, в том порядке, в котором они показаны
3. Его содержимое: `Icon` и текст или один `Icon` с `square`

## Варианты

- Один нажатый элемент (по умолчанию) со значением `string | null` или каждый элемент сам по себе с `multiple` и значением `string[]`
- Неконтролируемая через `defaultValue` или контролируемая через `value` и `onChangeValue`
- Размеры через `size`: `xs`, `sm`, `md`, `lg`, `xl`, как у `Button`; `size` на элементе его перебивает
- Отключение через `disabled` на группе для всех её элементов или на элементе только для него
- Элементы с текстом, иконкой и текстом или одной иконкой с `square` и `aria-label`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- [Toggle](../toggle/)

## Пограничные случаи

- У `ToggleGroupToggle` нет своего нажатого состояния: то, какие элементы нажаты, решает значение группы, а об изменениях группа сообщает через `onChangeValue`.
- Без `multiple` повторное нажатие нажатого элемента оставляет его нажатым, как у радиокнопки: нажатием значение никогда не возвращается к `null`. Чтобы сначала ничего не было нажато, начните с `defaultValue={null}`.
- Стрелки обеих осей переносят фокус и с краёв переходят на противоположный конец, а Home и End — к первому и последнему элементу; ни одна из них не нажимает элемент. Tab входит в группу на нажатом элементе или, если нажатого нет, на первом доступном; с `multiple` — на элементе первого значения в массиве. Когда фокус покидает группу, её остановка табуляции возвращается на нажатый элемент.
- Внутри [Toolbar](../toolbar/) группа отдаёт панели свою остановку табуляции и стрелки, а её элементы входят в панель без `ToolbarItem`; тогда Tab входит в панель на её первом элементе, а не на нажатом элементе группы.
- У группы нет ориентации: это строка. Для столбца, например в вертикальной панели, задайте `flex-direction: column` сами.
- Группа не рендерит скрытых полей: её значение не входит в отправку формы.

## Частые ошибки

- Группа или элемент только с иконкой без `aria-label`: компоненты сами подписи не ставят.
- Один `value` у двух элементов: группа различает элементы только по `value`.
- [Toggle](../toggle/), `Button` или ссылка внутри группы: элементами группы бывают только `ToggleGroupToggle`.
- `ToolbarItem` вокруг элементов внутри [Toolbar](../toolbar/): они регистрируются в панели сами, а `ToolbarItem` регистрирует их второй раз.
- Группа для значения, которое отправляет форма: используйте [SegmentedControl](../segmented-control/), [Radio](../radio/) или [Checkbox](../checkbox/).
