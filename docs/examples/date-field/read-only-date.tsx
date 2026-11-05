import { DateField, DateFieldInput, HelperText, Label } from '@vega-ui/react';

export default function ReadOnlyDate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='account-created'>Account created</Label>
      <DateField format='dd.MM.yyyy' separator='.' defaultValue='2024-09-02'>
        <DateFieldInput id='account-created' name='accountCreated' readOnly aria-describedby='account-created-hint' />
      </DateField>
      <HelperText id='account-created-hint'>Set by the system. The value is still submitted with the form.</HelperText>
    </div>
  );
}
