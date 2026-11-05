import { Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function RtlLayout() {
  const id = useId();

  return (
    <div dir='rtl' lang='ar' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>رمز التحقق</Label>
      <PinField dir='ltr' maxLength={4}>
        <PinFieldInput id={id} autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
    </div>
  );
}
