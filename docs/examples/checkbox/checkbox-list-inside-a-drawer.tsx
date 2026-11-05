import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const statuses = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'in-review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

export default function CheckboxListInsideADrawer() {
  const [applied, setApplied] = useState<string[]>(['open', 'in-progress']);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setApplied(data.getAll('status').map(String));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Filters ({applied.length})</Button>
      </DrawerTrigger>
      <DrawerContent shadowed aria-labelledby='issue-filters-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='issue-filters-title' as='h2' size={4} fontWeight={600}>Filter issues</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
          <Fieldset>
            <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Status</FieldsetLegend>
            <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
              {statuses.map((status) => (
                <Checkbox key={status.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput name='status' value={status.value} defaultChecked={applied.includes(status.value)} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                  {status.label}
                </Checkbox>
              ))}
            </div>
          </Fieldset>
          <Button type='submit'>Apply filters</Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
