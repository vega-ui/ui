# Listbox: примеры

## Базовый

### Базовый: видимая метка

Список всегда виден, поэтому обычно стоит под видимым заголовком. `aria-labelledby` ссылается на этот текст и даёт списку доступное имя; варианты рендерятся из данных.

<!-- example: listbox/visible-label.tsx -->
```tsx
import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const layouts = [
  { value: 'board', label: 'Board' },
  { value: 'list', label: 'List' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'calendar', label: 'Calendar' },
];

export default function VisibleLabel() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Text id={labelId} size={3} fontWeight={500}>Default project view</Text>
      <Listbox aria-labelledby={labelId} defaultValue='board' style={{ border: '1px solid var(--separator-opaque)' }}>
        {layouts.map((layout) => (
          <ListboxOption key={layout.value} value={layout.value}>
            {layout.label}
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: значение со сбросом

Шрифтом владеет родитель, и превью ниже читает его. Сброс ставит `null`, что очищает контролируемый список с одиночным выбором; `undefined` сделал бы его неконтролируемым.

<!-- example: listbox/value-with-a-reset.tsx -->
```tsx
import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const fonts = [
  { value: 'serif', label: 'Serif', family: 'Georgia, serif' },
  { value: 'sans', label: 'Sans-serif', family: 'system-ui, sans-serif' },
  { value: 'mono', label: 'Monospace', family: 'ui-monospace, monospace' },
];

export default function ValueWithAReset() {
  const [font, setFont] = useState<string | null>('serif');
  const current = fonts.find((item) => item.value === font);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Reading font' value={font} onChangeValue={(next) => setFont(next ?? null)} style={{ border: '1px solid var(--separator-opaque)' }}>
        {fonts.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <Text size={3} style={{ fontFamily: current?.family, minHeight: 'calc(var(--line-height-3) * 2)' }}>
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-end' }} disabled={font === null} onClick={() => setFont(null)}>
        Use the site default
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: несколько вариантов

С `multiple` значение — массив. Родитель выводит из него количество и доплату, а очищает пустым массивом.

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

## Форма/интеграция

### Форма/интеграция: отправка выбора вместе с формой

`Listbox` не является полем формы, поэтому форма читает скрытые поля, отрендеренные из того же состояния, по одному на выбранное значение. `onReset` формы возвращает исходный выбор.

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

## Раскладка/оверлей

### Раскладка/оверлей: группы и прокручиваемый список

`ListboxGroup` группирует аэропорты по странам и получает имя от своего заголовка через `aria-labelledby`. Высота списка — обычный CSS: список сам прокручивается и держит активный вариант в поле зрения при движении стрелками.

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

## Ошибка

### Ошибка: пояснение к пустому обязательному выбору

Форма проверяет выбор при отправке, ставит списку `aria-invalid` и связывает сообщение через `aria-describedby`. Выбор тарифа снимает ошибку.

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

  const onChangeValue = (next: string | null) => {
    setPlan(next);
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

## Отключённый

### Отключённый: варианты, которые нельзя выбрать

Распроданные размеры остаются видимыми вместе с причиной, но отключены: клики их игнорируют, а стрелки пропускают.

<!-- example: listbox/disabled-options.tsx -->
```tsx
import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const sizes = [
  { value: 'xs', label: 'XS', stock: 0 },
  { value: 's', label: 'S', stock: 4 },
  { value: 'm', label: 'M', stock: 12 },
  { value: 'l', label: 'L', stock: 0 },
  { value: 'xl', label: 'XL', stock: 2 },
];

export default function DisabledOptions() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Text id={id} size={3} fontWeight={500}>Size</Text>
      <Listbox aria-labelledby={id} defaultValue='m' style={{ border: '1px solid var(--separator-opaque)' }}>
        {sizes.map((size) => (
          <ListboxOption key={size.value} value={size.value} disabled={size.stock === 0}>
            {size.label}
            <span style={{ marginInlineStart: 'auto', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>
              {size.stock === 0 ? 'Sold out' : `${size.stock} left`}
            </span>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}
```
<!-- /example -->

### Отключённый: весь список

`disabled` на списке отключает все варианты и убирает список из порядка табуляции. `<fieldset disabled>` на него не действует, потому что список — не элемент формы, поэтому передавайте `disabled` из своего состояния.

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

## Пограничный случай

### Пограничный случай: насыщенное содержимое с меткой для typeahead

В каждом варианте аватар, имя и длинный email. `label` отдаёт typeahead только имя, а email обрезается, чтобы строка сохраняла ширину; у вариантов фиксированная высота, поэтому двухстрочным строкам задан `height: 'auto'`.

<!-- example: listbox/rich-content-with-a-label-for-typeahead.tsx -->
```tsx
import { Avatar, AvatarFallback, Listbox, ListboxOption } from '@vega-ui/react';

const people = [
  { id: 'amara', initials: 'AO', name: 'Amara Okafor', email: 'amara.okafor@northwind-logistics.example' },
  { id: 'boris', initials: 'BP', name: 'Boris Petrov', email: 'boris@northwind-logistics.example' },
  { id: 'chloe', initials: 'CL', name: 'Chloé Lefèvre-Durand', email: 'chloe.lefevre-durand.finance@northwind-logistics.example' },
  { id: 'dmitri', initials: 'DV', name: 'Dmitri Volkov', email: 'dmitri.volkov@northwind-logistics.example' },
];

export default function RichContentWithALabelForTypeahead() {
  return (
    <Listbox aria-label='Assignee' style={{ width: '100%', maxWidth: 300, border: '1px solid var(--separator-opaque)' }}>
      {people.map((person) => (
        <ListboxOption
          key={person.id}
          value={person.id}
          label={person.name}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-6)' }}
        >
          <Avatar size='md' aria-hidden='true' style={{ flexShrink: 0 }}>
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
    </Listbox>
  );
}
```
<!-- /example -->

### Пограничный случай: сотни вариантов

300 сборок с числовыми значениями. Home и End переходят к краям списка, а набор «Build 13» переводит к первой подходящей сборке.

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

### Пограничный случай: фильтрация вариантов

Список читает варианты из DOM при каждом нажатии клавиши, поэтому фильтрация — обычный рендер без регистрации. Выбор сохраняется для отфильтрованных вариантов, а при пустом результате вместо вариантов показывается сообщение.

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
