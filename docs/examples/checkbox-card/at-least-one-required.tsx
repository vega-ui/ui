import { FormEvent, useState } from 'react';
import {
  Button,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
  HelperText,
} from '@vega-ui/react';

const platforms = [
  { value: 'ios', title: 'iOS', description: 'App Store build, iPhone and iPad' },
  { value: 'android', title: 'Android', description: 'Google Play build, phones and tablets' },
  { value: 'web', title: 'Web', description: 'Progressive web app on your domain' },
];

export default function AtLeastOneRequired() {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = new FormData(event.currentTarget).getAll('platforms');
    if (selected.length === 0) {
      setInvalid(true);
      setMessage('');
      return;
    }
    setMessage(`Building for ${selected.join(', ')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset style={{ width: '100%' }} aria-describedby={invalid ? 'platforms-error' : undefined}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Target platforms</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {platforms.map((platform) => (
            <CheckboxCard key={platform.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{platform.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{platform.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput
                  name='platforms'
                  value={platform.value}
                  aria-invalid={invalid}
                  onChange={() => setInvalid(false)}
                />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
        {invalid && <HelperText id='platforms-error' error>Choose at least one platform.</HelperText>}
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Start build</Button>
        {message && <HelperText aria-live='polite'>{message}</HelperText>}
      </div>
    </form>
  );
}
