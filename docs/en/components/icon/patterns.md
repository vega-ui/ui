# Icon Patterns

## Inline Control Icon

When to use:

- a button or trigger needs one decorative glyph

Composition notes:

- keep icon size aligned with the control density
- let `currentColor` inherit from the parent control

Trade-offs:

- consistent and compact
- easy to overuse decorative glyphs

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

## Status Row Icon

When to use:

- text needs a small adjacent symbol

Composition notes:

- keep the icon secondary to the text
- do not rely on the icon as the only status signal

Trade-offs:

- fast visual scanning
- still needs text for clarity

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

## Custom SVG Wrapper

When to use:

- a custom or third-party SVG should use the same VegaUI sizing contract

Composition notes:

- keep the child SVG compatible with forwarded SVG props
- use explicit dimensions only when token sizing is not enough

Trade-offs:

- consistent icon integration
- easier to produce drift if every icon is explicitly sized

<!-- example: icon/custom-svg-wrapper.tsx -->
```tsx
import type { SVGProps } from 'react';
import { Icon } from '@vega-ui/react';

function OrbitMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' strokeWidth={2} strokeLinecap='round' {...props}>
      <circle cx='12' cy='12' r='3' />
      <ellipse cx='12' cy='12' rx='10' ry='4.5' transform='rotate(-30 12 12)' />
    </svg>
  );
}

export default function CustomSvgWrapper() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontWeight: 600 }}>
        <Icon size='lg' style={{ color: 'var(--color-primary-500)' }}><OrbitMark /></Icon>
        Orbit
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', color: 'var(--label-secondary)' }}>
        <Icon size='sm'><OrbitMark /></Icon>
        Synced with Orbit
      </span>
    </div>
  );
}
```
<!-- /example -->
