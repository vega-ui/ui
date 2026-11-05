import { FormEvent, useRef, useState } from 'react';
import { Button, Fieldset, FieldsetLegend, HelperText, Radio } from '@vega-ui/react';

const reasons = [
  { value: 'price', label: 'It is too expensive' },
  { value: 'features', label: 'It is missing features I need' },
  { value: 'switching', label: 'I am switching to another product' },
  { value: 'other', label: 'Other' },
];

export default function MissingRequiredRadioSelection() {
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    firstRef.current?.focus();
    setInvalid(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDone(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset style={{ width: '100%' }} aria-describedby={invalid ? 'cancel-reason-error' : undefined}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Why are you cancelling?</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {reasons.map((reason, index) => (
            <label key={reason.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio
                ref={index === 0 ? firstRef : undefined}
                name='reason'
                value={reason.value}
                required
                aria-invalid={invalid}
                onInvalid={handleInvalid}
                onChange={() => setInvalid(false)}
              />
              {reason.label}
            </label>
          ))}
        </div>
        {invalid && <HelperText id='cancel-reason-error' error>Choose a reason to continue.</HelperText>}
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Cancel subscription</Button>
        {done && <HelperText aria-live='polite'>Your subscription ends on the last day of this billing period.</HelperText>}
      </div>
    </form>
  );
}
