import { Button, Icon } from '@vega-ui/react';
import { ArrowRightIcon, ExternalLinkIcon } from '@vega-ui/icons';
import './examples.css';

export default function NavigationWithButtonVisuals() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      <Button asChild>
        <a href='/onboarding/import'>
          Import contacts
          <Icon size='sm' className='directionalIcon'><ArrowRightIcon /></Icon>
        </a>
      </Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='https://status.example.com' target='_blank' rel='noreferrer'>
          Status page
          <Icon size='sm'><ExternalLinkIcon /></Icon>
        </a>
      </Button>
    </div>
  );
}
