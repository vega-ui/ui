import { Avatar, AvatarFallback, AvatarIcon, Text } from '@vega-ui/react';
import { User } from '@vega-ui/icons';

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return '';
  if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toLocaleUpperCase();
  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];
  return `${first}${last}`.toLocaleUpperCase();
};

const names = [
  'Ada Lovelace',
  'José María de la Cruz Fernández',
  'Prince',
  'Анна Смирнова',
  '王小明',
  'Ölüm Çelik',
  '',
];

export default function Initials() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 280 }}>
      {names.map((name) => {
        const initials = getInitials(name);
        const label = name === '' ? 'Unnamed user' : name;
        return (
          <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
            <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
              {initials === '' && <AvatarIcon><User /></AvatarIcon>}
              {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
            </Avatar>
            <Text size={3} style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</Text>
          </li>
        );
      })}
    </ul>
  );
}
