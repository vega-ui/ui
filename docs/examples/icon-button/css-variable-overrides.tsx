import type { CSSProperties } from 'react';
import { Icon, IconButton } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--icon-button-size': '48px',
  '--icon-button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </IconButton>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </IconButton>
      <IconButton type='button' aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </IconButton>
    </div>
  );
}
