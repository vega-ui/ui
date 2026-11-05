import { ButtonBase, type ButtonBaseAppearance, type ButtonBaseVariant } from '@vega-ui/react';

const variants: ButtonBaseVariant[] = ['primary', 'secondary'];
const appearances: ButtonBaseAppearance[] = ['fill', 'outline', 'ghost', 'transparent'];

export default function VariantAppearanceMatrix() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%' }}>
      {appearances.map((appearance) => variants.map((variant) => (
        <ButtonBase
          key={`${variant}-${appearance}`}
          type='button'
          variant={variant}
          appearance={appearance}
          style={{ padding: 'var(--spacing-3) var(--spacing-8)', borderRadius: 'var(--radius-3)', fontSize: 'var(--font-size-2)' }}
        >
          {variant} {appearance}
        </ButtonBase>
      )))}
    </div>
  );
}
