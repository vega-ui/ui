# Listbox: решение проблем

## Выбора нет в отправленной форме

### Симптом

Список показывает выбранные варианты, но в данных формы нет поля для них.

### Вероятная причина

`Listbox` — не элемент формы. Он рендерит `div` с `role='listbox'`, у которого нет `name` и который не участвует в отправке формы.

### Как проверить

- отправьте форму и изучите `new FormData(form)`
- поищите внутри формы элемент с ожидаемым `name`

### Решение

Храните значение в состоянии и рендерите по одному `<input type='hidden'>` на каждое выбранное значение. Восстанавливайте исходное состояние в `onReset` формы.

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

## Отключённый fieldset не отключает список

### Симптом

Поля внутри `<fieldset disabled>` заблокированы, а список по-прежнему получает фокус и меняется.

### Вероятная причина

Браузер отключает внутри fieldset только элементы формы, а список к ним не относится.

### Как проверить

- пройдите по отключённому fieldset клавишей Tab и проверьте, получает ли список фокус
- изучите список: у него нет `aria-disabled`

### Решение

Передавайте `disabled` в `Listbox` из того же состояния, которое отключает fieldset. Он отключает все варианты и убирает список из порядка табуляции.

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

## Ввод текста не находит варианты с насыщенным содержимым

### Симптом

Набор первых букв имени не переводит к варианту, хотя имя видно.

### Вероятная причина

Typeahead сверяет начало текста варианта. Без `label` этот текст — всё текстовое содержимое варианта, поэтому инициалы аватара или подпись иконки перед именем оказываются первыми.

### Как проверить

- посмотрите `textContent` варианта в инструментах разработчика
- проверьте, есть ли у варианта атрибут `data-label`

### Решение

Передавайте простое имя в `label` каждого `ListboxOption`.

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

## Очистка значения не очищает список

### Симптом

После того как кнопка сброса ставит значение в `undefined`, какой-то вариант остаётся выбранным.

### Вероятная причина

`undefined` делает список неконтролируемым, и он показывает собственный внутренний выбор вместо пустого. Одиночный список очищается через `null`, список с `multiple` — пустым массивом.

### Как проверить

- выведите значение, которое передаётся в `value` после сброса
- проверьте, не записывает ли `onChangeValue` `undefined` в ваше состояние

### Решение

Храните `null` для пустого одиночного выбора и превращайте `undefined` из `onChangeValue` в `null` через `next ?? null`.

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

## Два варианта подсвечиваются и выбираются вместе

### Симптом

Выбор одного варианта выбирает и другой, а стрелки подсвечивают оба.

### Вероятная причина

У вариантов одинаковое `value`. `id` варианта строится из значения, а выбор сравнивает значения, поэтому список их не различает.

### Как проверить

- изучите варианты и поищите повторяющиеся атрибуты `id`
- проверьте данные, из которых рендерятся варианты, на повторяющиеся ключи

### Решение

Дайте каждому `ListboxOption` уникальное `value`, например id записи, а видимый текст держите отдельно.

## Список выше, чем позволяет макет

### Симптом

При большом числе вариантов список сдвигает содержимое под ним далеко вниз по странице.

### Вероятная причина

По умолчанию у списка нет ограничения высоты, и он растёт вместе с вариантами.

### Как проверить

- изучите список и убедитесь, что у него нет `height` или `max-height`

### Решение

Задайте списку `maxHeight`. Он сам прокручивается и держит активный вариант в поле зрения, пока пользователь движется стрелками. Меньший `size` помещает больше строк в то же место.

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
