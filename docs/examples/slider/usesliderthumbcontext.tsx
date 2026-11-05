import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
  useSliderContext,
  useSliderThumbContext,
} from '@vega-ui/react';

function ThumbValue() {
  const { values } = useSliderContext();
  const { index } = useSliderThumbContext();

  return (
    <span
      style={{
        position: 'absolute',
        insetBlockEnd: 'calc(100% + var(--spacing-3))',
        insetInlineStart: '50%',
        width: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Text size={1} fontWeight={600} style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
        {values[index]}°C
      </Text>
    </span>
  );
}

export default function Usesliderthumbcontext() {
  return (
    <Slider min={16} max={28} defaultValue={[19, 23]} minStepsBetweenThumbs={1} style={{ width: '100%', maxWidth: 400, marginBlockStart: 'var(--spacing-16)' }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb index={0}>
        <SliderThumbInput aria-label='Night temperature' />
        <SliderThumbIndicator>
          <ThumbValue />
        </SliderThumbIndicator>
      </SliderThumb>
      <SliderThumb index={1}>
        <SliderThumbInput aria-label='Day temperature' />
        <SliderThumbIndicator>
          <ThumbValue />
        </SliderThumbIndicator>
      </SliderThumb>
    </Slider>
  );
}
