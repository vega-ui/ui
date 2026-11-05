import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValueTextForScreenReaders() {
  const [temperature, setTemperature] = useState(20);

  return (
    <Slider min={-10} max={30} value={temperature} onChangeValue={setTemperature} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Temperature' aria-valuetext={`${temperature} °C`} />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
