import { FormEvent, useState } from 'react';
import { Button, Label, Tabs, TabsList, TabsPanel, TabsTab, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function AccountSettingsForm() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState('');

  const showFirstInvalid = (event: FormEvent<HTMLFormElement>) => {
    const first = event.currentTarget.querySelector('input:invalid');
    if (event.target !== first) return;

    const section = first.closest<HTMLElement>('[data-section]')?.dataset.section;
    if (section) setTab(section);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filled = [...new FormData(event.currentTarget).values()].filter((value) => value !== '');
    setSaved(`Saved ${filled.length} fields from both tabs.`);
  };

  return (
    <form onSubmit={submit} onInvalidCapture={showFirstInvalid} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Tabs value={tab} onChangeValue={setTab}>
        <TabsList aria-label='Account settings'>
          <TabsTab value='profile'>Profile</TabsTab>
          <TabsTab value='billing'>Billing</TabsTab>
        </TabsList>
        <TabsPanel value='profile' data-section='profile'>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-name'>Display name</Label>
              <TextField>
                <TextFieldInput id='account-name' name='displayName' autoComplete='name' defaultValue='Mira Holt' required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-email'>Work email</Label>
              <TextField>
                <TextFieldInput id='account-email' name='email' type='email' autoComplete='email' required />
              </TextField>
            </div>
          </div>
        </TabsPanel>
        <TabsPanel value='billing' data-section='billing'>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-company'>Company name</Label>
              <TextField>
                <TextFieldInput id='account-company' name='company' autoComplete='organization' required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='account-vat'>VAT ID</Label>
              <TextField>
                <TextFieldInput id='account-vat' name='vatId' />
              </TextField>
            </div>
          </div>
        </TabsPanel>
      </Tabs>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>
        <Button type='submit'>Save changes</Button>
      </div>
    </form>
  );
}
