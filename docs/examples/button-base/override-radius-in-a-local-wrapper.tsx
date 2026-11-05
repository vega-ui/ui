import type { CSSProperties } from 'react';
import { ButtonBase } from '@vega-ui/react';

const pill: CSSProperties = {
  padding: 'var(--spacing-3) var(--spacing-10)',
  borderRadius: 999,
  fontSize: 'var(--font-size-2)',
};

const brand = {
  ...pill,
  '--button-border-color': 'var(--color-amethyst-accent-500)',
  '--button-border-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-border-color-active': 'var(--color-amethyst-accent-700)',
  '--button-color': 'var(--color-amethyst-accent-500)',
  '--button-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-color-active': 'var(--color-amethyst-accent-700)',
} as CSSProperties;

export default function OverrideRadiusInALocalWrapper() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <ButtonBase type='button' appearance='ghost' style={pill}>
        Invite teammates
      </ButtonBase>
      <ButtonBase type='button' appearance='outline' style={brand}>
        Join beta
      </ButtonBase>
    </div>
  );
}
