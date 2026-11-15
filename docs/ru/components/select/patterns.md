# Select: паттерны

## Контролируемый Select с очисткой

Когда использовать:

- выбранное значение можно сбросить
- поле должно синхронизироваться с состоянием URL, фильтрами или внешней логикой формы

Заметки о композиции:

- храните выбор в состоянии React
- передавайте `value` и `onChangeValue`
- предусмотрите отдельное действие очистки, которое ставит `null`, а не `undefined`

Компромиссы:

- состояние остаётся явным и предсказуемым
- добавляет сложности в состояние родителя по сравнению с неконтролируемым использованием

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

## Select внутри оверлея

Когда использовать:

- модальное окно, выдвижная панель (Drawer) или шторка (Sheet) содержат поле одиночного выбора
- список должен сосуществовать с другой системой оверлеев

Заметки о композиции:

- рендерите `Select` как обычно внутри содержимого оверлея
- портал не нужен: список рендерится в top layer поверх оверлея
- перепроверьте восстановление фокуса и закрытие в реальном оверлее

Компромиссы:

- сохраняет обычное поведение поля внутри оверлеев
- требует больше интеграционного тестирования, чем изолированное использование компонента

<!-- example: select/select-inside-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
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
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function SelectInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExported(`Exporting the Q3 report as ${data.get('format')}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogTrigger asChild>
          <Button>Export report</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Export Q3 report</Heading>
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
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>File format</Label>
            <Select defaultValue='xlsx'>
              <SelectHiddenSelect name='format' />
              <SelectCombobox id={id}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                <SelectOption value='xlsx'>Excel workbook (.xlsx)</SelectOption>
                <SelectOption value='csv'>Comma-separated values (.csv)</SelectOption>
                <SelectOption value='pdf'>PDF document (.pdf)</SelectOption>
              </SelectListbox>
            </Select>
            <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Export</Button>
          </form>
        </DialogContent>
      </Dialog>
      {exported && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{exported}</Text>}
    </div>
  );
}
```
<!-- /example -->

## Select внутри предложения

Когда использовать:

- элемент встроен в читаемый текст в виде предложения
- выбор лёгкий и должен ощущаться встроенным

Заметки о композиции:

- используйте `variant='inline'`
- окружайте поле осмысленным текстом
- не используйте вариант inline без контекста
- дайте триггеру собственный `aria-label`: предложение вокруг не является меткой

Компромиссы:

- ощущается лёгким и встроенным
- ясность и подпись зависят от окружающего текста

<!-- example: select/inline-variant-inside-sentence-like-ui.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';

export default function InlineVariantInsideSentenceLikeUi() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap', width: '100%' }}>
      <Text size={3}>Email me a digest</Text>
      <Select variant='inline' defaultValue='weekly'>
        <SelectHiddenSelect name='digest' />
        <SelectCombobox aria-label='Summary frequency'>
          <SelectValue />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='daily'>every day</SelectOption>
          <SelectOption value='weekly'>every Monday</SelectOption>
          <SelectOption value='monthly'>on the 1st of the month</SelectOption>
          <SelectOption value='never'>never</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Насыщенное содержимое вариантов

Когда использовать:

- вариантам нужны иконки или дополнительный текст
- визуальный просмотр важнее минимальной плотности строк

Заметки о композиции:

- оставляйте `value` скалярным
- делайте единицей выбора всю строку варианта
- не разбивайте вариант на несколько интерактивных элементов
- передайте `label`, чтобы typeahead искал по названию, и короткий дочерний элемент `SelectValue`, чтобы триггер не копировал всю строку
- у вариантов фиксированная высота, поэтому многострочному содержимому нужен `height: 'auto'` на варианте

Компромиссы:

- облегчает просмотр сложных вариантов
- увеличивает высоту строк и семантическую сложность

<!-- example: select/rich-option-content.tsx -->
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
} from '@vega-ui/react';
import { useId, useState } from 'react';

const plans = [
  { value: 'starter', name: 'Starter', price: '$0', description: 'Up to 3 projects and 1 GB of storage' },
  { value: 'team', name: 'Team', price: '$12 per seat', description: 'Unlimited projects, shared workspaces' },
  { value: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'SSO, audit log and a dedicated manager' },
];

export default function RichOptionContent() {
  const id = useId();
  const [plan, setPlan] = useState<string | null>('team');
  const selected = plans.find((item) => item.value === plan);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Plan</Label>
      <Select value={plan} onChangeValue={(next) => setPlan(next ?? null)}>
        <SelectHiddenSelect name='plan' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a plan'>{selected?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          {plans.map((item) => (
            <SelectOption
              key={item.value}
              value={item.value}
              label={item.name}
              style={{ height: 'auto', paddingBlock: 'var(--spacing-6)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                <Text size={3} fontWeight={500}>
                  {item.name} · {item.price}
                </Text>
                <Text size={2} style={{ opacity: 0.75 }}>{item.description}</Text>
              </div>
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Select в нативной форме

Когда использовать:

- выбранное значение должно отправляться обычными механизмами формы
- интеграция опирается на `FormData`

Заметки о композиции:

- добавьте `SelectHiddenSelect`
- держите select внутри границ формы

Компромиссы:

- улучшает совместимость с нативными формами
- добавляет в композицию ещё одну обязательную часть

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

Примечания:

- без `SelectHiddenSelect` элемент может рендериться корректно, но контракт нативной формы становится слабее

## Своя иконка

Когда использовать:

- иконка триггера должна подсказывать вид значения, а не только наличие списка
- стандартный шеврон не подходит к окружающему интерфейсу

Заметки о композиции:

- передайте свою иконку дочерним элементом `SelectIcon`; она заменяет стандартный шеврон
- держите `SelectIcon` внутри `SelectCombobox`, после `SelectValue`

Компромиссы:

- придаёт триггеру смысл с первого взгляда
- без шеврона менее очевидно, что поле открывает список

<!-- example: select/custom-icon.tsx -->
```tsx
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { GlobeIcon } from '@vega-ui/icons';

export default function CustomIcon() {
  return (
    <Select defaultValue='en' style={{ width: 180 }}>
      <SelectCombobox aria-label='Language'>
        <SelectValue />
        <SelectIcon>
          <GlobeIcon />
        </SelectIcon>
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='fr'>French</SelectOption>
        <SelectOption value='ja'>Japanese</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->
