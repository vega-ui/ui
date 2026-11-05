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
