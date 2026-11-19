import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  Text,
  type AvatarProps,
} from '@vega-ui/react';
import { UserIcon } from '@vega-ui/icons';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return '';
  if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toLocaleUpperCase();
  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];
  return `${first}${last}`.toLocaleUpperCase();
}

interface MyAvatarProps extends AvatarProps {
  src?: string
  name?: string
}

export function MyAvatar({ src, name, ...props }: MyAvatarProps) {
  const initials = getInitials(name ?? '');

  return (
    <Avatar role='img' aria-label={name} {...props}>
      {src && <AvatarImage src={src} alt='' />}
      {initials === '' && <AvatarIcon><UserIcon /></AvatarIcon>}
      {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
    </Avatar>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shared with</Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
        <MyAvatar size='sm' src={portrait(210)} name='Maria Chen' />
        <MyAvatar size='sm' name='Omar Haddad' />
        <MyAvatar size='sm' variant='secondary' aria-label='Pending invite' />
      </div>
    </div>
  );
}
