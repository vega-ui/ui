import { Heading, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const features = [
  { title: 'Shared inbox', description: 'Route every customer email to one queue and assign it in a click.' },
  { title: 'SLA timers', description: 'See how long each conversation has waited before it breaches the 4-hour target.' },
  { title: 'Saved replies', description: 'Answer refund and shipping questions with approved templates.' },
  { title: 'Reports', description: 'Track first response time and resolution rate for every teammate.' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'start',
  gap: 'var(--spacing-4)',
  width: '100%',
  minHeight: 140,
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function SimpleCarouselShell() {
  return (
    <SnapScroller
      role='region'
      aria-roledescription='carousel'
      aria-label='Helpdesk features'
      tabIndex={0}
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      {features.map((feature, index) => (
        <SnapScrollerContent
          key={feature.title}
          index={index}
          role='group'
          aria-roledescription='slide'
          aria-label={`${index + 1} of ${features.length}`}
          style={slideStyle}
        >
          <Heading as='h3' size={5}>{feature.title}</Heading>
          <Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            {feature.description}
          </Text>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
