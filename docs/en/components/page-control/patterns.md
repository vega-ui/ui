# PageControl Patterns

## Carousel Indicators

When to use:

- a short carousel or hero sequence needs compact navigation

Composition notes:

- keep the sequence short
- sync active state with the actual slide

Trade-offs:

- compact and familiar
- not informative enough for long sequences

<!-- example: page-control/carousel-indicators.tsx -->
```tsx
import { Card, Heading, PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

const slides = [
  { title: 'Plan your week', text: 'Drag tasks onto the calendar and see your free time at a glance.' },
  { title: 'Share with your team', text: 'Invite teammates to a board and assign tasks in one click.' },
  { title: 'Stay on track', text: 'Get a summary every Monday with what slipped and what is next.' },
];

export default function CarouselIndicators() {
  const prefix = useId();
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-10)', justifyItems: 'center', width: '100%' }}>
      <div
        role='tabpanel'
        id={`${prefix}-panel`}
        aria-labelledby={`${prefix}-tab-${active}`}
        style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-3)', minHeight: 96, textAlign: 'center' }}
      >
        <Heading as='h3' size={4} fontWeight={600}>{slide.title}</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{slide.text}</Text>
      </div>
      <PageControl active={active} onChangeActive={setActive} aria-label='Feature tour'>
        {slides.map((item, index) => (
          <PageControlItem
            key={item.title}
            index={index}
            id={`${prefix}-tab-${index}`}
            aria-controls={`${prefix}-panel`}
            aria-label={`${item.title}, ${index + 1} of ${slides.length}`}
          />
        ))}
      </PageControl>
    </Card>
  );
}
```
<!-- /example -->

## Timed Progress Dots

When to use:

- autoplay or timed advancement is part of the experience

Composition notes:

- use `PageControlProgress`
- keep duration aligned with the real autoplay timing

Trade-offs:

- communicates progression visually
- adds temporal complexity and potential accessibility risks

<!-- example: page-control/timed-progress-indicators.tsx -->
```tsx
import { Button, PageControl, PageControlItem, PageControlProgress, Text } from '@vega-ui/react';
import { useState } from 'react';

const stories = ['New arrivals', 'Autumn sale', 'Gift cards', 'Store opening'];

export default function TimedProgressIndicators() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = () => setActive((active + 1) % stories.length);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Text size={4} fontWeight={600} aria-live={paused ? 'polite' : 'off'}>{stories[active]}</Text>
      <PageControl active={active} onChangeActive={setActive} aria-label='Stories'>
        {stories.map((story, index) => {
          if (paused) {
            return <PageControlItem key={story} index={index} aria-label={story} />;
          }

          return (
            <PageControlProgress
              key={story}
              index={index}
              duration={4000}
              aria-label={story}
              onAnimationEnd={index === active ? advance : undefined}
            />
          );
        })}
      </PageControl>
      <Button size='sm' variant='secondary' appearance='ghost' aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Resume autoplay' : 'Pause autoplay'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Step Indicators Above A Form

When to use:

- a multi-step flow needs lightweight progress cues

Composition notes:

- keep step semantics elsewhere if labels matter
- use `active` to reflect the real current step

Trade-offs:

- compact
- less explanatory than a labeled stepper

<!-- example: page-control/step-indicator-above-form-pages.tsx -->
```tsx
import { Button, HelperText, Label, PageControl, PageControlItem, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, MouseEvent, useId, useState } from 'react';

const steps = ['Account', 'Workspace', 'Invite'];

export default function StepIndicatorAboveFormPages() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [result, setResult] = useState('');

  const goTo = (index: number) => {
    if (index > reached) return;
    setStep(index);
  };

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    const fieldset = event.currentTarget.form?.elements.namedItem(`step-${step}`);
    if (!(fieldset instanceof HTMLFieldSetElement)) return;

    const fields = Array.from(fieldset.elements) as HTMLInputElement[];
    const valid = fields.every((field) => field.reportValidity());
    if (!valid) return;

    setStep(step + 1);
    setReached(Math.max(reached, step + 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Workspace “${data.get('workspace')}” created for ${data.get('email')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'center' }}>
        <PageControl active={step} onChangeActive={goTo} aria-label='Sign-up steps'>
          {steps.map((label, index) => (
            <PageControlItem
              key={label}
              index={index}
              disabled={index > reached}
              aria-label={`Step ${index + 1}: ${label}`}
            />
          ))}
        </PageControl>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Step {step + 1} of {steps.length}: {steps[step]}</Text>
      </div>

      <fieldset name='step-0' hidden={step !== 0} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-email`}>Work email</Label>
          <TextField>
            <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
      </fieldset>

      <fieldset name='step-1' hidden={step !== 1} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-workspace`}>Workspace name</Label>
          <TextField>
            <TextFieldInput id={`${id}-workspace`} name='workspace' required minLength={3} />
          </TextField>
        </div>
      </fieldset>

      <fieldset name='step-2' hidden={step !== 2} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-invite`}>Invite a teammate (optional)</Label>
          <TextField>
            <TextFieldInput id={`${id}-invite`} name='invite' type='email' />
          </TextField>
        </div>
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='button' variant='secondary' appearance='ghost' disabled={step === 0} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        {step < steps.length - 1 && <Button type='button' onClick={next}>Continue</Button>}
        {step === steps.length - 1 && <Button type='submit'>Create workspace</Button>}
      </div>
      {result && <HelperText role='status'>{result}</HelperText>}
    </form>
  );
}
```
<!-- /example -->
