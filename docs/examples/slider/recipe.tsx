import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  type SliderProps,
} from '@vega-ui/react';
import { useId } from 'react';

export function MySlider({ id, ...props }: SliderProps) {
  return (
    <Slider {...props}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput id={id} />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-5)', width: '100%', maxWidth: 400 }}>
      <Label htmlFor={id}>Volume</Label>
      <MySlider id={id} name='volume' defaultValue={40} />
    </div>
  );
}
