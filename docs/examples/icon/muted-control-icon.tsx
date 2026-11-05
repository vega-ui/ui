import { Button, Icon, IconButton } from '@vega-ui/react';
import { LockIcon, Trash2Icon, UploadIcon } from '@vega-ui/icons';

export default function MutedControlIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='button' disabled>
          <Icon size='sm'><UploadIcon /></Icon>
          Upload logo
        </Button>
        <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Delete logo' disabled>
          <Icon><Trash2Icon /></Icon>
        </IconButton>
      </div>
      <p style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', margin: 0, color: 'var(--disable-text-color)', fontSize: 'var(--font-size-2)' }}>
        <Icon size='xs' style={{ flexShrink: 0 }}><LockIcon /></Icon>
        Branding is managed by your organization admin
      </p>
    </div>
  );
}
