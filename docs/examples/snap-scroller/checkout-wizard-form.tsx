import {
  Button,
  Fieldset,
  FieldsetLegend,
  Label,
  SnapScroller,
  SnapScrollerContent,
  Text,
  TextField,
  TextFieldInput,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties, type FormEvent } from 'react';

const steps = [
  { name: 'contact', title: 'Contact' },
  { name: 'shipping', title: 'Shipping' },
  { name: 'review', title: 'Review' },
];

const pageStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'start',
  gap: 'var(--spacing-4)',
  width: '100%',
  boxSizing: 'border-box',
};

const fieldsetStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'start',
  gap: 'var(--spacing-8)',
};

const legendStyle: CSSProperties = {
  marginBlockEnd: 'var(--spacing-8)',
};

const fieldStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-3)',
};

export default function CheckoutWizardForm() {
  const api = useRef<SnapScrollerApiRef>(null);
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [summary, setSummary] = useState('');
  const isLastStep = step === steps.length - 1;

  const goNext = () => {
    const page = form.current?.elements.namedItem(steps[step].name);
    if (!(page instanceof HTMLFieldSetElement)) return;

    for (const element of page.elements) {
      if (element instanceof HTMLInputElement && !element.reportValidity()) return;
    }

    api.current?.next();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      goNext();
      return;
    }

    const data = new FormData(event.currentTarget);
    setSummary(`Order confirmed for ${data.get('email')}, shipping to ${data.get('city')} ${data.get('postcode')}.`);
  };

  const onReset = () => {
    setSummary('');
    api.current?.scrollToElementByKey(0);
  };

  return (
    <form
      ref={form}
      noValidate
      onSubmit={onSubmit}
      onReset={onReset}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Step {step + 1} of {steps.length}: {steps[step].title}
        </Text>
        <SnapScroller
          apiRef={api}
          onScrollSnapChange={(_, index) => setStep(index)}
          style={{ gap: 'var(--spacing-8)', overflowX: 'hidden' }}
        >
          <SnapScrollerContent index={0} inert={step !== 0} style={pageStyle}>
            <Fieldset name='contact' style={fieldsetStyle}>
              <FieldsetLegend style={legendStyle}>Contact</FieldsetLegend>
              <div style={fieldStyle}>
                <Label htmlFor='checkout-email'>Email</Label>
                <TextField>
                  <TextFieldInput id='checkout-email' name='email' type='email' autoComplete='email' required />
                </TextField>
              </div>
            </Fieldset>
          </SnapScrollerContent>
          <SnapScrollerContent index={1} inert={step !== 1} style={pageStyle}>
            <Fieldset name='shipping' style={fieldsetStyle}>
              <FieldsetLegend style={legendStyle}>Shipping</FieldsetLegend>
              <div style={fieldStyle}>
                <Label htmlFor='checkout-city'>City</Label>
                <TextField>
                  <TextFieldInput id='checkout-city' name='city' autoComplete='address-level2' required />
                </TextField>
              </div>
              <div style={fieldStyle}>
                <Label htmlFor='checkout-postcode'>Postcode</Label>
                <TextField>
                  <TextFieldInput
                    id='checkout-postcode'
                    name='postcode'
                    autoComplete='postal-code'
                    inputMode='numeric'
                    pattern='[0-9]{5}'
                    title='5 digits'
                    required
                  />
                </TextField>
              </div>
            </Fieldset>
          </SnapScrollerContent>
          <SnapScrollerContent index={2} inert={step !== 2} style={pageStyle}>
            <Fieldset name='review' style={fieldsetStyle}>
              <FieldsetLegend style={legendStyle}>Review</FieldsetLegend>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>Payment is collected on delivery. You can cancel the order within 24 hours.</Text>
            </Fieldset>
          </SnapScrollerContent>
        </SnapScroller>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Start over</Button>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button
            type='button'
            variant='secondary'
            appearance='ghost'
            disabled={step === 0}
            onClick={() => api.current?.prev()}
          >
            Back
          </Button>
          <Button type='submit'>{isLastStep ? 'Place order' : 'Next'}</Button>
        </div>
      </div>
      {summary && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{summary}</Text>}
    </form>
  );
}
