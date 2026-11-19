# Combobox: паттерны

## Фильтрация подсказок с сообщением «ничего не найдено»

Когда использовать:

- варианты известны на клиенте
- пользователь должен узнать, что его текст ничему не соответствует

Заметки о композиции:

- храните текст в состоянии через `value` и `onChange` на `ComboboxInput`
- рендерите только подходящие варианты; список сам скрывается, пока их нет
- выводите сообщение в `HelperText` с `role='status'`, связанном с полем через `aria-describedby`

Компромиссы:

- фильтрация остаётся в ваших руках, поэтому может искать в любом месте подписи, игнорировать диакритику или ранжировать результаты
- сообщение живёт вне списка, поэтому ему нужно своё место в макете

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

## Значение и текст принадлежат приложению

Когда использовать:

- кнопки или другие поля задают или сбрасывают выбор
- поле восстанавливается из URL, черновика или с сервера

Заметки о композиции:

- храните выбранное значение и текст в двух состояниях
- задавайте их вместе, когда выбор меняет приложение; `value` от родителя не переписывает поле
- чтобы очистить значение, ставьте `null`, а не `undefined`

Компромиссы:

- каждое изменение явное и проверяемое
- два состояния нужно держать согласованными, в отличие от элемента только со значением, такого как `Select`

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

## Подсказки с сервера

Когда использовать:

- набор слишком велик, чтобы загрузить его целиком, например адреса или пользователи
- результаты зависят от набранного текста

Заметки о композиции:

- отправляйте запрос после короткой паузы и игнорируйте ответы на устаревший текст
- показывайте загрузку внутри поля или рядом с ним, но никогда строкой списка
- объявляйте число результатов или «ничего не найдено» в сообщении о статусе
- не отправляйте запрос после выбора, когда текст — подпись выбранного варианта

Компромиссы:

- пока идёт запрос, список скрыт, поэтому в нём нет строк-заглушек
- время запросов, их отмена и ошибки — на вашей стороне

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

## Обязательный выбор варианта

Когда использовать:

- одного текста недостаточно, и форме нужен один из вариантов
- текст не откатывается при потере фокуса, поэтому форма должна проверять значение

Заметки о композиции:

- при отправке проверяйте `value`, а не текст
- отметьте поле через `aria-invalid`, свяжите сообщение через `aria-describedby` и верните фокус
- снимайте ошибку в `onChangeValue`, когда вариант выбран

Компромиссы:

- пользователь сохраняет то, что ввёл, и видит, почему этого недостаточно
- проверка выполняется при отправке, поэтому о неверном тексте сообщается только тогда

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

## Отправка выбранного значения

Когда использовать:

- форма отправляется нативно или читается через `FormData`
- серверу нужен идентификатор, а не текст

Заметки о композиции:

- `name` на `ComboboxInput` отправляет текст
- рендерите `<input type='hidden'>` с выбранным значением из своего состояния
- используйте `required` на поле, когда текст обязателен

Компромиссы:

- и текст, и значение видны в разметке, без скрытых частей компонента
- скрытое поле — ваш код, и оно должно следовать за значением

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

## Combobox внутри диалога

Когда использовать:

- выбор — часть короткой задачи, например пригласить человека или переместить элемент

Заметки о композиции:

- размещайте форму, подпись и combobox внутри `DialogContent`
- сбрасывайте текст и значение при открытии диалога
- отключайте кнопку отправки, пока вариант не выбран, чтобы `Enter` без него ничего не делал

Компромиссы:

- `Escape` закрывает список, затем очищает текст и только потом закрывает диалог — нажатий больше, чем пользователь может ожидать
- список открывается в top layer, поэтому не нужны ни портал, ни `z-index`

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
