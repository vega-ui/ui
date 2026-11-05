# Listbox: анатомия

## Обзор

`Listbox` — составной компонент. Корень владеет выбором, активным вариантом, навигацией с клавиатуры и typeahead и передаёт их частям через контекст. Варианты читаются из DOM при каждом нажатии клавиши, поэтому их не нужно регистрировать — их можно свободно фильтровать и добавлять.

## Обязательные части

### `Listbox`

Корень композиции и элемент с `role='listbox'`.

- Обязательная: да
- Владеет: `value`, `multiple`, `disabled`, `size`, `typeahead`, активным вариантом и обработкой клавиатуры
- Должна оборачивать все `ListboxOption` и `ListboxGroup`
- Нуждается в имени через `aria-labelledby` или `aria-label`

### `ListboxOption`

Один вариант выбора, рендерится как [Option](../option/) с `role='option'`.

- Обязательная: да, один или несколько
- Рендерится внутри `Listbox` — напрямую или внутри `ListboxGroup`
- `value` — `string` или `number`, уникальное в пределах списка: из него строится `id` варианта
- `label` даёт typeahead простой текст, когда содержимое — разметка

## Необязательные части

### `ListboxGroup`

Группирует связанные варианты, как нативный `optgroup`, и рендерит `role='group'`.

- Обязательная: нет
- Размещается внутри `Listbox`, а `ListboxOption` кладутся в неё
- Назовите её через `aria-labelledby`, указывающий на ваш заголовок, или через `aria-label`

### Заголовок группы

Любой ваш элемент с `id`, отрендеренный внутри группы, на который ссылается её `aria-labelledby`. Отдельной части для заголовка компонент не экспортирует.

### Скрытые поля

`Listbox` не отправляет значение. Чтобы выбор ушёл вместе с формой, рендерите рядом со списком элементы `<input type='hidden'>` из того же состояния.

## Порядок композиции

1. `Listbox`
2. необязательная `ListboxGroup` со своим заголовком
3. `ListboxOption`

## Корректные варианты композиции

<!-- example: listbox/groups-and-a-scrolling-list.tsx -->
```tsx
import { Listbox, ListboxGroup, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const countries = [
  {
    name: 'France',
    airports: [
      { code: 'CDG', name: 'Paris Charles de Gaulle' },
      { code: 'ORY', name: 'Paris Orly' },
      { code: 'NCE', name: 'Nice Côte d’Azur' },
      { code: 'LYS', name: 'Lyon Saint-Exupéry' },
    ],
  },
  {
    name: 'Germany',
    airports: [
      { code: 'FRA', name: 'Frankfurt' },
      { code: 'MUC', name: 'Munich' },
      { code: 'BER', name: 'Berlin Brandenburg' },
    ],
  },
  {
    name: 'Japan',
    airports: [
      { code: 'HND', name: 'Tokyo Haneda' },
      { code: 'NRT', name: 'Tokyo Narita' },
      { code: 'KIX', name: 'Osaka Kansai' },
    ],
  },
];

export default function GroupsAndAScrollingList() {
  const id = useId();

  return (
    <Listbox aria-label='Departure airport' defaultValue='MUC' style={{ width: '100%', maxWidth: 320, maxHeight: 260, border: '1px solid var(--separator-opaque)' }}>
      {countries.map((country) => (
        <ListboxGroup key={country.name} aria-labelledby={`${id}-${country.name}`}>
          <Text
            id={`${id}-${country.name}`}
            size={2}
            fontWeight={600}
            style={{ paddingInline: 'var(--spacing-10)', paddingBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}
          >
            {country.name}
          </Text>
          {country.airports.map((airport) => (
            <ListboxOption key={airport.code} value={airport.code} label={airport.name} style={{ gap: 'var(--spacing-8)' }}>
              {airport.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{airport.code}</span>
            </ListboxOption>
          ))}
        </ListboxGroup>
      ))}
    </Listbox>
  );
}
```
<!-- /example -->

Список назван через `aria-label`, каждая группа получает имя от своего заголовка через `aria-labelledby`, а у каждого варианта уникальное `value`. Варианты с разметкой передают `label`, поэтому typeahead сверяет название аэропорта, а не код рядом с ним.

## Некорректные варианты композиции

### `ListboxOption` вне `Listbox`

Строка рендерится, но у неё нет контекста списка: она никогда не становится выбранной и не реагирует на клавиатуру.

### `Option` вместо `ListboxOption`

У обычного `Option` есть `role='option'`, поэтому список доходит до него стрелками, но выбор его не меняет значение.

### Два варианта с одинаковым `value`

Оба получают одинаковый `id`, поэтому подсвечиваются и выбираются вместе.

### Интерактивные элементы внутри варианта

Фокус остаётся на списке, поэтому кнопки, ссылки и поля внутри варианта недоступны с клавиатуры и сбивают скринридеры.

### Группа без имени

`ListboxGroup` без `aria-labelledby` или `aria-label` объявляется как безымянная группа.
