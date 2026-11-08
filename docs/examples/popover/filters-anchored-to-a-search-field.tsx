import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Icon,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { SlidersHorizontal, XIcon } from '@vega-ui/icons';

const statuses = ['Open', 'In review', 'Merged', 'Closed'];

const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

export default function FiltersAnchoredToASearchField() {
  const titleId = useId();
  const [applied, setApplied] = useState<string[]>(['Open']);
  const [draft, setDraft] = useState(applied);

  const toggle = (status: string) => {
    setDraft(draft.includes(status) ? draft.filter((item) => item !== status) : [...draft, status]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <Popover role='dialog' placement='bottom-start' onChangeOpen={(open) => open && setDraft(applied)}>
        <PopoverAnchor>
          <TextField>
            <TextFieldInput type='search' aria-label='Search pull requests' placeholder='Search pull requests' />
            <PopoverTrigger asChild>
              <IconButton
                size='xs'
                variant='secondary'
                appearance='transparent'
                aria-label={`Filters, ${applied.length} applied`}
                style={{ flexShrink: 0, marginInlineEnd: 'var(--spacing-3)' }}
              >
                <Icon size='sm'><SlidersHorizontal /></Icon>
              </IconButton>
            </PopoverTrigger>
          </TextField>
        </PopoverAnchor>
        <PopoverContent aria-labelledby={titleId}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Text id={titleId} size={3} fontWeight={600}>Status</Text>
              <PopoverClose asChild>
                <IconButton aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </PopoverClose>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
              {statuses.map((status) => (
                <Checkbox key={status} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput checked={draft.includes(status)} onChange={() => toggle(status)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                  </CheckboxIndicator>
                  {status}
                </Checkbox>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <PopoverClose asChild>
                <Button size='xs' variant='secondary' appearance='ghost'>Cancel</Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button size='xs' onClick={() => setApplied(draft)}>Apply</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {applied.length > 0 ? `Showing: ${applied.join(', ')}` : 'Showing all pull requests'}
      </Text>
    </div>
  );
}
