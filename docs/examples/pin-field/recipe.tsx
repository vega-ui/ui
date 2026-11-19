import { Label, PinField, PinFieldInput, PinFieldSlot, type PinFieldProps } from '@vega-ui/react';
import { useId } from 'react';

interface MyPinFieldProps extends PinFieldProps {
  name?: string
  autoComplete?: string
}

export function MyPinField({ id, name, autoComplete, maxLength = 4, ...props }: MyPinFieldProps) {
  const slots = Array.from({ length: maxLength }, (_, index) => index);

  return (
    <PinField maxLength={maxLength} {...props}>
      <PinFieldInput id={id} name={name} autoComplete={autoComplete} />
      {slots.map((index) => <PinFieldSlot key={index} index={index} />)}
    </PinField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from the text message</Label>
      <MyPinField id={id} name='code' autoComplete='one-time-code' maxLength={6} />
    </div>
  );
}
