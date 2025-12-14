import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Collapsible } from '../Collapsible.tsx';
import { Text } from '../../Text';
import { CollapsibleContent, CollapsibleTrigger } from '../components';

const CONTENT_CONTAINER_SELECTOR = 'div[data-type="content"][data-open]'

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Collapsible', () => {
  it('render', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>
          {TRIGGER_TEXT}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>{CONTENT_TEXT}</Text>
        </CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText(TRIGGER_TEXT)).toBeDefined()
    expect(screen.getByText(CONTENT_TEXT)).toBeDefined()
  })

  it('open', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>
          {TRIGGER_TEXT}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Text>{CONTENT_TEXT}</Text>
        </CollapsibleContent>
      </Collapsible>
    )

    screen.getByText(TRIGGER_TEXT).click()
    waitFor(() => {
      expect(screen.getByText(CONTENT_TEXT).closest(CONTENT_CONTAINER_SELECTOR)!.getAttribute('data-open')).toBe('true')
    })
  })
})