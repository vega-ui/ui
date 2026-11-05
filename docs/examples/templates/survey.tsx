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
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
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
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import './survey.css';

const steps = ['Rating', 'Usage', 'Details', 'Review'];

const scores = Array.from({ length: 11 }, (_, index) => String(index));

const satisfaction = ['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied'];

const features = [
  { value: 'notes', title: 'Notes', description: 'Writing and editing pages' },
  { value: 'search', title: 'Search', description: 'Finding pages and files' },
  { value: 'tasks', title: 'Tasks', description: 'Checklists and due dates' },
  { value: 'sharing', title: 'Sharing', description: 'Links, guests and comments' },
];

const roles = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
];

const IMPROVE_LIMIT = 500;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const stepStyle = { display: 'grid', gap: 'var(--spacing-12)' } as const;
const secondary = { color: 'var(--label-secondary)' } as const;

type Field = 'score' | 'features' | 'role' | 'roleOther' | 'email' | 'consent';
type Errors = Partial<Record<Field, string>>;

interface Answers {
  score: string
  rating: number
  features: string[]
  role: string
  roleOther: string
  improve: string
  email: string
  consent: boolean
}

const emptyAnswers: Answers = { score: '', rating: 3, features: [], role: '', roleOther: '', improve: '', email: '', consent: false };

const fieldOrder: Field[] = ['score', 'features', 'role', 'roleOther', 'email', 'consent'];

const validateStep = (step: number, answers: Answers) => {
  const errors: Errors = {};

  if (step === 0 && answers.score === '') errors.score = 'Pick a score from 0 to 10.';

  if (step === 1) {
    if (answers.features.length === 0) errors.features = 'Choose at least one feature.';
    if (answers.role === '') errors.role = 'Choose the role closest to yours.';
    if (answers.role === 'other' && answers.roleOther.trim() === '') errors.roleOther = 'Tell us your role.';
  }

  if (step === 2) {
    const email = answers.email.trim();

    if (email !== '' && !EMAIL.test(email)) errors.email = 'Use the full address, like ada@example.com.';
    if (email !== '' && !answers.consent) errors.consent = 'Allow us to contact you, or leave the email empty.';
  }

  return errors;
};

