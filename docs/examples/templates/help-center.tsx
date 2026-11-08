import { useId, useRef, useState, type FormEvent } from 'react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Heading,
  HelperText,
  Icon,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Separator,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { CreditCard, KeyRound, Plug, Search } from '@vega-ui/icons';
import './help-center.css';

const MESSAGE_LIMIT = 1000;

const categories = [
  {
    value: 'billing',
    title: 'Billing and plans',
    icon: <CreditCard />,
    articles: [
      { value: 'invoice', question: 'Where can I download my invoices?', answer: 'Open Settings → Billing → Invoices. Every invoice is available as a PDF for seven years, and owners can add a VAT number that appears on future invoices.' },
      { value: 'downgrade', question: 'What happens when I downgrade my plan?', answer: 'The change applies at the end of the billing period. Projects over the new limit become read-only until you archive them or upgrade again.' },
      { value: 'refund', question: 'Can I get a refund?', answer: 'Annual plans can be refunded within 14 days of purchase. Monthly plans are not refunded, but you can cancel any time before the next renewal.' },
    ],
  },
  {
    value: 'account',
    title: 'Account and sign-in',
    icon: <KeyRound />,
    articles: [
      { value: 'reset', question: 'I forgot my password. How do I reset it?', answer: 'Choose “Forgot password” on the sign-in page and enter your work email. The reset link is valid for one hour.' },
      { value: 'two-factor', question: 'How do I turn on two-factor authentication?', answer: 'Go to Settings → Security and choose an authenticator app or a security key. Keep the recovery codes somewhere safe.' },
      { value: 'email', question: 'Can I change the email I sign in with?', answer: 'Yes. Update it in Settings → Profile; we send a confirmation link to the new address before the change takes effect.' },
    ],
  },
  {
    value: 'integrations',
    title: 'Integrations',
    icon: <Plug />,
    articles: [
      { value: 'slack', question: 'How do I connect Slack?', answer: 'Open Integrations → Slack and choose “Connect”. A workspace admin may need to approve the app before notifications start.' },
      { value: 'webhooks', question: 'Why are my webhooks delayed?', answer: 'Deliveries retry with backoff for up to 24 hours when your endpoint fails. Check the delivery log for response codes and the last attempt.' },
      { value: 'api-keys', question: 'Where do I create an API key?', answer: 'API keys live in Settings → Developers. Each key can be scoped to one project and revoked at any time.' },
    ],
  },
];

const services = [
  { name: 'API', status: 'Operational', variant: 'success' },
  { name: 'Dashboard', status: 'Operational', variant: 'success' },
  { name: 'Webhooks', status: 'Degraded', variant: 'warning' },
  { name: 'Email delivery', status: 'Operational', variant: 'success' },
] as const;

const topics = [
  { value: 'billing', label: 'Billing' },
  { value: 'account', label: 'Account and sign-in' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'other', label: 'Something else' },
];

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const fieldOrder = ['email', 'topic', 'message'];

type Errors = Partial<Record<string, string>>;

const validate = (data: FormData, topic: string | null) => {
  const errors: Errors = {};
  const email = String(data.get('email')).trim();
  const message = String(data.get('message')).trim();

  if (email === '') errors.email = 'Enter an email so we can reply.';
  if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Use the full address, like ada@example.com.';
  if (topic === null) errors.topic = 'Choose a topic so the right team picks it up.';
  if (message.length < 20) errors.message = 'Describe the problem in at least 20 characters.';

  return errors;
};

const countArticles = (count: number) => `${count} ${count === 1 ? 'article' : 'articles'}`;

