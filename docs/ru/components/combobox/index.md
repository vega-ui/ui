# Combobox

## Профиль документа

`advanced interactive`

## Кратко

`Combobox` — текстовое поле со списком подсказок: ввод открывает список, стрелки двигаются по нему, а выбор варианта записывает его подпись в поле. Компонент следует паттерну WAI-ARIA combobox, по умолчанию с автодополнением списком и ручным выбором, поэтому фокус всегда остаётся в поле, а активный вариант объявляется через `aria-activedescendant`. Варианты принадлежат приложению, и фильтрует их тоже приложение; с `autocomplete='both'` или `'inline'` поле ещё и дополняет набранный текст, а `ComboboxTrigger` открывает список без ввода.

## Импорт

```tsx
import {
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  ListboxGroup,
  ListboxOption,
  TextField,
  type ComboboxAutocomplete,
  type ComboboxIconProps,
  type ComboboxInputProps,
  type ComboboxListboxProps,
  type ComboboxProps,
  type ComboboxSize,
  type ComboboxTriggerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ComboboxProps<Value extends string | number = string>`
- `ComboboxInputProps`
- `ComboboxListboxProps`
- `ComboboxTriggerProps`
- `ComboboxIconProps`
- `ComboboxAutocomplete = 'none' | 'list' | 'both' | 'inline'`
- `ComboboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string`

## Минимальная композиция

<!-- example: combobox/minimal-composition.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const cities = ['Amsterdam', 'Athens', 'Berlin', 'Copenhagen', 'Dublin', 'Lisbon', 'London', 'Madrid', 'Oslo', 'Prague', 'Rome', 'Vienna'];

