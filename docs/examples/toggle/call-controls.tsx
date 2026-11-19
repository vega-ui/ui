import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { CaptionsIcon, HandIcon, MicIcon, MicOffIcon } from '@vega-ui/icons';

export default function CallControls() {
  const [muted, setMuted] = useState(true);
  const [captions, setCaptions] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  const states: string[] = [muted ? 'You are muted' : 'Your microphone is on'];
  if (captions) states.push('captions on');
  if (handRaised) states.push('hand raised');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--radius-8)',
          border: '1px solid var(--separator-opaque)',
          background: 'var(--surface-primary)',
        }}
      >
        <Toggle pressed={muted} onChangePressed={setMuted} square aria-label='Mute'><Icon>{muted ? <MicOffIcon /> : <MicIcon />}</Icon></Toggle>
        <Toggle pressed={captions} onChangePressed={setCaptions} square aria-label='Captions'><Icon><CaptionsIcon /></Icon></Toggle>
        <Toggle pressed={handRaised} onChangePressed={setHandRaised} square aria-label='Raise hand'><Icon><HandIcon /></Icon></Toggle>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{states.join(' · ')}</Text>
    </div>
  );
}
