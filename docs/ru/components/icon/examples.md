# Icon: примеры

## Базовый

### Базовый: иконки рядом с текстом

`Icon` добавляет дочернему SVG `aria-hidden='true'` и `stroke='currentColor'`, поэтому глиф рядом с текстом декоративен и берёт цвет текста родителя.

<!-- example: icon/info-row.tsx -->
```tsx
import { Icon, Text } from '@vega-ui/react';
import { CircleCheckIcon, ShieldIcon, TriangleAlertIcon } from '@vega-ui/icons';

export default function InfoRow() {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-green-accent-500)' }}><CircleCheckIcon /></Icon>
        <Text size={3}>SSO is enabled for this workspace</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-primary-500)' }}><ShieldIcon /></Icon>
        <Text size={3}>Two-factor authentication is required for admins</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-error)' }}><TriangleAlertIcon /></Icon>
        <Text size={3}>2 members have not verified their email</Text>
      </li>
    </ul>
  );
}
```
<!-- /example -->

### Базовый: шкала размеров

`size` соответствует фиксированным размерам от `4xs` (8px) до `xl` (28px). Выбирайте размер под текст или контрол рядом с иконкой.

<!-- example: icon/sizes.tsx -->
```tsx
import { Icon, type IconSize } from '@vega-ui/react';
import { StarIcon } from '@vega-ui/icons';

const sizes: IconSize[] = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-8)' }}>
      {sizes.map((size) => (
        <figure key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-3)', margin: 0 }}>
          <Icon size={size}><StarIcon /></Icon>
          <figcaption style={{ color: 'var(--label-secondary)', fontSize: 'var(--font-size-1)' }}>{size}</figcaption>
        </figure>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: шеврон раскрытия

Шеврон поворачивается через CSS, когда раздел раскрывается; само состояние сообщает `aria-expanded` на кнопке, а не иконка.

<!-- example: icon/disclosure-chevron.tsx -->
```tsx
import { Button, Icon, Text } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useState } from 'react';
import './examples.css';

export default function DisclosureChevron() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button
        type='button'
        variant='secondary'
        appearance='ghost'
        aria-expanded={expanded}
        aria-controls='shipping-details'
        onClick={() => setExpanded(!expanded)}
      >
        Shipping details
        <Icon size='sm' className='disclosureChevron' style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}>
          <ChevronDownIcon />
        </Icon>
      </Button>
      <div id='shipping-details' hidden={!expanded}>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Ships in 2–3 business days from Berlin. Free returns within 30 days.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: иконка в начале текстового поля

`TextField` — flex-контейнер, поэтому `Icon` перед `TextFieldInput` становится украшением поля. У поля остаётся видимый `Label`; иконка только декорирует.

