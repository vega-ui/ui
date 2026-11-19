# Combobox: решение проблем

## Список не открывается

### Симптом

Ввод или `ArrowDown` в поле не показывают список, а `aria-expanded` остаётся `false`.

### Вероятная причина

Список показывается, только пока в нём есть варианты. Приложение не рендерит ни одного для текущего текста, варианты — не `ListboxOption`, или у combobox задан `disabled` или `readOnly`.

### Как проверить

- посчитайте элементы `role='option'` внутри `ComboboxListbox` после ввода
- убедитесь, что это `ListboxOption`, а не `Option` или обычные элементы
- проверьте пропсы `disabled` и `readOnly` у `Combobox`

### Решение

Рендерите элементы `ListboxOption` для текущего текста и показывайте сообщение рядом с полем, когда ничего не подходит. Уберите `disabled` или `readOnly`, если поле должно редактироваться.

## Значение задано, а текст не меняется

### Симптом

Родитель задаёт `value`, и подходящий вариант отмечен выбранным, но в поле остаётся старый текст.

### Вероятная причина

Текст принадлежит полю. `value`, заданное родителем, никогда его не переписывает; подпись записывает только выбор пользователя.

### Как проверить

- задайте `value` по кнопке и посмотрите на поле
- проверьте, хранится ли текст поля в состоянии

### Решение

Контролируйте текст через `value` и `onChange` на `ComboboxInput` и задавайте текст вместе со значением.

<!-- example: combobox/controlled-value-and-text.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const CURRENT_USER = 'ana';

const members = [
  { id: 'ana', name: 'Ana Silva' },
  { id: 'kenji', name: 'Kenji Watanabe' },
  { id: 'lena', name: 'Lena Fischer' },
  { id: 'omar', name: 'Omar Haddad' },
  { id: 'priya', name: 'Priya Natarajan' },
  { id: 'tomas', name: 'Tomás Herrera' },
];

const nameOf = (memberId: string | null) => members.find((member) => member.id === memberId)?.name ?? '';

