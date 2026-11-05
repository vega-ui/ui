# SnapScroller Examples

## Basic

### Basic: feature carousel

Uniform full-width slides with realistic content. The scroller gets `tabIndex={0}` and an accessible name so keyboard users can focus it and scroll with the arrow keys; `aria-roledescription` tells screen readers it is a carousel of slides.

<!-- example: snap-scroller/simple-carousel-shell.tsx -->
```tsx
import { Heading, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const features = [
  { title: 'Shared inbox', description: 'Route every customer email to one queue and assign it in a click.' },
  { title: 'SLA timers', description: 'See how long each conversation has waited before it breaches the 4-hour target.' },
  { title: 'Saved replies', description: 'Answer refund and shipping questions with approved templates.' },
  { title: 'Reports', description: 'Track first response time and resolution rate for every teammate.' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'start',
  gap: 'var(--spacing-4)',
  width: '100%',
  minHeight: 140,
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function SimpleCarouselShell() {
  return (
    <SnapScroller
      role='region'
      aria-roledescription='carousel'
      aria-label='Helpdesk features'
      tabIndex={0}
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      {features.map((feature, index) => (
        <SnapScrollerContent
          key={feature.title}
          index={index}
          role='group'
          aria-roledescription='slide'
          aria-label={`${index + 1} of ${features.length}`}
          style={slideStyle}
        >
          <Heading as='h3' size={5}>{feature.title}</Heading>
          <Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            {feature.description}
          </Text>
        </SnapScrollerContent>
      ))}
    </SnapScroller>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: page control synced to the snap

The committed index from `onScrollSnapChange` is the single source of truth: it drives the `PageControl` and the readout, and a click on a dot only asks the scroller to move with `scrollToElementByKey`. The state changes once the scroll settles, so the dot and the visible page never disagree.

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

### Controlled/Stateful: pending versus settled index

`onScrollSnapChanging` fires while the snap target is still changing, `onScrollSnapChange` only after the scroll settles. Swipe quickly across several days to see the two readouts diverge: use the pending index for instant visual feedback and the settled one for loading data or updating the URL.

<!-- example: snap-scroller/highlight-while-scrolling.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useState } from 'react';
import './examples.css';

const days = [
  { date: 'Mon, Mar 3', slots: 4 },
  { date: 'Tue, Mar 4', slots: 2 },
  { date: 'Wed, Mar 5', slots: 6 },
  { date: 'Thu, Mar 6', slots: 1 },
  { date: 'Fri, Mar 7', slots: 5 },
  { date: 'Sat, Mar 8', slots: 3 },
  { date: 'Sun, Mar 9', slots: 0 },
];

export default function HighlightWhileScrolling() {
  const [pending, setPending] = useState(0);
  const [committed, setCommitted] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <SnapScroller
        tabIndex={0}
        aria-label='Delivery days'
        onScrollSnapChanging={(_, index) => setPending(index)}
        onScrollSnapChange={(_, index) => setCommitted(index)}
        style={{ gap: 'var(--spacing-6)', marginBlockEnd: 'var(--spacing-4)' }}
      >
        {days.map((day, index) => (
          <SnapScrollerContent
            key={day.date}
            index={index}
            className='snapScrollerDay'
            style={{
              display: 'grid',
              gap: 'var(--spacing-2)',
              width: '85%',
              padding: 'var(--spacing-10)',
              boxSizing: 'border-box',
              borderRadius: 'var(--radius-4)',
              background: 'var(--fills-secondary)',
              opacity: pending === index ? 1 : 0.5,
            }}
          >
            <Text size={3} fontWeight={500}>{day.date}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{day.slots} delivery slots left</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>While scrolling: {days[pending].date}</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Settled on: {days[committed].date}</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: checkout wizard

Each step is a `Fieldset` on its own page. **Next** validates only the current step with `reportValidity()` before calling `next()`, inactive pages are `inert` so Tab cannot reach hidden fields, and `overflowX: 'hidden'` stops users from swiping past an invalid step while programmatic scrolling keeps working. The form is `noValidate`, so Enter advances the wizard instead of failing on fields the browser cannot focus; the final submit reads every step with `FormData`, and reset returns to the first page.

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

## Layout/Overlay

### Layout/Overlay: gallery in a dialog

The dialog content mounts on every open, so `defaultIndex` opens the gallery on the room the user clicked. The counter and the disabled arrows follow `onScrollSnapChange`, and the close button sits in the dialog corner with logical insets.

<!-- example: snap-scroller/gallery-in-dialog.tsx -->
```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight, XIcon } from '@vega-ui/icons';
import { useRef, useState, type CSSProperties } from 'react';

