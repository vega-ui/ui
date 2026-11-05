import { Heading, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const articles = [
  { title: 'Migrating to v3', minutes: 6 },
  { title: 'Theming with tokens', minutes: 4 },
  { title: 'Building a date range form', minutes: 9 },
  { title: 'Testing overlays in the browser', minutes: 7 },
];

const cardStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: 'calc(100% - var(--spacing-32))',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function PeekNextCard() {
  return (
    <SnapScroller
      tabIndex={0}
      aria-label='Guides'
      style={{
        width: '100%',
        gap: 'var(--spacing-6)',
        paddingInline: 'var(--spacing-8)',
        scrollPaddingInline: 'var(--spacing-8)',
        boxSizing: 'border-box',
      }}
    >
      {articles.map((article, index) => (
        <SnapScrollerContent key={article.title} index={index} style={cardStyle}>
          <Heading as='h3' size={4}>{article.title}</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>{article.minutes} min read</Text>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
