import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function SliderWithDefaultValue() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <Label htmlFor='notification-volume'>Notification volume</Label>
      <Slider defaultValue={30} name='notification-volume'>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput id='notification-volume' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>
  );
}
