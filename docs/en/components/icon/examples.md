# Icon Examples

## Basic

### Basic: icons beside text

`Icon` adds `aria-hidden='true'` and `stroke='currentColor'` to its child SVG, so a glyph next to text is decorative and takes the text color of its parent.

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

### Basic: size scale

`size` maps to fixed pixel sizes from `4xs` (8px) to `xl` (28px). Pick the size that matches the text or control next to the icon.

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

## Controlled/Stateful

### Controlled/Stateful: disclosure chevron

The chevron rotates with CSS when the section opens; the state itself is exposed by `aria-expanded` on the button, never by the icon.

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

## Form/Integration

### Form/Integration: leading icon inside a text field

`TextField` is a flex container, so an `Icon` placed before `TextFieldInput` becomes an adornment. The field keeps its visible `Label`; the icon only decorates.

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

## Layout/Overlay

### Layout/Overlay: icons inside buttons

Leading and trailing icons sit in the button's flex gap. Inside `Button` the icon does not scale automatically, so set `size` to match the button size.

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

## Error

### Error: icon in a validation message

The field validates on blur. The error text, not the icon, carries the meaning; the icon inherits the error color from `HelperText` and the message is linked with `aria-describedby`.

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

## Disabled

### Disabled: icons in disabled controls

Because the glyph uses `currentColor`, it takes the disabled text color of its button without extra styles. The same works for muted helper copy.

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

## Edge

### Edge: icon as the only status signal

In a status column there is no visible text, and the icon stays `aria-hidden`. A `VisuallyHidden` span gives screen readers the status in words.

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

### Edge: directional icons in right-to-left layouts

Arrows point in the reading direction, so in `dir='rtl'` they must be mirrored. Flip only directional glyphs; icons like a check or a clock stay as they are.

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

### Edge: size outside the scale

For an illustration-sized icon, set `--icon-size` directly. The `width` and `height` props are not forwarded to the SVG at the moment, so do not rely on them.

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
