import {
  Icon,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
} from '@vega-ui/react';
import { CheckIcon, CircleIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const RULES = [
  { label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { label: 'Upper and lower case letters', test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'At least one number', test: (value: string) => /\d/.test(value) },
  { label: 'At least one symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

export default function NewPasswordChecklist() {
  const id = useId();
  const rulesId = `${id}-rules`;
  const [password, setPassword] = useState('');
  const passed = RULES.filter((rule) => rule.test(password)).length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>New password</Label>
        <PasswordField>
          <PasswordFieldInput
            id={id}
            name='newPassword'
            autoComplete='new-password'
            value={password}
            aria-describedby={rulesId}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <ul id={rulesId} style={{ display: 'grid', gap: 'var(--spacing-3)', margin: 0, padding: 0, listStyle: 'none' }}>
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-4)',
                color: ok ? 'var(--label-primary)' : 'var(--label-tertiary)',
              }}
            >
              <Icon size='xs' aria-hidden style={{ flexShrink: 0 }}>
                {ok ? <CheckIcon strokeWidth={2.5} /> : <CircleIcon />}
              </Icon>
              <Text size={2} style={{ color: 'inherit' }}>{rule.label}</Text>
            </li>
          );
        })}
      </ul>
      <Text size={2} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {passed} of {RULES.length} requirements met
      </Text>
    </div>
  );
}