export default function MinimalComposition() {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>City</Label>
      <Combobox>
        <TextField>
          <ComboboxInput id={id} placeholder='Start typing a city' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show cities'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
    </div>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyCombobox` передаёт свои пропсы в `Combobox`, `id`, `name`, `placeholder` и `text` с `onChangeText` — полю ввода, называет кнопку с шевроном и список через `triggerLabel` и `listLabel`, а дочерние элементы кладёт в список. См. [Рецепты компонентов](../../recipes.md).

<!-- example: combobox/recipe.tsx -->
```tsx
import {
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  Label,
  ListboxOption,
  TextField,
  type ComboboxProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

interface MyComboboxProps<Value extends string | number = string> extends ComboboxProps<Value> {
  name?: string
  placeholder?: string
  text?: string
  onChangeText?(text: string): void
  triggerLabel: string
  listLabel: string
}

export function MyCombobox<Value extends string | number = string>({
  id,
  name,
  placeholder,
  text,
  onChangeText,
  triggerLabel,
  listLabel,
  children,
  ...props
}: MyComboboxProps<Value>) {
  return (
    <Combobox {...props}>
      <TextField>
        <ComboboxInput id={id} name={name} placeholder={placeholder} value={text} onChange={(event) => onChangeText?.(event.target.value)} />
        <ComboboxTrigger square aria-label={triggerLabel}>
          <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
        </ComboboxTrigger>
      </TextField>
      <ComboboxListbox aria-label={listLabel}>{children}</ComboboxListbox>
    </Combobox>
  );
}

const cities = ['Amsterdam', 'Athens', 'Berlin', 'Copenhagen', 'Dublin', 'Lisbon', 'London', 'Madrid', 'Oslo', 'Prague', 'Rome', 'Vienna'];

export default function Recipe() {
  const id = useId();
  const [query, setQuery] = useState('');
  const matches = cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Destination</Label>
      <MyCombobox
        id={id}
        name='destination'
        placeholder='Start typing a city'
        text={query}
        onChangeText={setQuery}
        triggerLabel='Show cities'
        listLabel='Cities'
      >
        {matches.map((city) => <ListboxOption key={city} value={city}>{city}</ListboxOption>)}
      </MyCombobox>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Combobox`: корень, который хранит выбранное значение и состояние открытия
- `TextField`: поверхность поля вокруг ввода
- `ComboboxInput`: текстовое поле с `role="combobox"`
- `ComboboxListbox`: список с `role="listbox"`
- `ListboxOption`: одна подсказка

## Необязательные части

- `ComboboxTrigger`: кнопка в поле, которая открывает список без ввода, для пользователей мыши и сенсорного экрана
- `ComboboxIcon`: иконка внутри `ComboboxTrigger`, например переданный дочерним элементом шеврон, размер которой задаёт поле
- `ListboxGroup`: именованная группа вариантов, как `optgroup`
- `Label`, `HelperText` и другое содержимое поля, размещённое вне корня

## Порядок композиции

Типичная композиция:

1. `Combobox`
2. `TextField`
3. `ComboboxInput`
4. `ComboboxTrigger` (необязательно)
5. `ComboboxIcon`
6. `ComboboxListbox`
7. `ListboxGroup` (необязательно)
8. `ListboxOption`

## Варианты

- Размер: `xs`, `sm`, `md`, `lg`, `xl` на корне — для вариантов и углов списка; поле получает собственный `size` на `TextField`
- Автодополнение: `list` (по умолчанию), когда приложение фильтрует по тексту, `none`, когда варианты от него не зависят, `both`, чтобы ещё и дополнять текст прямо в поле, `inline`, чтобы дополнять его, не открывая список при вводе
- Текст: неконтролируемый или контролируемый через `value` и `onChange` на `ComboboxInput`
- Значение: [контролируемое](../../glossary.md#контролируемый-controlled) через `value` или [неконтролируемое](../../glossary.md#неконтролируемый-uncontrolled) через `defaultValue` на `Combobox`
- Состояние: [отключённый](../../glossary.md#отключённый-disabled), [только для чтения](../../glossary.md#только-для-чтения-read-only)

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- [Listbox](../listbox/)
- [Select](../select/)
- [TextField](../text-field/)

## Пограничные случаи

- Встроенной фильтрации нет. Приложение рендерит варианты, подходящие к тексту, а список сам скрывается, пока их нет.
- `ComboboxTrigger` открывает список с теми вариантами, которые рендерит приложение. После выбора текст равен подписи варианта, поэтому список, отфильтрованный по тексту, содержит выбранный вариант, как в примерах WAI-ARIA. Очистка текста, например двойным `Escape`, возвращает остальные варианты.
- С `autocomplete='both'` или `'inline'` дополненный текст — от ввода или от стрелок — приходит в `onChange`, как набранный, а уход из поля выбирает дополненный вариант. Фильтруйте по тексту до выделения, как в [Базовый: дополнение в поле](./examples.md#базовый-дополнение-в-поле).
- Выбор варианта записывает его подпись в поле и вызывает событие `input`, поэтому `onChange` её получает. Правка или очистка текста после этого вызывает `onChangeValue(null)`.
- Текст не откатывается при потере фокуса, как у нативного `<datalist>`: текст, не совпавший ни с одним вариантом, остаётся в поле, а `value` равно `null`.
- `value`, изменённое родителем, не переписывает текст. Задавайте текст сами вместе со значением.
- `name` на `ComboboxInput` отправляет текст. Корень не рендерит скрытых полей; если серверу нужно выбранное значение, продублируйте его в форму сами.
- Сообщению «ничего не найдено» не место в списке, который содержит только варианты. Показывайте его рядом с полем.

## Частые ошибки

- Поле или `ComboboxTrigger` без `Label` или `aria-label`.
- `Label` или `HelperText` внутри `Combobox`: список позиционируется под всем корнем и открывается ниже них.
- Ожидание, что `Combobox` сам отфильтрует варианты или вернёт текст при потере фокуса.
- Значение `value` задано родителем, а текст поля забыт.
- `Combobox` для короткого постоянного набора, в который не нужно ничего вводить, — используйте [Select](../select/).