<!-- example: icon/input-adornment.tsx -->
```tsx
import { Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { AtSignIcon } from '@vega-ui/icons';
import { FormEvent, useState } from 'react';

export default function InputAdornment() {
  const [handle, setHandle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHandle(String(new FormData(event.currentTarget).get('handle')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='profile-handle'>Username</Label>
      <TextField style={{ paddingInlineStart: 'var(--spacing-8)', gap: 'var(--spacing-3)' }}>
        <Icon size='sm' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><AtSignIcon /></Icon>
        <TextFieldInput id='profile-handle' name='handle' placeholder='jane.doe' pattern='[a-z0-9._]+' required style={{ paddingInlineStart: 0 }} />
      </TextField>
      <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {handle === '' ? 'Press Enter to save' : `Profile URL: example.com/@${handle}`}
      </output>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: иконки внутри кнопок

Иконки в начале и в конце встают в flex-зазор кнопки. Внутри `Button` иконка не масштабируется сама, поэтому задайте `size` под размер кнопки.

<!-- example: icon/icon-inside-a-button.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { ChevronDownIcon, DownloadIcon, PlusIcon } from '@vega-ui/icons';

export default function IconInsideAButton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>
        <Icon size='sm'><PlusIcon /></Icon>
        Add member
      </Button>
      <Button type='button' variant='secondary' appearance='ghost'>
        Export
        <Icon size='sm'><ChevronDownIcon /></Icon>
      </Button>
      <Button type='button' size='sm' variant='secondary' appearance='ghost'>
        <Icon size='xs'><DownloadIcon /></Icon>
        Invoice.pdf
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: иконка в сообщении валидации

Поле проверяется при потере фокуса. Смысл несёт текст ошибки, а не иконка; иконка наследует цвет ошибки от `HelperText`, а сообщение связано через `aria-describedby`.

<!-- example: icon/error-message-icon.tsx -->
```tsx
import { HelperText, Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function ErrorMessageIcon() {
  const [error, setError] = useState('');

  const validate = (input: HTMLInputElement) => {
    if (input.validity.valid) {
      setError('');
      return;
    }

    setError('Enter an email like name@company.com');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='billing-email'>Billing email</Label>
      <TextField error={error !== ''}>
        <TextFieldInput
          id='billing-email'
          type='email'
          defaultValue='finance.acme.com'
          required
          aria-invalid={error !== ''}
          aria-describedby={error === '' ? undefined : 'billing-email-error'}
          onBlur={(event) => validate(event.currentTarget)}
        />
      </TextField>
      {error !== '' && (
        <HelperText id='billing-email-error' error style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Icon size='xs' style={{ flexShrink: 0 }}><CircleAlertIcon /></Icon>
          {error}
        </HelperText>
      )}
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: иконки в отключённых контролах

Глиф использует `currentColor`, поэтому берёт цвет отключённого текста кнопки без дополнительных стилей. То же работает для приглушённого поясняющего текста.

<!-- example: icon/muted-control-icon.tsx -->
```tsx
import { Button, Icon, IconButton } from '@vega-ui/react';
import { LockIcon, Trash2Icon, UploadIcon } from '@vega-ui/icons';

export default function MutedControlIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='button' disabled>
          <Icon size='sm'><UploadIcon /></Icon>
          Upload logo
        </Button>
        <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Delete logo' disabled>
          <Icon><Trash2Icon /></Icon>
        </IconButton>
      </div>
      <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', margin: 0, color: 'var(--disable-text-color)', fontSize: 'var(--font-size-2)' }}>
        <Icon size='xs' style={{ flexShrink: 0 }}><LockIcon /></Icon>
        Branding is managed by your organization admin
      </p>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: иконка как единственный сигнал статуса

В колонке статуса нет видимого текста, а иконка остаётся `aria-hidden`. `VisuallyHidden` сообщает статус скринридеру словами.

<!-- example: icon/standalone-meaningful-icon.tsx -->
```tsx
import { Icon, VisuallyHidden } from '@vega-ui/react';
import { CircleCheckIcon, CircleXIcon } from '@vega-ui/icons';

const checks = [
  { name: 'Unit tests', passed: true },
  { name: 'Lint', passed: true },
  { name: 'Visual regression', passed: false },
];

export default function StandaloneMeaningfulIcon() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th scope='col' style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Check</th>
          <th scope='col' style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {checks.map((check) => (
          <tr key={check.name}>
            <td style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>{check.name}</td>
            <td style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>
              <Icon
                size='sm'
                style={{ color: check.passed ? 'var(--color-green-accent-500)' : 'var(--color-error)' }}
              >
                {check.passed ? <CircleCheckIcon /> : <CircleXIcon />}
              </Icon>
              <VisuallyHidden asChild>
                <span>{check.passed ? 'Passed' : 'Failed'}</span>
              </VisuallyHidden>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```
<!-- /example -->

### Пограничный случай: направленные иконки в раскладке справа налево

Стрелки указывают в сторону чтения, поэтому в `dir='rtl'` их нужно отражать. Отражайте только направленные глифы; галочка или часы остаются как есть.

<!-- example: icon/rtl-directional-icon.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { ArrowRightIcon } from '@vega-ui/icons';

export default function RtlDirectionalIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
      <div dir='ltr'>
        <Button type='button'>
          Continue
          <Icon size='sm'><ArrowRightIcon /></Icon>
        </Button>
      </div>
      <div dir='rtl' lang='ar'>
        <Button type='button'>
          متابعة
          <Icon size='sm' style={{ transform: 'scaleX(-1)' }}><ArrowRightIcon /></Icon>
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: размер вне шкалы

Для иконки размером с иллюстрацию задайте `--icon-size` напрямую. Пропы `width` и `height` сейчас не передаются в SVG, поэтому не полагайтесь на них.

<!-- example: icon/custom-icon-size.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Heading, Icon, Text } from '@vega-ui/react';
import { InboxIcon } from '@vega-ui/icons';

export default function CustomIconSize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%', textAlign: 'center' }}>
      <Icon strokeWidth={1.25} style={{ '--icon-size': '64px', color: 'var(--label-tertiary)' } as CSSProperties}>
        <InboxIcon />
      </Icon>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} fontWeight={600}>Inbox zero</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', textWrap: 'balance' }}>New requests from your team show up here.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->
