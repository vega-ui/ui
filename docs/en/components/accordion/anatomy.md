# Accordion Anatomy

## Overview

`Accordion` owns the shared open-state model for a group of expandable items. It is a [compound component](../../glossary.md#compound-component) because the root, item, trigger, and content parts coordinate as one interaction system.

## Required Parts

### `Accordion`

Required. Owns size, opened values, and the single-open or multiple-open behavior.

### `AccordionItem`

Required. Declares one section and its stable `value`.

### `AccordionHeader`

Required in normal composition. Wraps the trigger semantically and keeps heading structure explicit.

### `AccordionTrigger`

Required. Toggles the item and carries the main interaction surface.

### `AccordionContent`

Required. Renders the expandable content for the item.

## Optional Parts

### `AccordionIcon`

Optional visual affordance for open and closed state. It should remain part of the trigger, not become a separate click target.

## Composition Order

1. `Accordion`
2. `AccordionItem`
3. `AccordionHeader`
4. `AccordionTrigger`
5. `AccordionIcon`
6. `AccordionContent`

## Valid Composition Patterns

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

## Invalid Composition Patterns

### `AccordionContent` outside `AccordionItem`

This breaks the item-level open-state contract.

### Icon used as the only clickable affordance

The trigger should remain the full interaction surface, not just the decoration.

### Several independent items when one grouped state model is intended

If the sections are supposed to coordinate, use one `Accordion` root instead of unrelated collapsibles.
