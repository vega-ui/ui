import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PageControl } from '../PageControl.tsx'
import { PageControlItem } from '../components'
import { useState } from 'react'

const TestComponent = ({
  active: _active = 0,
}: {
  duration?: number
  onProgressEnd?: () => void
  active?: number
}) => {
  const [active, setActive] = useState(_active)
  
  return (
    <PageControl active={active} onChangeActive={setActive}>
      <PageControlItem index={0} />
      <PageControlItem index={1} />
      <PageControlItem index={2} />
    </PageControl>
  )
}

describe('PageControl (with progress)', () => {
  it('renders all items', () => {
    render(<TestComponent />)
    const buttons = screen.getAllByRole('tab')
    expect(buttons).toHaveLength(3)
  })
  
  it('changes active item on click', () => {
    render(<TestComponent />)
    const buttons = screen.getAllByRole('tab')
    
    fireEvent.click(buttons[2])
    expect(buttons[2].getAttribute('data-active')).toBe('true')
    
    fireEvent.click(buttons[1])
    expect(buttons[1].getAttribute('data-active')).toBe('true')
  })
})
