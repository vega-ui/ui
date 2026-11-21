import { afterEach, describe, expect, it } from 'vitest'
import { stayOnTop } from '../topLayer'

const region = () => {
  const container = document.createElement('div')
  const popover = document.createElement('div')
  popover.popover = 'manual'
  popover.style.cssText = 'position: fixed; inset: auto 0 0 auto; margin: 0; width: 100px; height: 40px'
  container.append(popover)

  return { container, popover }
}

const modal = () => {
  const dialog = document.createElement('dialog')
  dialog.style.cssText = 'width: 100vw; height: 100vh; max-width: none; max-height: none; margin: 0'
  document.body.append(dialog)
  dialog.showModal()

  return dialog
}

const hit = (popover: HTMLElement) => {
  const { right, bottom } = popover.getBoundingClientRect()
  return document.elementFromPoint(right - 5, bottom - 5)
}

const toggled = () => new Promise((resolve) => setTimeout(resolve, 20))

afterEach(() => {
  document.body.replaceChildren()
})

describe('Critical User Paths', () => {
  it('shows the popover above the page and moves it into a modal dialog the user can still reach it from', async () => {
    const { container, popover } = region()
    const stop = stayOnTop(container, popover)
    expect(container.parentNode).toBe(document.body)
    expect(popover.matches(':popover-open')).toBe(true)

    const dialog = modal()
    await toggled()
    expect(container.parentNode).toBe(dialog)
    expect(hit(popover)).toBe(popover)

    dialog.close()
    await toggled()
    expect(container.parentNode).toBe(document.body)
    expect(popover.matches(':popover-open')).toBe(true)

    stop()
    expect(popover.matches(':popover-open')).toBe(false)
  })

  it('starts inside a modal dialog that is already open and leaves it once the dialog is removed', async () => {
    const dialog = modal()
    const { container, popover } = region()
    const stop = stayOnTop(container, popover)
    expect(container.parentNode).toBe(dialog)

    dialog.remove()
    await toggled()
    expect(container.parentNode).toBe(document.body)
    expect(popover.matches(':popover-open')).toBe(true)
    stop()
  })
})

describe('Edge Cases', () => {
  it('raises the popover above a popover opened after it, without closing that one', async () => {
    const { container, popover } = region()
    const stop = stayOnTop(container, popover)
    const other = document.createElement('div')
    other.popover = 'auto'
    other.style.cssText = 'position: fixed; inset: 0; margin: 0; width: 100vw; height: 100vh'
    document.body.append(other)

    other.showPopover()
    await toggled()

    expect(hit(popover)).toBe(popover)
    expect(other.matches(':popover-open')).toBe(true)
    stop()
  })

  it('keeps two popovers on top without raising each other over and over', async () => {
    const first = region()
    const second = region()
    const stopFirst = stayOnTop(first.container, first.popover)
    const stopSecond = stayOnTop(second.container, second.popover)
    await toggled()

    let toggles = 0
    const count = () => toggles++
    document.addEventListener('toggle', count, true)
    await toggled()
    document.removeEventListener('toggle', count, true)

    expect(toggles).toBe(0)
    expect(first.popover.matches(':popover-open')).toBe(true)
    expect(second.popover.matches(':popover-open')).toBe(true)
    stopFirst()
    stopSecond()
  })
})
