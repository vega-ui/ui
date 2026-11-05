import { useState } from 'react';
import {
  Button,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const tierNames = ['Free', 'Starter', 'Growth', 'Scale', 'Enterprise'];

export default function AnyNumberOfThumbs() {
  const [limits, setLimits] = useState([1000, 10000, 50000]);

  const addLimit = () => {
    const last = limits[limits.length - 1];
    if (last >= 95000) return;
    setLimits([...limits, Math.min(last + 20000, 100000)]);
  };

  const removeLimit = () => {
    setLimits(limits.slice(0, -1));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 400 }}>
      <Slider min={0} max={100000} step={1000} minStepsBetweenThumbs={5} value={limits} onChangeValue={setLimits}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        {limits.map((limit, index) => (
          <SliderThumb key={index} index={index}>
            <SliderThumbInput aria-label={`${tierNames[index]} tier limit`} aria-valuetext={`${limit.toLocaleString('en-US')} requests`} />
            <SliderThumbIndicator />
          </SliderThumb>
        ))}
      </Slider>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {limits.map((limit, index) => `${tierNames[index]}: up to ${limit.toLocaleString('en-US')}`).join(' · ')}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={addLimit} disabled={limits.length === tierNames.length}>Add tier</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={removeLimit} disabled={limits.length === 2}>Remove last tier</Button>
      </div>
    </div>
  );
}
