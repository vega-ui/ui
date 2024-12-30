import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Accordion } from '../Accordion.tsx';
import { Text } from '../../Text';
import { AccordionItem } from '../components/AccordionItem';

const CONTENT_CONTAINER_SELECTOR = 'div[data-type="content"][data-open]'

const items = [
  { title: 'Item 1', content: 'Content 1', value: '1' },
  { title: 'Item 2', content: 'Content 2', value: '2' },
]

describe('Accordion', () => {
  it('render', () => {
    render(
      <Accordion>
        {items.map(({ title, content, value }) => (
          <AccordionItem key={value} value={value} triggerSlot={title}>
            <Text>{content}</Text>
          </AccordionItem>
        ))}
      </Accordion>
    )

    items.forEach(({ title, content }) => {
      expect(screen.getByText(title)).toBeDefined()
      expect(screen.getByText(content)).toBeDefined()
    })
  })

  it('open', () => {
    render(
      <Accordion>
        {items.map(({ title, content, value }) => (
          <AccordionItem key={value} value={value} triggerSlot={title}>
            <Text>{content}</Text>
          </AccordionItem>
        ))}
      </Accordion>
    )

    screen.getByText(items[0].title).click()
    waitFor(() => {
      expect(screen.getByText(items[0].content).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('true')
    })

    screen.getByText(items[1].title).click()
    waitFor(() => {
      expect(screen.getByText(items[1].content).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('true')
      expect(screen.getByText(items[0].content).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('false')
    })
  })

  it('multiple', () => {
    render(
      <Accordion>
        {items.map(({ title, content, value }) => (
          <AccordionItem key={value} value={value} triggerSlot={title}>
            <Text>{content}</Text>
          </AccordionItem>
        ))}
      </Accordion>
    )

    screen.getByText(items[0].title).click()
    screen.getByText(items[1].title).click()

    waitFor(() => {
      expect(screen.getByText(items[0].content).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('true')
      expect(screen.getByText(items[1].content).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('true')
    })
  })
})