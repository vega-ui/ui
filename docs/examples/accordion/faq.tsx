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
