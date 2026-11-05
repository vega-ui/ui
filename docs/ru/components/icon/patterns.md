# Icon: паттерны

## Иконка внутри элемента управления

Когда использовать:

- кнопке или триггеру нужен один декоративный глиф

Заметки о композиции:

- согласуйте размер иконки с плотностью элемента управления
- позвольте `currentColor` наследоваться от родительского элемента

Компромиссы:

- единообразно и компактно
- декоративными глифами легко злоупотребить

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

## Иконка в строке статуса

Когда использовать:

- тексту нужен небольшой символ рядом

Заметки о композиции:

- иконка должна оставаться второстепенной по отношению к тексту
- не полагайтесь на иконку как на единственный сигнал статуса

Компромиссы:

- быстрый визуальный просмотр
- для ясности всё равно нужен текст

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

## Обёртка для собственного SVG

Когда использовать:

- собственный или сторонний SVG должен следовать тому же контракту размеров VegaUI

Заметки о композиции:

- дочерний SVG должен быть совместим с пробрасываемыми SVG-пропсами
- явные размеры используйте, только когда токенов недостаточно

Компромиссы:

- единообразная интеграция иконок
- легче получить расхождения, если каждой иконке задавать размер явно

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
