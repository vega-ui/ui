import { Button, Fieldset, FieldsetLegend, Icon, IconButton } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BlockedIconAction() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} appearance='outlined' style={{ width: '100%', boxSizing: 'border-box' }}>
        <FieldsetLegend>{locked ? 'Formatting (read-only document)' : 'Formatting'}</FieldsetLegend>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Bold'>
            <Icon><BoldIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Italic'>
            <Icon><ItalicIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Insert link'>
            <Icon><LinkIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Bulleted list'>
            <Icon><ListIcon /></Icon>
          </IconButton>
        </div>
      </Fieldset>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
        {locked ? 'Request edit access' : 'Switch to viewing'}
      </Button>
    </div>
  );
}
