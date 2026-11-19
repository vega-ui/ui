import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  type AccordionItemProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

interface MyAccordionItemProps extends AccordionItemProps {
  summary: ReactNode
}

export function MyAccordionItem({ summary, children, ...props }: MyAccordionItemProps) {
  return (
    <AccordionItem {...props}>
      <AccordionHeader>
        <AccordionTrigger>
          {summary}
          <AccordionIcon><ChevronDownIcon /></AccordionIcon>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export default function Recipe() {
  return (
    <Accordion defaultOpened={['shipping']} style={{ width: '100%' }}>
      <MyAccordionItem value='shipping' summary='Shipping'>Orders ship in 2–5 business days.</MyAccordionItem>
      <MyAccordionItem value='returns' summary='Returns'>Return any item within 30 days of delivery.</MyAccordionItem>
    </Accordion>
  );
}
