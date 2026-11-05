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

export default function ValueLabelOnThumb() {
  const [volume, setVolume] = useState(40);

  return (
    <Slider value={volume} onChangeValue={setVolume} style={{ width: '100%', maxWidth: 400, marginBlockStart: 'var(--spacing-16)' }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Volume' />
        <SliderThumbIndicator>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              insetBlockEnd: 'calc(100% + var(--spacing-3))',
              insetInlineStart: '50%',
              width: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text
              size={1}
              fontWeight={600}
              style={{
                paddingBlock: 'var(--spacing-1)',
                paddingInline: 'var(--spacing-3)',
                borderRadius: 'var(--radius-2)',
                color: 'var(--color-white)',
                background: 'var(--color-primary-500)',
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
              }}
            >
              {volume}
            </Text>
          </span>
        </SliderThumbIndicator>
      </SliderThumb>
    </Slider>
  );
}
