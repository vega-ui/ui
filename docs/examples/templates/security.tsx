import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode, type RefObject } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Code,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Meter,
  MeterTrack,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  PinField,
  PinFieldInput,
  PinFieldSlot,
  Radio,
  Separator,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { Check, CheckIcon, CircleIcon, Copy, Download, Fingerprint, KeyRound, Laptop, MessageSquare, Monitor, Smartphone, XIcon } from '@vega-ui/icons';
import './security.css';

type Method = 'app' | 'sms';
type Step = 'method' | 'scan' | 'phone' | 'verify' | 'codes';
type FieldName = 'current' | 'next' | 'confirm';

interface Session {
  id: string
  device: string
  kind: 'laptop' | 'phone' | 'desktop'
  location: string
  active: string
  current: boolean
}

interface Passkey {
  id: string
  name: string
  added: string
  used: string
}

interface Confirm {
  title: string
  description: string
  action: string
  focus: RefObject<HTMLHeadingElement | null>
  run(): void
}

const DEMO_CODE = '246810';
const SECRET = 'JBSW Y3DP EHPK 3PXP K4XO';
const QR_SIZE = 25;

const rules = [
  { label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { label: 'Upper and lower case letters', test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'At least one number', test: (value: string) => /\d/.test(value) },
  { label: 'At least one symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

const strengths = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];

const recoveryCodes = ['4F7K-9QX2', 'M2RD-8TLP', 'ZC6W-1HNB', 'Q9VA-3KES', 'H5PJ-7DYR', 'T8LX-2MWC', 'B3NE-6RQF', 'W7GU-4ZKA', 'D1YS-9PVH', 'K6CM-5TXJ'];

const initialSessions: Session[] = [
  { id: 's1', device: 'Chrome on macOS', kind: 'laptop', location: 'Berlin, Germany', active: 'Active now', current: true },
  { id: 's2', device: 'Northwind for iOS', kind: 'phone', location: 'Berlin, Germany', active: '2 hours ago', current: false },
  { id: 's3', device: 'Firefox on Windows', kind: 'desktop', location: 'Munich, Germany', active: 'Yesterday', current: false },
  { id: 's4', device: 'Safari on iPadOS', kind: 'phone', location: 'Lisbon, Portugal', active: 'Oct 21', current: false },
];

const initialPasskeys: Passkey[] = [
  { id: 'p1', name: 'MacBook Pro Touch ID', added: 'Added Mar 3, 2026', used: 'Last used today' },
  { id: 'p2', name: 'iPhone 16 Face ID', added: 'Added Jun 18, 2026', used: 'Last used 3 days ago' },
];

const deviceIcons: Record<Session['kind'], ReactNode> = {
  laptop: <Laptop />,
  phone: <Smartphone />,
  desktop: <Monitor />,
};

const field = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const dialogHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const actions = { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' } as const;
const sectionHeader = { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-6) var(--spacing-8)' } as const;
const ghost = { variant: 'secondary', appearance: 'ghost' } as const;
const muted = { color: 'var(--label-secondary)' } as const;
const list = { display: 'grid', margin: 0, padding: 0, listStyle: 'none' } as const;

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const isFinder = (x: number, y: number) => {
  const corners = [[0, 0], [QR_SIZE - 7, 0], [0, QR_SIZE - 7]];

  return corners.some(([left, top]) => x >= left && x < left + 7 && y >= top && y < top + 7);
};

const qrCells = Array.from({ length: QR_SIZE * QR_SIZE }, (_, index) => {
  const x = index % QR_SIZE;
  const y = Math.floor(index / QR_SIZE);
  if (isFinder(x, y)) return null;

  return (x * 7 + y * 13 + x * y) % 5 < 2 ? [x, y] : null;
}).filter((cell) => cell !== null);

const QrCode = () => (
  <svg viewBox={`-2 -2 ${QR_SIZE + 4} ${QR_SIZE + 4}`} role='img' aria-label='QR code for adding Northwind to an authenticator app' className='sc-qr'>
    {[[0, 0], [QR_SIZE - 7, 0], [0, QR_SIZE - 7]].map(([x, y]) => (
      <g key={`${x}-${y}`}>
        <rect x={x + 0.5} y={y + 0.5} width={6} height={6} fill='none' stroke='currentColor' />
        <rect x={x + 2} y={y + 2} width={3} height={3} fill='currentColor' />
      </g>
    ))}
    {qrCells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill='currentColor' />)}
  </svg>
);

const PasswordInput = ({ id, name, label, autoComplete, error, describedBy, value, onChange }: {
  id: string
  name: FieldName
  label: string
  autoComplete: string
  error?: string
  describedBy?: string
  value?: string
  onChange(value: string): void
}) => (
  <div style={field}>
    <Label htmlFor={id}>{label}</Label>
    <PasswordField error={error !== undefined}>
      <PasswordFieldInput
        id={id}
        name={name}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={error !== undefined}
        aria-describedby={[error ? `${id}-error` : '', describedBy ?? ''].join(' ').trim() || undefined}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
      <PasswordFieldToggleIconButton aria-label='Show password'>
        <PasswordFieldShownIcon />
        <PasswordFieldHiddenIcon />
      </PasswordFieldToggleIconButton>
    </PasswordField>
    {error && <HelperText id={`${id}-error`} error>{error}</HelperText>}
  </div>
);

export default function Security() {
  const id = useId();
  const confirmed = useRef(false);
  const twoFactorRef = useRef<HTMLHeadingElement>(null);
  const passkeysRef = useRef<HTMLHeadingElement>(null);
  const sessionsRef = useRef<HTMLHeadingElement>(null);
  const stepRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [lastChanged, setLastChanged] = useState('Last changed 3 months ago');

  const [twoFactor, setTwoFactor] = useState<{ method: Method, phone: string } | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<Method>('app');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [savedCodes, setSavedCodes] = useState(false);
  const [codesError, setCodesError] = useState('');
  const [copied, setCopied] = useState('');

  const [sessions, setSessions] = useState(initialSessions);
  const [passkeys, setPasskeys] = useState(initialPasskeys);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!moved.current) return;

    moved.current = false;
    stepRef.current?.focus();
  }, [step]);

  const passed = rules.filter((rule) => rule.test(password.next)).length;
  const score = password.next === '' ? 0 : Math.max(0, Math.min(4, passed + (password.next.length >= 16 ? 1 : 0) - (passed < 4 ? 1 : 0)));
  const others = sessions.filter((session) => !session.current);
  const stepNumber = { method: 1, scan: 2, phone: 2, verify: 3, codes: 4 }[step];
  const maskedPhone = `•••• ${phone.replace(/\D/g, '').slice(-4)}`;

  const changePassword = (name: FieldName, value: string) => {
    setPassword({ ...password, [name]: value });
    setPasswordErrors({ ...passwordErrors, [name]: undefined });
    setPasswordSaved(false);
  };

  const submitPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const errors: Partial<Record<FieldName, string>> = {};

    if (password.current === '') errors.current = 'Enter your current password.';
    if (passed < rules.length) errors.next = 'Meet all four requirements below.';
    if (password.next === '') errors.next = 'Enter a new password.';
    if (password.next !== '' && password.next === password.current) errors.next = 'Choose a password you haven’t used for this account.';
    if (password.confirm !== password.next) errors.confirm = 'Passwords don’t match.';
    if (password.confirm === '') errors.confirm = 'Enter the new password again.';

    setPasswordErrors(errors);

    const invalid = (['current', 'next', 'confirm'] as const).find((name) => errors[name]);
    if (invalid) {
      const input = form.elements.namedItem(invalid);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setPassword({ current: '', next: '', confirm: '' });
    setPasswordSaved(true);
    setLastChanged('Changed just now');
  };

  const goTo = (next: Step) => {
    moved.current = true;
    setStep(next);
  };

  const changeSetupOpen = (open: boolean) => {
    setSetupOpen(open);
    if (!open) return;

    setStep('method');
    setMethod('app');
    setPhone('');
    setPhoneError('');
    setCode('');
    setCodeError('');
    setSavedCodes(false);
    setCodesError('');
    setCopied('');
  };

  const submitPhone = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = phone.replace(/\D/g, '');
    let error = '';

    if (digits === '') error = 'Enter a phone number for the codes.';
    if (digits !== '' && (digits.length < 8 || digits.length > 15)) error = 'Use the full number with the country code, like +49 151 2345 0132.';

    setPhoneError(error);

    if (error !== '') {
      event.currentTarget.querySelector('input')?.focus();
      return;
    }

    goTo('verify');
  };

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = '';

    if (code.length < 6) error = 'Enter all 6 digits of the code.';
    if (code.length === 6 && code !== DEMO_CODE) error = 'This code is wrong or has expired. Codes change every 30 seconds — try the newest one.';

    setCodeError(error);

    if (error !== '') {
      event.currentTarget.querySelector('input')?.focus();
      return;
    }

    setTwoFactor({ method, phone: maskedPhone });
    goTo('codes');
  };

  const finish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!savedCodes) {
      setCodesError('Confirm that you saved your recovery codes. They’re the only way in if you lose this device.');
      event.currentTarget.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      return;
    }

    setSetupOpen(false);
  };

  const copy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(key);
  };

  const ask = (next: Confirm) => {
    confirmed.current = false;
    setConfirm(next);
    setConfirmOpen(true);
  };

  const signOut = (session: Session) => {
    setSessions((current) => current.filter((item) => item.id !== session.id));
    setNotice(`${session.device} was signed out.`);
  };

  const focusAfterSetup = () => {
    if (twoFactor) twoFactorRef.current?.focus();
  };

  const stepTitle = {
    method: 'Choose a second step',
    scan: 'Scan the QR code',
    phone: 'Add your phone',
    verify: 'Enter the code',
    codes: 'Save your recovery codes',
  }[step];

  const stepHeader = (
    <div style={{ display: 'grid', gap: 'var(--spacing-2)', marginBlockStart: 'var(--spacing-8)' }}>
      <Text size={2} style={{ ...muted, fontVariantNumeric: 'tabular-nums' }}>{`Step ${stepNumber} of 4`}</Text>
      <Heading ref={stepRef} tabIndex={-1} id={`${id}-step-title`} as='h3' size={3} fontWeight={600} style={{ outline: 'none' }}>{stepTitle}</Heading>
    </div>
  );

  return (
    <div className='sc-root' style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 760, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h1' size={7} fontWeight={700}>Security</Heading>
        <Text size={3} style={muted}>Keep your Northwind account safe: a strong password, a second step at sign-in and a close eye on where you’re signed in.</Text>
      </header>

      <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-12)' }}>
        <section aria-labelledby={`${id}-password`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading id={`${id}-password`} as='h2' size={4} fontWeight={600}>Password</Heading>
            <Text size={2} style={muted}>{lastChanged}</Text>
          </div>
          <form noValidate onSubmit={submitPassword} style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)', maxWidth: 400 }}>
              <PasswordInput
                id={`${id}-current`}
                name='current'
                label='Current password'
                autoComplete='current-password'
                value={password.current}
                error={passwordErrors.current}
                onChange={(value) => changePassword('current', value)}
              />
              <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
                <PasswordInput
                  id={`${id}-next`}
                  name='next'
                  label='New password'
                  autoComplete='new-password'
                  value={password.next}
                  error={passwordErrors.next}
                  describedBy={`${id}-rules`}
                  onChange={(value) => changePassword('next', value)}
                />
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
                    <Text id={`${id}-strength`} size={2} style={muted}>Strength</Text>
                    <Text size={2} fontWeight={500} aria-hidden='true'>{password.next === '' ? '—' : strengths[score]}</Text>
                  </div>
                  <Meter
                    value={score}
                    max={4}
                    low={2}
                    high={3}
                    optimum={4}
                    valueText={password.next === '' ? 'No password yet' : strengths[score]}
                    aria-labelledby={`${id}-strength`}
                    fullWidth
                  >
                    <MeterTrack />
                  </Meter>
                </div>
                <ul id={`${id}-rules`} aria-label='Password requirements' style={{ ...list, gap: 'var(--spacing-3)' }}>
                  {rules.map((rule) => {
                    const ok = rule.test(password.next);

                    return (
                      <li key={rule.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', color: ok ? 'var(--color-green-accent-600)' : 'var(--label-secondary)' }}>
                        <Icon size='xs' aria-hidden='true' style={{ flexShrink: 0 }}>{ok ? <CheckIcon strokeWidth={2.5} /> : <CircleIcon />}</Icon>
                        <Text size={2} style={{ color: 'inherit' }}>
                          {rule.label}
                          <VisuallyHidden asChild><span>{ok ? ', met' : ', not met'}</span></VisuallyHidden>
                        </Text>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <PasswordInput
                id={`${id}-confirm`}
                name='confirm'
                label='Confirm new password'
                autoComplete='new-password'
                value={password.confirm}
                error={passwordErrors.confirm}
                onChange={(value) => changePassword('confirm', value)}
              />
            </div>
            <VisuallyHidden asChild>
              <div role='status'>{passwordSaved ? 'Password updated' : ''}</div>
            </VisuallyHidden>
            {passwordSaved && (
              <Alert variant='success'>
                <AlertIcon />
                <AlertMain>
                  <AlertTitle>Password updated</AlertTitle>
                  <AlertContent>Use it the next time you sign in. Your other sessions stay signed in.</AlertContent>
                </AlertMain>
              </Alert>
            )}
            <div style={actions}>
              <Button size='xs' type='submit'>Update password</Button>
            </div>
          </form>
        </section>
      </Card>

      <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }}>
        <section aria-labelledby={`${id}-2fa`}>
          <div style={sectionHeader}>
            <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '1 1 280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <Heading ref={twoFactorRef} tabIndex={-1} id={`${id}-2fa`} as='h2' size={4} fontWeight={600} style={{ outline: 'none' }}>Two-factor authentication</Heading>
                {twoFactor
                  ? <Badge size='xs' variant='success'>On</Badge>
                  : <Badge size='xs' variant='warning'>Off</Badge>}
              </div>
              <Text size={2} style={muted}>
                {twoFactor === null && 'Ask for a code from your phone when you sign in on a new device.'}
                {twoFactor?.method === 'app' && 'Codes come from your authenticator app.'}
                {twoFactor?.method === 'sms' && `Codes are sent by text message to ${twoFactor.phone}.`}
              </Text>
            </div>
            {twoFactor === null && <Button size='xs' type='button' onClick={() => changeSetupOpen(true)}>Set up</Button>}
            {twoFactor && (
              <Button
                size='xs'
                type='button'
                {...ghost}
                onClick={() => ask({
                  title: 'Turn off two-factor authentication?',
                  description: 'Anyone with your password could then sign in. Your recovery codes stop working.',
                  action: 'Turn off',
                  focus: twoFactorRef,
                  run: () => {
                    setTwoFactor(null);
                    setNotice('Two-factor authentication is off.');
                  },
                })}
              >
                Turn off
              </Button>
            )}
          </div>
        </section>
      </Card>

      <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }}>
        <section aria-labelledby={`${id}-passkeys`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading ref={passkeysRef} tabIndex={-1} id={`${id}-passkeys`} as='h2' size={4} fontWeight={600} style={{ outline: 'none' }}>Passkeys</Heading>
            <Text size={2} style={muted}>Sign in with your fingerprint, face or screen lock instead of a password.</Text>
          </div>
          {passkeys.length === 0 && <Text size={2} style={{ ...muted, paddingBlock: 'var(--spacing-4)' }}>No passkeys yet. Your password and second step still protect the account.</Text>}
          {passkeys.length > 0 && (
            <ul style={list}>
              {passkeys.map((passkey, index) => (
                <li
                  key={passkey.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-6)',
                    paddingBlock: 'var(--spacing-6)',
                    borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
                  }}
                >
                  <span className='sc-tile'><Icon size='sm' aria-hidden='true'><Fingerprint /></Icon></span>
                  <span style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
                    <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{passkey.name}</Text>
                    <Text size={2} style={muted}>{`${passkey.added} · ${passkey.used}`}</Text>
                  </span>
                  <Button
                    size='xs'
                    type='button'
                    {...ghost}
                    aria-label={`Remove ${passkey.name}`}
                    onClick={() => ask({
                      title: `Remove ${passkey.name}?`,
                      description: 'You won’t be able to sign in with this passkey anymore. You can add it again later.',
                      action: 'Remove passkey',
                      focus: passkeysRef,
                      run: () => {
                        setPasskeys((current) => current.filter((item) => item.id !== passkey.id));
                        setNotice(`${passkey.name} was removed.`);
                      },
                    })}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Card>

      <section aria-labelledby={`${id}-sessions`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={sectionHeader}>
          <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '1 1 280px' }}>
            <Heading ref={sessionsRef} tabIndex={-1} id={`${id}-sessions`} as='h2' size={4} fontWeight={600} style={{ outline: 'none' }}>Where you’re signed in</Heading>
            <Text size={2} style={muted}>Sign out of anything you don’t recognize, then change your password.</Text>
          </div>
          {others.length > 0 && (
            <Button
              size='xs'
              type='button'
              {...ghost}
              onClick={() => ask({
                title: 'Sign out of all other sessions?',
                description: `${others.length} ${others.length === 1 ? 'device' : 'devices'} will need your password and second step to sign in again. This device stays signed in.`,
                action: 'Sign out everywhere else',
                focus: sessionsRef,
                run: () => {
                  setSessions((current) => current.filter((item) => item.current));
                  setNotice('All other sessions were signed out.');
                },
              })}
            >
              Sign out of all other sessions
            </Button>
          )}
        </div>
        <div
          role='region'
          aria-labelledby={`${id}-sessions`}
          tabIndex={0}
          style={{ minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
        >
          <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' dataAlign='start'>Device</TableHeading>
                <TableHeading scope='col' dataAlign='start' className='sc-wide'>Location</TableHeading>
                <TableHeading scope='col' dataAlign='start' className='sc-wide'>Last active</TableHeading>
                <TableHeading scope='col' dataAlign='end'><VisuallyHidden>Actions</VisuallyHidden></TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableData dataAlign='start' style={{ width: '100%', maxWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minWidth: 0 }}>
                      <span className='sc-tile'><Icon size='sm' aria-hidden='true'>{deviceIcons[session.kind]}</Icon></span>
                      <span style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-2) var(--spacing-4)' }}>
                          <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{session.device}</Text>
                          {session.current && <Badge size='xs' variant='info'>This device</Badge>}
                        </span>
                        <Text size={2} className='sc-narrow' style={muted}>{`${session.location} · ${session.active}`}</Text>
                      </span>
                    </span>
                  </TableData>
                  <TableData dataAlign='start' className='sc-wide' style={{ whiteSpace: 'nowrap', ...muted }}>{session.location}</TableData>
                  <TableData dataAlign='start' className='sc-wide' style={{ whiteSpace: 'nowrap', ...muted }}>{session.active}</TableData>
                  <TableData dataAlign='end'>
                    {!session.current && (
                      <Button size='xs' type='button' {...ghost} aria-label={`Sign out ${session.device}`} onClick={() => signOut(session)} style={{ whiteSpace: 'nowrap' }}>
                        Sign out
                      </Button>
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Text size={2} role='status' style={{ ...muted, minBlockSize: 'var(--line-height-2)' }}>{notice}</Text>
      </section>

      <Card style={{ alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Label htmlFor={`${id}-alerts`}>Login alerts</Label>
            <Text id={`${id}-alerts-description`} size={2} style={muted}>Email me when someone signs in from a new device or browser.</Text>
          </div>
          <Switch style={{ flexShrink: 0 }}>
            <SwitchInput id={`${id}-alerts`} checked={loginAlerts} aria-describedby={`${id}-alerts-description`} onChange={(event) => setLoginAlerts(event.currentTarget.checked)} />
            <SwitchIndicator />
          </Switch>
        </div>
      </Card>

      <Dialog open={setupOpen} onChangeOpen={changeSetupOpen}>
        <DialogContent onClose={focusAfterSetup} aria-labelledby={`${id}-setup-title`} aria-describedby={`${id}-step-title`} style={{ width: 'min(460px, 100%)', boxSizing: 'border-box' }}>
          <div style={dialogHeader}>
            <Heading id={`${id}-setup-title`} as='h2' size={4} fontWeight={600}>Two-factor authentication</Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          {stepHeader}

          {step === 'method' && (
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                goTo(method === 'app' ? 'scan' : 'phone');
              }}
              style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
            >
              <div role='radiogroup' aria-labelledby={`${id}-step-title`} style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                {([
                  { value: 'app', title: 'Authenticator app', description: 'Use an app like 1Password, Google Authenticator or Authy. Works offline.', icon: <KeyRound /> },
                  { value: 'sms', title: 'Text message', description: 'Get a code by SMS. Needs mobile signal.', icon: <MessageSquare /> },
                ] as const).map((option) => (
                  <label key={option.value} htmlFor={`${id}-method-${option.value}`} className='sc-option' data-checked={method === option.value}>
                    <Radio
                      id={`${id}-method-${option.value}`}
                      name='method'
                      value={option.value}
                      checked={method === option.value}
                      aria-describedby={`${id}-method-${option.value}-description`}
                      onChange={() => setMethod(option.value)}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-2) var(--spacing-4)' }}>
                        <Text size={3} fontWeight={600}>{option.title}</Text>
                        {option.value === 'app' && <Badge size='xs' variant='info'>Recommended</Badge>}
                      </span>
                      <Text id={`${id}-method-${option.value}-description`} size={2} style={muted}>{option.description}</Text>
                    </span>
                    <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}>{option.icon}</Icon>
                  </label>
                ))}
              </div>
              <div style={actions}>
                <DialogClose asChild>
                  <Button size='xs' type='button' {...ghost}>Cancel</Button>
                </DialogClose>
                <Button size='xs' type='submit'>Continue</Button>
              </div>
            </form>
          )}

          {step === 'scan' && (
            <div style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
              <div className='sc-scan'>
                <QrCode />
                <div style={{ display: 'grid', gap: 'var(--spacing-4)', alignContent: 'center', minWidth: 0 }}>
                  <Text size={2} style={muted}>Open your authenticator app and scan this code. Can’t scan it? Enter this key instead:</Text>
                  <Code size={2} style={{ justifySelf: 'start', overflowWrap: 'anywhere', fontVariantNumeric: 'tabular-nums' }}>{SECRET}</Code>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Button size='xs' type='button' {...ghost} style={{ gap: 'var(--spacing-2)' }} onClick={() => copy('secret', SECRET.replaceAll(' ', ''))}>
                      <Icon size='xs' aria-hidden='true'>{copied === 'secret' ? <Check /> : <Copy />}</Icon>
                      Copy key
                    </Button>
                    <Text size={2} role='status' style={muted}>{copied === 'secret' ? 'Copied' : ''}</Text>
                  </div>
                </div>
              </div>
              <div style={actions}>
                <Button size='xs' type='button' {...ghost} onClick={() => goTo('method')}>Back</Button>
                <Button size='xs' type='button' onClick={() => goTo('verify')}>Continue</Button>
              </div>
            </div>
          )}

          {step === 'phone' && (
            <form noValidate onSubmit={submitPhone} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-phone`}>Phone number</Label>
                <TextField error={phoneError !== ''}>
                  <TextFieldInput
                    id={`${id}-phone`}
                    type='tel'
                    autoComplete='tel'
                    placeholder='+49 151 2345 0132'
                    value={phone}
                    aria-invalid={phoneError !== ''}
                    aria-describedby={phoneError === '' ? `${id}-phone-hint` : `${id}-phone-error`}
                    onChange={(event) => {
                      setPhone(event.currentTarget.value);
                      setPhoneError('');
                    }}
                  />
                </TextField>
                {phoneError === ''
                  ? <HelperText id={`${id}-phone-hint`}>We’ll text a 6-digit code to this number.</HelperText>
                  : <HelperText id={`${id}-phone-error`} error>{phoneError}</HelperText>}
              </div>
              <div style={actions}>
                <Button size='xs' type='button' {...ghost} onClick={() => goTo('method')}>Back</Button>
                <Button size='xs' type='submit'>Send code</Button>
              </div>
            </form>
          )}

          {step === 'verify' && (
            <form noValidate onSubmit={submitCode} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-code`}>{method === 'app' ? 'Code from your authenticator app' : `Code sent to ${maskedPhone}`}</Label>
                <PinField
                  maxLength={6}
                  value={code}
                  error={codeError !== ''}
                  onChangeValue={(value) => {
                    setCode(value);
                    setCodeError('');
                  }}
                >
                  <PinFieldInput
                    id={`${id}-code`}
                    autoComplete='one-time-code'
                    aria-invalid={codeError !== ''}
                    aria-describedby={codeError === '' ? undefined : `${id}-code-error`}
                  />
                  {Array.from({ length: 6 }, (_, index) => <PinFieldSlot key={index} index={index} />)}
                </PinField>
                {codeError !== '' && <HelperText id={`${id}-code-error`} error>{codeError}</HelperText>}
                <Text size={2} style={{ color: 'var(--label-tertiary)' }}>{`Demo code: ${DEMO_CODE}`}</Text>
              </div>
              <div style={actions}>
                <Button size='xs' type='button' {...ghost} onClick={() => goTo(method === 'app' ? 'scan' : 'phone')}>Back</Button>
                <Button size='xs' type='submit'>Verify</Button>
              </div>
            </form>
          )}

          {step === 'codes' && (
            <form noValidate onSubmit={finish} style={{ display: 'grid', gap: 'var(--spacing-10)', marginBlockStart: 'var(--spacing-6)' }}>
              <Text size={2} style={muted}>Two-factor authentication is on. If you lose your phone, each code below lets you sign in once.</Text>
              <ul aria-label='Recovery codes' className='sc-codes'>
                {recoveryCodes.map((item) => <li key={item}><Code size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{item}</Code></li>)}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <Button size='xs' type='button' {...ghost} style={{ gap: 'var(--spacing-2)' }} onClick={() => copy('codes', recoveryCodes.join('\n'))}>
                  <Icon size='xs' aria-hidden='true'>{copied === 'codes' ? <Check /> : <Copy />}</Icon>
                  Copy codes
                </Button>
                <Button size='xs' asChild {...ghost} style={{ gap: 'var(--spacing-2)' }}>
                  <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(recoveryCodes.join('\n'))}`} download='northwind-recovery-codes.txt'>
                    <Icon size='xs' aria-hidden='true'><Download /></Icon>
                    Download .txt
                  </a>
                </Button>
                <Text size={2} role='status' style={muted}>{copied === 'codes' ? 'Copied' : ''}</Text>
              </div>
              <Separator />
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput
                    checked={savedCodes}
                    aria-invalid={codesError !== ''}
                    aria-describedby={codesError === '' ? undefined : `${id}-codes-error`}
                    onChange={(event) => {
                      setSavedCodes(event.currentTarget.checked);
                      setCodesError('');
                    }}
                  />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                  </CheckboxIndicator>
                  I’ve saved my recovery codes
                </Checkbox>
                {codesError !== '' && <HelperText id={`${id}-codes-error`} error>{codesError}</HelperText>}
              </div>
              <div style={actions}>
                <Button size='xs' type='submit'>Done</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onChangeOpen={setConfirmOpen}>
        <DialogContent
          onClose={() => confirmed.current && confirm?.focus.current?.focus()}
          aria-labelledby={`${id}-confirm-title`}
          aria-describedby={`${id}-confirm-description`}
          style={{ width: 'min(420px, 100%)', boxSizing: 'border-box' }}
        >
          <div style={dialogHeader}>
            <Heading id={`${id}-confirm-title`} as='h2' size={4} fontWeight={600}>{confirm?.title}</Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' {...ghost} style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text id={`${id}-confirm-description`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', ...muted }}>{confirm?.description}</Text>
          <form
            method='dialog'
            onSubmit={() => {
              confirmed.current = true;
              confirm?.run();
            }} style={{ ...actions, marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild>
              <Button size='xs' type='button' {...ghost}>Cancel</Button>
            </DialogClose>
            <Button size='xs' type='submit' style={destructive}>{confirm?.action}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
