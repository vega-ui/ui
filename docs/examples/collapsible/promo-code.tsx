import { FormEvent, useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  HelperText,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const codes: Record<string, number> = { WELCOME10: 10, TEAM25: 25 };

export default function PromoCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);

  const apply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (normalized === '') {
      setError('Enter a promo code.');
      return;
    }
    if (!(normalized in codes)) {
      setError(`“${normalized}” is not a valid or active promo code.`);
      return;
    }
    setError('');
    setDiscount(codes[normalized]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Have a promo code?</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <form onSubmit={apply} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='promo-code'>Promo code</Label>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <TextField error={error !== ''} style={{ flex: 1 }}>
                <TextFieldInput
                  id='promo-code'
                  placeholder='WELCOME10'
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError('');
                  }}
                  aria-invalid={error !== ''}
                  aria-describedby={error ? 'promo-code-error' : undefined}
                />
              </TextField>
              <Button type='submit' variant='secondary' appearance='ghost'>Apply</Button>
            </div>
            {error && <HelperText id='promo-code-error' error>{error}</HelperText>}
          </form>
        </CollapsibleContent>
      </Collapsible>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{discount > 0 ? `${discount}% discount applied` : ''}</Text>
    </div>
  );
}
