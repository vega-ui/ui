import { Radio } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div role='radiogroup' aria-label='Theme' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='theme' value='light' defaultChecked />
        Light
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='theme' value='dark' />
        Dark
      </label>
    </div>
  );
}
