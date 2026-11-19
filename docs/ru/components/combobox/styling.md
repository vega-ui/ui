# Combobox: стилизация

## Обзор

`Combobox` стилизует только свой список. Поле — это [TextField](../text-field/) со своим размером и переменными, а варианты — строки [Option](../option/), которые стилизуются переменными `--option-*`, как в [Listbox](../listbox/).

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--combobox-size` | корень, `ComboboxListbox` | Основа для скругления списка, задаётся `size` |
| `--combobox-br-ratio` | корень, `ComboboxListbox` | Общий коэффициент скругления, по умолчанию `--br-ratio` |
| `--combobox-listbox-br-ratio` | `ComboboxListbox` | Собственный коэффициент скругления списка |
| `--combobox-icon-color` | `ComboboxIcon` | Цвет иконки, по умолчанию `--label-tertiary` |

Список также читает глобальные токены:

| Токен | Где используется | Назначение |
| --- | --- | --- |
| `--surface-secondary` | `ComboboxListbox` | Фон списка |
| `--surface-shadow` | `ComboboxListbox` | Тень списка |
| `--z-index-popover` | `ComboboxListbox` | Порядок наложения |

## Переменные уровня частей

### Корень

Определены в `packages/ui/src/Combobox/style.module.css`. `size` задаёт `--combobox-size`:

- `xs`: `var(--spacing-16)`
- `sm`: `var(--spacing-18)`
- `md`: `var(--spacing-21)`, по умолчанию
- `lg`: `var(--spacing-24)`
- `xl`: `var(--spacing-26)`

Тот же `size` задаёт высоту каждого `ListboxOption`. Высота поля берётся из `size` у `TextField`, поэтому задавайте обоим один и тот же токен.

### ComboboxListbox

Список позиционируется под корнем через CSS anchor positioning и переворачивается вверх, когда внизу не хватает места. Он не уже корня и растёт вместе с содержимым, имеет `padding: var(--spacing-4)`, `gap: var(--spacing-3)` и `max-height: 250px` и прокручивается после этой высоты. Его скругление — `--combobox-size`, умноженное на `--combobox-listbox-br-ratio` или на `--combobox-br-ratio`, если первый не задан.

### ComboboxTrigger

`Button` высотой с поле (`--button-height: var(--input-height)`) и такой же ширины с `square`, прозрачный, цвета текста, с четвертичными заливками при наведении и нажатии.

### ComboboxIcon

Размер иконки берётся из размера `TextField`: `xs` для полей `xs` и `sm`, `sm` для `md`, `md` для `lg` и `xl`. Его цвет — `var(--combobox-icon-color, var(--label-tertiary))`, и он переворачивается, пока список показан.

### ListboxOption

Строки определяют все переменные `--option-*` на себе, поэтому значения, заданные на корне или списке, до них не доходят. Переопределяйте их селектором, который нацелен на строки, или через `style` на каждом варианте. Строкам с содержимым в две строки нужен `height: 'auto'`.

## Взаимодействие состояний и вариантов

- Список анимируется через `:popover-open`: появляется с проявлением и масштабом и исчезает до того, как скрыться. При `prefers-reduced-motion: reduce` масштаб не меняется.
- `:hover` даёт варианту светлый фон наведения, не делая его активным.
- `aria-selected='true'` переключает вариант на основные цвета. Он следует за активным вариантом, пока тот есть, а иначе остаётся на варианте выбранного значения.
- `data-open='true'` на поле и на `ComboboxIcon`, пока список показан; иконка поворачивается на 180 градусов.
- Состояния ошибки, отключённости и только для чтения поле берёт из `TextField` и атрибутов input, таких как `aria-invalid` и `:user-invalid`.

## Примеры

### Форма и высота списка

Задайте коэффициент на корне, чтобы скруглить список, и измените его высоту селектором или через `style` на `ComboboxListbox`.

```css
.rounded-combobox {
  --combobox-listbox-br-ratio: 0.5;
}

.rounded-combobox [role='listbox'] {
  max-height: 320px;
}
```

### Варианты в две строки

Варианты с аватаром и второй строкой задают `height: 'auto'` и собственные отступы, а текст для поля хранят в `label`.

<!-- example: combobox/rich-option-content.tsx -->
```tsx
import { Avatar, AvatarFallback, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind.example' },
  { id: 'elif', initials: 'EY', name: 'Elif Yılmaz', email: 'elif.yilmaz@northwind.example' },
];

export default function RichOptionContent() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const owner = people.find((person) => person.id === ownerId);
  const normalized = query.trim().toLowerCase();
  const matches = people.filter((person) => person.name.toLowerCase().includes(normalized) || person.email.includes(normalized));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Account owner</Label>
      <Combobox value={ownerId} onChangeValue={(next) => setOwnerId(next)}>
        <TextField>
          {owner && (
            <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)' }}>
              <AvatarFallback>{owner.initials}</AvatarFallback>
            </Avatar>
          )}
          <ComboboxInput id={id} placeholder='Name or email' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show people'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='People' style={{ maxWidth: 320 }}>
          {matches.map((person) => (
            <ListboxOption
              key={person.id}
              value={person.id}
              label={person.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
            >
              <Avatar size='md' aria-hidden='true'>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span>{person.name}</span>
                <span style={{ fontSize: 'var(--font-size-2)', opacity: 0.7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {person.email}
                </span>
              </span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

## Что не переопределять

- `popover`, `inset` и anchor positioning у `ComboboxListbox`, которые держат его под полем и в top layer
- обработку `mousedown` в списке, которая оставляет фокус в поле
- фон активного варианта — единственный признак положения клавиатуры
- поле и варианты на разных токенах размера, из-за чего строки списка выглядят не связанными с полем
