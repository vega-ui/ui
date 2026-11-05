export const COMPOSABLE_SNIPPETS = [
  {
    tsx: `<Slider className='sound'>
  <SliderTrack>
    <SliderRange className='fill' />
    <Icon size='xs'><Volume2 /></Icon>
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Volume' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>`,
    css: `.sound {
  --slider-size: 24px;
  --slider-thumb-size: 24px;
  --slider-thumb-color: white;
}
.fill {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}`,
  },
  {
    tsx: `<Slider max={225} className='scrubber'>
  <SliderTrack className='bar'>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Playback position' aria-valuetext={time} />
    <SliderThumbIndicator className='hidden' />
  </SliderThumb>
</Slider>`,
    css: `.scrubber {
  --slider-size: 6px;
}
.scrubber:has(input:active) {
  --slider-size: 10px;
  --slider-range-color: var(--color-primary-600);
}
.bar {
  transition: height 200ms;
}
.hidden {
  opacity: 0;
}`,
  },
  {
    tsx: `<Slider max={6} className='steps'>
  <SliderTrack className='ticks'>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Text size' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>`,
    css: `.steps {
  --slider-size: 4px;
  --slider-thumb-size: 20px;
}
.ticks::before {
  content: '';
  position: absolute;
  inset: -4px 0;
  background: linear-gradient(to right, gray 1px, transparent 1px)
    left / calc((100% - 1px) / 6) 100% repeat-x;
}`,
  },
  {
    tsx: `<Slider orientation='vertical' min={10} max={30} className='home'>
  <SliderTrack className='pill'>
    <SliderRange className='fill' />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Temperature' />
    <SliderThumbIndicator className='hidden' />
  </SliderThumb>
</Slider>`,
    css: `.home {
  --slider-size: 72px;
  --slider-thumb-size: 72px;
  --slider-br-ratio: 0.34;
}
.pill {
  overflow: hidden;
}
.fill {
  border-radius: 0;
}
.hidden {
  opacity: 0;
}`,
  },
];
