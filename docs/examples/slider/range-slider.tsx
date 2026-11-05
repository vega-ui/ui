import {
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function RangeSlider() {
  return (
    <Fieldset style={{ width: '100%', maxWidth: 400 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Working hours</FieldsetLegend>
      <Slider min={0} max={24} defaultValue={[9, 18]} minStepsBetweenThumbs={1}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderThumbInput name='start-hour' aria-label='Start time' />
          <SliderThumbIndicator />
        </SliderThumb>
        <SliderThumb index={1}>
          <SliderThumbInput name='end-hour' aria-label='End time' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </Fieldset>
  );
}
