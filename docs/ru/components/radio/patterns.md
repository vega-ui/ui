# Radio: паттерны

## Простая группа выбора

Когда использовать:

- Небольшой видимый набор взаимоисключающих вариантов находится в форме.

Заметки по композиции:

- Держите все связанные радиокнопки под одним `name`.
- Оборачивайте контрол и текст подписи вместе, чтобы кликабельной оставалась вся строка.

Компромиссы:

- Сильная нативная семантика формы.
- Хуже подходит для плотных интерфейсов выбора в стиле кнопок.

<!-- example: radio/labeled-radio-option.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Radio } from '@vega-ui/react';

const methods = [
  { value: 'standard', label: 'Standard · 5–7 business days · Free' },
  { value: 'express', label: 'Express · 2–3 business days · $9.90' },
  { value: 'overnight', label: 'Overnight · next business day · $24.00' },
];

export default function LabeledRadioOption() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Shipping method</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {methods.map((method) => (
          <label key={method.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='shipping' value={method.value} defaultChecked={method.value === 'standard'} />
            {method.label}
          </label>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Группа выбора в настройках

Когда использовать:

- Пользователь должен выбрать один постоянный режим или политику из короткого списка.

Заметки по композиции:

- Дайте группе окружающую подпись или контекст на уровне fieldset.
- Подписи вариантов должны описывать вариант, а не действие.

Компромиссы:

- Легко понять в формах.
- Менее компактно, чем `SegmentedControl`, когда все варианты должны читаться как соседние кнопки.

<!-- example: radio/options-with-descriptions.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const policies = [
  {
    value: 'anyone',
    label: 'Anyone with the link',
    description: 'People outside your organization can open shared documents without signing in.',
  },
  {
    value: 'organization',
    label: 'People in Acme Corp',
    description: 'Only signed-in members of your organization can open shared documents.',
  },
  {
    value: 'invited',
    label: 'Invited people only',
    description: 'Every document must be shared with each person by email. Existing links stop working.',
  },
];

export default function OptionsWithDescriptions() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Link sharing</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        {policies.map((policy) => (
          <div key={policy.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
            <Radio
              id={`sharing-${policy.value}`}
              name='sharing'
              value={policy.value}
              defaultChecked={policy.value === 'organization'}
              aria-describedby={`sharing-${policy.value}-description`}
              style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)' }}
            />
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <label htmlFor={`sharing-${policy.value}`}>{policy.label}</label>
              <Text id={`sharing-${policy.value}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
                {policy.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Выбор радиокнопкой в оверлеях

Когда использовать:

- Оверлей запрашивает одно обязательное решение перед продолжением.

Заметки по композиции:

- Делайте список коротким и легко просматриваемым.
- Сопровождайте понятным текстом диалога или выдвижной панели, чтобы смысл группы был очевиден.

Компромиссы:

- Выбор остаётся явным.
- При большом числе вариантов может казаться многословным.

<!-- example: radio/radio-choice-in-overlays.tsx -->
```tsx
import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
  Radio,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const environments = [
  { value: 'preview', label: 'Preview' },
  { value: 'staging', label: 'Staging' },
  { value: 'production', label: 'Production' },
];

export default function RadioChoiceInOverlays() {
  const [environment, setEnvironment] = useState('staging');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setEnvironment(String(data.get('environment')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Deploy target: <strong>{environment}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Change</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='deploy-target-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='deploy-target-title' as='h2' size={4} fontWeight={600}>Deploy target</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <Fieldset>
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Environment</FieldsetLegend>
              <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
                {environments.map((item) => (
                  <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Radio name='environment' value={item.value} defaultChecked={item.value === environment} />
                    {item.label}
                  </label>
                ))}
              </div>
            </Fieldset>
            <Button type='submit'>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->
