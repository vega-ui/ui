import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function SecondarySlider() {
  return (
    <Slider variant='secondary' defaultValue={25} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Playback position' />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
