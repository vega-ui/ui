import { Button, TextField, TextFieldInput } from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <TextField size={size} style={{ flex: 1 }}>
            <TextFieldInput aria-label={`Coupon code, size ${size}`} placeholder={`Coupon code (${size})`} />
          </TextField>
          <Button size={size} variant='secondary' appearance='ghost'>Apply</Button>
        </div>
      ))}
    </div>
  );
}
