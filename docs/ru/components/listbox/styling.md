# Listbox: стилизация

## Обзор

Собственных переменных у `Listbox` нет. Список — простая прокручиваемая поверхность на глобальных токенах, а его строки — элементы [Option](../option/), которые стилизуются переменными `--option-*`. Высота, ширина и рамка задаются списку обычным CSS.

## Публичные CSS-переменные

Эти переменные принадлежат строкам-вариантам, которые рендерит `ListboxOption`.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--option-height` | `ListboxOption` | Высота строки, задаётся через `size` |
| `--option-br-ratio` | `ListboxOption` | Скругление строки как доля её высоты |
| `--option-color` | `ListboxOption` | Цвет текста |
| `--option-background-color` | `ListboxOption` | Фон по умолчанию |
| `--option-background-color-hover` | `ListboxOption` | Фон при наведении и у активного варианта |
| `--option-background-color-active` | `ListboxOption` | Фон при нажатии |

Сам список читает глобальные токены:

| Токен | Где используется | Назначение |
| --- | --- | --- |
| `--surface-secondary` | `Listbox` | Фон списка |
| `--focus-color` | `Listbox` | Кольцо фокуса списка |

## Переменные частей

### Listbox

Задаётся в `packages/ui/src/Listbox/style.module.css`. Список — flex-колонка с `padding: var(--spacing-4)`, `gap: var(--spacing-3)`, `border-radius: var(--spacing-8)` и `overflow: auto`. У него нет рамки и нет ограничения высоты: он растёт вместе с вариантами, пока вы не зададите `height` или `max-height`, а дальше прокручивается.

### ListboxGroup

Flex-колонка с тем же `gap: var(--spacing-3)`, что и у списка, поэтому варианты в группах и без них идут в одном ритме. Своей поверхности и стиля заголовка у группы нет — заголовок оформляйте сами.

### ListboxOption

`ListboxOption` объявляет все переменные `--option-*` на самой строке, поэтому значения, заданные на `Listbox`, до неё не доходят. Переопределяйте их селектором, который нацелен на строки, или через `style` у каждого варианта.

`size` на списке задаёт `--option-height` и шрифтовую шкалу всех строк, а `size` на варианте его переопределяет:

- `xs`: `var(--spacing-16)`
- `sm`: `var(--spacing-18)`
- `md`: `var(--spacing-21)`, по умолчанию
- `lg`: `var(--spacing-24)`
- `xl`: `var(--spacing-26)`

Высота фиксированная, поэтому строкам с двумя строками содержимого нужен `height: 'auto'`.

## Взаимодействие состояний и вариантов

- `aria-selected='true'` переключает строку на основные цвета.
- `data-active='true'` отмечает вариант, на который список указывает через `aria-activedescendant`, и даёт ему фон наведения, чтобы позиция с клавиатуры была видна, пока фокус на списке.
- `:focus-visible` на списке рисует обводку 2px цветом `--focus-color`. Сами варианты фокус никогда не получают.
- `aria-disabled='true'` на строке включает цвет отключённого текста и курсор `not-allowed`; `disabled` на списке ставит его всем строкам.
- С `multiple` соседние выбранные строки сливаются: смежные углы становятся прямыми, а зазор между строками заполняется, так что серия выбранных вариантов читается как один блок.

Значения размера, выбранного и отключённого состояний лежат в `:where()`, который не добавляет специфичности к классу строки, поэтому их переопределяет ваш селектор из двух классов или атрибутов.

## Примеры

### Выбранные строки другого цвета

Класс на списке нацеливается на его строки и переназначает цвета выбранного состояния и скругление, не трогая невыбранные строки.

<!-- example: listbox/selected-rows-color.tsx -->
```tsx
import { Listbox, ListboxOption } from '@vega-ui/react';
import './examples.css';

export default function SelectedRowsColor() {
  return (
    <Listbox
      aria-label='Reminder before the meeting'
      defaultValue='10'
      className='listbox-accent'
      style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}
    >
      <ListboxOption value='0'>At the start time</ListboxOption>
      <ListboxOption value='5'>5 minutes before</ListboxOption>
      <ListboxOption value='10'>10 minutes before</ListboxOption>
      <ListboxOption value='30'>30 minutes before</ListboxOption>
    </Listbox>
  );
}
```
<!-- /example -->

```css
.listbox-accent [role='option'][aria-selected='true'] {
  --option-background-color: var(--color-green-accent-800);
  --option-background-color-hover: var(--color-green-accent-900);
  --option-background-color-active: var(--color-green-accent-1000);
}

.listbox-accent [role='option'] {
  --option-br-ratio: 0.5;
}
```

### Компактные строки в списке фиксированной высоты

`size='sm'` делает все строки ниже, а `maxHeight` превращает список в прокручиваемую область, которая держит активный вариант в поле зрения.

<!-- example: listbox/many-options.tsx -->
```tsx
import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const builds = Array.from({ length: 300 }, (_, index) => {
  const number = 1480 - index;
  const branch = index % 7 === 0 ? 'release/4.2' : 'main';
  return { value: number, label: `Build ${number}`, branch };
});

export default function ManyOptions() {
  const [build, setBuild] = useState<number | null>(1480);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 320 }}>
      <Listbox
        aria-label='Build to deploy'
        value={build}
        onChangeValue={(next) => setBuild(next ?? null)}
        size='sm'
        style={{ maxHeight: 240, border: '1px solid var(--separator-opaque)' }}
      >
        {builds.map((item) => (
          <ListboxOption key={item.value} value={item.value} label={item.label}>
            {item.label}
            <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{item.branch}</span>
          </ListboxOption>
        ))}
      </Listbox>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{build === null ? 'No build selected.' : `Build ${build} will be deployed to staging.`}</Text>
    </div>
  );
}
```
<!-- /example -->

### Слитые выбранные строки

С `multiple` выберите соседние начинки — выбранные строки сольются в один блок.

<!-- example: listbox/several-choices.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const toppings = [
  { value: 'cheese', label: 'Extra mozzarella', price: 1.5 },
  { value: 'mushrooms', label: 'Mushrooms', price: 1 },
  { value: 'olives', label: 'Black olives', price: 1 },
  { value: 'pepperoni', label: 'Pepperoni', price: 2 },
  { value: 'jalapenos', label: 'Jalapeños', price: 0.5 },
];

export default function SeveralChoices() {
  const [selected, setSelected] = useState<string[]>(['cheese']);
  const total = toppings
    .filter((item) => selected.includes(item.value))
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Toppings' multiple value={selected} onChangeValue={setSelected} style={{ border: '1px solid var(--separator-opaque)' }}>
        {toppings.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {selected.length} selected · +${total.toFixed(2)}
        </Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0} onClick={() => setSelected([])}>
          Clear
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- `outline` списка в `:focus-visible`: это единственный индикатор фокуса, потому что варианты фокус не получают
- фон строк с `data-active='true'`: по нему пользователи клавиатуры видят, где находятся
- цвета выбранного состояния так, что выбранные и невыбранные строки становятся похожи
- `overflow` списка: без него список с ограничением высоты перестаёт прокручиваться, и активный вариант может уйти из поля зрения
