import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Badge,
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
  Link,
  Meter,
  MeterStack,
  MeterStackSegment,
  MeterTrack,
  Radio,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { CreditCard, XIcon } from '@vega-ui/icons';

type PlanId = 'starter' | 'team' | 'business';
type Cycle = 'monthly' | 'yearly';
type CardField = 'name' | 'number' | 'expiry' | 'cvc';

const SEATS = 8;
const SEAT_LIMIT = 10;
const YEARLY_DISCOUNT = 0.2;
const RENEWAL = 'Dec 1, 2026';

const plans: { id: PlanId, title: string, description: string, price: number }[] = [
  { id: 'starter', title: 'Starter', description: 'Up to 5 projects and 20 GB storage.', price: 8 },
  { id: 'team', title: 'Team', description: 'Unlimited projects, 100 GB and roles.', price: 16 },
  { id: 'business', title: 'Business', description: 'SSO, audit log and 1 TB storage.', price: 28 },
];

const storage = [
  { id: 'files', label: 'Files', gb: 38, color: 'var(--color-blue-500)' },
  { id: 'backups', label: 'Backups', gb: 21, color: 'var(--color-purple-500)' },
  { id: 'logs', label: 'Logs', gb: 9, color: 'var(--color-gray-500)' },
];

const STORAGE_LIMIT = 100;
const API_CALLS = 182_400;
const API_LIMIT = 250_000;

const invoices = [
  { id: 'INV-2026-011', date: 'Nov 1, 2026', description: 'Team · 8 seats', amount: 128, status: 'paid' },
  { id: 'INV-2026-010', date: 'Oct 1, 2026', description: 'Team · 8 seats', amount: 128, status: 'paid' },
  { id: 'INV-2026-009', date: 'Sep 1, 2026', description: 'Team · 7 seats', amount: 112, status: 'refunded' },
  { id: 'INV-2026-008', date: 'Aug 1, 2026', description: 'Team · 7 seats', amount: 112, status: 'paid' },
  { id: 'INV-2026-007', date: 'Jul 1, 2026', description: 'Team · 6 seats', amount: 96, status: 'paid' },
];

