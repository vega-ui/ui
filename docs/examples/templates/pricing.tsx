import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
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
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Separator,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
  VisuallyHidden,
} from '@vega-ui/react';
import { Check, XIcon } from '@vega-ui/icons';
import './pricing.css';

type Cycle = 'monthly' | 'yearly';
type PlanId = 'free' | 'team' | 'business';
type ContactField = 'name' | 'email' | 'company' | 'message';

const FREE_SEATS = 3;
const MAX_SEATS = 500;

const plans: { id: PlanId, title: string, description: string, monthly: number, yearly: number, action: string, features: string[] }[] = [
  {
    id: 'free',
    title: 'Free',
    description: 'For individuals and small side projects.',
    monthly: 0,
    yearly: 0,
    action: 'Start for free',
    features: ['Up to 3 members', '3 projects', '5 GB storage', 'Community support'],
  },
  {
    id: 'team',
    title: 'Team',
    description: 'For growing teams that ship together.',
    monthly: 15,
    yearly: 12,
    action: 'Start 14-day trial',
    features: ['Unlimited members', 'Unlimited projects', '100 GB storage', 'Roles and guest access', 'Email support'],
  },
  {
    id: 'business',
    title: 'Business',
    description: 'For companies with security and compliance needs.',
    monthly: 30,
    yearly: 24,
    action: 'Start 14-day trial',
    features: ['Everything in Team', 'SAML single sign-on', 'Audit log', '1 TB storage', 'Priority support, 4 h response'],
  },
];

