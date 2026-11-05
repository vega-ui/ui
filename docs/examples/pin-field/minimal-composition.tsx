import { PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PinField maxLength={4}>
      <PinFieldInput aria-label='Card PIN' autoComplete='off' />
      <PinFieldSlot index={0} />
      <PinFieldSlot index={1} />
      <PinFieldSlot index={2} />
      <PinFieldSlot index={3} />
    </PinField>
  );
}
