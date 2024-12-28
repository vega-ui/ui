import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Tooltip } from '../Tooltip.tsx';

const TEXT = 'Hello, World!';

describe('Tooltip', () => {
  it('render', async () => {
    render(<Tooltip triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Tooltip>)

    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.queryByText(TEXT)).toBeNull()
  })

  it('open on hover', async () => {
    render(<Tooltip delayOpen={0} triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Tooltip>)

    screen.getByRole('button').focus()
    expect(screen.queryByText(TEXT)).toBeDefined()
  })

  it('close on blur', async () => {
    render(<Tooltip delayOpen={0} triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Tooltip>)

    screen.getByRole('button').focus()
    expect(screen.queryByText(TEXT)).toBeDefined()

    screen.getByRole('button').blur()
    expect(screen.queryByText(TEXT)).toBeNull()
  })
})