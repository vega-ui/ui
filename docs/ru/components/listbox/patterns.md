# Listbox: паттерны

## Список с фильтром

Когда использовать:

- список длинный, но варианты должны оставаться видимыми, пока пользователь сужает выбор
- из одного набора выбирают несколько значений, например метки или теги

Заметки о композиции:

- рендерите `TextField` над списком и свяжите его со списком через `aria-controls`
- фильтруйте отрендеренные `ListboxOption` по своему состоянию: список читает варианты из DOM, поэтому регистрировать ничего не нужно
- храните выбор отдельно от фильтра, чтобы скрытые запросом варианты оставались выбранными
- когда ничего не найдено, скройте список и покажите сообщение с `role='status'` вместо пустого блока

Компромиссы:

- фильтр и список — две остановки табуляции, поэтому стрелки работают только после перехода в список по Tab
- списку нужен `maxHeight`, иначе он растёт с каждым вариантом, который пропускает фильтр

<!-- example: listbox/filtered-options.tsx -->
```tsx
import { Listbox, ListboxOption, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const labels = [
  'bug', 'feature', 'documentation', 'design', 'performance', 'security',
  'accessibility', 'good first issue', 'help wanted', 'needs triage', 'wontfix', 'duplicate',
];

export default function FilteredOptions() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(['bug']);

  const matches = labels.filter((label) => label.includes(query.trim().toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 300 }}>
      <TextField size='sm'>
        <TextFieldInput
          aria-label='Filter labels'
          aria-controls={id}
          placeholder='Filter labels'
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </TextField>
      <Listbox
        id={id}
        aria-label='Labels'
        multiple
        value={selected}
        onChangeValue={setSelected}
        style={{ display: matches.length === 0 ? 'none' : undefined, maxHeight: 220, border: '1px solid var(--separator-opaque)' }}
      >
        {matches.map((label) => (
          <ListboxOption key={label} value={label}>
            {label}
          </ListboxOption>
        ))}
      </Listbox>
      {matches.length === 0 && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>No labels match “{query}”.</Text>
      )}
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Selected: {selected.join(', ') || 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Выбор, отправляемый с формой

Когда использовать:

- всегда видимый список — часть формы, которая отправляет данные
- у формы есть кнопка сброса, которая должна вернуть исходный выбор

Заметки о композиции:

- храните значение в состоянии через `value` и `onChangeValue`
- рендерите по одному `<input type='hidden'>` на каждое выбранное значение с `name` поля
- восстанавливайте исходное состояние в `onReset` формы, потому что список не слушает форму

Компромиссы:

- форма читает то же состояние, что показывает список, поэтому они не расходятся
- каждому списку в форме нужна такая обвязка; для компактного поля, которое отправляется само, используйте [Select](../select/) с `SelectHiddenSelect`

<!-- example: listbox/listbox-in-form.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const initialChannels = ['email'];

export default function ListboxInForm() {
  const labelId = useId();
  const [channels, setChannels] = useState<string[]>(initialChannels);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(data.getAll('channel').join(', ') || 'nothing');
  };

  const onReset = () => {
    setChannels(initialChannels);
    setSubmitted('');
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Text id={labelId} size={3} fontWeight={500}>Notify me about new orders by</Text>
      <Listbox aria-labelledby={labelId} multiple value={channels} onChangeValue={setChannels} style={{ border: '1px solid var(--separator-opaque)' }}>
        <ListboxOption value='email'>Email</ListboxOption>
        <ListboxOption value='sms'>SMS</ListboxOption>
        <ListboxOption value='push'>Push notification</ListboxOption>
        <ListboxOption value='slack'>Slack</ListboxOption>
      </Listbox>
      {channels.map((channel) => (
        <input key={channel} type='hidden' name='channel' value={channel} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Saved channels: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Обязательный выбор

Когда использовать:

- форма не должна продолжаться, пока не выбран один вариант
- список изначально пуст

Заметки о композиции:

- начинайте с `value={null}` и проверяйте его в `onSubmit` формы
- ставьте списку `aria-invalid` и связывайте сообщение через `aria-describedby` только пока ошибка видна
- снимайте ошибку в `onChangeValue`, как только пользователь выбрал

Компромиссы:

- сообщение озвучивается вместе с именем списка, когда пользователь к нему возвращается
- собственного стиля ошибки у списка нет, поэтому об ошибке сообщает текст

<!-- example: listbox/explain-an-empty-required-choice.tsx -->
```tsx
import { Button, HelperText, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ExplainAnEmptyRequiredChoice() {
  const id = useId();
  const errorId = `${id}-error`;
  const [plan, setPlan] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  const onChangeValue = (next: string | undefined) => {
    setPlan(next ?? null);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plan === null) {
      setInvalid(true);
      return;
    }

    setDone(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Text id={`${id}-label`} size={3} fontWeight={500}>Workspace plan</Text>
      <Listbox
        aria-labelledby={`${id}-label`}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        value={plan}
        onChangeValue={onChangeValue}
        style={{ border: '1px solid var(--separator-opaque)' }}
      >
        <ListboxOption value='free'>Free, up to 3 members</ListboxOption>
        <ListboxOption value='team'>Team, $12 per member</ListboxOption>
        <ListboxOption value='business'>Business, $24 per member</ListboxOption>
      </Listbox>
      {invalid && <HelperText id={errorId} error>Choose a plan to create the workspace.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Create workspace</Button>
      {done && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Workspace created on the {plan} plan.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Прокручиваемый список с группами

Когда использовать:

- варианты делятся на категории, по которым пользователь их просматривает, например страны или команды
- список слишком длинный, чтобы показать его целиком

Заметки о композиции:

- оберните каждую категорию в `ListboxGroup` и назовите её через `aria-labelledby`, указывающий на её заголовок
- задайте списку `maxHeight`: он сам прокручивается и держит активный вариант в поле зрения
- передавайте `label` вариантам с дополнительной разметкой, чтобы typeahead сверял название

Компромиссы:

- заголовки облегчают просмотр длинных списков
- заголовки — не варианты, поэтому стрелки их пропускают, а typeahead их не находит

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

## Список, зависящий от другой настройки

Когда использовать:

- выбор имеет смысл, только когда его разрешает другая настройка, например ручная замена автоматического значения

Заметки о композиции:

- передавайте `disabled` из состояния другого элемента управления
- сохраняйте значение, пока список отключён, чтобы при выключении настройки вернулся прежний выбор

Компромиссы:

- пользователи видят варианты, которые получат, даже пока не могут их выбрать
- отключённый список выпадает из порядка табуляции, поэтому его нельзя сфокусировать, чтобы прочитать варианты с клавиатуры

<!-- example: listbox/disabled-list.tsx -->
```tsx
import { Label, Listbox, ListboxOption, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function DisabledList() {
  const switchId = useId();
  const [automatic, setAutomatic] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={automatic}
            onChange={(event) => setAutomatic(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Pick the region automatically</Label>
      </div>
      <Listbox aria-label='Server region' disabled={automatic} defaultValue='eu-central' style={{ border: '1px solid var(--separator-opaque)' }}>
        <ListboxOption value='us-east'>US East (Virginia)</ListboxOption>
        <ListboxOption value='eu-central'>EU Central (Frankfurt)</ListboxOption>
        <ListboxOption value='ap-northeast'>Asia Pacific (Tokyo)</ListboxOption>
      </Listbox>
    </div>
  );
}
```
<!-- /example -->
