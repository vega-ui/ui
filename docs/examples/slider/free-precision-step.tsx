import { useState } from 'react';
import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function FreePrecisionStep() {
  const [opacity, setOpacity] = useState(0.35);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Label htmlFor='overlay-opacity'>Overlay opacity</Label>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{opacity.toFixed(3)}</Text>
      </div>
      <Slider min={0} max={1} step='any' name='overlay-opacity' value={opacity} onChangeValue={setOpacity}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput id='overlay-opacity' aria-valuetext={`${Math.round(opacity * 100)}%`} />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>
  );
}
