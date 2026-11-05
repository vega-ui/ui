import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function MarkersFromADatalist() {
  return (
    <>
      <datalist id='zoom-markers'>
        <option value='0' />
        <option value='50' />
        <option value='100' />
      </datalist>
      <Slider defaultValue={40} style={{ width: '100%', maxWidth: 400 }}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput list='zoom-markers' aria-label='Zoom' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </>
  );
}
