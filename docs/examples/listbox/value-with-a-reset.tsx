import { Button, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { useState } from 'react';

const fonts = [
  { value: 'serif', label: 'Serif', family: 'Georgia, serif' },
  { value: 'sans', label: 'Sans-serif', family: 'system-ui, sans-serif' },
  { value: 'mono', label: 'Monospace', family: 'ui-monospace, monospace' },
];

export default function ValueWithAReset() {
  const [font, setFont] = useState<string | null>('serif');
  const current = fonts.find((item) => item.value === font);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <Listbox aria-label='Reading font' value={font} onChangeValue={(next) => setFont(next ?? null)} style={{ border: '1px solid var(--separator-opaque)' }}>
        {fonts.map((item) => (
          <ListboxOption key={item.value} value={item.value}>
            {item.label}
          </ListboxOption>
        ))}
      </Listbox>
      <Text size={3} style={{ fontFamily: current?.family, minHeight: 'calc(var(--line-height-3) * 2)' }}>
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-end' }} disabled={font === null} onClick={() => setFont(null)}>
        Use the site default
      </Button>
    </div>
  );
}
