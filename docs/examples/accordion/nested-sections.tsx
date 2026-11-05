import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Heading,
  Separator,
  Text,
} from '@vega-ui/react';

const endpoints = [
  { value: 'list', title: 'GET /v1/invoices', body: 'Returns invoices sorted by creation date, newest first. Supports cursor pagination.' },
  { value: 'create', title: 'POST /v1/invoices', body: 'Creates a draft invoice. Line items can be added until the invoice is finalized.' },
  { value: 'void', title: 'POST /v1/invoices/:id/void', body: 'Voids a finalized invoice. Paid invoices must be refunded instead.' },
];

export default function NestedSections() {
  return (
    <section aria-labelledby='api-reference-title' style={{ width: '100%', maxWidth: 560 }}>
      <Heading id='api-reference-title' as='h2' size={5} fontWeight={600}>API reference</Heading>
      <Accordion defaultOpened={['invoices']}>
        <AccordionItem value='invoices'>
          <AccordionHeader as='h3'>
            <AccordionTrigger>
              Invoices
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Accordion size='sm' multiple style={{ paddingInlineStart: 'var(--spacing-8)' }}>
              {endpoints.map((endpoint) => (
                <AccordionItem key={endpoint.value} value={endpoint.value}>
                  <AccordionHeader as='h4'>
                    <AccordionTrigger>
                      <code style={{ fontFamily: 'var(--code-font-family)', fontSize: 'var(--font-size-2)' }}>{endpoint.title}</code>
                      <AccordionIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Text size={2}>{endpoint.body}</Text>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
          <Separator />
        </AccordionItem>
        <AccordionItem value='customers'>
          <AccordionHeader as='h3'>
            <AccordionTrigger>
              Customers
              <AccordionIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <Text size={3}>Create, update and archive the customers that invoices are billed to.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
