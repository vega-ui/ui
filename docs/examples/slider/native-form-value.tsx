import { FormEvent, useState } from 'react';
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function NativeFormValue() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`age=${data.getAll('age').join('–')}, radius=${data.get('radius')} km`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Audience age</FieldsetLegend>
          <Slider min={18} max={65} defaultValue={[25, 40]} name='age'>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0}>
              <SliderThumbInput aria-label='Minimum age' />
              <SliderThumbIndicator />
            </SliderThumb>
            <SliderThumb index={1}>
              <SliderThumbInput aria-label='Maximum age' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Delivery radius</FieldsetLegend>
          <Slider min={1} max={50} defaultValue={10}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput name='radius' aria-label='Radius in kilometers' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Save campaign</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
