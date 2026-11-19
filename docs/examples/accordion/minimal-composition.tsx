import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionItem value='account'>
        <AccordionHeader>
          <AccordionTrigger>
            Account settings
            <AccordionIcon><ChevronDownIcon /></AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Profile, password, and session settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