const rooms = [
  { name: 'Living room', area: '24 m²' },
  { name: 'Kitchen', area: '11 m²' },
  { name: 'Bedroom', area: '16 m²' },
  { name: 'Bathroom', area: '6 m²' },
  { name: 'Balcony', area: '5 m²' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'end',
  gap: 'var(--spacing-2)',
  width: '100%',
  height: 200,
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function GalleryInDialog() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openAt = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', width: '100%' }}>
        {rooms.map((room, index) => (
          <Button key={room.name} size='sm' variant='secondary' appearance='ghost' onClick={() => openAt(index)}>
            {room.name}
          </Button>
        ))}
      </div>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogContent aria-labelledby='apartment-gallery-title' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='apartment-gallery-title'>Apartment 4B</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <SnapScroller
            apiRef={api}
            defaultIndex={current}
            tabIndex={0}
            aria-label='Rooms'
            onScrollSnapChange={(_, index) => setCurrent(index)}
            style={{ gap: 'var(--spacing-6)' }}
          >
            {rooms.map((room, index) => (
              <SnapScrollerContent key={room.name} index={index} style={slideStyle}>
                <Text size={3} fontWeight={500}>{room.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{room.area}</Text>
              </SnapScrollerContent>
            ))}
          </SnapScroller>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              aria-label='Previous room'
              variant='secondary'
              appearance='ghost'
              disabled={current === 0}
              onClick={() => api.current?.prev()}
            >
              <Icon><ChevronLeft /></Icon>
            </IconButton>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{current + 1} / {rooms.length}</Text>
            <IconButton
              aria-label='Next room'
              variant='secondary'
              appearance='ghost'
              disabled={current === rooms.length - 1}
              onClick={() => api.current?.next()}
            >
              <Icon><ChevronRight /></Icon>
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```
<!-- /example -->

## Error

### Error: failed load with retry

The scroller is rendered only after the data arrives: `defaultIndex` is applied once on mount, so an empty scroller filled later would ignore it. The first request fails on purpose to show the error message with `role='alert'` and the retry path.

<!-- example: snap-scroller/failed-load-retry.tsx -->
```tsx
import { Button, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const reviews = [
  { author: 'Maya R.', text: 'Setup took ten minutes and the import kept all our tags.' },
  { author: 'Daniel K.', text: 'The SLA timers alone saved us from two missed escalations.' },
  { author: 'Priya S.', text: 'Saved replies cut our average response time almost in half.' },
];

type Status = 'idle' | 'loading' | 'error' | 'ready';

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function FailedLoadRetry() {
  const [status, setStatus] = useState<Status>('idle');
  const attempts = useRef(0);

  const load = () => {
    attempts.current += 1;
    const shouldFail = attempts.current === 1;
    setStatus('loading');

    window.setTimeout(() => {
      if (shouldFail) {
        setStatus('error');
        return;
      }

      setStatus('ready');
    }, 800);
  };

  if (status === 'ready') {
    return (
      <SnapScroller
        tabIndex={0}
        aria-label='Customer reviews'
        defaultIndex={reviews.length - 1}
        style={{ width: '100%', gap: 'var(--spacing-6)' }}
      >
        {reviews.map((review, index) => (
          <SnapScrollerContent key={review.author} index={index} style={slideStyle}>
            <Text size={2}>{review.text}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{review.author}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      {status === 'error' && (
        <Text size={2} role='alert' style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          Reviews could not be loaded. Check your connection and try again.
        </Text>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button size='sm' disabled={status === 'loading'} onClick={load}>
          {status === 'idle' ? 'Load reviews' : 'Retry'}
        </Button>
        {status === 'loading' && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Loading reviews…</Text>}
      </div>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: arrows at the first and last item

Previous and next buttons are disabled at the edges based on the committed index, so users see there is nothing more in that direction. Disabled buttons leave the tab order, while the scroller itself stays focusable and scrollable from the keyboard.

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

## Edge

### Edge: ids mapped to indexes

`index` must be the consecutive position of the item: `prev()` and `next()` step by ±1, so gaps such as `index={1041}` followed by `index={1043}` break them. Keep business ids in your data, map them to positions with `findIndex`, and pass the position to `defaultIndex` and `scrollToElementByKey`.

<!-- example: snap-scroller/ids-mapped-to-indexes.tsx -->
```tsx
import {
  Button,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const invoices = [
  { id: 'INV-1038', customer: 'Northwind Traders', total: '$1,240.00' },
  { id: 'INV-1041', customer: 'Blue Yonder Airlines', total: '$860.50' },
  { id: 'INV-1043', customer: 'Fabrikam', total: '$3,115.00' },
  { id: 'INV-1050', customer: 'Tailspin Toys', total: '$412.75' },
];

const linkedInvoiceId = 'INV-1043';

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function IdsMappedToIndexes() {
  const api = useRef<SnapScrollerApiRef>(null);
  const initialIndex = invoices.findIndex((invoice) => invoice.id === linkedInvoiceId);
  const [current, setCurrent] = useState(initialIndex);

  const showInvoice = (id: string) => {
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) return;

    api.current?.scrollToElementByKey(index);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-4)' }}>
        {invoices.map((invoice) => (
          <Button
            key={invoice.id}
            size='sm'
            variant={invoices[current].id === invoice.id ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={invoices[current].id === invoice.id}
            onClick={() => showInvoice(invoice.id)}
          >
            {invoice.id}
          </Button>
        ))}
      </div>
      <SnapScroller
        apiRef={api}
        defaultIndex={initialIndex}
        tabIndex={0}
        aria-label='Invoices'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        {invoices.map((invoice, index) => (
          <SnapScrollerContent key={invoice.id} index={index} data-invoice-id={invoice.id} style={slideStyle}>
            <Text size={3} fontWeight={500}>{invoice.id}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{invoice.customer}</Text>
            <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.total}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          Previous
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Edge: items of different widths

Chips are as wide as their labels. Items near the end cannot scroll to the start edge, so at the end of the row the committed item is the one whose snap point is closest to the maximum scroll position, not necessarily the last one. Use uniform pages when every item must be able to become the current one.

<!-- example: snap-scroller/variable-width-items.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useState } from 'react';

const collections = [
  'New in',
  'Outerwear',
  'Knitwear and cardigans',
  'Shoes',
  'Bags',
  'Accessories',
  'Sale',
];

export default function VariableWidthItems() {
  const [committed, setCommitted] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <SnapScroller
        tabIndex={0}
        aria-label='Collections'
        onScrollSnapChange={(_, index) => setCommitted(index)}
        style={{ gap: 'var(--spacing-4)' }}
      >
        {collections.map((name, index) => (
          <SnapScrollerContent
            key={name}
            index={index}
            style={{
              padding: 'var(--spacing-4) var(--spacing-8)',
              borderRadius: 'var(--radius-8)',
              background: committed === index ? 'var(--fills-primary)' : 'var(--fills-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            <Text size={2}>{name}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Committed item: {collections[committed]}</Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: right-to-left layout

With `dir='rtl'` the first item is on the right and `next()` moves to the left. The arrow icons are swapped so they point where the content moves, and the button labels are in the page language.

<!-- example: snap-scroller/rtl-navigation.tsx -->
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

const headlines = [
  'افتتاح فرع جديد في دبي',
  'تحديث تطبيق الهاتف متاح الآن',
  'ساعات عمل خاصة خلال العيد',
  'برنامج الولاء يضيف مزايا جديدة',
];

const slideStyle: CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function RtlNavigation() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <SnapScroller
        apiRef={api}
        tabIndex={0}
        aria-label='الأخبار'
        onScrollSnapChange={(_, index) => setCurrent(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        {headlines.map((headline, index) => (
          <SnapScrollerContent key={headline} index={index} style={slideStyle}>
            <Text size={3}>{headline}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton
          aria-label='السابق'
          variant='secondary'
          appearance='ghost'
          disabled={current === 0}
          onClick={() => api.current?.prev()}
        >
          <Icon><ChevronRight /></Icon>
        </IconButton>
        <Text size={2} dir='ltr' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{current + 1} / {headlines.length}</Text>
        <IconButton
          aria-label='التالي'
          variant='secondary'
          appearance='ghost'
          disabled={current === headlines.length - 1}
          onClick={() => api.current?.next()}
        >
          <Icon><ChevronLeft /></Icon>
        </IconButton>
      </div>
    </div>
  );
}
```
<!-- /example -->
