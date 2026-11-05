import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
} from '@vega-ui/react';

export default function RequiredAgreementCheckbox() {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const invalid = error !== '';

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.currentTarget.focus();
    setError('Accept the Terms of Service to create your workspace.');
  };

  const handleChange = () => {
    setError('');
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput
            name='terms'
            required
            aria-invalid={invalid}
            aria-describedby={invalid ? 'terms-error' : undefined}
            onInvalid={handleInvalid}
            onChange={handleChange}
          />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
            <CheckboxIndeterminateIcon />
          </CheckboxIndicator>
          I agree to the Terms of Service
        </Checkbox>
        {invalid && <HelperText id='terms-error' error style={{ paddingInlineStart: 'var(--spacing-12)' }}>{error}</HelperText>}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Create workspace</Button>
        {submitted && <HelperText>Workspace created.</HelperText>}
      </div>
    </form>
  );
}
