import { useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function AdvancedFilters() {
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState('');
  const [tag, setTag] = useState('');

  const activeCount = [owner, tag].filter((value) => value.trim() !== '').length;

  let summary = 'No advanced filters applied';
  if (activeCount === 1) summary = '1 advanced filter applied';
  if (activeCount > 1) summary = `${activeCount} advanced filters applied`;

  const clear = () => {
    setOwner('');
    setTag('');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <Collapsible open={open} onChangeOpen={setOpen}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>
              {open ? 'Hide advanced filters' : 'Show advanced filters'}
            </Button>
          </CollapsibleTrigger>
          {activeCount > 0 && (
            <Button size='sm' variant='secondary' appearance='ghost' onClick={clear}>Clear</Button>
          )}
        </div>
        <CollapsibleContent>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-owner'>Owner</Label>
              <TextField>
                <TextFieldInput id='filter-owner' value={owner} onChange={(event) => setOwner(event.target.value)} />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-tag'>Tag</Label>
              <TextField>
                <TextFieldInput id='filter-tag' value={tag} onChange={(event) => setTag(event.target.value)} />
              </TextField>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {summary}
      </Text>
    </div>
  );
}
