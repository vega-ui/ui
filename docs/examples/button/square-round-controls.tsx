import type { CSSProperties } from 'react';
import { Button, Icon } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--button-height': '48px',
  '--button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function SquareRoundControls() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </Button>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </Button>
      <Button type='button' square aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </Button>
    </div>
  );
}
