import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PageControl } from '../PageControl'
import { PageControlItem, PageControlProgress } from '../components'
import { useState } from 'react'

const TestComponent = ({
  active: _active = 0,
  duration = 100,
  onProgressEnd = vi.fn(),
}: {
  duration?: number
  onProgressEnd?: () => void
  active?: number
}) => {
  const [active, setActive] = useState(_active)
  
  return (
    <PageControl active={active} onChangeActive={setActive}>
      <PageControlItem index={0} />
      <PageControlProgress index={1} duration={duration} onProgressEnd={onProgressEnd} />
      <PageControlItem index={2} />
    </PageControl>
  )
}

describe('PageControl (with progress)', () => {
  it('renders all items', () => {
    render(<TestComponent />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })
  
  it('changes active item on click', () => {
    render(<TestComponent />)
    const buttons = screen.getAllByRole('button')
    
    fireEvent.click(buttons[2])
    expect(buttons[2].getAttribute('data-active')).toBe('true')
    
    fireEvent.click(buttons[1])
    expect(buttons[1].getAttribute('data-active')).toBe('true')
  })
})