const statuses: Record<string, { label: string, variant: string }> = {
  paid: { label: 'Paid', variant: 'success' },
  refunded: { label: 'Refunded', variant: 'warning' },
};

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const count = new Intl.NumberFormat('en-US');

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const amount = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;
const nowrap = { whiteSpace: 'nowrap' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const dialogHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const actions = { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' } as const;
const meterHeader = { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' } as const;
const card = { alignItems: 'stretch', gap: 'var(--spacing-10)', minWidth: 0 } as const;

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const getSeatPrice = (plan: PlanId, cycle: Cycle) => {
  const price = plans.find((item) => item.id === plan)?.price ?? 0;

  if (cycle === 'monthly') return price;

  return price * (1 - YEARLY_DISCOUNT);
};

const getTotal = (plan: PlanId, cycle: Cycle) => {
  const perMonth = getSeatPrice(plan, cycle) * SEATS;

  if (cycle === 'monthly') return perMonth;

  return perMonth * 12;
};

const formatCardNumber = (value: string) => value.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const passesLuhn = (digits: string) => {
  const sum = [...digits].reverse().reduce((total, digit, index) => {
    const value = Number(digit);

    if (index % 2 === 0) return total + value;
    if (value * 2 > 9) return total + value * 2 - 9;

    return total + value * 2;
  }, 0);

  return sum % 10 === 0;
};

const getBrand = (digits: string) => {
  if (digits.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';

  return 'Card';
};

const validateCard = (card: Record<CardField, string>) => {
  const errors: Partial<Record<CardField, string>> = {};
  const digits = card.number.replace(/\D/g, '');
  const [month, year] = card.expiry.split('/').map(Number);

  if (card.name.trim() === '') errors.name = 'Enter the name shown on the card.';
  if (digits === '') errors.number = 'Enter the card number.';
  if (digits !== '' && (digits.length < 13 || !passesLuhn(digits))) errors.number = 'This card number isn’t valid. Check the digits.';
  if (card.expiry === '') errors.expiry = 'Enter the expiry date.';
  if (card.expiry !== '' && (!year || month < 1 || month > 12)) errors.expiry = 'Use MM/YY, like 08/29.';
  if (!errors.expiry && card.expiry !== '' && (year < 26 || (year === 26 && month < 11))) errors.expiry = 'This card has expired.';
  if (!/^\d{3,4}$/.test(card.cvc)) errors.cvc = 'Enter the 3 or 4 digits on the back.';

  return errors;
};

const emptyCard: Record<CardField, string> = { name: '', number: '', expiry: '', cvc: '' };

export default function Billing() {
  const id = useId();
  const [current, setCurrent] = useState<{ plan: PlanId, cycle: Cycle }>({ plan: 'team', cycle: 'monthly' });
  const [plan, setPlan] = useState<PlanId>('team');
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const [planNotice, setPlanNotice] = useState('');
  const [payment, setPayment] = useState({ brand: 'Visa', last4: '4242', expiry: '08/28' });
  const [cardOpen, setCardOpen] = useState(false);
  const [cardForm, setCardForm] = useState(emptyCard);
  const [cardErrors, setCardErrors] = useState<Partial<Record<CardField, string>>>({});
  const [canceled, setCanceled] = useState(false);

  const currentPlan = plans.find((item) => item.id === current.plan) ?? plans[0];
  const unchanged = plan === current.plan && cycle === current.cycle;
  const storageUsed = storage.reduce((sum, item) => sum + item.gb, 0);
  const cycleLabel = cycle === 'monthly' ? 'billed monthly' : 'billed yearly';

  const getSummary = () => {
    if (canceled) return 'Resume your subscription to change plans.';
    if (!unchanged) return `${currency.format(getTotal(plan, cycle))} ${cycleLabel} for ${SEATS} seats.`;
    if (planNotice !== '') return planNotice;

    return `${SEATS} seats on ${currentPlan.title}, ${current.cycle === 'monthly' ? 'billed monthly' : 'billed yearly'}.`;
  };

  const summary = getSummary();

  const describe = (name: CardField) => (cardErrors[name] ? `${id}-${name}-error` : undefined);

  const changeCard = (name: CardField, value: string) => {
    setCardForm((form) => ({ ...form, [name]: value }));
    setCardErrors((errors) => ({ ...errors, [name]: undefined }));
  };

  const switchPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (unchanged) return;

    const next = plans.find((item) => item.id === plan) ?? plans[0];

    setCurrent({ plan, cycle });
    setPlanNotice(`You’re on ${next.title}, ${cycleLabel}. The difference is prorated on your next invoice.`);
  };

  const changeCardOpen = (open: boolean) => {
    setCardOpen(open);

    if (!open) return;

    setCardForm(emptyCard);
    setCardErrors({});
  };

  const saveCard = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = validateCard(cardForm);
    const invalid = (['name', 'number', 'expiry', 'cvc'] as CardField[]).find((name) => next[name]);

    setCardErrors(next);

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    const digits = cardForm.number.replace(/\D/g, '');
    setPayment({ brand: getBrand(digits), last4: digits.slice(-4), expiry: cardForm.expiry });
    setCardOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h1' size={7} fontWeight={700}>Billing</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Your plan, usage, payment method and invoices for Northwind.</Text>
      </header>

      {canceled && (
        <Alert variant='warning'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>Subscription canceled</AlertTitle>
            <AlertContent>{`${currentPlan.title} features stay available until ${RENEWAL}. After that, the workspace moves to the Free plan.`}</AlertContent>
          </AlertMain>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setCanceled(false)} style={{ alignSelf: 'center', flexShrink: 0 }}>Resume</Button>
        </Alert>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '999 1 400px', minWidth: 0 }}>
          <Card style={card} aria-labelledby={`${id}-current`}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-4) var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>Current plan</Text>
                <Heading id={`${id}-current`} as='h2' size={5} fontWeight={600}>{`${currentPlan.title} plan`}</Heading>
              </div>
              <Badge size='sm' variant={canceled ? 'warning' : 'success'}>{canceled ? `Ends ${RENEWAL}` : 'Active'}</Badge>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 'var(--spacing-2) var(--spacing-6)' }}>
              <Text size={6} fontWeight={700} style={amount}>{currency.format(getTotal(current.plan, current.cycle))}</Text>
              <Text size={3} style={{ color: 'var(--label-secondary)' }}>
                {`per ${current.cycle === 'monthly' ? 'month' : 'year'} · ${SEATS} seats × ${currency.format(getSeatPrice(current.plan, current.cycle))}`}
              </Text>
            </div>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>
              {canceled ? `No further charges. Access ends on ${RENEWAL}.` : `Renews on ${RENEWAL}.`}
            </Text>
          </Card>

          <Card asChild style={card}>
            <form noValidate aria-labelledby={`${id}-plans`} onSubmit={switchPlan}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6) var(--spacing-8)' }}>
                <Heading id={`${id}-plans`} as='h2' size={4} fontWeight={600}>Change plan</Heading>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  <SegmentedControl
                    size='sm'
                    name={`${id}-cycle`}
                    role='radiogroup'
                    aria-label='Billing cycle'
                    value={cycle}
                    onChange={(event) => setCycle(event.target.value as Cycle)}
                  >
                    <SegmentedControlItem value='monthly'>
                      <SegmentedControlItemInput />
                      Monthly
                    </SegmentedControlItem>
                    <SegmentedControlItem value='yearly'>
                      <SegmentedControlItemInput aria-describedby={`${id}-save`} />
                      Yearly
                    </SegmentedControlItem>
                    <SegmentedControlIndicator />
                  </SegmentedControl>
                  <Badge id={`${id}-save`} size='sm' variant='info'>Save 20%</Badge>
                </div>
              </div>

              <div role='radiogroup' aria-labelledby={`${id}-plans`} style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
                {plans.map((option) => (
                  <label
                    key={option.id}
                    htmlFor={`${id}-${option.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-6)',
                      padding: 'var(--spacing-7) var(--spacing-8)',
                      border: '1px solid',
                      borderColor: plan === option.id ? 'var(--color-primary-500)' : 'var(--separator-opaque)',
                      borderRadius: 'var(--radius-4)',
                      background: 'var(--surface-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    <Radio
                      id={`${id}-${option.id}`}
                      name='plan'
                      value={option.id}
                      checked={plan === option.id}
                      aria-describedby={`${id}-${option.id}-description`}
                      onChange={() => setPlan(option.id)}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-2) var(--spacing-4)' }}>
                        <Text size={3} fontWeight={600}>{option.title}</Text>
                        {option.id === current.plan && <Badge size='xs' variant='info' appearance='outline'>Current</Badge>}
                      </span>
                      <Text id={`${id}-${option.id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>{option.description}</Text>
                    </span>
                    <span style={{ display: 'grid', justifyItems: 'end', flexShrink: 0 }}>
                      <Text size={4} fontWeight={700} style={amount}>{currency.format(getSeatPrice(option.id, cycle))}</Text>
                      <Text size={1} style={{ ...nowrap, color: 'var(--label-secondary)' }}>per seat / mo</Text>
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-4) var(--spacing-8)' }}>
                <Text size={2} role='status' style={{ flex: '1 1 240px', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                  {summary}
                </Text>
                <Button size='xs' type='submit' disabled={unchanged || canceled}>Switch plan</Button>
              </div>
            </form>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '1 1 320px', minWidth: 0 }}>
          <Card style={card} aria-labelledby={`${id}-usage`}>
            <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Heading id={`${id}-usage`} as='h2' size={4} fontWeight={600}>Usage</Heading>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`Resets on ${RENEWAL}.`}</Text>
            </div>
            <div style={field}>
              <div style={meterHeader}>
                <Text id={`${id}-api`} size={2} fontWeight={500}>API calls</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`${count.format(API_CALLS)} of ${count.format(API_LIMIT)}`}</Text>
              </div>
              <Meter value={API_CALLS} max={API_LIMIT} high={API_LIMIT * 0.9} valueText={`${count.format(API_CALLS)} of ${count.format(API_LIMIT)} calls`} aria-labelledby={`${id}-api`} fullWidth>
                <MeterTrack />
              </Meter>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-5)' }}>
              <div style={field}>
                <div style={meterHeader}>
                  <Text id={`${id}-storage`} size={2} fontWeight={500}>Storage</Text>
                  <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`${storageUsed} of ${STORAGE_LIMIT} GB`}</Text>
                </div>
                <MeterStack value={storageUsed} max={STORAGE_LIMIT} role='group' aria-labelledby={`${id}-storage`} fullWidth>
                  {storage.map((item) => (
                    <MeterStackSegment
                      key={item.id}
                      value={item.gb}
                      aria-label={item.label}
                      aria-valuetext={`${item.gb} GB`}
                      style={{ '--meter-stack-segment-color': item.color } as CSSProperties}
                    />
                  ))}
                </MeterStack>
              </div>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
                {storage.map((item) => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                    <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`${item.label} ${item.gb} GB`}</Text>
                  </li>
                ))}
              </ul>
            </div>
            <div style={field}>
              <div style={meterHeader}>
                <Text id={`${id}-seats`} size={2} fontWeight={500}>Seats</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`${SEATS} of ${SEAT_LIMIT}`}</Text>
              </div>
              <Meter value={SEATS} max={SEAT_LIMIT} valueText={`${SEATS} of ${SEAT_LIMIT} seats`} aria-labelledby={`${id}-seats`} fullWidth>
                <MeterTrack />
              </Meter>
            </div>
          </Card>

          <Card style={{ ...card, gap: 'var(--spacing-8)' }} aria-labelledby={`${id}-payment`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={`${id}-payment`} as='h2' size={4} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>Payment method</Heading>
              <Dialog open={cardOpen} onChangeOpen={changeCardOpen}>
                <DialogTrigger asChild>
                  <Button size='xs' variant='secondary' appearance='ghost' aria-label='Update payment method'>Update</Button>
                </DialogTrigger>
                <DialogContent aria-labelledby={`${id}-card-title`}>
                  <div style={dialogHeader}>
                    <Heading id={`${id}-card-title`} as='h2' size={4} fontWeight={600}>Update payment method</Heading>
                    <DialogClose asChild>
                      <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                      </IconButton>
                    </DialogClose>
                  </div>
                  <form noValidate onSubmit={saveCard} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-10)' }}>
                    <div style={field}>
                      <Label htmlFor={`${id}-name`}>Name on card</Label>
                      <TextField error={cardErrors.name !== undefined}>
                        <TextFieldInput
                          id={`${id}-name`}
                          name='name'
                          autoComplete='cc-name'
                          value={cardForm.name}
                          aria-invalid={cardErrors.name !== undefined}
                          aria-describedby={describe('name')}
                          onChange={(event) => changeCard('name', event.currentTarget.value)}
                        />
                      </TextField>
                      {cardErrors.name && <HelperText id={`${id}-name-error`} error>{cardErrors.name}</HelperText>}
                    </div>
                    <div style={field}>
                      <Label htmlFor={`${id}-number`}>Card number</Label>
                      <TextField error={cardErrors.number !== undefined}>
                        <TextFieldInput
                          id={`${id}-number`}
                          name='number'
                          inputMode='numeric'
                          autoComplete='cc-number'
                          placeholder='1234 1234 1234 1234'
                          value={cardForm.number}
                          aria-invalid={cardErrors.number !== undefined}
                          aria-describedby={describe('number')}
                          onChange={(event) => changeCard('number', formatCardNumber(event.currentTarget.value))}
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        />
                      </TextField>
                      {cardErrors.number && <HelperText id={`${id}-number-error`} error>{cardErrors.number}</HelperText>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: 'var(--spacing-8)' }}>
                      <div style={field}>
                        <Label htmlFor={`${id}-expiry`}>Expiry</Label>
                        <TextField error={cardErrors.expiry !== undefined}>
                          <TextFieldInput
                            id={`${id}-expiry`}
                            name='expiry'
                            inputMode='numeric'
                            autoComplete='cc-exp'
                            placeholder='MM/YY'
                            value={cardForm.expiry}
                            aria-invalid={cardErrors.expiry !== undefined}
                            aria-describedby={describe('expiry')}
                            onChange={(event) => changeCard('expiry', formatExpiry(event.currentTarget.value))}
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                          />
                        </TextField>
                        {cardErrors.expiry && <HelperText id={`${id}-expiry-error`} error>{cardErrors.expiry}</HelperText>}
                      </div>
                      <div style={field}>
                        <Label htmlFor={`${id}-cvc`}>CVC</Label>
                        <TextField error={cardErrors.cvc !== undefined}>
                          <TextFieldInput
                            id={`${id}-cvc`}
                            name='cvc'
                            inputMode='numeric'
                            autoComplete='cc-csc'
                            placeholder='123'
                            value={cardForm.cvc}
                            aria-invalid={cardErrors.cvc !== undefined}
                            aria-describedby={describe('cvc')}
                            onChange={(event) => changeCard('cvc', event.currentTarget.value.replace(/\D/g, '').slice(0, 4))}
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                          />
                        </TextField>
                        {cardErrors.cvc && <HelperText id={`${id}-cvc-error`} error>{cardErrors.cvc}</HelperText>}
                      </div>
                    </div>
                    <div style={{ ...actions, marginBlockStart: 'var(--spacing-4)' }}>
                      <DialogClose asChild>
                        <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
                      </DialogClose>
                      <Button size='xs' type='submit'>Save card</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
              <span
                aria-hidden='true'
                style={{ display: 'grid', placeItems: 'center', flexShrink: 0, width: 44, height: 32, borderRadius: 'var(--radius-2)', background: 'var(--fills-tertiary)', color: 'var(--label-secondary)' }}
              >
                <Icon size='sm'><CreditCard /></Icon>
              </span>
              <span style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{`${payment.brand} ending in ${payment.last4}`}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`Expires ${payment.expiry}`}</Text>
              </span>
            </div>
          </Card>
        </div>
      </div>

      <section aria-labelledby={`${id}-invoices`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Heading id={`${id}-invoices`} as='h2' size={4} fontWeight={600}>Invoices</Heading>
        <div
          role='region'
          aria-labelledby={`${id}-invoices`}
          tabIndex={0}
          style={{ minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
        >
          <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' dataAlign='start'>Date</TableHeading>
                <TableHeading scope='col' dataAlign='start'>Invoice</TableHeading>
                <TableHeading scope='col' dataAlign='start'>Status</TableHeading>
                <TableHeading scope='col' dataAlign='end'>Amount</TableHeading>
                <TableHeading scope='col' dataAlign='end'>File</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableData dataAlign='start' style={{ ...nowrap, fontVariantNumeric: 'tabular-nums' }}>{invoice.date}</TableData>
                  <TableData dataAlign='start'>
                    <span style={{ display: 'grid' }}>
                      <Text size={3} fontWeight={500} style={{ ...nowrap, fontVariantNumeric: 'tabular-nums' }}>{invoice.id}</Text>
                      <Text size={2} style={{ ...nowrap, color: 'var(--label-secondary)' }}>{invoice.description}</Text>
                    </span>
                  </TableData>
                  <TableData dataAlign='start'>
                    <Badge size='sm' variant={statuses[invoice.status].variant}>{statuses[invoice.status].label}</Badge>
                  </TableData>
                  <TableData dataAlign='end' style={amount}>{currency.format(invoice.amount)}</TableData>
                  <TableData dataAlign='end'>
                    <Link
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(`Northwind\n${invoice.id}\n${invoice.date}\n${invoice.description}\n${currency.format(invoice.amount)}\n`)}`}
                      download={`${invoice.id}.txt`}
                      aria-label={`Download ${invoice.id}`}
                      style={nowrap}
                    >
                      Download
                    </Link>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Card style={{ ...card, gap: 'var(--spacing-8)', '--card-border-color': 'color-mix(in oklch, var(--color-error) 45%, transparent)' } as CSSProperties} aria-labelledby={`${id}-cancel`}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id={`${id}-cancel`} as='h2' size={4} fontWeight={600}>Cancel subscription</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>
            {`You keep ${currentPlan.title} features until ${RENEWAL}. Projects and files stay, but seats above 3 are deactivated.`}
          </Text>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='xs' disabled={canceled} style={canceled ? { alignSelf: 'flex-start' } : { ...destructive, alignSelf: 'flex-start' }}>Cancel subscription</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={`${id}-cancel-title`}>
            <div style={dialogHeader}>
              <Heading id={`${id}-cancel-title`} as='h2' size={4} fontWeight={600}>Cancel your subscription?</Heading>
              <DialogClose asChild>
                <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </DialogClose>
            </div>
            <Alert variant='warning' style={{ marginBlockStart: 'var(--spacing-8)' }}>
              <AlertIcon />
              <AlertMain>
                <AlertTitle>{`Access ends on ${RENEWAL}`}</AlertTitle>
                <AlertContent>{`After that, Northwind moves to the Free plan: 3 seats and 5 GB of storage. ${SEATS - 3} members lose access.`}</AlertContent>
              </AlertMain>
            </Alert>
            <form method='dialog' onSubmit={() => setCanceled(true)} style={{ ...actions, marginBlockStart: 'var(--spacing-12)' }}>
              <DialogClose asChild>
                <Button size='xs' type='button' variant='secondary' appearance='ghost'>Keep subscription</Button>
              </DialogClose>
              <Button size='xs' type='submit' style={destructive}>Cancel subscription</Button>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
