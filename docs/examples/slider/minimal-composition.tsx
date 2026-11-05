import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Slider defaultValue={50} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Zoom' />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
