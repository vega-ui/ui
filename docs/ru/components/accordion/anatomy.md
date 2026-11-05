# Accordion: анатомия

## Обзор

`Accordion` владеет общей моделью состояния раскрытия для группы раскрывающихся элементов. Это [составной компонент](../../glossary.md#составной-компонент-compound-component): корень, элемент, триггер и содержимое согласованно работают как одна система взаимодействия.

## Обязательные части

### `Accordion`

Обязательна. Владеет размером, значениями открытых секций и поведением «одна открыта» или «несколько открыты».

### `AccordionItem`

Обязательна. Объявляет одну секцию и её стабильное значение `value`.

### `AccordionHeader`

Обязательна в обычной композиции. Семантически оборачивает триггер и делает структуру заголовков явной.

### `AccordionTrigger`

Обязательна. Переключает элемент и служит основной поверхностью взаимодействия.

### `AccordionContent`

Обязательна. Рендерит раскрывающееся содержимое элемента.

## Необязательные части

### `AccordionIcon`

Необязательная визуальная подсказка для открытого и закрытого состояния. Она должна оставаться частью триггера, а не становиться отдельной целью клика.

## Порядок композиции

1. `Accordion`
2. `AccordionItem`
3. `AccordionHeader`
4. `AccordionTrigger`
5. `AccordionIcon`
6. `AccordionContent`

## Корректные варианты композиции

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

## Некорректные варианты композиции

### `AccordionContent` вне `AccordionItem`

Это нарушает контракт состояния раскрытия на уровне элемента.

### Иконка как единственная кликабельная область

Всей поверхностью взаимодействия должен оставаться триггер, а не только декоративный элемент.

### Несколько независимых элементов там, где нужна одна общая модель состояния

Если секции должны быть согласованы, используйте один корень `Accordion` вместо несвязанных `Collapsible`.
