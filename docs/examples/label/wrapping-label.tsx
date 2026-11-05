import { Label, Radio, TextArea } from '@vega-ui/react';

export default function WrappingLabel() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Label style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        Delivery instructions
        <TextArea name='instructions' rows={3} fullWidth placeholder='Gate code, floor, where to leave the parcel' />
      </Label>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Radio name='window' value='morning' defaultChecked />
          Morning, 8:00–12:00
        </Label>
        <Label fontWeight={400} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Radio name='window' value='evening' />
          Evening, 17:00–21:00
        </Label>
      </div>
    </div>
  );
}
