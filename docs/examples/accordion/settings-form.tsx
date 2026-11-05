import { FormEvent, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Label,
  Separator,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function SettingsForm() {
  const [opened, setOpened] = useState<string[]>(['profile']);
  const [submitted, setSubmitted] = useState('');

  const openSectionOf = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    const item = target.closest('li');
    if (!item) return;
    const section = item.dataset.section;
    if (!section) return;
    setOpened((current) => (current.includes(section) ? current : [...current, section]));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitted(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={submit} onInvalidCapture={openSectionOf} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Accordion multiple opened={opened} onChangeOpened={(next) => setOpened(next ?? [])}>
        <AccordionItem value='profile' data-section='profile'>
          <AccordionHeader>
            <AccordionTrigger>
              Profile
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-name'>Display name</Label>
                <TextField>
                  <TextFieldInput id='settings-name' name='displayName' autoComplete='name' required />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-email'>Work email</Label>
                <TextField>
                  <TextFieldInput id='settings-email' name='email' type='email' autoComplete='email' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='billing' data-section='billing'>
          <AccordionHeader>
            <AccordionTrigger>
              Billing
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-company'>Company name</Label>
                <TextField>
                  <TextFieldInput id='settings-company' name='company' autoComplete='organization' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-vat'>VAT ID</Label>
                <TextField>
                  <TextFieldInput id='settings-vat' name='vatId' placeholder='DE123456789' pattern='[A-Z]{2}[0-9A-Z]{8,12}' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save settings</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      {submitted && <pre style={{ margin: 0, fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{submitted}</pre>}
    </form>
  );
}
