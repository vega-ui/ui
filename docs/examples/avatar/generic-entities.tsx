import { Avatar, AvatarIcon, Text } from '@vega-ui/react';
import { BotIcon, Building2Icon, UsersIcon } from '@vega-ui/icons';

export default function GenericEntities() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><BotIcon /></AvatarIcon>
        </Avatar>
        <Text size={3}>Release bot merged 3 pull requests</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><UsersIcon /></AvatarIcon>
        </Avatar>
        <Text size={3}>Design team was mentioned in “Q4 roadmap”</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Building2Icon /></AvatarIcon>
        </Avatar>
        <Text size={3}>Northwind Traders</Text>
      </li>
    </ul>
  );
}
