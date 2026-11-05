import { Button, HelperText, Icon, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';
import { FormEvent, useState } from 'react';

export default function HiddenValidationCue() {
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const domain = String(new FormData(event.currentTarget).get('domain'));

    if (!domain.includes('.')) {
      setError('Add a top-level domain, for example acme.com');
      setSaved('');
      return;
    }

    setError('');
    setSaved(domain);
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='custom-domain'>Custom domain</Label>
      <TextField error={error !== ''}>
        <TextFieldInput
          id='custom-domain'
          name='domain'
          defaultValue='acme'
          aria-invalid={error !== ''}
          aria-describedby={error === '' ? undefined : 'custom-domain-error'}
        />
      </TextField>
      {error !== '' && (
        <HelperText id='custom-domain-error' error style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Icon size='xs' style={{ flexShrink: 0 }}><CircleAlertIcon /></Icon>
          <VisuallyHidden asChild>
            <span>Error:</span>
          </VisuallyHidden>
          {error}
        </HelperText>
      )}
      <Button type='submit' style={{ alignSelf: 'flex-start', marginBlockStart: 'var(--spacing-9)' }}>Connect domain</Button>
      <output style={{ color: 'var(--label-secondary)' }}>{saved === '' ? '' : `Connected ${saved}`}</output>
    </form>
  );
}
