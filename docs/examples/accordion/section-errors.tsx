import { ChangeEvent, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  HelperText,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

const validateIban = (value: string) => {
  const iban = value.replaceAll(' ', '').toUpperCase();
  if (iban === '') return 'Enter the IBAN of the payout account.';
  if (!ibanPattern.test(iban)) return 'IBAN must start with a country code and two check digits, e.g. DE89 3704 0044 0532 0130 00.';
  return '';
};

export default function SectionErrors() {
  const [iban, setIban] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setIban(event.target.value);
    setSaved(false);
    if (error) setError(validateIban(event.target.value));
  };

  const save = () => {
    const message = validateIban(iban);
    setError(message);
    setSaved(message === '');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Accordion>
        <AccordionItem value='payout'>
          <AccordionHeader>
            <AccordionTrigger>
              <span style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'baseline' }}>
                Payout details
                {error && <Text size={2} style={{ color: 'var(--color-error)' }}>1 error</Text>}
              </span>
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='payout-iban'>IBAN</Label>
              <TextField error={error !== ''}>
                <TextFieldInput
                  id='payout-iban'
                  value={iban}
                  onChange={change}
                  aria-invalid={error !== ''}
                  aria-describedby={error ? 'payout-iban-error' : undefined}
                />
              </TextField>
              {error && <HelperText id='payout-iban-error' error>{error}</HelperText>}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
        <Button onClick={save}>Save payout</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved ? 'Payout account saved.' : ''}</Text>
      </div>
    </div>
  );
}
