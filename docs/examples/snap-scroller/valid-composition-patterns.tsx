import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const rooms = ['Reception', 'Meeting room', 'Quiet zone', 'Kitchen'];

const figureStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  margin: 0,
};

const photoStyle: CSSProperties = {
  height: 120,
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function ValidCompositionPatterns() {
  return (
    <SnapScroller tabIndex={0} aria-label='Office photos' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      {rooms.map((room, index) => (
        <SnapScrollerContent key={room} index={index} asChild>
          <figure style={figureStyle}>
            <div role='img' aria-label={`${room} photo`} style={photoStyle} />
            <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
              <figcaption>{room}</figcaption>
            </Text>
          </figure>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
