import { Button, HelperText, Label, Meter, MeterTrack, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function BioLengthMeter() {
  const fieldId = useId();
  const counterId = useId();
  const limit = 160;
  const [bio, setBio] = useState('Product designer in Lisbon. I write about design systems and accessible forms.');
  const [saved, setSaved] = useState<string | null>(null);

  const left = limit - bio.length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get('bio'));
    setSaved(`Saved, ${value.length} characters`);
  };

  const handleReset = () => {
    setBio('');
    setSaved(null);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>Profile bio</Label>
        <TextArea
          id={fieldId}
          name='bio'
          rows={3}
          maxLength={limit}
          required
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          aria-describedby={counterId}
          fullWidth
        />
        <Meter
          value={bio.length}
          max={limit}
          low={120}
          high={150}
          optimum={0}
          valueText={`${bio.length} of ${limit} characters`}
          aria-label='Bio length'
          size='sm'
          fullWidth
        >
          <MeterTrack />
        </Meter>
        <HelperText id={counterId} style={{ fontVariantNumeric: 'tabular-nums' }}>{left} characters left</HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button type='submit' size='sm'>Save</Button>
        <Button type='reset' size='sm' variant='secondary' appearance='ghost'>Clear</Button>
        <HelperText role='status' style={{ marginInlineStart: 'var(--spacing-4)' }}>{saved}</HelperText>
      </div>
    </form>
  );
}
