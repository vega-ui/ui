import { useState } from 'react';
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function VerticalSlider() {
  const [level, setLevel] = useState(70);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <Slider orientation='vertical' value={level} onChangeValue={setLevel} style={{ height: 200 }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Master volume' aria-valuetext={`${level}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <Text size={1} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{level}%</Text>
      </div>
      <Text size={2} style={{ maxWidth: 220, color: 'var(--label-secondary)' }}>
        A vertical slider needs an explicit height. Arrow Up and Arrow Right raise the value, Page Up and Page Down jump by a tenth.
      </Text>
    </div>
  );
}
