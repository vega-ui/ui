import { FormEvent, useState } from 'react';
import {
  Button,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';

export default function NativeRadioGroupParticipation() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`format=${data.get('export-format')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='export-format-label'>File format</Label>
        <SegmentedControl name='export-format' defaultValue='csv' role='radiogroup' aria-labelledby='export-format-label'>
          <SegmentedControlItem value='csv'>
            <SegmentedControlItemInput />
            CSV
          </SegmentedControlItem>
          <SegmentedControlItem value='xlsx'>
            <SegmentedControlItemInput />
            Excel
          </SegmentedControlItem>
          <SegmentedControlItem value='json'>
            <SegmentedControlItemInput />
            JSON
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Export report</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
