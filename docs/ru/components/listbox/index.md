# Listbox

## Профиль документа

`form-control`

## Кратко

`Listbox` — всегда видимый список, в котором выбирают один или несколько вариантов, как в нативном `select` с `size`. Фокус остаётся на списке, а активный вариант он указывает через `aria-activedescendant`.

## Импорт

```tsx
import { Listbox, ListboxGroup, ListboxOption, type ListboxGroupProps, type ListboxOptionProps, type ListboxProps, type ListboxValue } from '@vega-ui/react';
```

## Экспортируемые типы

- `ListboxProps`
- `ListboxOptionProps`
- `ListboxGroupProps`
- `ListboxValue`

## Базовое использование

<!-- example: listbox/basic-usage.tsx -->
```tsx
import { Listbox, ListboxOption } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Listbox aria-label='Delivery method' defaultValue='courier' style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}>
      <ListboxOption value='pickup'>Pickup point</ListboxOption>
      <ListboxOption value='courier'>Courier to the door</ListboxOption>
      <ListboxOption value='locker'>Parcel locker</ListboxOption>
    </Listbox>
  );
}
```
<!-- /example -->

## Варианты

- Выбор: одно значение или массив с `multiple`
- Размер: `xs`, `sm`, `md`, `lg`, `xl`
- Содержимое: простой текст или разметка с `label` для поиска при вводе (typeahead)

## Связанные документы

- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [Анатомия](./anatomy.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- [Select](../select/)
- [Option](../option/)

## Пограничные случаи

- `value={null}` очищает контролируемый список с одиночным выбором, а `undefined` делает его неконтролируемым.
- Отключённый список отключает все свои варианты, каким бы ни был их собственный `disabled`.
- Варианты читаются из DOM при каждом нажатии клавиши, поэтому фильтрация и добавление не требуют регистрации.
- Высота задаётся обычным CSS на списке, и он прокручивается сам.

## Частые ошибки

- Список без `aria-label` или `aria-labelledby`.
- Одинаковый `value` у двух вариантов.
- `Listbox` для компактного поля формы, где лучше подходит [Select](../select/).
