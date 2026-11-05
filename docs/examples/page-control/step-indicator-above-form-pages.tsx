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
