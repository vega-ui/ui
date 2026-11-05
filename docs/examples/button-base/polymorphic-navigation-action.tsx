import { ButtonBase, Icon } from '@vega-ui/react';
import { UsersIcon } from '@vega-ui/icons';

export default function PolymorphicNavigationAction() {
  return (
    <ButtonBase asChild variant='secondary' appearance='ghost'>
      <a
        href='/settings/members'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          padding: 'var(--spacing-3) var(--spacing-8)',
          borderRadius: 'var(--radius-3)',
          fontSize: 'var(--font-size-2)',
        }}
      >
        <Icon size='sm'><UsersIcon /></Icon>
        Manage members
      </a>
    </ButtonBase>
  );
}
