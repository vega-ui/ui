import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { SegmentedControl } from '../SegmentedControl.tsx';
import { SegmentedControlItem } from '../components';

describe('SegmentedControl', () => {
  it('render', () => {
    render(
      <SegmentedControl data-testid='segmented' name='test'>
        <SegmentedControlItem>A</SegmentedControlItem>
        <SegmentedControlItem>B</SegmentedControlItem>
      </SegmentedControl>
    )
    expect(screen.getByTestId('segmented')).toBeDefined()
  })

  it('change value', () => {
    const changeValue = vi.fn()

    render(
      <SegmentedControl data-testid='segmented' onChange={changeValue} name='test'>
        <SegmentedControlItem>A</SegmentedControlItem>
        <SegmentedControlItem>B</SegmentedControlItem>
      </SegmentedControl>
    )

    waitFor(() => {
      const option = screen.getByText('A')

      option.click()
      expect(changeValue).toBeCalledTimes(2)
      expect(option.getAttribute('checked')).toBeTruthy()
    })
  })
})