import { Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useId } from 'react';

const layouts = [
  { value: 'board', label: 'Board' },
  { value: 'list', label: 'List' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'calendar', label: 'Calendar' },
];

export default function VisibleLabel() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Text id={labelId} size={3} fontWeight={500}>Default project view</Text>
      <Listbox aria-labelledby={labelId} defaultValue='board' style={{ border: '1px solid var(--separator-opaque)' }}>
        {layouts.map((layout) => (
          <ListboxOption key={layout.value} value={layout.value}>
            {layout.label}
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}
