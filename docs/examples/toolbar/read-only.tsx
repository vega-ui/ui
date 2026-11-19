import { useId, useState } from 'react';
import {
  Icon,
  Button,
  Label,
  Separator,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, MessageSquareIcon, Share2Icon, UnderlineIcon } from '@vega-ui/icons';

export default function ReadOnly() {
  const switchId = useId();
  const [editing, setEditing] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id={switchId} checked={editing} onChange={(event) => setEditing(event.currentTarget.checked)} />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Editing</Label>
      </div>
      <Toolbar
        aria-label='Document'
        style={{
          padding: 'var(--spacing-3)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
          background: 'var(--surface-primary)',
        }}
      >
        <ToggleGroup aria-label='Text style' size='sm' multiple defaultValue={['bold']} disabled={!editing}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Add comment'>
            <Icon><MessageSquareIcon /></Icon>
          </Button>
        </ToolbarItem>
        <ToolbarItem asChild>
          <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Share'>
            <Icon><Share2Icon /></Icon>
          </Button>
        </ToolbarItem>
      </Toolbar>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {editing ? 'You can format the text, comment and share.' : 'View only: comments and sharing stay available.'}
      </Text>
    </div>
  );
}
