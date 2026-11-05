import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionItem value='account'>
        <AccordionHeader>
          <AccordionTrigger>
            Account settings
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Profile, password, and session settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
