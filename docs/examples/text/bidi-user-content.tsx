import { Text } from '@vega-ui/react';

const comments = [
  { author: 'Maya Cohen', handle: 'מאיה כהן', count: 3 },
  { author: 'Omar Haddad', handle: 'عمر حداد', count: 12 },
];

export default function BidiUserContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      {comments.map((comment) => (
        <Text key={comment.author} size={3}>
          <Text asChild fontWeight={500}>
            <bdi>{comment.handle}</bdi>
          </Text>{' '}
          left {comment.count} comments
        </Text>
      ))}
    </div>
  );
}
