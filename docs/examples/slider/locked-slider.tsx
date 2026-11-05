import { useState } from 'react';
import {
  Fieldset,
  FieldsetLegend,
  HelperText,
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';

export default function LockedSlider() {
  const [automatic, setAutomatic] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='retention-days'>Log retention</Label>
        <Slider min={7} max={365} defaultValue={90} disabled>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput id='retention-days' aria-valuetext='90 days' aria-describedby='retention-note' />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <HelperText id='retention-note'>Set by your compliance policy: 90 days.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor='auto-brightness'>Adjust brightness automatically</Label>
          <Switch>
            <SwitchInput id='auto-brightness' checked={automatic} onChange={(event) => setAutomatic(event.currentTarget.checked)} />
            <SwitchIndicator />
          </Switch>
        </div>
        <Fieldset disabled={automatic}>
          <FieldsetLegend size={3} style={{ marginBlockEnd: 'var(--spacing-3)' }}>Manual brightness</FieldsetLegend>
          <Slider defaultValue={60}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label='Brightness' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
      </div>
    </div>
  );
}
