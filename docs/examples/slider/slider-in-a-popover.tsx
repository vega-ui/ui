import { useState } from 'react';
import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';
import { Volume1Icon, Volume2Icon, VolumeXIcon } from '@vega-ui/icons';

export default function SliderInAPopover() {
  const [volume, setVolume] = useState(40);

  let VolumeIcon = Volume2Icon;
  if (volume === 0) {
    VolumeIcon = VolumeXIcon;
  } else if (volume < 50) {
    VolumeIcon = Volume1Icon;
  }

  return (
    <Popover role='dialog' placement='top'>
      <PopoverTrigger asChild>
        <IconButton aria-label={`Volume, ${volume}%`} variant='secondary' appearance='ghost'>
          <Icon size='sm'><VolumeIcon /></Icon>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent aria-label='Volume'>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <Slider orientation='vertical' value={volume} onChangeValue={setVolume} style={{ height: 140 }}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label='Volume' aria-valuetext={`${volume}%`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </div>
      </PopoverContent>
    </Popover>
  );
}
