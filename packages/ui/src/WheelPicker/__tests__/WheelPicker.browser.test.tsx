import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';

import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '..';

afterEach(cleanup);

const pad = (value: number) => String(value).padStart(2, '0')
const minutes = Array.from({ length: 60 }, (_, minute) => minute)

const centeredOf = (column: HTMLElement) => {
  const middle = column.getBoundingClientRect().top + column.getBoundingClientRect().height / 2
  const rows = [...column.children] as HTMLElement[]

  return rows.find((row) => Math.abs(row.getBoundingClientRect().top + row.offsetHeight / 2 - middle) < 2)?.textContent
}

const Minutes = (props: Partial<Parameters<typeof WheelPickerColumn<number>>[0]>) => (
  <WheelPicker aria-label='Time'>
    <WheelPickerColumn aria-label='Minutes' {...props}>
      {minutes.map((minute) => <WheelPickerOption key={minute} value={minute} disabled={minute > 12 && minute < 18}><WheelPickerFace>{pad(minute)}</WheelPickerFace></WheelPickerOption>)}
    </WheelPickerColumn>
  </WheelPicker>
)

describe('Critical User Paths', () => {
  it('opens at defaultValue with that option in the middle', async () => {
    const view = render(<Minutes defaultValue={30} />)
    const column = view.getByRole('spinbutton')

    await expect.poll(() => centeredOf(column)).toBe('30')
  })

  it('turns one option with ArrowUp and ArrowDown and reports it at once', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes defaultValue={30} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')

    await userEvent.click(column)
    await userEvent.keyboard('{ArrowUp}{ArrowUp}{ArrowDown}')

    expect(onChangeValue).toHaveBeenLastCalledWith(31)
    await expect.poll(() => centeredOf(column)).toBe('31')
  })

  it('reports the option a scroll stops at', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes defaultValue={0} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')
    const row = (column.querySelector('[data-index="1"]') as HTMLElement).offsetHeight

    column.scrollTo({ top: 8 * row, behavior: 'instant' })

    await expect.poll(() => onChangeValue.mock.lastCall?.[0]).toBe(8)
    expect(column).toHaveAttribute('aria-valuetext', '08')
  })

  it('goes on from the last option to the first one in a looped column', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes loop defaultValue={59} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')

    await userEvent.click(column)
    await userEvent.keyboard('{ArrowUp}')

    expect(onChangeValue).toHaveBeenLastCalledWith(0)
    await expect.poll(() => centeredOf(column)).toBe('00')
  })

  it('turns to the value the parent sets', async () => {
    const Controlled = () => {
      const [minute, setMinute] = useState(5)
      return (
        <>
          <button onClick={() => setMinute(40)}>Set</button>
          <Minutes loop value={minute} onChangeValue={setMinute} />
        </>
      )
    }
    const view = render(<Controlled />)
    const column = view.getByRole('spinbutton')

    await userEvent.click(view.getByRole('button'))

    await expect.poll(() => centeredOf(column)).toBe('40')
    expect(column).toHaveAttribute('aria-valuetext', '40')
  })
})

