# Combobox: примеры

## Базовый

### Базовый: поиск с сообщением, когда ничего не подходит

Текст хранится в состоянии, и приложение рендерит только языки, которые его содержат. Список открывается при вводе и сам скрывается, пока ничего не подходит, а поясняющий текст рядом с полем сообщает об этом. Это элемент с `role='status'`, связанный с полем через `aria-describedby`, поэтому скринридеры объявляют изменение.

<!-- example: combobox/no-results-message.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const languages = [
  'Arabic', 'Bengali', 'Chinese', 'Dutch', 'English', 'French', 'German', 'Hindi', 'Indonesian', 'Italian',
  'Japanese', 'Korean', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swahili', 'Turkish', 'Ukrainian', 'Vietnamese',
];

export default function NoResultsMessage() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = languages.filter((language) => language.toLowerCase().includes(normalized));
  const empty = normalized !== '' && matches.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Subtitles</Label>
      <Combobox>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search languages'
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger square aria-label='Show languages'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Languages'>
          {matches.map((language) => <ListboxOption key={language} value={language}>{language}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} role='status'>
        {empty ? `No subtitles in “${query.trim()}” yet. Try another language.` : 'Subtitles are available in 20 languages.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

### Базовый: дополнение в поле

С `autocomplete='both'` ввод записывает первый штат, который начинается с текста, в его собственном регистре и выделяет дополненный остаток. `ArrowDown` и `ArrowUp` записывают в поле достигнутый штат и выделяют часть после набранного. `Enter` или уход из поля принимают дополнение, `Backspace` удаляет его, а `Escape` возвращает набранное. Приложение фильтрует по набранной части — тексту до выделенного остатка; так и нужно фильтровать в `both` и `inline`: остальные подходящие штаты остаются в списке, пока меняется дополнение. С `autocomplete='inline'` текст дополняется так же, но ввод оставляет список закрытым.

<!-- example: combobox/inline-completion.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { ChangeEvent, useId, useState } from 'react';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function InlineCompletion() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [state, setState] = useState<string | null>(null);
  const matches = states.filter((name) => name.toLowerCase().startsWith(query.toLowerCase()));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = event.target;

    setText(value);
    setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>State</Label>
      <Combobox autocomplete='both' value={state} onChangeValue={(next) => setState(next)}>
        <TextField>
          <ComboboxInput id={id} aria-describedby={hintId} value={text} onChange={onChange} />
          <ComboboxTrigger square aria-label='Show states'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='States'>
          {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>
        {state === null ? 'Type the first letters, then press Enter or Tab to accept.' : `Shipping rates for ${state}.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

### Базовый: подсказки без фильтрации

С `autocomplete='none'` варианты не зависят от введённого текста, и приложение рендерит их все. Поле принимает любой текст: вариант — это быстрый ввод частого значения, и при выборе его подпись записывается в поле. В состоянии ничего не хранится, потому что `name` отправляет текст.

<!-- example: combobox/fixed-suggestions.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

const lengths = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '90 minutes', '2 hours'];

export default function FixedSuggestions() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Meeting length</Label>
      <Combobox autocomplete='none'>
        <TextField>
          <ComboboxInput id={id} name='length' placeholder='For example, 50 minutes' aria-describedby={hintId} />
          <ComboboxTrigger square aria-label='Show lengths'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Common lengths'>
          {lengths.map((length) => <ListboxOption key={length} value={length}>{length}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>Pick a common length or type your own.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: значение и текст задаёт приложение

Родитель владеет и выбранным участником, и текстом. «Assign to me» и «Clear» задают значение и текст вместе, потому что `value` от родителя никогда не переписывает поле. Правка текста вызывает `onChangeValue(null)`, поэтому сводка ниже показывает «Unassigned», пока вариант не выбран снова.

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

## Форма/интеграция

### Форма/интеграция: текст и значение в форме

`name='country'` на поле отправляет текст, а `required` нативно требует его заполнить. Код страны дублируется в скрытое поле, которое рендерит приложение, потому что корень его не рендерит. `Enter` без активного варианта отправляет форму, как в любом текстовом поле.

<!-- example: combobox/native-form-participation.tsx -->
```tsx
import { Button, Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxOption, Text, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { FormEvent, useId, useState } from 'react';

const countries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'ES', name: 'Spain' },
];

export default function NativeFormParticipation() {
  const id = useId();
  const [query, setQuery] = useState('');
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState('');
  const matches = countries.filter((country) => country.name.toLowerCase().startsWith(query.trim().toLowerCase()));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`country=${data.get('country')}, countryCode=${data.get('countryCode') || '(none)'}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Ship to</Label>
      <Combobox value={countryCode} onChangeValue={(next) => setCountryCode(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            name='country'
            required
            placeholder='Country'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger square aria-label='Show countries'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Countries'>
          {matches.map((country) => <ListboxOption key={country.code} value={country.code}>{country.name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <input type='hidden' name='countryCode' value={countryCode ?? ''} />
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Continue</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: combobox внутри диалога

Список открывается в top layer поверх модального диалога. `Escape` сначала закрывает список, второй `Escape` очищает текст, и только потом клавиша доходит до диалога и закрывает его.

<!-- example: combobox/combobox-inside-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Label,
  ListboxOption,
  Text,
  TextField,
} from '@vega-ui/react';
import { ChevronDownIcon, XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const reviewers = ['Ana Silva', 'Kenji Watanabe', 'Lena Fischer', 'Omar Haddad', 'Priya Natarajan', 'Tomás Herrera'];

export default function ComboboxInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [reviewer, setReviewer] = useState<string | null>(null);
  const [requested, setRequested] = useState('');
  const matches = reviewers.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));

  const onChangeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) return;

    setQuery('');
    setReviewer(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (reviewer === null) return;

    setRequested(`Review requested from ${reviewer}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={onChangeOpen}>
        <DialogTrigger asChild>
          <Button>Request review</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Request a review</Heading>
            <DialogClose asChild>
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DialogClose>
          </div>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>Reviewer</Label>
            <Combobox value={reviewer} onChangeValue={(next) => setReviewer(next)}>
              <TextField>
                <ComboboxInput id={id} placeholder='Search people' value={query} onChange={(event) => setQuery(event.target.value)} />
                <ComboboxTrigger square aria-label='Show people'>
                  <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
                </ComboboxTrigger>
              </TextField>
              <ComboboxListbox aria-label='People'>
                {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
              </ComboboxListbox>
            </Combobox>
            <Button type='submit' disabled={reviewer === null} style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>
              Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {requested && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{requested}</Text>}
    </div>
  );
}
```
<!-- /example -->

### Раскладка/оверлей: сгруппированные варианты

Каждый регион — `ListboxGroup`, названный своим заголовком, и регион не рендерится, пока ни один его город не подходит. Стрелки двигаются по группам как по одному списку. `label` не пускает смещение UTC в текст, который записывается в поле.

<!-- example: combobox/grouped-options.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, Label, ListboxGroup, ListboxOption, Text, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
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
          <ComboboxTrigger square aria-label='Show time zones'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
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

## Ошибка

### Ошибка: введённый, но не выбранный текст

Форма проверяет выбранное значение, а не текст: аэропорт, набранный, но не выбранный, оставляет `value` равным `null`. При отправке поле получает `aria-invalid`, поясняющий текст через `aria-describedby` становится сообщением об ошибке, а фокус возвращается в поле. Выбор аэропорта снимает ошибку.

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

## Отключённый

### Отключённый: поля только для чтения и отключённые

Ни один список не зависит от текста, поэтому оба корня задают `autocomplete='none'`. Combobox только для чтения оставляет поле фокусируемым, и его текст отправляется с формой, но список остаётся закрытым. Отключённый combobox отключает поле, поэтому `Tab` его пропускает, а в `FormData` оно не попадает. Кнопка списка отключена в обоих. Каждое поле объясняет, почему его нельзя изменить.

<!-- example: combobox/disabled-and-read-only.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

const regions = [
  { value: 'eu-central', label: 'Frankfurt (eu-central)' },
  { value: 'eu-west', label: 'Dublin (eu-west)' },
  { value: 'us-east', label: 'Virginia (us-east)' },
];

const owners = [
  { value: 'finance', label: 'Finance team' },
  { value: 'platform', label: 'Platform team' },
];

export default function DisabledAndReadOnly() {
  const id = useId();
  const regionId = `${id}-region`;
  const ownerId = `${id}-owner`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={regionId}>Data region</Label>
        <Combobox autocomplete='none' readOnly defaultValue='eu-central'>
          <TextField>
            <ComboboxInput id={regionId} name='region' defaultValue='Frankfurt (eu-central)' aria-describedby={`${regionId}-hint`} />
            <ComboboxTrigger square aria-label='Show regions'>
              <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Regions'>
            {regions.map((region) => <ListboxOption key={region.value} value={region.value}>{region.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${regionId}-hint`}>Fixed when the workspace was created. It still submits with the form.</HelperText>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={ownerId}>Cost owner</Label>
        <Combobox autocomplete='none' disabled defaultValue='finance'>
          <TextField>
            <ComboboxInput id={ownerId} name='owner' defaultValue='Finance team' aria-describedby={`${ownerId}-hint`} />
            <ComboboxTrigger square aria-label='Show teams'>
              <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Teams'>
            {owners.map((owner) => <ListboxOption key={owner.value} value={owner.value}>{owner.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${ownerId}-hint`}>Only workspace admins can change the cost owner.</HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: подсказки с сервера

Поиск начинается после двух букв и короткой паузы. Пока он идёт, внутри поля крутится спиннер, а статус ниже сообщает об этом; сам список содержит только варианты, поэтому остаётся скрытым, пока не придут результаты. После выбора запрос не отправляется, а правка текста запускает новый. Кнопка снова открывает результаты для текущего текста, например после того как `Escape` закрыл список.

<!-- example: combobox/async-suggestions.tsx -->
```tsx
import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, Spinner, TextField } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useEffect, useId, useState } from 'react';

interface City {
  id: string;
  name: string;
  country: string;
}

interface SearchResult {
  query: string;
  cities: City[];
}

const CITIES: City[] = [
  { id: 'ber', name: 'Berlin', country: 'Germany' },
  { id: 'bern', name: 'Bern', country: 'Switzerland' },
  { id: 'bil', name: 'Bilbao', country: 'Spain' },
  { id: 'bol', name: 'Bologna', country: 'Italy' },
  { id: 'bor', name: 'Bordeaux', country: 'France' },
  { id: 'bra', name: 'Bratislava', country: 'Slovakia' },
  { id: 'bru', name: 'Brussels', country: 'Belgium' },
  { id: 'bud', name: 'Budapest', country: 'Hungary' },
  { id: 'gen', name: 'Geneva', country: 'Switzerland' },
  { id: 'gla', name: 'Glasgow', country: 'United Kingdom' },
  { id: 'gra', name: 'Granada', country: 'Spain' },
  { id: 'ham', name: 'Hamburg', country: 'Germany' },
  { id: 'hel', name: 'Helsinki', country: 'Finland' },
  { id: 'kra', name: 'Kraków', country: 'Poland' },
  { id: 'lyo', name: 'Lyon', country: 'France' },
  { id: 'mal', name: 'Málaga', country: 'Spain' },
  { id: 'mar', name: 'Marseille', country: 'France' },
  { id: 'mil', name: 'Milan', country: 'Italy' },
  { id: 'por', name: 'Porto', country: 'Portugal' },
  { id: 'val', name: 'Valencia', country: 'Spain' },
];

const searchCities = (text: string) => new Promise<City[]>((resolve) => {
  setTimeout(() => resolve(CITIES.filter((city) => city.name.toLowerCase().startsWith(text)).slice(0, 6)), 700);
});

const labelOf = (city: City) => `${city.name}, ${city.country}`;

export default function AsyncSuggestions() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const [cityId, setCityId] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);
  const normalized = query.trim().toLowerCase();
  const searching = cityId === null && normalized.length >= 2;

  useEffect(() => {
    if (!searching) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      searchCities(normalized).then((cities) => {
        if (!cancelled) setResult({ query: normalized, cities });
      });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [normalized, searching]);

  const fresh = result !== null && result.query === normalized;
  const loading = searching && !fresh;
  const suggestions = searching && result !== null && fresh ? result.cities : [];
  const picked = CITIES.find((city) => city.id === cityId);

  let message = 'Type at least 2 letters, for example “br”.';
  if (loading) message = 'Searching…';
  if (searching && fresh) message = suggestions.length === 0 ? `No cities start with “${query.trim()}”.` : `${suggestions.length} cities found.`;
  if (picked) message = `Meeting point: ${labelOf(picked)}.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Meeting city</Label>
      <Combobox value={cityId} onChangeValue={(next) => setCityId(next)}>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search cities'
            spellCheck={false}
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {loading && <Spinner size={3} aria-label='Searching cities' />}
          <ComboboxTrigger square aria-label='Show cities'>
            <ComboboxIcon><ChevronDownIcon /></ComboboxIcon>
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Cities'>
          {suggestions.map((city) => (
            <ListboxOption key={city.id} value={city.id} label={labelOf(city)} style={{ gap: 'var(--spacing-8)' }}>
              {city.name}
              <span style={{ marginInlineStart: 'auto', opacity: 0.7 }}>{city.country}</span>
            </ListboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: насыщенное содержимое варианта с подписью

Варианты показывают аватар и почту, а `label` задаёт простое имя, которое записывается в поле при выборе. Приложение фильтрует по имени и по почте. В поле только текст, поэтому аватар выбранного человека приложение рендерит рядом с ним в `TextField` по выбранному значению: правка текста делает значение `null`, и аватар пропадает. У него `aria-hidden`, потому что имя в поле уже говорит, кто выбран.

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