const comparison: { section: string, rows: { feature: string, values: [string, string, string] }[] }[] = [
  {
    section: 'Workspace',
    rows: [
      { feature: 'Members', values: ['Up to 3', 'Unlimited', 'Unlimited'] },
      { feature: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
      { feature: 'Storage', values: ['5 GB', '100 GB', '1 TB'] },
      { feature: 'Version history', values: ['7 days', '90 days', 'Unlimited'] },
    ],
  },
  {
    section: 'Collaboration',
    rows: [
      { feature: 'Comments and mentions', values: ['yes', 'yes', 'yes'] },
      { feature: 'Guest access', values: ['no', 'yes', 'yes'] },
      { feature: 'Roles and permissions', values: ['no', 'yes', 'yes'] },
    ],
  },
  {
    section: 'Security',
    rows: [
      { feature: 'Two-factor authentication', values: ['yes', 'yes', 'yes'] },
      { feature: 'SAML single sign-on', values: ['no', 'no', 'yes'] },
      { feature: 'Audit log', values: ['no', 'no', 'yes'] },
    ],
  },
  {
    section: 'Support',
    rows: [
      { feature: 'Help center and community', values: ['yes', 'yes', 'yes'] },
      { feature: 'Email support', values: ['no', 'yes', 'yes'] },
      { feature: 'Response time', values: ['no', '1 business day', '4 hours'] },
    ],
  },
];

const questions = [
  { value: 'seats', question: 'How are seats counted?', answer: 'A seat is any member who can sign in to the workspace. Guests who only view shared projects are free and don’t take a seat.' },
  { value: 'change', question: 'Can I switch plans later?', answer: 'Yes. Upgrades apply right away and are prorated. Downgrades take effect at the end of the current billing period.' },
  { value: 'trial', question: 'What happens when the trial ends?', answer: 'You choose a plan and add a card, or the workspace moves to Free. Nothing is deleted; projects over the Free limit become read-only.' },
  { value: 'invoice', question: 'Can we pay by invoice?', answer: 'Yearly Business plans can be paid by bank transfer against an invoice. Contact sales and we’ll set it up.' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const amount = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;
const secondary = { color: 'var(--label-secondary)' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const validate = (data: FormData) => {
  const errors: Partial<Record<ContactField, string>> = {};
  const email = String(data.get('email')).trim();

  if (String(data.get('name')).trim() === '') errors.name = 'Enter your name.';
  if (email === '') errors.email = 'Enter your work email.';
  if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Use the full address, like ada@company.com.';
  if (String(data.get('company')).trim() === '') errors.company = 'Enter your company name.';
  if (String(data.get('message')).trim().length < 10) errors.message = 'Tell us a little about your team, at least 10 characters.';

  return errors;
};

const FeatureValue = ({ value }: { value: string }) => {
  if (value === 'yes') {
    return (
      <>
        <Icon size='sm' aria-hidden='true' style={{ color: 'var(--color-primary-500)' }}><Check /></Icon>
        <VisuallyHidden>Included</VisuallyHidden>
      </>
    );
  }

  if (value === 'no') {
    return (
      <>
        <span aria-hidden='true' style={{ color: 'var(--label-tertiary)' }}>—</span>
        <VisuallyHidden>Not included</VisuallyHidden>
      </>
    );
  }

  return <Text size={2} style={amount}>{value}</Text>;
};

export default function Pricing() {
  const id = useId();
  const [cycle, setCycle] = useState<Cycle>('yearly');
  const [seats, setSeats] = useState(10);
  const [contactOpen, setContactOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [sent, setSent] = useState('');

  const price = (plan: (typeof plans)[number]) => (cycle === 'monthly' ? plan.monthly : plan.yearly);
  const describe = (name: ContactField) => (errors[name] ? `${id}-${name}-error` : undefined);

  const clearError = (name: ContactField) => {
    if (!errors[name]) return;
    setErrors({ ...errors, [name]: undefined });
  };

  const changeContactOpen = (open: boolean) => {
    setContactOpen(open);

    if (!open) return;

    setErrors({});
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = validate(data);
    const invalid = (['name', 'email', 'company', 'message'] as ContactField[]).find((name) => next[name]);

    setErrors(next);

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setSent(String(data.get('email')).trim());
    setContactOpen(false);
  };

  const getEstimate = (plan: (typeof plans)[number]) => {
    if (plan.id === 'free' && seats > FREE_SEATS) return { main: 'Not available', note: `Free covers up to ${FREE_SEATS} members.` };

    const perMonth = price(plan) * seats;

    if (cycle === 'monthly') return { main: `${currency.format(perMonth)} / mo`, note: `${seats} × ${currency.format(price(plan))}` };

    return { main: `${currency.format(perMonth * 12)} / yr`, note: `${seats} × ${currency.format(price(plan))} × 12 months` };
  };

  return (
    <div className='pricing' style={{ display: 'grid', gap: 'var(--spacing-24)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-10)', textAlign: 'center' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)', maxWidth: 560 }}>
          <Heading as='h1' size={8} fontWeight={700}>Plans that grow with your team</Heading>
          <Text size={4} style={secondary}>Start free, then pay per seat as you add people. Every paid plan comes with a 14-day trial.</Text>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
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
          <Badge id={`${id}-save`} size='sm' variant='success'>Save 20%</Badge>
        </div>
      </header>

      {sent !== '' && (
        <Alert variant='success'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>Thanks, we’ll be in touch</AlertTitle>
            <AlertContent style={{ overflowWrap: 'anywhere' }}>{`Our sales team will reply to ${sent} within one business day.`}</AlertContent>
          </AlertMain>
        </Alert>
      )}

      <section aria-label='Plans' className='pricingPlans'>
        {plans.map((plan) => {
          const popular = plan.id === 'team';

          return (
            <Card
              key={plan.id}
              aria-labelledby={`${id}-${plan.id}`}
              className='pricingPlan'
              data-popular={popular}
              style={{ alignItems: 'stretch', gap: 'var(--spacing-12)', minWidth: 0 }}
            >
              <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
                  <Heading id={`${id}-${plan.id}`} as='h2' size={5} fontWeight={600}>{plan.title}</Heading>
                  {popular && <Badge size='sm' variant='info'>Most popular</Badge>}
                </div>
                <Text size={2} style={secondary}>{plan.description}</Text>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-3)' }}>
                  <Text size={8} fontWeight={700} style={amount}>{currency.format(price(plan))}</Text>
                  <Text size={2} style={secondary}>per seat / mo</Text>
                </span>
                <Text size={2} style={{ ...secondary, fontVariantNumeric: 'tabular-nums' }}>
                  {plan.monthly === 0 ? 'Free forever' : cycle === 'yearly' ? `Billed yearly, ${currency.format(plan.yearly * 12)} per seat` : 'Billed monthly'}
                </Text>
              </div>
              <Button
                size='xs'
                fullWidth
                variant={popular ? undefined : 'secondary'}
                appearance={popular ? undefined : 'ghost'}
                aria-describedby={`${id}-${plan.id}`}
              >
                {plan.action}
              </Button>
              <Separator />
              <ul aria-label={`${plan.title} features`} style={{ display: 'grid', gap: 'var(--spacing-5)', margin: 0, padding: 0, listStyle: 'none' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
                    <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-1)', color: 'var(--color-primary-500)' }}><Check /></Icon>
                    <Text size={3}>{feature}</Text>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </section>

      <Card aria-labelledby={`${id}-calc`} style={{ alignItems: 'stretch', gap: 'var(--spacing-12)', minWidth: 0 }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id={`${id}-calc`} as='h2' size={5} fontWeight={600}>Estimate your cost</Heading>
          <Text size={2} style={secondary}>{`Prices ${cycle === 'yearly' ? 'billed yearly' : 'billed monthly'}, before tax.`}</Text>
        </div>
        <div className='pricingCalculator'>
          <div style={field}>
            <Label htmlFor={`${id}-seats`}>Seats</Label>
            <NumberField min={1} max={MAX_SEATS} value={seats} onChangeValue={(next) => setSeats(next ?? 1)} style={{ maxWidth: 180 }}>
              <NumberFieldDecrementButton aria-label='Remove a seat' />
              <NumberFieldInput id={`${id}-seats`} name='seats' aria-describedby={`${id}-seats-hint`} />
              <NumberFieldIncrementButton aria-label='Add a seat' />
            </NumberField>
            <HelperText id={`${id}-seats-hint`}>{`From 1 to ${MAX_SEATS} seats.`}</HelperText>
          </div>
          <dl aria-live='polite' className='pricingEstimates'>
            {plans.map((plan) => {
              const estimate = getEstimate(plan);

              return (
                <div key={plan.id} className='pricingEstimate'>
                  <dt><Text size={2} fontWeight={500} style={secondary}>{plan.title}</Text></dt>
                  <dd style={{ display: 'grid', gap: 'var(--spacing-1)', margin: 0 }}>
                    <Text size={5} fontWeight={700} style={amount}>{estimate.main}</Text>
                    <Text size={1} style={{ ...secondary, fontVariantNumeric: 'tabular-nums' }}>{estimate.note}</Text>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Card>

      <section aria-labelledby={`${id}-compare`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Heading id={`${id}-compare`} as='h2' size={6} fontWeight={700}>Compare plans</Heading>
        <div role='region' aria-labelledby={`${id}-compare`} tabIndex={0} className='pricingTableScroll'>
          <Table fullWidth edgePadded className='pricingTable'>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' dataAlign='start'><VisuallyHidden>Feature</VisuallyHidden></TableHeading>
                {plans.map((plan) => (
                  <TableHeading key={plan.id} scope='col' dataAlign='center'>{plan.title}</TableHeading>
                ))}
              </TableRow>
            </TableHead>
            {comparison.map((group) => (
              <TableBody key={group.section}>
                <TableRow className='pricingSection'>
                  <TableHeading scope='colgroup' colSpan={4} dataAlign='start'><span>{group.section}</span></TableHeading>
                </TableRow>
                {group.rows.map((row) => (
                  <TableRow key={row.feature}>
                    <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>{row.feature}</TableHeading>
                    {row.values.map((value, index) => (
                      <TableData key={plans[index].id} dataAlign='center'>
                        <FeatureValue value={value} />
                      </TableData>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </Table>
        </div>
      </section>

      <section aria-labelledby={`${id}-faq`} className='pricingFaq'>
        <Heading id={`${id}-faq`} as='h2' size={6} fontWeight={700}>Questions</Heading>
        <Accordion>
          {questions.map((item, index) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionHeader>
                <AccordionTrigger>
                  {item.question}
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Text size={3} style={secondary}>{item.answer}</Text>
              </AccordionContent>
              {index < questions.length - 1 && <Separator />}
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card aria-labelledby={`${id}-enterprise`} className='pricingEnterprise'>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '999 1 320px', minWidth: 0 }}>
          <Heading id={`${id}-enterprise`} as='h2' size={5} fontWeight={600}>Enterprise</Heading>
          <Text size={3} style={secondary}>{`More than ${MAX_SEATS} seats, a custom contract, data residency or an uptime SLA? Let’s talk.`}</Text>
        </div>
        <Dialog open={contactOpen} onChangeOpen={changeContactOpen}>
          <DialogTrigger asChild>
            <Button size='xs' style={{ flexShrink: 0 }}>Contact sales</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby={`${id}-contact-title`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={`${id}-contact-title`} as='h2' size={4} fontWeight={600}>Contact sales</Heading>
              <DialogClose asChild>
                <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </DialogClose>
            </div>
            <form noValidate onSubmit={submit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-10)' }}>
              <div style={field}>
                <Label htmlFor={`${id}-name`}>Name</Label>
                <TextField error={errors.name !== undefined}>
                  <TextFieldInput id={`${id}-name`} name='name' autoComplete='name' aria-invalid={errors.name !== undefined} aria-describedby={describe('name')} onChange={() => clearError('name')} />
                </TextField>
                {errors.name && <HelperText id={`${id}-name-error`} error>{errors.name}</HelperText>}
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-email`}>Work email</Label>
                <TextField error={errors.email !== undefined}>
                  <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' aria-invalid={errors.email !== undefined} aria-describedby={describe('email')} onChange={() => clearError('email')} />
                </TextField>
                {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-company`}>Company</Label>
                <TextField error={errors.company !== undefined}>
                  <TextFieldInput id={`${id}-company`} name='company' autoComplete='organization' aria-invalid={errors.company !== undefined} aria-describedby={describe('company')} onChange={() => clearError('company')} />
                </TextField>
                {errors.company && <HelperText id={`${id}-company-error`} error>{errors.company}</HelperText>}
              </div>
              <div style={field}>
                <Label htmlFor={`${id}-message`}>How can we help?</Label>
                <TextArea
                  id={`${id}-message`}
                  name='message'
                  rows={4}
                  fullWidth
                  placeholder='Team size, timeline and anything you need from us'
                  error={errors.message !== undefined}
                  aria-invalid={errors.message !== undefined}
                  aria-describedby={describe('message')}
                  onChange={() => clearError('message')}
                />
                {errors.message && <HelperText id={`${id}-message-error`} error>{errors.message}</HelperText>}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
                <DialogClose asChild>
                  <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
                </DialogClose>
                <Button size='xs' type='submit'>Send</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
