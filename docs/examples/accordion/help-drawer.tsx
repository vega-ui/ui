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
