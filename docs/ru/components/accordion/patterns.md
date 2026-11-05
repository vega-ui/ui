# Accordion: паттерны

## Группа FAQ

Когда использовать:

- Несколько коротких ответов относятся к одному блоку помощи или поддержки.

Заметки о композиции:

- Делайте каждый триггер достаточно конкретным, чтобы список можно было просмотреть, не открывая каждый элемент.
- Используйте один корень, чтобы все секции разделяли одну модель раскрытия.

Компромиссы:

- Хорошо подходит для удобной для просмотра групповой справки.
- Плохо подходит для сильно интерактивных сценариев с формами.

<!-- example: accordion/faq.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const questions = [
  {
    value: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Orders placed before 2 p.m. ship the same day. Standard delivery takes 2–5 business days, express takes 1–2.',
  },
  {
    value: 'returns',
    question: 'Can I return an item?',
    answer: 'Unused items can be returned within 30 days. Start a return from the order page and print the prepaid label.',
  },
  {
    value: 'payment',
    question: 'Which payment methods do you accept?',
    answer: 'Visa, Mastercard, American Express, Apple Pay, Google Pay and bank transfer for business accounts.',
  },
  {
    value: 'warranty',
    question: 'What does the warranty cover?',
    answer: 'Two years of manufacturing defects, including free repair or replacement. Accidental damage is not covered.',
  },
];

export default function Faq() {
  return (
    <Accordion defaultOpened={['shipping']} style={{ width: '100%', maxWidth: 560 }}>
      {questions.map((item, index) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>
              {item.question}
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>{item.answer}</Text>
          </AccordionContent>
          {index < questions.length - 1 && <Separator />}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```
<!-- /example -->

## Секции настроек

Когда использовать:

- Большую форму настроек нужно разбить на удобные раскрывающиеся блоки.

Заметки о композиции:

- Держите актуальную сейчас секцию открытой по умолчанию.
- Убедитесь, что свёрнутые секции дают достаточно контекста в подписях триггеров.

Компромиссы:

- Помогает сжать длинные формы.
- Может скрыть важную валидацию, если состояние секций не продумано.

<!-- example: accordion/settings-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Label,
  Separator,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function SettingsForm() {
  const [opened, setOpened] = useState<string[]>(['profile']);
  const [submitted, setSubmitted] = useState('');

  const openSectionOf = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement;
    const item = target.closest('li');
    if (!item) return;
    const section = item.dataset.section;
    if (!section) return;
    setOpened((current) => (current.includes(section) ? current : [...current, section]));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setSubmitted(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={submit} onInvalidCapture={openSectionOf} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 480 }}>
      <Accordion multiple opened={opened} onChangeOpened={(next) => setOpened(next ?? [])}>
        <AccordionItem value='profile' data-section='profile'>
          <AccordionHeader>
            <AccordionTrigger>
              Profile
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-name'>Display name</Label>
                <TextField>
                  <TextFieldInput id='settings-name' name='displayName' autoComplete='name' required />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-email'>Work email</Label>
                <TextField>
                  <TextFieldInput id='settings-email' name='email' type='email' autoComplete='email' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='billing' data-section='billing'>
          <AccordionHeader>
            <AccordionTrigger>
              Billing
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-company'>Company name</Label>
                <TextField>
                  <TextFieldInput id='settings-company' name='company' autoComplete='organization' />
                </TextField>
              </div>
              <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                <Label htmlFor='settings-vat'>VAT ID</Label>
                <TextField>
                  <TextFieldInput id='settings-vat' name='vatId' placeholder='DE123456789' pattern='[A-Z]{2}[0-9A-Z]{8,12}' required />
                </TextField>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save settings</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      {submitted && <pre style={{ margin: 0, fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{submitted}</pre>}
    </form>
  );
}
```
<!-- /example -->

## Встроенная справка внутри оверлеев

Когда использовать:

- Выдвижной панели (Drawer) или диалогу нужны раскрывающиеся второстепенные подсказки без ухода из текущей задачи.

Заметки о композиции:

- Аккордеон должен оставаться второстепенным по отношению к основной задаче.
- Не позволяйте каждой секции превращаться в замену целой страницы внутри оверлея.

Компромиссы:

- Сохраняет локальный контекст и держит справку рядом с задачей.
- Может сделать панель визуально перегруженной, если раскрыто слишком много секций.

<!-- example: accordion/help-drawer.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Separator,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const topics = [
  { value: 'invoices', title: 'Where do I find my invoices?', body: 'Open Billing → History. Every invoice can be downloaded as PDF or sent to a billing contact.' },
  { value: 'seats', title: 'How are seats counted?', body: 'A seat is any member who signed in during the billing period. Guests and deactivated members are free.' },
  { value: 'refunds', title: 'Can I get a refund?', body: 'Annual plans can be refunded within 14 days. Monthly plans stop renewing at the end of the period.' },
];

export default function HelpDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Billing help</Button>
      </DrawerTrigger>
      <DrawerContent shadowed fullHeight aria-labelledby='billing-help-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='billing-help-title' as='h2' size={4} fontWeight={600}>Billing help</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <div style={{ overflow: 'auto', marginBlockStart: 'var(--spacing-8)' }}>
          <Accordion size='sm'>
            {topics.map((topic, index) => (
              <AccordionItem key={topic.value} value={topic.value}>
                <AccordionHeader as='h3'>
                  <AccordionTrigger>
                    {topic.title}
                    <AccordionIcon />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Text size={2}>{topic.body}</Text>
                </AccordionContent>
                {index < topics.length - 1 && <Separator />}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->
