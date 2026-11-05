import { Label, Radio } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='density' value='comfortable' defaultChecked />
        Comfortable
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio id='density-compact' name='density' value='compact' />
        <Label htmlFor='density-compact'>Compact</Label>
      </div>
    </div>
  );
}