describe('Edge Cases', () => {
  it('turns to the option whose digits the user clicks, also a row the cylinder draws at the edge', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes loop defaultValue={30} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')
    await expect.poll(() => centeredOf(column)).toBe('30')

    const edgeOf = () => {
      const bounds = column.getBoundingClientRect()
      const faces = [...column.querySelectorAll('[data-index] > span')] as HTMLElement[]

      return faces.find((face) => {
        const middle = face.getBoundingClientRect().top + face.getBoundingClientRect().height / 2
        return face.textContent === '27' && Number(getComputedStyle(face).opacity) > 0 && middle > bounds.top && middle < bounds.bottom
      })
    }
    await expect.poll(edgeOf).toBeDefined()

    edgeOf()!.dataset.testid = 'edge'
    await commands.mouseClick('[data-testid="edge"]')

    await expect.poll(() => onChangeValue.mock.lastCall?.[0]).toBe(27)
  })

  it('moves off a disabled option a scroll stops at to the nearest enabled one', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes defaultValue={0} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')
    const row = (column.querySelector('[data-index="1"]') as HTMLElement).offsetHeight

    column.scrollTo({ top: 14 * row, behavior: 'instant' })

    await expect.poll(() => onChangeValue.mock.lastCall?.[0]).toBe(12)
    expect(centeredOf(column)).toBe('12')
  })

  it('reaches the last option of a column without loop with End', async () => {
    const view = render(<Minutes defaultValue={2} />)
    const column = view.getByRole('spinbutton')

    await userEvent.click(column)
    await userEvent.keyboard('{End}')

    await expect.poll(() => centeredOf(column)).toBe('59')
  })

  it('moves to the option that took the place of a removed selected one and keeps it in the band, also with options in a fragment', async () => {
    const onChangeValue = vi.fn()
    const Days = () => {
      const [count, setCount] = useState(31)
      return (
        <>
          <button onClick={() => setCount(30)}>Fewer days</button>
          <WheelPicker aria-label='Date'>
            <WheelPickerColumn aria-label='Day' loop defaultValue={31} onChangeValue={onChangeValue}>
              <>{Array.from({ length: count }, (_, day) => <WheelPickerOption key={day} value={day + 1}><WheelPickerFace>{day + 1}</WheelPickerFace></WheelPickerOption>)}</>
            </WheelPickerColumn>
          </WheelPicker>
        </>
      )
    }
    const view = render(<Days />)
    const column = view.getByRole('spinbutton')
    await expect.poll(() => centeredOf(column)).toBe('31')

    await userEvent.click(view.getByRole('button'))

    await expect.poll(() => centeredOf(column)).toBe('30')
    expect(column).toHaveAttribute('aria-valuetext', '30')
    expect(onChangeValue).toHaveBeenLastCalledWith(30)
  })

  it('does not turn while read-only', async () => {
    const onChangeValue = vi.fn()
    const view = render(<Minutes readOnly defaultValue={1} onChangeValue={onChangeValue} />)
    const column = view.getByRole('spinbutton')

    await userEvent.click(column)
    await expect.element(column).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')

    expect(onChangeValue).not.toHaveBeenCalled()
    expect(column).toHaveAttribute('aria-valuetext', '01')
  })

  it('leaves the Tab order while disabled', () => {
    const view = render(<Minutes disabled />)

    expect(view.getByRole('spinbutton')).toHaveAttribute('tabindex', '-1')
  })
})

describe('Accessibility', () => {
  it('is a group of named spinbuttons that tell the selected text, with the rows hidden', () => {
    const view = render(<Minutes defaultValue={7} />)
    const column = view.getByRole('spinbutton', { name: 'Minutes' })

    expect(view.getByRole('group', { name: 'Time' })).toContainElement(column)
    expect(column).toHaveAttribute('aria-valuetext', '07')
    expect(column).toHaveAttribute('tabindex', '0')
    expect(column.querySelector('[data-index="7"]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('moves between columns with Tab', async () => {
    const view = render(
      <WheelPicker aria-label='Time'>
        <WheelPickerColumn aria-label='Hours'><WheelPickerOption value={1}><WheelPickerFace>1</WheelPickerFace></WheelPickerOption></WheelPickerColumn>
        <WheelPickerColumn aria-label='Minutes'><WheelPickerOption value={1}><WheelPickerFace>1</WheelPickerFace></WheelPickerOption></WheelPickerColumn>
      </WheelPicker>,
    )

    await userEvent.click(view.getByRole('spinbutton', { name: 'Hours' }))
    await userEvent.tab()

    expect(view.getByRole('spinbutton', { name: 'Minutes' })).toHaveFocus()
  })
})
