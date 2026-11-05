import { Button, HelperText, Label, MeterStack, MeterStackSegment, TextField, TextFieldInput } from '@vega-ui/react';
import { CSSProperties, FormEvent, useId, useState } from 'react';

const levels = [
  { label: 'Too weak', color: 'var(--color-red-500)' },
  { label: 'Weak', color: 'var(--color-red-500)' },
  { label: 'Fair', color: 'var(--color-orange-500)' },
  { label: 'Good', color: 'var(--color-amber-500)' },
  { label: 'Strong', color: 'var(--color-green-500)' },
];

export default function PasswordStrengthBreakdown() {
  const fieldId = useId();
  const strengthId = useId();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const checks = [
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const level = levels[score];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get('password'));
    setMessage(`Saved, ${value.length} characters`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>New password</Label>
        <TextField>
          <TextFieldInput
            id={fieldId}
            type='password'
            name='password'
            autoComplete='new-password'
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby={strengthId}
          />
        </TextField>
        <MeterStack value={score} max={checks.length} aria-hidden='true' size='sm' fullWidth>
          {checks.slice(0, score).map((_, index) => (
            <MeterStackSegment
              key={index}
              value={1}
              style={{ '--meter-stack-segment-color': level.color } as CSSProperties}
            />
          ))}
        </MeterStack>
        <HelperText id={strengthId}>
          Strength: {level.label}. Use 12+ characters, mixed case, a digit and a symbol.
        </HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Button type='submit' size='sm'>Set password</Button>
        <HelperText role='status'>{message}</HelperText>
      </div>
    </form>
  );
}
