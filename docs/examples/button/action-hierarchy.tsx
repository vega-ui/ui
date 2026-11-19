import { Button } from '@vega-ui/react';

export default function ActionHierarchy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button type='button' style={{ width: '100%' }}>Publish article</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={{ width: '100%' }}>Save draft</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={{ width: '100%' }}>Preview</Button>
      <Button type='button' variant='secondary' appearance='transparent' style={{ width: '100%' }}>Discard</Button>
    </div>
  );
}