export default function Survey() {
  const id = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step, sent]);

  const change = <K extends keyof Answers>(name: K, value: Answers[K]) => {
    setAnswers({ ...answers, [name]: value });

    if (!(name in errors)) return;

    setErrors({ ...errors, [name]: undefined });
  };

  const toggleFeature = (value: string, checked: boolean) => {
    const next = checked ? [...answers.features, value] : answers.features.filter((item) => item !== value);
    change('features', next);
  };

  const goTo = (next: number) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  const describe = (name: Field) => (errors[name] ? `${id}-${name}-error` : undefined);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validateStep(step, answers);
    const invalid = fieldOrder.find((name) => next[name]);

    setErrors(next);

    if (invalid) {
      const element = form.querySelector<HTMLElement>(`[data-field='${invalid}']`);
      element?.focus();
      return;
    }

    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }

    moved.current = true;
    setSent(true);
  };

  const restart = () => {
    moved.current = true;
    setAnswers(emptyAnswers);
    setErrors({});
    setStep(0);
    setSent(false);
  };

  const roleLabel = answers.role === 'other' ? answers.roleOther.trim() : roles.find((item) => item.value === answers.role)?.label ?? '';

  const review = [
    { step: 0, term: 'Likelihood to recommend', value: `${answers.score} out of 10` },
    { step: 0, term: 'Satisfaction with search', value: satisfaction[answers.rating - 1] },
    { step: 1, term: 'Used most', value: features.filter((item) => answers.features.includes(item.value)).map((item) => item.title).join(', ') },
    { step: 1, term: 'Role', value: roleLabel },
    { step: 2, term: 'What to improve', value: answers.improve.trim() === '' ? 'No answer' : answers.improve.trim() },
    { step: 2, term: 'Follow-up email', value: answers.email.trim() === '' ? 'Don’t contact me' : answers.email.trim() },
  ];

  if (sent) {
    return (
      <Card className='survey' style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', width: '100%', maxWidth: 600, marginInline: 'auto' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading ref={headingRef} tabIndex={-1} as='h1' size={6} fontWeight={700} style={{ outline: 'none' }}>Thank you for your feedback</Heading>
          <Text size={3} style={secondary}>Every answer is read by the product team. We share what we change in the monthly changelog.</Text>
        </div>
        {answers.email.trim() !== '' && (
          <Alert variant='success'>
            <AlertIcon />
            <AlertMain>
              <AlertTitle>We may reach out</AlertTitle>
              <AlertContent style={{ overflowWrap: 'anywhere' }}>{`If we have questions, we’ll write to ${answers.email.trim()}.`}</AlertContent>
            </AlertMain>
          </Alert>
        )}
        <Button size='xs' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }} onClick={restart}>Start a new response</Button>
      </Card>
    );
  }

  return (
    <Card asChild className='survey' style={{ alignItems: 'stretch', gap: 'var(--spacing-12)', width: '100%', maxWidth: 600, marginInline: 'auto' }}>
      <form noValidate aria-labelledby={`${id}-heading`} onSubmit={submit}>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
            <Text size={2} style={{ ...secondary, fontVariantNumeric: 'tabular-nums' }}>{`Step ${step + 1} of ${steps.length}`}</Text>
            <Text size={2} style={secondary}>About 2 minutes</Text>
          </div>
          <Progress value={step + 1} max={steps.length} valueText={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} aria-label='Survey progress' fullWidth>
            <ProgressTrack />
          </Progress>
        </div>

        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading ref={headingRef} id={`${id}-heading`} tabIndex={-1} as='h1' size={6} fontWeight={700} style={{ outline: 'none' }}>
            {step === 0 && 'How are we doing?'}
            {step === 1 && 'How you use Fieldnote'}
            {step === 2 && 'Anything else?'}
            {step === 3 && 'Review your answers'}
          </Heading>
          <Text size={3} style={secondary}>
            {step === 0 && 'Your answers help us decide what to build next.'}
            {step === 1 && 'So we can compare feedback across teams.'}
            {step === 2 && 'Both questions are optional.'}
            {step === 3 && 'Check everything before you send it.'}
          </Text>
        </div>

        {step === 0 && (
          <div style={stepStyle}>
            <div style={field}>
              <Label id={`${id}-score-label`}>How likely are you to recommend Fieldnote to a colleague?</Label>
              <SegmentedControl
                size='xs'
                name='score'
                role='radiogroup'
                value={answers.score}
                aria-labelledby={`${id}-score-label`}
                aria-describedby={errors.score ? `${id}-score-error ${id}-score-scale` : `${id}-score-scale`}
                className='surveyScore'
                onChange={(event) => change('score', event.target.value)}
              >
                {scores.map((score, index) => (
                  <SegmentedControlItem key={score} value={score}>
                    <SegmentedControlItemInput data-field={index === 0 ? 'score' : undefined} aria-invalid={errors.score !== undefined} />
                    {score}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
              <div id={`${id}-score-scale`} className='surveyScale'>
                <Text size={1} style={secondary}>0 – Not at all likely</Text>
                <Text size={1} style={secondary}>10 – Extremely likely</Text>
              </div>
              {errors.score && <HelperText id={`${id}-score-error`} error>{errors.score}</HelperText>}
            </div>

            <div style={{ ...field, gap: 'var(--spacing-5)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
                <Label id={`${id}-rating-label`}>How satisfied are you with search?</Label>
                <Text size={2} fontWeight={500} aria-hidden='true' style={{ color: 'var(--color-primary-500)' }}>{satisfaction[answers.rating - 1]}</Text>
              </div>
              <Slider min={1} max={5} value={answers.rating} onChangeValue={(value) => change('rating', value)}>
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb>
                  <SliderThumbInput name='rating' aria-labelledby={`${id}-rating-label`} aria-valuetext={`${answers.rating} of 5, ${satisfaction[answers.rating - 1]}`} />
                  <SliderThumbIndicator />
                </SliderThumb>
              </Slider>
              <div aria-hidden='true' className='surveyScale'>
                <Text size={1} style={secondary}>Very dissatisfied</Text>
                <Text size={1} style={secondary}>Very satisfied</Text>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={stepStyle}>
            <Fieldset aria-describedby={describe('features')} className='surveyFieldset' style={{ gap: 'var(--spacing-5)' }}>
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-3)' }}><Text size={3} fontWeight={500}>What do you use most?</Text></FieldsetLegend>
              <div className='surveyFeatures'>
                {features.map((item, index) => (
                  <CheckboxCard key={item.value} size='sm' style={{ minWidth: 0 }}>
                    <CheckboxCardContent>
                      <CheckboxCardTitle>{item.title}</CheckboxCardTitle>
                      <CheckboxCardDescription>{item.description}</CheckboxCardDescription>
                    </CheckboxCardContent>
                    <CheckboxCardControl>
                      <CheckboxCardControlInput
                        name='features'
                        value={item.value}
                        data-field={index === 0 ? 'features' : undefined}
                        checked={answers.features.includes(item.value)}
                        aria-invalid={errors.features !== undefined}
                        onChange={(event) => toggleFeature(item.value, event.currentTarget.checked)}
                      />
                      <CheckboxIndicator>
                        <CheckboxCardControlCheckedIcon />
                      </CheckboxIndicator>
                    </CheckboxCardControl>
                  </CheckboxCard>
                ))}
              </div>
              {errors.features && <HelperText id={`${id}-features-error`} error>{errors.features}</HelperText>}
            </Fieldset>

            <Fieldset aria-describedby={describe('role')} className='surveyFieldset' style={{ gap: 'var(--spacing-5)' }}>
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-3)' }}><Text size={3} fontWeight={500}>What’s your role?</Text></FieldsetLegend>
              <div style={{ display: 'grid', gap: 'var(--spacing-5)' }}>
                {roles.map((option, index) => (
                  <div key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Radio
                      id={`${id}-role-${option.value}`}
                      name='role'
                      value={option.value}
                      data-field={index === 0 ? 'role' : undefined}
                      checked={answers.role === option.value}
                      aria-invalid={errors.role !== undefined}
                      onChange={() => change('role', option.value)}
                    />
                    <Label htmlFor={`${id}-role-${option.value}`} style={{ fontWeight: 400 }}>{option.label}</Label>
                  </div>
                ))}
              </div>
              {answers.role === 'other' && (
                <div style={{ ...field, paddingInlineStart: 'var(--spacing-14)' }}>
                  <Label htmlFor={`${id}-role-custom`}>Your role</Label>
                  <TextField error={errors.roleOther !== undefined}>
                    <TextFieldInput
                      id={`${id}-role-custom`}
                      name='roleOther'
                      data-field='roleOther'
                      autoComplete='organization-title'
                      placeholder='Customer support'
                      value={answers.roleOther}
                      aria-invalid={errors.roleOther !== undefined}
                      aria-describedby={describe('roleOther')}
                      onChange={(event) => change('roleOther', event.currentTarget.value)}
                    />
                  </TextField>
                  {errors.roleOther && <HelperText id={`${id}-roleOther-error`} error>{errors.roleOther}</HelperText>}
                </div>
              )}
              {errors.role && <HelperText id={`${id}-role-error`} error>{errors.role}</HelperText>}
            </Fieldset>
          </div>
        )}

        {step === 2 && (
          <div style={stepStyle}>
            <div style={field}>
              <Label htmlFor={`${id}-improve`}>What’s one thing we should improve?</Label>
              <TextArea
                id={`${id}-improve`}
                name='improve'
                rows={4}
                maxLength={IMPROVE_LIMIT}
                fullWidth
                placeholder='The more specific, the more useful'
                value={answers.improve}
                aria-describedby={`${id}-improve-count`}
                onChange={(event) => change('improve', event.currentTarget.value)}
              />
              <HelperText id={`${id}-improve-count`} style={{ justifySelf: 'end', fontVariantNumeric: 'tabular-nums' }}>
                {`${answers.improve.length} / ${IMPROVE_LIMIT}`}
              </HelperText>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-email`}>Email for follow-up questions</Label>
                <TextField error={errors.email !== undefined}>
                  <TextFieldInput
                    id={`${id}-email`}
                    name='email'
                    type='email'
                    data-field='email'
                    autoComplete='email'
                    value={answers.email}
                    aria-invalid={errors.email !== undefined}
                    aria-describedby={errors.email ? `${id}-email-error` : `${id}-email-hint`}
                    onChange={(event) => change('email', event.currentTarget.value)}
                  />
                </TextField>
                <HelperText id={errors.email ? `${id}-email-error` : `${id}-email-hint`} error={errors.email !== undefined}>
                  {errors.email ?? 'Optional. We only use it for this survey.'}
                </HelperText>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <CheckboxInput
                    name='consent'
                    data-field='consent'
                    checked={answers.consent}
                    aria-invalid={errors.consent !== undefined}
                    aria-describedby={describe('consent')}
                    onChange={(event) => change('consent', event.currentTarget.checked)}
                  />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                  </CheckboxIndicator>
                  The research team may contact me about my answers
                </Checkbox>
                {errors.consent && <HelperText id={`${id}-consent-error`} error>{errors.consent}</HelperText>}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <dl className='surveyReview'>
            {review.map((item) => (
              <div key={item.term} className='surveyReviewRow'>
                <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                  <Text asChild size={2} style={secondary}><dt>{item.term}</dt></Text>
                  <Text asChild size={3} fontWeight={500} style={{ margin: 0, overflowWrap: 'anywhere', fontVariantNumeric: 'tabular-nums' }}><dd>{item.value}</dd></Text>
                </div>
                <Button size='xs' type='button' variant='secondary' appearance='ghost' aria-label={`Edit ${item.term.toLowerCase()}`} onClick={() => goTo(item.step)}>Edit</Button>
              </div>
            ))}
          </dl>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          {step > 0 && <Button size='xs' type='button' variant='secondary' appearance='ghost' onClick={() => goTo(step - 1)}>Back</Button>}
          <Button size='xs' type='submit'>{step === steps.length - 1 ? 'Send feedback' : 'Continue'}</Button>
        </div>
      </form>
    </Card>
  );
}
