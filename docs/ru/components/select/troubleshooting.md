# Select: решение проблем

## Выбранное значение не отправляется с формой

### Симптом

Элемент рендерится и визуально обновляется, но выбранного значения нет в нативной отправке формы.

### Вероятная причина

В композиции отсутствует `SelectHiddenSelect`.

### Как проверить

- отправьте окружающую форму
- изучите получившийся `FormData`
- убедитесь, что ожидаемого имени поля или значения там нет

### Решение

Рендерите `SelectHiddenSelect` с `name` внутри корневого `Select`.

<!-- example: select/native-form-participation.tsx -->
```tsx
import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function NativeFormParticipation() {
  const planId = useId();
  const cycleId = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`plan=${data.get('plan')}, cycle=${data.get('cycle')}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={planId}>Plan</Label>
        <Select defaultValue='team'>
          <SelectHiddenSelect name='plan' />
          <SelectCombobox id={planId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='starter'>Starter</SelectOption>
            <SelectOption value='team'>Team</SelectOption>
            <SelectOption value='enterprise'>Enterprise</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={cycleId}>Billing cycle</Label>
        <Select defaultValue='yearly'>
          <SelectHiddenSelect name='cycle' />
          <SelectCombobox id={cycleId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='monthly'>Monthly</SelectOption>
            <SelectOption value='yearly'>Yearly, 2 months free</SelectOption>
          </SelectListbox>
        </Select>
      </div>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>Continue to payment</Button>
      {submitted && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Submitted: {submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## С клавиатуры нельзя выбрать отфильтрованный вариант

### Симптом

Поле поиска внутри `SelectListbox` фильтрует варианты, но после ввода выбрать вариант без мыши невозможно.

### Вероятная причина

Стрелки и Enter перемещают по списку, только пока фокус на триггере. Когда фокус в поле поиска, Select не обрабатывает его клавиши, а Tab уводит фокус из списка и закрывает его.

### Как проверить

- откройте Select и введите текст в поле поиска
- нажмите стрелки и Enter
- проверьте, выбирается ли какой-нибудь вариант

### Решение

Обрабатывайте Enter в поле поиска сами: выбирайте первое совпадение, закрывайте список и возвращайте фокус на триггер. Передавайте название выбранного варианта в `SelectValue` дочерним элементом, потому что отфильтрованный вариант не рендерится.

<!-- example: select/searchable-select.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { KeyboardEvent, useId, useRef, useState } from 'react';

const countries = [
  { code: 'AR', name: 'Argentina' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CL', name: 'Chile' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];

export default function SearchableSelect() {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const matches = countries.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = countries.find((item) => item.code === country);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery('');
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    const first = matches[0];
    if (!first) return;

    setCountry(first.code);
    changeOpen(false);
    comboboxRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Country of residence</Label>
      <Select
        typeahead={false}
        open={open}
        onChangeOpen={changeOpen}
        value={country}
        onChangeValue={(next) => setCountry(next ?? null)}
      >
        <SelectHiddenSelect name='country' />
        <SelectCombobox id={id} ref={comboboxRef}>
          <SelectValue placeholder='Choose a country'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox style={{ minWidth: 260 }}>
          <TextField size='sm'>
            <TextFieldInput
              aria-label='Search countries'
              placeholder='Search'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={onSearchKeyDown}
            />
          </TextField>
          {matches.map((item) => (
            <SelectOption key={item.code} value={item.code}>
              {item.name}
            </SelectOption>
          ))}
          {matches.length === 0 && (
            <Text size={2} role='status' style={{ padding: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
              No countries match “{query}”.
            </Text>
          )}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Select визуально работает, но в диалоге поведение клавиатуры кажется сломанным

### Симптом

Select открывается, но перемещение фокуса, закрытие или навигация с клавиатуры внутри оверлея ведут себя непоследовательно.

### Вероятная причина

Поведение в составе оверлея проверяли изолированно, но не перепроверили внутри `Dialog`, `Drawer` или `Sheet`.

### Как проверить

- отрендерите точную интеграцию внутри реального оверлея
- проверьте с клавиатуры открытие, закрытие, возврат фокуса и навигацию по вариантам

### Решение

- сохраняйте стандартную композицию `Select` нетронутой
- перепроверьте с реальным стеком оверлеев
- избегайте собственных структур триггера или вариантов, мешающих движению фокуса

## Плейсхолдер никогда не появляется

### Симптом

`placeholder` задан, но триггер всегда показывает какое-то другое содержимое.

### Вероятная причина

Начальное значение уже выбрано, или собственные дочерние элементы `SelectValue` всегда рендерят содержимое.

### Как проверить

- уберите `value` и `defaultValue`
- уберите собственные дочерние элементы из `SelectValue`
- проверьте, становится ли плейсхолдер видимым

### Решение

- используйте `placeholder` только когда выбранного значения нет
- убедитесь, что собственный рендер значения учитывает пустое состояние

## Очистка значения не обновляет интерфейс

### Симптом

Родитель логически очищает значение, но интерфейс всё ещё показывает старый выбор.

### Вероятная причина

Родитель ставит значение в `undefined`. Для `Select` `undefined` означает неконтролируемый режим, и компонент возвращается к собственному внутреннему состоянию, где хранится старый выбор; контролируемое пустое значение — `null`.

### Как проверить

- изучите текущий проп `value`
- убедитесь, что `onChangeValue` обновляет тот же источник истины

### Решение

Очищайте контролируемое значение через `null` и преобразуйте `undefined`, который может прийти в `onChangeValue`: `onChangeValue={(next) => setValue(next ?? null)}`.

<!-- example: select/controlled-value-with-clear-action.tsx -->
```tsx
import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const priorities = [
  { value: 'low', label: 'Low', response: 'within 3 business days' },
  { value: 'normal', label: 'Normal', response: 'within 1 business day' },
  { value: 'urgent', label: 'Urgent', response: 'within 1 hour' },
];

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [priority, setPriority] = useState<string | null>('normal');
  const current = priorities.find((item) => item.value === priority);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Priority</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Select style={{ flex: 1 }} value={priority} onChangeValue={(next) => setPriority(next ?? null)}>
          <SelectCombobox id={id}>
            <SelectValue placeholder='Not set' />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            {priorities.map((item) => (
              <SelectOption key={item.value} value={item.value}>
                {item.label}
              </SelectOption>
            ))}
          </SelectListbox>
        </Select>
        <Button
          variant='secondary'
          appearance='ghost'
          disabled={priority === null}
          onClick={() => setPriority(null)}
        >
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
        {current ? `First response ${current.response}.` : 'No priority: the ticket waits in the general queue.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Варианты рендерятся корректно, но выбор не меняется

### Симптом

Варианты видны и кликабельны, но выбранное значение не обновляется как ожидается.

### Вероятная причина

Значения `SelectOption` не соответствуют ожидаемой скалярной модели значений, или собственная композиция варианта сломала выбираемую строку.

### Как проверить

- убедитесь, что у каждого `SelectOption` значение типа `string` или `number`
- проверьте, остаётся ли вся строка варианта единицей выбора

### Решение

- оставляйте значения вариантов скалярными
- не разбивайте один вариант на несколько конкурирующих интерактивных элементов

## Только для чтения и отключённое состояние ведут себя не так, как ожидалось

### Симптом

Состояние элемента визуально выглядит правильно, но фокусируемость или взаимодействие не соответствуют ожиданиям продукта.

### Вероятная причина

`readOnly` и `disabled` восприняли как визуальные варианты, а не как варианты поведения.

### Как проверить

- проверьте фокусируемость и взаимодействие в обоих состояниях
- уточните, должен ли элемент по-прежнему получать фокус

### Решение

- используйте `disabled`, когда взаимодействие должно полностью прекратиться
- используйте `readOnly`, когда поле должно оставаться фокусируемым, но неизменяемым

## Значения-объекты вызывают проблемы с типами или поведением

### Симптом

При передаче целых объектов в качестве значений вариантов появляются ошибки типов, нестабильный выбор или несовпадающие значения.

### Вероятная причина

Публичный API рассчитан на значения `string` и `number`, а не на объекты.

### Как проверить

- изучите `value`, переданный в `Select`
- убедитесь, что `SelectOption value={...}` скалярный

### Решение

Храните в `Select` скалярный ключ, а полный объект получайте на уровне родителя.

## Select выглядит правильно, но композиция всё равно хрупкая

### Симптом

Компонент вроде бы работает, но небольшие изменения в настройке постоянно ломают поведение.

### Вероятная причина

Слишком много поведения перенесено в собственные обёртки вместо готовых частей.

### Как проверить

- сравните текущую композицию со стандартной из `index.md` и `anatomy.md`
- убирайте собственные обёртки постепенно

### Решение

- сначала вернитесь к стандартной композиции
- добавляйте собственные обёртки обратно только там, где встроенных частей недостаточно
- используйте `useSelectContext` только для продвинутых случаев
