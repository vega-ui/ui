import { FormEvent, useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function InvoiceDetailsForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitted(JSON.stringify(values, null, 2));
  };

  const reset = () => {
    setOpen(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='invoice-email'>Receipt email</Label>
          <TextField>
            <TextFieldInput id='invoice-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
        <Collapsible open={open} onChangeOpen={setOpen}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>
              {open ? 'Remove company details' : 'Add company details for the invoice'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <fieldset disabled={!open} style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='invoice-company'>Company name</Label>
                <TextField>
                  <TextFieldInput id='invoice-company' name='company' autoComplete='organization' required />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='invoice-vat'>VAT ID</Label>
                <TextField>
                  <TextFieldInput id='invoice-vat' name='vatId' required />
                </TextField>
              </div>
            </fieldset>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Pay $124.24</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      {submitted && <pre style={{ margin: 0, fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{submitted}</pre>}
    </form>
  );
}
