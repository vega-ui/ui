import { Button, Icon } from '@vega-ui/react';
import { DownloadIcon } from '@vega-ui/icons';

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' size='xs'>
        <Icon size='2xs'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='sm'>
        <Icon size='xs'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='md'>
        <Icon size='sm'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='lg'>
        <Icon size='md'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='xl'>
        <Icon size='lg'><DownloadIcon /></Icon>
        Export
      </Button>
    </div>
  );
}
