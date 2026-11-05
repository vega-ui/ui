import { Button, Icon } from '@vega-ui/react';
import { BookOpenIcon } from '@vega-ui/icons';

export default function StyledLinkAction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>Create API key</Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='/docs/api/authentication'>
          <Icon size='sm'><BookOpenIcon /></Icon>
          Read the API guide
        </a>
      </Button>
    </div>
  );
}
