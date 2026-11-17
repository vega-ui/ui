# Combobox: анатомия

## Обзор

`Combobox` — составной компонент. Корень владеет выбранным значением, состоянием открытия и активным вариантом и обрабатывает клавиатуру в поле. Текст поля — обычное значение input, которым владеет само поле или ваше состояние. Варианты — элементы `ListboxOption` из [Listbox](../listbox/): они регистрируются в корне при монтировании, поэтому отфильтровать их — значит просто отрендерить меньше.

## Обязательные части

### `Combobox`

Корень композиции и якорь, под которым позиционируется список.

- Обязателен: да
- Владеет: `value`, `open`, активным вариантом, `disabled`, `readOnly`, `size`
- Должен оборачивать `ComboboxInput` и `ComboboxListbox`
- Содержит только поле и список: список открывается под всем корнем, поэтому подпись или поясняющий текст внутри него сдвигают список вниз

### `TextField`

Поверхность поля вокруг ввода, из [TextField](../text-field/).

- Обязателен: да, как визуальное поле
- Его `size` задаёт высоту поля и не зависит от `size` у `Combobox`
- Может содержать `ComboboxTrigger`, иконки, спиннер или кнопки рядом с вводом

### `ComboboxInput`

Текстовое поле с `role="combobox"`, рендерится как `TextFieldInput`.

- Обязателен: да
- Должен находиться внутри `TextField` и внутри `Combobox`
- Всё время держит фокус; активный вариант объявляется через `aria-activedescendant`
- Принимает любые атрибуты `<input>`: `value`, `onChange`, `name`, `required`, `placeholder`
- Нуждается в имени через `Label` или `aria-label`

### `ComboboxListbox`

Список с `role="listbox"`, нативный элемент `popover="manual"` в top layer.

- Обязателен: да
- Показывается, пока combobox открыт и в нём есть хотя бы один вариант
- Нажатие внутри него оставляет фокус в поле
- Назовите его через `aria-label` или `aria-labelledby`

### `ListboxOption`

Одна подсказка — тот же вариант, что используют `Listbox` и `Select`.

- Обязателен: да, от нуля и больше одновременно
- `value` — `string` или `number`, уникальное в списке
- `label` — текст, который записывается в поле, когда содержимое — разметка; без него используется текстовое содержимое

## Необязательные части

### `ComboboxTrigger`

Кнопка внутри `TextField` после поля, которая открывает и закрывает список. Через неё пользователи мыши и сенсорного экрана добираются до вариантов, ничего не вводя.

- Обязателен: нет; рекомендуется, когда пользователь может не знать, что вводить
- Поместите внутрь `ComboboxIcon` и назовите кнопку через `aria-label`
- Вне порядка обхода по Tab; нажатие оставляет фокус в поле
- Отключена, пока combobox `disabled` или `readOnly`

### `ComboboxIcon`

Шеврон внутри `ComboboxTrigger`.

- Обязателен: нет, но кнопке нужна какая-то иконка
- Размер задаёт `TextField`; переворачивается, пока список показан
- Принимает вашу иконку через `children`

### `ListboxGroup`

Группирует связанные варианты как нативный `optgroup` и рендерит `role="group"`.

- Обязателен: нет
- Размещайте его внутри `ComboboxListbox`, а `ListboxOption` — внутри него
- Назовите его через `aria-labelledby`, указывающий на ваш заголовок, или через `aria-label`
- Не рендерите группу, когда фильтр убрал все её варианты

### Содержимое поля вне корня

`Label`, `HelperText`, сообщения о статусе и скрытое поле, дублирующее значение, — ваши собственные элементы рядом с `Combobox`, а не его части.

## Порядок композиции

1. `Combobox`
2. `TextField`
3. `ComboboxInput`
4. необязательный `ComboboxTrigger` с `ComboboxIcon`
5. `ComboboxListbox`
6. необязательный `ListboxGroup` со своим заголовком
7. `ListboxOption`

## Корректные варианты композиции

Корень содержит только поле и список, поэтому список открывается прямо под полем, а `Label` снаружи корня даёт полю имя через его `id`.

<!-- example: combobox/grouped-options.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxGroup, ListboxOption, Text, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const regions = [
  {
    name: 'Americas',
    zones: [
      { id: 'America/Los_Angeles', city: 'Los Angeles', offset: 'UTC−8' },
      { id: 'America/New_York', city: 'New York', offset: 'UTC−5' },
      { id: 'America/Sao_Paulo', city: 'São Paulo', offset: 'UTC−3' },
    ],
  },
  {
    name: 'Europe',
    zones: [
      { id: 'Europe/London', city: 'London', offset: 'UTC+0' },
      { id: 'Europe/Berlin', city: 'Berlin', offset: 'UTC+1' },
      { id: 'Europe/Helsinki', city: 'Helsinki', offset: 'UTC+2' },
    ],
  },
  {
    name: 'Asia',
    zones: [
      { id: 'Asia/Dubai', city: 'Dubai', offset: 'UTC+4' },
      { id: 'Asia/Singapore', city: 'Singapore', offset: 'UTC+8' },
      { id: 'Asia/Tokyo', city: 'Tokyo', offset: 'UTC+9' },
    ],
  },
];

export default function GroupedOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = regions
    .map((region) => ({ ...region, zones: region.zones.filter((zone) => zone.city.toLowerCase().includes(normalized)) }))
    .filter((region) => region.zones.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Label htmlFor={id}>Time zone</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Search by city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger aria-label='Show time zones'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Time zones'>
          {matches.map((region) => (
            <ListboxGroup key={region.name} aria-labelledby={`${id}-${region.name}`}>
              <Text
                id={`${id}-${region.name}`}
                size={2}
                fontWeight={600}
                style={{ paddingInline: 'var(--spacing-10)', paddingBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}
              >
                {region.name}
              </Text>
              {region.zones.map((zone) => (
                <ListboxOption key={zone.id} value={zone.id} label={zone.city} style={{ gap: 'var(--spacing-8)' }}>
                  {zone.city}
                  <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{zone.offset}</span>
                </ListboxOption>
              ))}
            </ListboxGroup>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

Группы рендерятся, только пока в них есть подходящие варианты, и каждая названа своим заголовком через `aria-labelledby`. Варианты с разметкой передают `label`, поэтому при выборе в поле записывается город, а не смещение рядом с ним.

## Некорректные варианты композиции

### `ComboboxInput` вне `TextField`

Поле теряет поверхность, обводку фокуса и размер `TextField`.

### `ComboboxTrigger` вне `TextField`

Кнопка теряет размер поля и стоит отдельно от поля, к которому относится. Держите её внутри поля, после ввода.

### Части вне `Combobox`

`ComboboxInput`, `ComboboxTrigger`, `ComboboxIcon` и `ComboboxListbox` читают контекст корня. Вне его поле не связано со списком, и клавиатура ничего не делает.

### `Label` или `HelperText` внутри `Combobox`

Список позиционируется под корнем и не уже его, поэтому открывается ниже поясняющего текста, а не под полем.

### `Option` вместо `ListboxOption`

Простой `Option` имеет `role="option"`, но не регистрируется в корне, поэтому никогда не становится активным, а его выбор ничего не делает.

### Строка «ничего не найдено» внутри `ComboboxListbox`

Listbox содержит только варианты и группы. Кроме того, список скрывается, пока в нём нет вариантов, поэтому сообщение внутри него не видно как раз тогда, когда ничего не найдено. Размещайте сообщение рядом с полем.

### Интерактивные элементы внутри варианта

Фокус остаётся в поле, поэтому кнопки или ссылки внутри варианта недоступны с клавиатуры.
