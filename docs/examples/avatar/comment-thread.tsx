import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const comments = [
  {
    id: 1,
    author: 'Maria Chen',
    initials: 'MC',
    photo: portrait(210),
    time: '10:24',
    text: 'The retry policy should back off exponentially, otherwise a failing endpoint gets hammered every few seconds and we fill the queue with duplicate deliveries for the same event.',
  },
  {
    id: 2,
    author: 'Omar Haddad',
    initials: 'OH',
    photo: '',
    time: '10:31',
    text: 'Agreed. See https://example.com/rfcs/webhook-delivery-retry-policy-with-exponential-backoff-and-jitter',
  },
];

export default function CommentThread() {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 420 }}>
      {comments.map((comment) => (
        <li key={comment.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
          <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
            {comment.photo && <AvatarImage src={comment.photo} alt='' />}
            <AvatarFallback>{comment.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={2} style={{ color: 'var(--label-tertiary)' }}>
              <Text size={2} fontWeight={500} style={{ color: 'var(--label-primary)' }}>{comment.author}</Text>
              {' · '}
              <time style={{ fontVariantNumeric: 'tabular-nums' }}>{comment.time}</time>
            </Text>
            <Text size={2} style={{ overflowWrap: 'anywhere' }}>{comment.text}</Text>
          </div>
        </li>
      ))}
    </ol>
  );
}
