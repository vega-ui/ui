import { useId, useState } from 'react';
import { HelperText, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';

const qualities = [
  { value: 'auto', label: 'Auto', pro: false },
  { value: '720p', label: '720p', pro: false },
  { value: '1080p', label: '1080p', pro: false },
  { value: '4k', label: '4K', pro: true },
];

export default function VideoQuality() {
  const labelId = useId();
  const hintId = useId();
  const [quality, setQuality] = useState('auto');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', boxSizing: 'border-box', width: '100%', maxWidth: 360 }}>
      <Text id={labelId} size={3} fontWeight={500}>Video quality</Text>
      <ToggleGroup aria-labelledby={labelId} aria-describedby={hintId} size='xs' value={quality} onChangeValue={setQuality}>
        {qualities.map((item) => (
          <ToggleGroupToggle key={item.value} value={item.value} disabled={item.pro}>{item.label}</ToggleGroupToggle>
        ))}
      </ToggleGroup>
      <HelperText id={hintId}>4K streaming is part of the Pro plan.</HelperText>
    </div>
  );
}
