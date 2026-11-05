import { Separator, Text } from '@vega-ui/react';

const posts = [
  { title: 'Release notes 3.2', date: 'Mar 12' },
  { title: 'Dark mode for charts', date: 'Mar 5' },
  { title: 'Faster CSV exports', date: 'Feb 26' },
];

export default function DecorativeDivider() {
  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {posts.map((post, index) => (
        <li key={post.title} style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {index > 0 && <Separator aria-hidden />}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
            <Text size={2}>{post.title}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{post.date}</Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
