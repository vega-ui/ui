import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function LabelSizes() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-${size}`} size={size}>Project name ({size})</Label>
          <TextField size={size}>
            <TextFieldInput id={`${id}-${size}`} />
          </TextField>
        </div>
      ))}
    </div>
  );
}
