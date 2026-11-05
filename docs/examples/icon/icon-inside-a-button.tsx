import { Button, Icon } from '@vega-ui/react';
import { ChevronDownIcon, DownloadIcon, PlusIcon } from '@vega-ui/icons';

export default function IconInsideAButton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>
        <Icon size='sm'><PlusIcon /></Icon>
        Add member
      </Button>
      <Button type='button' variant='secondary' appearance='ghost'>
        Export
        <Icon size='sm'><ChevronDownIcon /></Icon>
      </Button>
      <Button type='button' size='sm' variant='secondary' appearance='ghost'>
        <Icon size='xs'><DownloadIcon /></Icon>
        Invoice.pdf
      </Button>
    </div>
  );
}
