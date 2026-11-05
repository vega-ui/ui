import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
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
  Fieldset,
  FieldsetLegend,
  Heading,
  HelperText,
  Label,
  Progress,
  ProgressTrack,
  Radio,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

const steps = ['Workspace', 'Team', 'Review'];

const teamSizes = [
  { value: 'solo', label: 'Just me' },
  { value: 'small', label: '2–10 people' },
  { value: 'medium', label: '11–50 people' },
  { value: 'large', label: 'More than 50' },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const stepStyle = { display: 'grid', gap: 'var(--spacing-8)' } as const;

type Errors = Partial<Record<'workspace' | 'slug' | 'size' | 'invites', string>>;

const toSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const splitInvites = (value: string) => value.split(/[\s,]+/).filter((entry) => entry !== '');

const validateStep = (step: number, values: { workspace: string, slug: string, size: string, invites: string }) => {
  const errors: Errors = {};

  if (step === 0) {
    if (values.workspace.trim().length < 3) errors.workspace = 'Use at least 3 characters for the workspace name.';
    if (!/^[a-z0-9-]{3,32}$/.test(values.slug)) errors.slug = 'Use 3–32 lowercase letters, digits or hyphens.';
  }

  if (step === 1) {
    const invalid = splitInvites(values.invites).find((email) => !EMAIL.test(email));

    if (values.size === '') errors.size = 'Choose a team size so we can suggest the right plan.';
    if (invalid) errors.invites = `“${invalid}” isn’t a valid email address.`;
  }

  return errors;
};

export default function Onboarding() {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const [step, setStep] = useState(0);
  const [workspace, setWorkspace] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [size, setSize] = useState('');
  const [invites, setInvites] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  const values = { workspace, slug, size, invites };
  const inviteCount = splitInvites(invites).length;

  const changeWorkspace = (value: string) => {
    setWorkspace(value);
    setErrors({ ...errors, workspace: undefined });
    if (!slugEdited) setSlug(toSlug(value));
  };

  const changeSlug = (value: string) => {
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    setSlugEdited(true);
    setErrors({ ...errors, slug: undefined });
  };

  const goTo = (next: number) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validateStep(step, values);
    const invalid = Object.keys(next)[0];

    setErrors(next);

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof RadioNodeList) (element[0] as HTMLElement).focus();
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }

    setCreated(true);
  };

  const restart = () => {
    moved.current = false;
    setStep(0);
    setWorkspace('');
    setSlug('');
    setSlugEdited(false);
    setSize('');
    setInvites('');
    setErrors({});
    setCreated(false);
  };

  if (created) {
    return (
      <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', width: '100%', maxWidth: 560, marginInline: 'auto' }}>
        <Alert variant='success'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>{`${workspace} is ready`}</AlertTitle>
            <AlertContent>
              {inviteCount > 0 ? `We sent ${inviteCount} ${inviteCount === 1 ? 'invitation' : 'invitations'}. Your workspace lives at vega.app/${slug}.` : `Your workspace lives at vega.app/${slug}.`}
            </AlertContent>
          </AlertMain>
        </Alert>
        <Button size='xs' variant='secondary' appearance='ghost' style={{ alignSelf: 'flex-start' }} onClick={restart}>Set up another workspace</Button>
      </Card>
    );
  }

  return (
    <Card asChild style={{ alignItems: 'stretch', gap: 'var(--spacing-12)', width: '100%', maxWidth: 560, marginInline: 'auto' }}>
      <form noValidate aria-labelledby={`${id}-heading`} onSubmit={submit}>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`Step ${step + 1} of ${steps.length}`}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{steps.join(' · ')}</Text>
          </div>
          <Progress value={step + 1} max={steps.length} valueText={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} aria-label='Setup progress' fullWidth>
            <ProgressTrack />
          </Progress>
        </div>

        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading ref={headingRef} id={`${id}-heading`} tabIndex={-1} as='h1' size={6} fontWeight={700} style={{ outline: 'none' }}>
            {step === 0 && 'Create your workspace'}
            {step === 1 && 'Tell us about your team'}
            {step === 2 && 'Check and confirm'}
          </Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>
            {step === 0 && 'This is where your projects, docs and people live.'}
            {step === 1 && 'Invite people now or later from Settings.'}
            {step === 2 && 'You can change all of this later.'}
          </Text>
        </div>

        {step === 0 && (
          <div style={stepStyle}>
            <div style={field}>
              <Label htmlFor={`${id}-workspace`}>Workspace name</Label>
              <TextField error={errors.workspace !== undefined}>
                <TextFieldInput
                  id={`${id}-workspace`}
                  name='workspace'
                  autoComplete='organization'
                  placeholder='Northwind Studio'
                  value={workspace}
                  aria-invalid={errors.workspace !== undefined}
                  aria-describedby={errors.workspace ? `${id}-workspace-error` : undefined}
                  onChange={(event) => changeWorkspace(event.currentTarget.value)}
                />
              </TextField>
              {errors.workspace && <HelperText id={`${id}-workspace-error`} error>{errors.workspace}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-slug`}>Workspace URL</Label>
              <TextField error={errors.slug !== undefined}>
                <Text size={3} aria-hidden='true' style={{ flexShrink: 0, paddingInlineStart: 'var(--spacing-12)', color: 'var(--label-secondary)' }}>vega.app/</Text>
                <TextFieldInput
                  id={`${id}-slug`}
                  name='slug'
                  spellCheck={false}
                  value={slug}
                  aria-invalid={errors.slug !== undefined}
                  aria-describedby={`${id}-slug-hint`}
                  onChange={(event) => changeSlug(event.currentTarget.value)}
                  style={{ minWidth: 0, paddingInlineStart: 'var(--spacing-1)' }}
                />
              </TextField>
              <HelperText id={`${id}-slug-hint`} error={errors.slug !== undefined}>
                {errors.slug ?? 'Lowercase letters, digits and hyphens.'}
              </HelperText>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={stepStyle}>
            <Fieldset
              aria-describedby={errors.size ? `${id}-size-error` : undefined}
              style={{ gap: 'var(--spacing-5)' }}
            >
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-3)' }}>Team size</FieldsetLegend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'var(--spacing-5) var(--spacing-8)' }}>
                {teamSizes.map((option) => (
                  <div key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Radio
                      id={`${id}-size-${option.value}`}
                      name='size'
                      value={option.value}
                      checked={size === option.value}
                      aria-invalid={errors.size !== undefined}
                      onChange={() => {
                        setSize(option.value);
                        setErrors({ ...errors, size: undefined });
                      }}
                    />
                    <Label htmlFor={`${id}-size-${option.value}`} style={{ fontWeight: 400 }}>{option.label}</Label>
                  </div>
                ))}
              </div>
              {errors.size && <HelperText id={`${id}-size-error`} error>{errors.size}</HelperText>}
            </Fieldset>
            <div style={field}>
              <Label htmlFor={`${id}-invites`}>Invite teammates (optional)</Label>
              <TextArea
                id={`${id}-invites`}
                name='invites'
                rows={3}
                fullWidth
                spellCheck={false}
                placeholder='dana@northwind.io, sam@northwind.io'
                value={invites}
                aria-invalid={errors.invites !== undefined}
                aria-describedby={`${id}-invites-hint`}
                onChange={(event) => {
                  setInvites(event.currentTarget.value);
                  setErrors({ ...errors, invites: undefined });
                }}
              />
              <HelperText id={`${id}-invites-hint`} error={errors.invites !== undefined}>
                {errors.invites ?? 'Separate addresses with commas or spaces.'}
              </HelperText>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={stepStyle}>
            <dl style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 'var(--spacing-8)', borderRadius: 'var(--radius-4)', background: 'var(--fills-tertiary)' }}>
              {[
                { term: 'Workspace', value: workspace },
                { term: 'URL', value: `vega.app/${slug}` },
                { term: 'Team size', value: teamSizes.find((option) => option.value === size)?.label ?? '' },
                { term: 'Invitations', value: inviteCount === 0 ? 'None yet' : `${inviteCount} ${inviteCount === 1 ? 'person' : 'people'}` },
              ].map((item) => (
                <div key={item.term} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
                  <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}><dt>{item.term}</dt></Text>
                  <Text asChild size={2} fontWeight={500} style={{ margin: 0, overflowWrap: 'anywhere' }}><dd>{item.value}</dd></Text>
                </div>
              ))}
            </dl>
            <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <CheckboxInput name='tips' defaultChecked />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
              Email me tips for the first week
            </Checkbox>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          {step > 0 && <Button size='xs' type='button' variant='secondary' appearance='ghost' onClick={() => goTo(step - 1)}>Back</Button>}
          <Button size='xs' type='submit'>{step === steps.length - 1 ? 'Create workspace' : 'Continue'}</Button>
        </div>
      </form>
    </Card>
  );
}
