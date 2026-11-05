import { Button } from '@vega-ui/react';

export default function ActionHierarchy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button type='button' fullWidth>Publish article</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Save draft</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Preview</Button>
      <Button type='button' fullWidth variant='secondary' appearance='transparent'>Discard</Button>
    </div>
  );
}