export default function ControlledValueAndText() {
  const id = useId();
  const [assignee, setAssignee] = useState<string | null>('lena');
  const [query, setQuery] = useState(nameOf('lena'));
  const matches = members.filter((member) => member.name.toLowerCase().includes(query.trim().toLowerCase()));

  const assign = (memberId: string | null) => {
    setAssignee(memberId);
    setQuery(nameOf(memberId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={id}>Assignee</Label>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size='xs' variant='secondary' appearance='ghost' disabled={assignee === CURRENT_USER} onClick={() => assign(CURRENT_USER)}>
            Assign to me
          </Button>
          <Button size='xs' variant='secondary' appearance='ghost' disabled={assignee === null && query === ''} onClick={() => assign(null)}>
            Clear
          </Button>
        </div>
      </div>
      <Combobox value={assignee} onChangeValue={(next) => setAssignee(next)}>
        <TextField>
          <ComboboxInput id={id} placeholder='Search people' value={query} onChange={(event) => setQuery(event.target.value)} />
          <ComboboxTrigger square aria-label='Show team members'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Team members'>
          {matches.map((member) => <ListboxOption key={member.id} value={member.id}>{member.name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {assignee === null ? 'Unassigned: pick someone from the list.' : `Assigned to ${nameOf(assignee)}.`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Значение становится null во время ввода

### Симптом

`onChangeValue` вызывается с `null` после того, как вариант был выбран.

### Вероятная причина

Правка или очистка текста сбрасывает выбранное значение, чтобы значение никогда не принадлежало тексту, который ему больше не соответствует. Так и задумано.

### Как проверить

- выберите вариант, затем введите или удалите один символ
- залогируйте вызовы `onChangeValue`

### Решение

Считайте `null` состоянием «ещё ничего не выбрано». Когда форме нужен вариант, проверяйте значение при отправке и просите пользователя выбрать вариант.

## Введённый текст остаётся после ухода из поля

### Симптом

Пользователь вводит текст, не совпадающий ни с одним вариантом, уводит фокус, и текст остаётся в поле.

### Вероятная причина

Как и нативный `datalist`, combobox не откатывает и не дополняет текст при потере фокуса. Что значит текст без выбранного варианта, решает приложение.

### Как проверить

- введите часть текста и нажмите `Tab`
- убедитесь, что `value` равно `null`

### Решение

Проверяйте выбранное значение при отправке или сами очищайте либо восстанавливайте текст в `onBlur`, если продукту это нужно.

<!-- example: combobox/pick-required-error.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { FormEvent, useId, useRef, useState } from 'react';

const airports = [
  { code: 'AMS', name: 'Amsterdam Schiphol' },
  { code: 'BCN', name: 'Barcelona El Prat' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'FCO', name: 'Rome Fiumicino' },
  { code: 'FRA', name: 'Frankfurt' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LIS', name: 'Lisbon Humberto Delgado' },
  { code: 'MUC', name: 'Munich' },
];

export default function PickRequiredError() {
  const id = useId();
  const messageId = `${id}-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [airport, setAirport] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [booked, setBooked] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = airports.filter((item) => item.name.toLowerCase().includes(normalized) || item.code.toLowerCase().startsWith(normalized));

  const onChangeValue = (next: string | null) => {
    setAirport(next);
    if (next !== null) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (airport === null) {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }

    setBooked(`Searching flights from ${airport}.`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>From</Label>
      <Combobox value={airport} onChangeValue={onChangeValue}>
        <TextField>
          <ComboboxInput
            id={id}
            ref={inputRef}
            placeholder='City or airport code'
            aria-invalid={invalid}
            aria-describedby={messageId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger square aria-label='Show airports'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Airports'>
          {matches.map((item) => (
            <ListboxOption key={item.code} value={item.code} label={item.name} style={{ gap: 'var(--spacing-8)' }}>
              {item.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{item.code}</span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={messageId} invalid={invalid}>
        {invalid ? 'Pick an airport from the list.' : 'Type a city or a three-letter code.'}
      </HelperText>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Search flights</Button>
      {booked && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {booked}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Выбранного значения нет в отправленной форме

### Симптом

В `FormData` есть текст поля, но нет идентификатора выбранного варианта.

### Вероятная причина

`name` на `ComboboxInput` отправляет текст. Корень не рендерит скрытого поля для значения.

### Как проверить

- отправьте форму и изучите `FormData`
- поищите поле, которое хранит значение

### Решение

Рендерите рядом с `Combobox` `<input type='hidden'>` с выбранным значением из своего состояния.

## Список открывается ниже поясняющего текста

### Симптом

Список появляется ниже поля или шире него, с отступом, который растёт вместе с содержимым под полем.

### Вероятная причина

Список позиционируется под корнем `Combobox` и не уже его. `Label`, `HelperText` или другой элемент внутри корня делают корень больше поля.

### Как проверить

- изучите элемент корня и сравните его размеры с `TextField`
- проверьте, что ещё рендерится внутри `Combobox`

### Решение

Оставьте внутри `Combobox` только `TextField` и `ComboboxListbox`, а подпись и поясняющий текст разместите вокруг него.

## Выбор варианта записывает не тот текст

### Симптом

В поле вместе с именем попадает почта, код или текст бейджа варианта.

### Вероятная причина

Без `label` записывается всё текстовое содержимое варианта.

### Как проверить

- изучите текстовое содержимое варианта
- проверьте, есть ли у `ListboxOption` `label`

### Решение

Передайте `label` с простым текстом, который должен записываться в поле.

## Enter отправляет форму вместо выбора

### Симптом

Нажатие `Enter` в открытом списке отправляет окружающую форму.

### Вероятная причина

Активного варианта нет. Ввод открывает список без активного варианта, и `Enter` работает как в любом текстовом поле.

### Как проверить

- проверьте, есть ли у поля `aria-activedescendant` перед `Enter`

### Решение

Сначала нажмите `ArrowDown`, чтобы перейти к варианту. Если отправка без выбора недопустима, отключите кнопку отправки или проверяйте значение при отправке.

## Кнопка открывает список из одного варианта

### Симптом

После выбора `ComboboxTrigger` открывает список только с выбранным вариантом.

### Вероятная причина

Текст теперь равен подписи выбранного варианта, и приложение фильтрует по нему. Так и задумано и совпадает с примерами WAI-ARIA: список соответствует тексту.

### Как проверить

- выберите вариант, нажмите кнопку и посчитайте варианты

### Решение

Очистите текст, чтобы увидеть все варианты, например двойным `Escape`. Приложение может рендерить все варианты, пока выбранное значение не `null`, но тогда список перестаёт соответствовать тексту.

## После дополнения в списке остаётся один вариант

### Симптом

С `autocomplete='both'` ввод буквы дополняет текст, но список показывает только дополненный вариант, и `ArrowDown` некуда двигаться, или список меняется при движении стрелками.

### Вероятная причина

Приложение фильтрует по всему тексту поля, который теперь включает дополненный остаток, записанный вводом или стрелками.

### Как проверить

- выведите `event.target.value` и выделение в `onChange` после ввода одной буквы или нажатия `ArrowDown`

### Решение

Фильтруйте по набранной части — так и нужно фильтровать в `both` и `inline`: когда выделение доходит до конца текста, берите текст до `selectionStart`.

```tsx
import type { ChangeEvent } from 'react';

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { value, selectionStart, selectionEnd } = event.target;

  setText(value);
  setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
};
```

 См. [Базовый: дополнение в поле](./examples.md#базовый-дополнение-в-поле).
