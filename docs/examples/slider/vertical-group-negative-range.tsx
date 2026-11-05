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

const bands = ['60 Hz', '230 Hz', '910 Hz', '3.6 kHz', '14 kHz'];

export default function VerticalGroupNegativeRange() {
  const [gains, setGains] = useState([4, 2, 0, -2, 3]);

  const changeGain = (band: number, gain: number) => {
    setGains((current) => current.map((value, index) => (index === band ? gain : value)));
  };

  return (
    <div role='group' aria-label='Equalizer' style={{ display: 'flex', gap: 'var(--spacing-16)' }}>
      {bands.map((band, index) => (
        <div key={band} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
          <Slider
            orientation='vertical'
            min={-12}
            max={12}
            value={gains[index]}
            onChangeValue={(gain) => changeGain(index, gain)}
            style={{ height: 200 }}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label={band} aria-valuetext={`${gains[index]} dB`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
          <Text size={1} fontWeight={600}>{band}</Text>
        </div>
      ))}
    </div>
  );
}
