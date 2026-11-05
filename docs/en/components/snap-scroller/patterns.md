# SnapScroller Patterns

## Button-Controlled Carousel

When to use:

- a snapped surface should also support explicit previous/next controls

Composition notes:

- keep `apiRef` stable
- let external controls call `prev()` and `next()`

Trade-offs:

- explicit and easy to control
- adds more integration logic than passive snapping

<!-- example: snap-scroller/button-controlled-carousel.tsx -->
```tsx
import {
  Icon,
  IconButton,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState, type CSSProperties } from 'react';

const products = [
  { name: 'Trail runner 2', price: '$129' },
  { name: 'Merino crew socks', price: '$18' },
  { name: 'Packable rain shell', price: '$149' },
  { name: 'Insulated bottle, 750 ml', price: '$34' },
  { name: 'Running belt', price: '$22' },
];

const cardStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function ButtonControlledCarousel() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(0);
  const isFirst = current === 0;
  const isLast = current === products.length - 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <IconButton
        aria-label='Previous product'
        variant='secondary'
        appearance='ghost'
        disabled={isFirst}
        onClick={() => api.current?.prev()}
      >
        <Icon><ChevronLeft /></Icon>
      </IconButton>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='Recently viewed'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ flex: 1, minWidth: 0, gap: 'var(--spacing-6)' }}
      >
        {products.map((product, index) => (
          <SnapScrollerContent key={product.name} index={index} style={cardStyle}>
            <Text size={3} fontWeight={500}>{product.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{product.price}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <IconButton
        aria-label='Next product'
        variant='secondary'
        appearance='ghost'
        disabled={isLast}
        onClick={() => api.current?.next()}
      >
        <Icon><ChevronRight /></Icon>
      </IconButton>
    </div>
  );
}
```
<!-- /example -->

## Highlight Current Page

When to use:

- the snapped page should visibly stand out

Composition notes:

- derive highlighted state from `onScrollSnapChange` or `onScrollSnapChanging`
- keep the same keyed ordering in the content list

Trade-offs:

- clearer current-page feedback
- one more state synchronization path to maintain

<!-- example: snap-scroller/synced-page-control.tsx -->
```tsx
import {
  Heading,
  PageControl,
  PageControlItem,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const plans = [
  { name: 'Starter', price: '$0', detail: 'Up to 3 projects and 1 GB of storage.' },
  { name: 'Team', price: '$24', detail: 'Unlimited projects, 100 GB of storage and shared workspaces.' },
  { name: 'Business', price: '$79', detail: 'SSO, audit log and priority support.' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function SyncedPageControl() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [active, setActive] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='Plans'
        onScrollSnapChange={(_, index) => setActive(index)}
        style={{ width: '100%', gap: 'var(--spacing-6)' }}
      >
        {plans.map((plan, index) => (
          <SnapScrollerContent key={plan.name} index={index} style={slideStyle}>
            <Heading as='h3' size={5}>{plan.name}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{plan.detail}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <PageControl
        active={active}
        aria-label='Choose a plan'
        onChangeActive={(index) => api.current?.scrollToElementByKey(index)}
      >
        {plans.map((plan, index) => (
          <PageControlItem key={plan.name} index={index} aria-label={plan.name} />
        ))}
      </PageControl>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {plans[active].name}: {plans[active].price} per month
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Stable Wizard Pages

When to use:

- a short step flow benefits from physical paging

Composition notes:

- keep each page width stable
- use stable indexes that match the intended order

Trade-offs:

- tactile, clear progression
- mixed widths or unstable ordering degrade the experience

<!-- example: snap-scroller/checkout-wizard-form.tsx -->
```tsx
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
```
<!-- /example -->
