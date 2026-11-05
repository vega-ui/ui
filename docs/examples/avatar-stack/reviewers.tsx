import { AvatarFallback, AvatarImage, AvatarStack, AvatarStackItem, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const reviewers = [
  { name: 'Maria Chen', initials: 'MC', photo: portrait(210) },
  { name: 'Omar Haddad', initials: 'OH', photo: portrait(28) },
  { name: 'Lena Fischer', initials: 'LF', photo: '' },
  { name: 'Kenji Watanabe', initials: 'KW', photo: portrait(150) },
  { name: 'Ana Souza', initials: 'AS', photo: '' },
  { name: 'Tom Becker', initials: 'TB', photo: '' },
];

const maxVisible = 3;

export default function Reviewers() {
  const visible = reviewers.slice(0, maxVisible);
  const hidden = reviewers.slice(maxVisible);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Reviewers</Text>
      <AvatarStack size='sm' role='group' aria-label={`${reviewers.length} reviewers`}>
        {visible.map((reviewer) => (
          <AvatarStackItem key={reviewer.name} role='img' aria-label={reviewer.name} title={reviewer.name}>
            {reviewer.photo && <AvatarImage src={reviewer.photo} alt='' />}
            <AvatarFallback>{reviewer.initials}</AvatarFallback>
          </AvatarStackItem>
        ))}
        {hidden.length > 0 && (
          <AvatarStackItem variant='secondary' role='img' aria-label={`and ${hidden.length} more`} title={hidden.map((reviewer) => reviewer.name).join(', ')}>
            <AvatarFallback>+{hidden.length}</AvatarFallback>
          </AvatarStackItem>
        )}
      </AvatarStack>
    </div>
  );
}
