import { HelperText, Icon, Label, Spinner, TextField, TextFieldInput } from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';
import { useEffect, useId, useState } from 'react';

const TAKEN = ['admin', 'support', 'maria', 'billing'];

interface CheckResult {
  username: string;
  available: boolean;
}

export default function AsyncUsernameCheck() {
  const id = useId();
  const statusId = `${id}-status`;
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const normalized = username.trim().toLowerCase();

  useEffect(() => {
    if (normalized.length < 3) return;

    const timer = setTimeout(() => {
      setResult({ username: normalized, available: !TAKEN.includes(normalized) });
    }, 600);

    return () => clearTimeout(timer);
  }, [normalized]);

  const tooShort = normalized.length < 3;
  const checking = !tooShort && result?.username !== normalized;
  const taken = !tooShort && !checking && result?.available === false;
  const available = !tooShort && !checking && result?.available === true;

  let message = 'At least 3 characters. Try “maria” to see a taken name.';
  if (checking) message = 'Checking availability…';
  if (available) message = `@${normalized} is available.`;
  if (taken) message = `@${normalized} is already taken.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Username</Label>
      <TextField error={taken}>
        <TextFieldInput
          id={id}
          value={username}
          autoComplete='username'
          spellCheck={false}
          aria-invalid={taken}
          aria-describedby={statusId}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <span style={{ display: 'flex', paddingInlineEnd: 'var(--spacing-6)' }}>
          {checking && <Spinner size={3} aria-label='Checking username' />}
          {available && <Icon size='sm' aria-hidden><CheckIcon /></Icon>}
        </span>
      </TextField>
      <HelperText id={statusId} error={taken} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
