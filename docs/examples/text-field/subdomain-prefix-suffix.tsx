import { HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const affixStyle = {
  flexShrink: 0,
  whiteSpace: 'nowrap',
  color: 'var(--label-secondary)',
} as const;

export default function SubdomainPrefixSuffix() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [subdomain, setSubdomain] = useState('northwind-traders-international-logistics');

  const onChange = (value: string) => {
    setSubdomain(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Workspace address</Label>
      <TextField>
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineStart: 'var(--spacing-6)' }}>https://</Text>
        <TextFieldInput
          id={id}
          name='subdomain'
          value={subdomain}
          spellCheck={false}
          aria-describedby={hintId}
          onChange={(event) => onChange(event.currentTarget.value)}
          style={{ minWidth: 0, paddingInline: 'var(--spacing-1)' }}
        />
        <Text size={3} aria-hidden style={{ ...affixStyle, paddingInlineEnd: 'var(--spacing-6)' }}>.vega.app</Text>
      </TextField>
      <HelperText id={hintId} style={{ overflowWrap: 'anywhere' }}>
        Lowercase letters, digits and hyphens. Full address: https://{subdomain === '' ? '…' : subdomain}.vega.app
      </HelperText>
    </div>
  );
}