export default function HelpCenter() {
  const id = useId();
  const topicRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState('');

  const search = query.trim().toLowerCase();
  const results = categories
    .filter((item) => category === '' || item.value === category)
    .map((item) => ({
      ...item,
      articles: item.articles.filter((article) => `${article.question} ${article.answer}`.toLowerCase().includes(search)),
    }))
    .filter((item) => item.articles.length > 0);
  const total = results.reduce((sum, item) => sum + item.articles.length, 0);

  const describe = (name: string) => errors[name] ? `${id}-${name}-error` : undefined;

  const clearError = (name: string) => {
    if (!errors[name]) return;
    setErrors({ ...errors, [name]: undefined });
  };

  const changeTopic = (next: string | null) => {
    setTopic(next);
    clearError('topic');
  };

  const toggleCategory = (value: string) => {
    setCategory(category === value ? '' : value);
  };

  const clearSearch = () => {
    setQuery('');
    setCategory('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = validate(data, topic);
    const invalid = fieldOrder.find((name) => next[name]);

    setErrors(next);

    if (invalid === 'topic') {
      topicRef.current?.focus();
      return;
    }

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setSent(String(data.get('email')).trim());
  };

  const startOver = () => {
    setSent('');
    setTopic(null);
    setMessage('');
    setErrors({});
  };

  let status = `${countArticles(total)} in all topics`;
  if (category !== '') status = `${countArticles(total)} in ${categories.find((item) => item.value === category)?.title}`;
  if (search !== '') status = `${countArticles(total)} ${total === 1 ? 'matches' : 'match'} “${query.trim()}”`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading as='h1' size={7} fontWeight={700}>How can we help?</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Search the help center or browse a topic.</Text>
        </div>
        <div role='search' style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <TextField size='lg' style={{ paddingInlineStart: 'var(--spacing-8)' }}>
            <Icon aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><Search /></Icon>
            <TextFieldInput
              type='search'
              style={{ paddingInlineStart: 'var(--spacing-5)' }}
              aria-label='Search help articles'
              aria-describedby={`${id}-status`}
              placeholder='Try “invoice” or “webhooks”'
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
          </TextField>
          <Text id={`${id}-status`} size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{status}</Text>
        </div>
      </header>

      <section aria-labelledby={`${id}-topics`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Heading id={`${id}-topics`} as='h2' size={4} fontWeight={600}>Popular topics</Heading>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
          {categories.map((item) => (
            <li key={item.value}>
              <button type='button' className='helpCenterTopic' aria-pressed={category === item.value} onClick={() => toggleCategory(item.value)}>
                <Icon aria-hidden='true'>{item.icon}</Icon>
                <Text size={3} fontWeight={500}>{item.title}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{countArticles(item.articles.length)}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)' }}>
        <section aria-labelledby={`${id}-faq`} style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '999 1 420px', minWidth: 0 }}>
          <Heading id={`${id}-faq`} as='h2' size={4} fontWeight={600}>Frequently asked questions</Heading>

          {total === 0 && (
            <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-4)', background: 'var(--fills-quaternary)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
                <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{`No articles match “${query.trim()}”`}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>Check the spelling, try a shorter phrase, or ask our support team below.</Text>
              </div>
              <Button size='xs' variant='secondary' appearance='ghost' onClick={clearSearch}>Clear search</Button>
            </div>
          )}

          {results.map((item) => (
            <div key={item.value} style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Heading as='h3' size={3} fontWeight={600} style={{ color: 'var(--label-secondary)' }}>{item.title}</Heading>
              <Accordion>
                {item.articles.map((article, index) => (
                  <AccordionItem key={article.value} value={article.value}>
                    <AccordionHeader>
                      <AccordionTrigger>
                        {article.question}
                        <AccordionIcon />
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent>
                      <Text size={3} style={{ color: 'var(--label-secondary)' }}>{article.answer}</Text>
                    </AccordionContent>
                    {index < item.articles.length - 1 && <Separator />}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        <aside style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '1 1 320px', minWidth: 0 }}>
          <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-8)' }} aria-labelledby={`${id}-status-title`}>
            <Collapsible>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4) var(--spacing-8)' }}>
                <div style={{ display: 'grid', gap: 'var(--spacing-2)', minWidth: 0 }}>
                  <Heading id={`${id}-status-title`} as='h2' size={4} fontWeight={600}>System status</Heading>
                  <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Badge size='sm' variant='warning'>Partial outage</Badge>
                    <Text size={2} style={{ color: 'var(--label-secondary)' }}>Updated 4 min ago</Text>
                  </span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button size='xs' variant='secondary' appearance='ghost'>Details</Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <ul style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, paddingBlockStart: 'var(--spacing-10)', paddingInline: 0, listStyle: 'none' }}>
                  {services.map((service) => (
                    <li key={service.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                      <Text size={3}>{service.name}</Text>
                      <Badge size='sm' variant={service.variant} appearance='ghost'>{service.status}</Badge>
                    </li>
                  ))}
                </ul>
                <Text size={2} style={{ display: 'block', marginBlockStart: 'var(--spacing-8)', color: 'var(--label-secondary)' }}>
                  Webhook deliveries are delayed by up to 10 minutes. No events are lost.
                </Text>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-10)' }} aria-labelledby={`${id}-contact`}>
            <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
              <Heading id={`${id}-contact`} as='h2' size={4} fontWeight={600}>Still need help?</Heading>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>Our team replies within one business day.</Text>
            </div>

            {sent !== '' && (
              <>
                <Alert variant='success'>
                  <AlertIcon />
                  <AlertMain>
                    <AlertTitle>Message sent</AlertTitle>
                    <AlertContent style={{ overflowWrap: 'anywhere' }}>{`We’ll reply to ${sent}. Your ticket number is #48213.`}</AlertContent>
                  </AlertMain>
                </Alert>
                <Button size='xs' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }} onClick={startOver}>Send another message</Button>
              </>
            )}

            {sent === '' && (
              <form noValidate aria-labelledby={`${id}-contact`} onSubmit={submit} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
                <div style={field}>
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <TextField error={errors.email !== undefined}>
                    <TextFieldInput
                      id={`${id}-email`}
                      name='email'
                      type='email'
                      autoComplete='email'
                      aria-invalid={errors.email !== undefined}
                      aria-describedby={describe('email')}
                      onChange={() => clearError('email')}
                    />
                  </TextField>
                  {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-topic`}>Topic</Label>
                  <Select value={topic} onChangeValue={changeTopic}>
                    <SelectHiddenSelect name='topic' />
                    <SelectCombobox
                      id={`${id}-topic`}
                      ref={topicRef}
                      aria-invalid={errors.topic !== undefined}
                      aria-describedby={describe('topic')}
                    >
                      <SelectValue placeholder='Choose a topic' />
                      <SelectIcon />
                    </SelectCombobox>
                    <SelectListbox>
                      {topics.map((item) => (
                        <SelectOption key={item.value} value={item.value}>{item.label}</SelectOption>
                      ))}
                    </SelectListbox>
                  </Select>
                  {errors.topic && <HelperText id={`${id}-topic-error`} error>{errors.topic}</HelperText>}
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-message`}>Message</Label>
                  <TextArea
                    id={`${id}-message`}
                    name='message'
                    rows={5}
                    maxLength={MESSAGE_LIMIT}
                    fullWidth
                    error={errors.message !== undefined}
                    value={message}
                    placeholder='What were you trying to do, and what happened instead?'
                    aria-invalid={errors.message !== undefined}
                    aria-describedby={errors.message ? `${id}-message-error ${id}-message-count` : `${id}-message-count ${id}-message-hint`}
                    onChange={(event) => {
                      setMessage(event.currentTarget.value);
                      clearError('message');
                    }}
                  />
                  {errors.message && <HelperText id={`${id}-message-error`} error>{errors.message}</HelperText>}
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                    <HelperText id={`${id}-message-hint`}>Screenshots help. Reply to our email to attach them.</HelperText>
                    <HelperText id={`${id}-message-count`} style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{`${message.length} / ${MESSAGE_LIMIT}`}</HelperText>
                  </div>
                </div>
                <Button size='xs' type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Send message</Button>
              </form>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
