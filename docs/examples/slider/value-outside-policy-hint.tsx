import { useState } from 'react';
import {
  HelperText,
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const policyLimit = 80;

export default function ValueOutsidePolicyHint() {
  const [cpu, setCpu] = useState(90);

  const invalid = cpu > policyLimit;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Label htmlFor='cpu-limit'>CPU limit</Label>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{cpu}%</Text>
      </div>
      <Slider name='cpu-limit' value={cpu} onChangeValue={setCpu}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput
            id='cpu-limit'
            aria-valuetext={`${cpu}%`}
            aria-invalid={invalid}
            aria-describedby={invalid ? 'cpu-limit-error' : undefined}
          />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
      {invalid && (
        <HelperText id='cpu-limit-error' error>
          Shared clusters allow up to {policyLimit}%. Lower the limit to save.
        </HelperText>
      )}
    </div>
  );
}
