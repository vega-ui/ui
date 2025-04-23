import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Tooltip } from '../Tooltip.tsx';
import { TooltipContent, TooltipTrigger } from '../components';

const TRIGGER_TEXT = 'Trigger';
const CONTENT_TEXT = 'Hello, World!';

describe('Tooltip', () => {
  it('render', async () => {
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </TooltipTrigger>
        <TooltipContent>
          {CONTENT_TEXT}
        </TooltipContent>
      </Tooltip>
    )

    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })

  it('open on hover', async () => {
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </TooltipTrigger>
        <TooltipContent>
          {CONTENT_TEXT}
        </TooltipContent>
      </Tooltip>
    )

    screen.getByRole('button').focus()
    expect(screen.queryByText(CONTENT_TEXT)).toBeDefined()
  })

  it('close on blur', async () => {
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </TooltipTrigger>
        <TooltipContent>
          {CONTENT_TEXT}
        </TooltipContent>
      </Tooltip>
    )

    screen.getByRole('button').focus()
    expect(screen.queryByText(CONTENT_TEXT)).toBeDefined()

    screen.getByRole('button').blur()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })
})