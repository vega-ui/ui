import { useId, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Separator,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const ACCOUNT_EMAIL = 'elena.moreau@northwind.io';
const BIO_LIMIT = 160;

const notifications = [
  { name: 'mentions', title: 'Mentions and replies', description: 'When someone mentions you or replies to your comment.', checked: true },
  { name: 'assigned', title: 'Assigned to you', description: 'When an issue or a review is assigned to you.', checked: true },
  { name: 'digest', title: 'Weekly digest', description: 'A Monday summary of activity in your projects.', checked: false },
  { name: 'product', title: 'Product updates', description: 'New features and changes, about once a month.', checked: false },
];

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const card = { alignItems: 'stretch', gap: 'var(--spacing-12)', minWidth: 0, flex: '999 1 420px' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

interface ProfileErrors {
  name?: string
  email?: string
}

const validateProfile = (data: FormData) => {
  const errors: ProfileErrors = {};
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();

  if (name === '') errors.name = 'Enter your name so teammates can find you.';
  if (email === '') errors.email = 'Enter the email you sign in with.';
  if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Use the full address, like elena@northwind.io.';

  return errors;
};

const Section = ({ id, title, description, children }: { id: string, title: string, description: string, children: ReactNode }) => (
  <section aria-labelledby={id} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-8) var(--spacing-16)' }}>
    <div style={{ display: 'grid', gap: 'var(--spacing-2)', alignContent: 'start', flex: '1 1 220px' }}>
      <Heading id={id} as='h2' size={4} fontWeight={600}>{title}</Heading>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{description}</Text>
    </div>
    {children}
  </section>
);

export default function AccountSettings() {
  const id = useId();
  const [bio, setBio] = useState('Product designer working on billing and onboarding.');
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [deleted, setDeleted] = useState(false);

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validateProfile(new FormData(form));
    const invalid = Object.keys(next)[0];

    setErrors(next);
    setSaved(invalid === undefined);

    if (invalid === undefined) return;

    const element = form.elements.namedItem(invalid);
    if (element instanceof HTMLElement) element.focus();
  };

  const discardProfile = () => {
    setBio('Product designer working on billing and onboarding.');
    setErrors({});
    setSaved(false);
  };

  const deleteAccount = (event: FormEvent<HTMLFormElement>) => {
    if (confirmation !== ACCOUNT_EMAIL) {
      event.preventDefault();
      return;
    }

    setDeleted(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h1' size={7} fontWeight={700}>Settings</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Manage your profile, notifications and account.</Text>
      </header>

      <Section id={`${id}-profile`} title='Profile' description='Shown to people in your workspace and on comments you leave.'>
        <Card asChild style={card}>
          <form noValidate aria-labelledby={`${id}-profile`} onSubmit={saveProfile} onReset={discardProfile}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', minWidth: 0 }}>
              <Avatar size='lg' aria-hidden='true' style={{ flexShrink: 0 }}>
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div style={{ display: 'grid', minWidth: 0 }}>
                <Text size={3} fontWeight={500}>Elena Moreau</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Member since March 2024</Text>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'var(--spacing-8)' }}>
                <div style={field}>
                  <Label htmlFor={`${id}-name`}>Full name</Label>
                  <TextField error={errors.name !== undefined}>
                    <TextFieldInput
                      id={`${id}-name`}
                      name='name'
                      autoComplete='name'
                      defaultValue='Elena Moreau'
                      aria-invalid={errors.name !== undefined}
                      aria-describedby={errors.name ? `${id}-name-error` : undefined}
                    />
                  </TextField>
                  {errors.name && <HelperText id={`${id}-name-error`} error>{errors.name}</HelperText>}
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <TextField error={errors.email !== undefined}>
                    <TextFieldInput
                      id={`${id}-email`}
                      name='email'
                      type='email'
                      autoComplete='email'
                      defaultValue={ACCOUNT_EMAIL}
                      aria-invalid={errors.email !== undefined}
                      aria-describedby={errors.email ? `${id}-email-error` : undefined}
                    />
                  </TextField>
                  {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
                </div>
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-bio`}>Bio</Label>
                <TextArea
                  id={`${id}-bio`}
                  name='bio'
                  rows={3}
                  maxLength={BIO_LIMIT}
                  fullWidth
                  value={bio}
                  aria-describedby={`${id}-bio-count`}
                  onChange={(event) => setBio(event.currentTarget.value)}
                />
                <HelperText id={`${id}-bio-count`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {`${BIO_LIMIT - bio.length} characters left`}
                </HelperText>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Text size={2} role='status' style={{ marginInlineEnd: 'auto', color: 'var(--label-secondary)' }}>{saved ? 'Profile saved.' : ''}</Text>
              <Button size='xs' type='reset' variant='secondary' appearance='ghost'>Discard</Button>
              <Button size='xs' type='submit'>Save changes</Button>
            </div>
          </form>
        </Card>
      </Section>

      <Separator />

      <Section id={`${id}-notifications`} title='Email notifications' description='Choose what lands in your inbox. Changes apply right away.'>
        <Card style={{ ...card, gap: 'var(--spacing-10)' }} aria-labelledby={`${id}-notifications`}>
          {notifications.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                <Label htmlFor={`${id}-${item.name}`}>{item.title}</Label>
                <Text id={`${id}-${item.name}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>{item.description}</Text>
              </div>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput id={`${id}-${item.name}`} name={item.name} defaultChecked={item.checked} aria-describedby={`${id}-${item.name}-description`} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
        </Card>
      </Section>

      <Separator />

      <Section id={`${id}-danger`} title='Delete account' description='Remove your account and everything it owns from Northwind.'>
        <Card style={{ ...card, gap: 'var(--spacing-8)', '--card-border-color': 'color-mix(in oklch, var(--color-error) 45%, transparent)' } as CSSProperties} aria-labelledby={`${id}-danger`}>
          {deleted && (
            <Alert variant='warning'>
              <AlertIcon />
              <AlertMain>
                <AlertTitle>Deletion scheduled</AlertTitle>
                <AlertContent>Your account will be deleted in 30 days. Sign in before then to cancel.</AlertContent>
              </AlertMain>
            </Alert>
          )}
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>
            Your 12 projects, 340 files and comment history are deleted permanently. Workspaces you own are transferred to another admin or closed.
          </Text>
          <Dialog onChangeOpen={() => setConfirmation('')}>
            <DialogTrigger asChild>
              <Button size='xs' disabled={deleted} style={{ ...destructive, alignSelf: 'flex-start' }}>Delete account</Button>
            </DialogTrigger>
            <DialogContent aria-labelledby={`${id}-dialog-title`} aria-describedby={`${id}-dialog-description`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={`${id}-dialog-title`} as='h2' size={4} fontWeight={600}>Delete your account?</Heading>
                <DialogClose asChild>
                  <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DialogClose>
              </div>
              <Text id={`${id}-dialog-description`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                You have 30 days to change your mind. After that, your data can’t be recovered.
              </Text>
              <form method='dialog' onSubmit={deleteAccount} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-10)' }}>
                <Label htmlFor={`${id}-confirm`}>Type your email to confirm</Label>
                <TextField>
                  <TextFieldInput
                    id={`${id}-confirm`}
                    value={confirmation}
                    autoComplete='off'
                    spellCheck={false}
                    placeholder={ACCOUNT_EMAIL}
                    onChange={(event) => setConfirmation(event.currentTarget.value)}
                  />
                </TextField>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
                  <DialogClose asChild>
                    <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
                  </DialogClose>
                  <Button size='xs' type='submit' disabled={confirmation !== ACCOUNT_EMAIL} style={confirmation === ACCOUNT_EMAIL ? destructive : undefined}>
                    Delete account
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Section>
    </div>
  );
}
