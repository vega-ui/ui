import { useEffect, useId, useState, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  Card,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Heading,
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  PinField,
  PinFieldInput,
  PinFieldSlot,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const DEMO_PASSWORD = 'northwind';
const DEMO_CODE = '246810';
const RESEND_SECONDS = 30;

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const card = { alignItems: 'stretch', gap: 'var(--spacing-12)', width: '100%', maxWidth: 400, marginInline: 'auto' } as const;

type Step = 'credentials' | 'code' | 'done';

interface CredentialErrors {
  email?: string
  password?: string
  form?: string
}

const maskEmail = (email: string) => {
  const [name, domain] = email.split('@');

  return `${name.slice(0, 2)}${'•'.repeat(Math.max(1, name.length - 2))}@${domain}`;
};

export default function SignIn() {
  const id = useId();
  const [step, setStep] = useState<Step>('credentials');
  const [email, setEmail] = useState('');
  const [shown, setShown] = useState(false);
  const [errors, setErrors] = useState<CredentialErrors>({});
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get('password'));
    const next: CredentialErrors = {};

    if (email.trim() === '') next.email = 'Enter the email you signed up with.';
    if (email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Use the full address, like ada@northwind.io.';
    if (password === '') next.password = 'Enter your password.';
    if (Object.keys(next).length === 0 && password !== DEMO_PASSWORD) next.form = 'That email and password don’t match. Check both and try again.';

    setErrors(next);
    setShown(false);

    const invalid = ['email', 'password'].find((name) => next[name as keyof CredentialErrors]);

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    if (next.form) return;

    setCode('');
    setCodeError('');
    setCooldown(RESEND_SECONDS);
    setStep('code');
  };

  const changeCode = (next: string) => {
    setCode(next);
    setCodeError('');
  };

  const verify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length < 6) {
      setCodeError('Enter all 6 digits of the code.');
      return;
    }

    if (code !== DEMO_CODE) {
      setCodeError('This code is wrong or has expired. Try again or send a new one.');
      return;
    }

    setStep('done');
  };

  const resend = () => {
    setCode('');
    setCodeError('');
    setCooldown(RESEND_SECONDS);
  };

  const restart = () => {
    setStep('credentials');
    setErrors({});
  };

  if (step === 'done') {
    return (
      <Card style={card}>
        <Alert variant='success'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>You’re signed in</AlertTitle>
            <AlertContent>{`Welcome back. Signed in as ${email}.`}</AlertContent>
          </AlertMain>
        </Alert>
        <Button size='xs' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-start' }} onClick={restart}>Sign out</Button>
      </Card>
    );
  }

  if (step === 'code') {
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
        <Card asChild style={card}>
          <form noValidate aria-labelledby={`${id}-code-title`} onSubmit={verify}>
            <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
              <Heading id={`${id}-code-title`} as='h1' size={6} fontWeight={700}>Two-factor authentication</Heading>
              <Text size={3} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
                {`Enter the 6-digit code from your authenticator app for ${maskEmail(email)}.`}
              </Text>
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-code`}>Verification code</Label>
              <PinField maxLength={6} value={code} onChangeValue={changeCode} error={codeError !== ''}>
                <PinFieldInput
                  id={`${id}-code`}
                  autoComplete='one-time-code'
                  aria-invalid={codeError !== ''}
                  aria-describedby={codeError === '' ? undefined : `${id}-code-error`}
                />
                {Array.from({ length: 6 }, (_, index) => <PinFieldSlot key={index} index={index} />)}
              </PinField>
              {codeError !== '' && <HelperText id={`${id}-code-error`} error>{codeError}</HelperText>}
            </div>
            <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput name='trust' />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
              Don’t ask again on this device for 30 days
            </Checkbox>
            <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Button size='xs' type='submit' fullWidth>Verify</Button>
              <Button size='xs' type='button' variant='secondary' appearance='ghost' fullWidth disabled={cooldown > 0} onClick={resend}>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{cooldown > 0 ? `Send a new code in ${cooldown}s` : 'Send a new code'}</span>
              </Button>
            </div>
          </form>
        </Card>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={restart}>Use another account</Button>
          <Text size={2} style={{ color: 'var(--label-tertiary)' }}>{`Demo code: ${DEMO_CODE}`}</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Card asChild style={card}>
        <form noValidate aria-labelledby={`${id}-title`} onSubmit={signIn}>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading id={`${id}-title`} as='h1' size={6} fontWeight={700}>Sign in to Northwind</Heading>
            <Text size={3} style={{ color: 'var(--label-secondary)' }}>Welcome back. Use your work email.</Text>
          </div>

          {errors.form && (
            <Alert variant='error' role='alert'>
              <AlertIcon />
              <AlertMain>
                <AlertTitle>Couldn’t sign in</AlertTitle>
                <AlertContent>{errors.form}</AlertContent>
              </AlertMain>
            </Alert>
          )}

          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={field}>
              <Label htmlFor={`${id}-email`}>Email</Label>
              <TextField error={errors.email !== undefined}>
                <TextFieldInput
                  id={`${id}-email`}
                  name='email'
                  type='email'
                  autoComplete='username'
                  value={email}
                  aria-invalid={errors.email !== undefined}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </TextField>
              {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-password`}>Password</Label>
              <PasswordField shown={shown} onChangeShown={setShown} error={errors.password !== undefined}>
                <PasswordFieldInput
                  id={`${id}-password`}
                  name='password'
                  autoComplete='current-password'
                  aria-invalid={errors.password !== undefined}
                  aria-describedby={errors.password ? `${id}-password-error` : undefined}
                />
                <PasswordFieldToggleIconButton aria-label='Show password'>
                  <PasswordFieldShownIcon />
                  <PasswordFieldHiddenIcon />
                </PasswordFieldToggleIconButton>
              </PasswordField>
              {errors.password && <HelperText id={`${id}-password-error`} error>{errors.password}</HelperText>}
            </div>
          </div>

          <Button size='xs' type='submit' fullWidth>Sign in</Button>
        </form>
      </Card>
      <Text size={2} style={{ textAlign: 'center', color: 'var(--label-tertiary)' }}>{`Demo password: ${DEMO_PASSWORD}`}</Text>
    </div>
  );
}
