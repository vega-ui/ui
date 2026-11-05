import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const plans = ['1 GB', '5 GB', '20 GB', '100 GB', '1 TB'];
const last = plans.length - 1;

export default function DiscreteStepsWithLabels() {
  const [plan, setPlan] = useState(2);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 400 }}>
      <Slider min={0} max={last} step={1} value={plan} onChangeValue={setPlan}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput aria-label='Storage' aria-valuetext={plans[plan]} />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
      <div aria-hidden style={{ position: 'relative', height: 'var(--spacing-10)' }}>
        {plans.map((label, index) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              insetInlineStart: `${index / last * 100}%`,
              width: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text size={1} style={{ whiteSpace: 'nowrap', color: index === plan ? 'var(--label-primary)' : 'var(--label-secondary)' }}>
              {label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
