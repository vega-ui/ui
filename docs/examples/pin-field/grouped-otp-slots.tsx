import type { CSSProperties } from 'react';
import { PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';

const roundSlot = { '--input-br-ratio': 0.5 } as CSSProperties;

export default function GroupedOtpSlots() {
  return (
    <PinField size='lg' maxLength={6} style={{ gap: 'var(--spacing-6)' }}>
      <PinFieldInput aria-label='Sign-in code' autoComplete='one-time-code' />
      <PinFieldSlot index={0} style={roundSlot} />
      <PinFieldSlot index={1} style={roundSlot} />
      <PinFieldSlot index={2} style={roundSlot} />
      <PinFieldSeparator />
      <PinFieldSlot index={3} style={roundSlot} />
      <PinFieldSlot index={4} style={roundSlot} />
      <PinFieldSlot index={5} style={roundSlot} />
    </PinField>
  );
}
