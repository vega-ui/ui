import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

const FIELDS = [
  { name: 'firstName', label: 'First name', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
  { name: 'jobTitle', label: 'Job title shown on your public profile', autoComplete: 'organization-title' },
];

export default function SideBySideLabels() {
  const id = useId();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(96px, 160px) minmax(0, 1fr)',
        alignItems: 'center',
        columnGap: 'var(--spacing-8)',
        rowGap: 'var(--spacing-6)',
        width: '100%',
      }}
    >
      {FIELDS.map((field) => (
        <div key={field.name} style={{ display: 'contents' }}>
          <Label htmlFor={`${id}-${field.name}`} size='sm'>{field.label}</Label>
          <TextField>
            <TextFieldInput id={`${id}-${field.name}`} name={field.name} autoComplete={field.autoComplete} />
          </TextField>
        </div>
      ))}
    </div>
  );
}
