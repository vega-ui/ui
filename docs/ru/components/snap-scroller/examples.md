# SnapScroller: примеры

## Базовый

### Базовый: карусель возможностей

Одинаковые слайды во всю ширину с реалистичным содержимым. Скроллер получает `tabIndex={0}` и доступное имя, чтобы с клавиатуры его можно было сфокусировать и прокручивать стрелками; `aria-roledescription` сообщает скринридеру, что это карусель со слайдами.

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

## Контролируемый/с состоянием

### Контролируемый/с состоянием: PageControl, синхронизированный с привязкой

Зафиксированный индекс из `onScrollSnapChange` — единственный источник истины: он управляет `PageControl` и подписью, а клик по точке лишь просит скроллер прокрутиться через `scrollToElementByKey`. Состояние меняется после остановки прокрутки, поэтому точка и видимая страница не расходятся.

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

### Контролируемый/с состоянием: промежуточный и итоговый индекс

`onScrollSnapChanging` срабатывает, пока цель привязки ещё меняется, а `onScrollSnapChange` — только после остановки прокрутки. Быстро пролистайте несколько дней, чтобы увидеть, как расходятся две подписи: промежуточный индекс подходит для мгновенной визуальной реакции, итоговый — для загрузки данных или обновления URL.

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

## Форма/интеграция

### Форма/интеграция: мастер оформления заказа

Каждый шаг — `Fieldset` на своей странице. **Next** проверяет только текущий шаг через `reportValidity()` и лишь потом вызывает `next()`; неактивные страницы помечены `inert`, чтобы Tab не попадал в скрытые поля, а `overflowX: 'hidden'` не даёт жестом пролистать невалидный шаг — программная прокрутка при этом работает. Форма помечена `noValidate`, поэтому Enter переводит на следующий шаг, а не упирается в поля, которые браузер не может сфокусировать; итоговая отправка читает все шаги через `FormData`, а сброс возвращает на первую страницу.

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

## Раскладка/оверлей

### Раскладка/оверлей: галерея в диалоге

Содержимое диалога монтируется при каждом открытии, поэтому `defaultIndex` открывает галерею на той комнате, по которой кликнули. Счётчик и отключённые стрелки следуют за `onScrollSnapChange`, а кнопка закрытия стоит в углу диалога на логических отступах.

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

## Ошибка

### Ошибка: ошибка загрузки и повтор

Скроллер рендерится только после прихода данных: `defaultIndex` применяется один раз при монтировании, и пустой скроллер, заполненный позже, его проигнорирует. Первый запрос намеренно падает, чтобы показать сообщение об ошибке с `role='alert'` и путь повтора.

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

## Отключённый

### Отключённый: стрелки на первом и последнем элементе

Кнопки «назад» и «вперёд» отключаются на краях по зафиксированному индексу, чтобы было видно: дальше в эту сторону ничего нет. Отключённые кнопки выпадают из порядка табуляции, а сам скроллер остаётся фокусируемым и прокручивается с клавиатуры.

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

## Пограничный случай

### Пограничный случай: идентификаторы, сопоставленные с индексами

`index` должен быть последовательной позицией элемента: `prev()` и `next()` шагают на ±1, поэтому пропуски вроде `index={1041}` и следом `index={1043}` их ломают. Храните бизнес-идентификаторы в данных, сопоставляйте их с позициями через `findIndex` и передавайте позицию в `defaultIndex` и `scrollToElementByKey`.

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

### Пограничный случай: элементы разной ширины

Чипы шириной в свою подпись. Элементы у конца строки не могут доехать до начального края, поэтому в конце строки зафиксированным становится элемент, чья точка привязки ближе всего к максимальной прокрутке, — не обязательно последний. Если каждый элемент должен уметь становиться текущим, используйте страницы одинаковой ширины.

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

### Пограничный случай: раскладка справа налево

При `dir='rtl'` первый элемент стоит справа, а `next()` двигает влево. Иконки стрелок поменяны местами, чтобы указывать туда, куда движется содержимое, а подписи кнопок — на языке страницы.

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
