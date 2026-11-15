import { describe, expect, it, vi } from 'vitest'
import { act, browser, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { CLOSE_DIALOG, DIALOG, isMounted, isRendered, modalDialogWidget, OPEN_DIALOG } from '../widget'

const opened = (options: { open?: boolean; onChangeOpen?: (open: boolean) => void } = {}) => {
  const dialog = simulate(modalDialogWidget, options)
  dialog.send(OPEN_DIALOG).send(browser.toggle, { part: DIALOG, to: true })
  return dialog
}

describe('Critical User Paths', () => {
  it('shows the dialog as a modal, renders the children once it is shown and closes it after its animations', () => {
    const dialog = simulate(modalDialogWidget, {})

    dialog.send(OPEN_DIALOG)
    expect(dialog.actions).toEqual([act.showModal(DIALOG)])
    expect(isMounted(dialog.state)).toBe(true)
    expect(isRendered(dialog.state)).toBe(false)

    dialog.send(browser.toggle, { part: DIALOG, to: true })
    expect(isRendered(dialog.state)).toBe(true)

    dialog.send(CLOSE_DIALOG)
    expect(dialog.actions).toEqual([act.awaitAnimations(DIALOG)])

    dialog.send(browser.animationEnd, { part: DIALOG })
    expect(dialog.actions).toEqual([act.closeDialog(DIALOG)])

    dialog.send(browser.close, { part: DIALOG })
    expect(isMounted(dialog.state)).toBe(false)
  })

  it('closes with the value of the button that submits a form of method dialog', () => {
    const dialog = opened()

    dialog.send(browser.submit, { part: DIALOG, to: 'dialog', value: 'confirm' }).send(browser.animationEnd, { part: DIALOG })

    expect(dialog.actions).toEqual([act.closeDialog(DIALOG, 'confirm')])
  })
})

describe('Edge Cases', () => {
  it('asks a controlled parent and keeps the dialog open while the parent keeps open', () => {
    const onChangeOpen = vi.fn()
    const dialog = opened({ open: true, onChangeOpen })

    dialog.send(browser.cancel, { part: DIALOG })
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(dialog.actions).toEqual([])

    dialog.setOptions({ open: true, onChangeOpen })
    expect(isRendered(dialog.state)).toBe(true)
  })

  it('reports an open request to a controlled parent without showing the dialog', () => {
    const onChangeOpen = vi.fn()
    const dialog = simulate(modalDialogWidget, { open: false, onChangeOpen })

    dialog.send(OPEN_DIALOG)
    expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(true)
    expect(dialog.actions).toEqual([])
  })

  it('stays open on a cancel request when closedby is none', () => {
    const dialog = opened().observe({ closedByNone: true })

    dialog.send(browser.cancel, { part: DIALOG })
    expect(dialog.answer).toBe('handled')
    expect(dialog.state.open).toBe(true)
    expect(dialog.actions).toEqual([])
  })

  it('stays open when the parent opens it again while it animates out', () => {
    const dialog = opened()

    dialog.send(CLOSE_DIALOG).setOptions({ open: true })
    expect(dialog.actions).toEqual([])

    dialog.send(browser.animationEnd, { part: DIALOG })
    expect(dialog.actions).toEqual([])
    expect(isRendered(dialog.state)).toBe(true)
  })

  it('treats a close the browser made as final until the parent changes open', () => {
    const dialog = opened({ open: true })

    dialog.send(browser.close, { part: DIALOG }).setOptions({ open: true })
    expect(isRendered(dialog.state)).toBe(true)
    expect(dialog.actions).toEqual([])

    dialog.setOptions({ open: false }).setOptions({ open: true })
    expect(dialog.actions).toEqual([act.showModal(DIALOG)])
  })

  it('closes on a press that starts and ends on the backdrop only when closedby is any', () => {
    const dialog = opened()

    dialog.send(pointer.down, { part: DIALOG, backdrop: true }).send(pointer.press, { part: DIALOG, backdrop: true })
    expect(dialog.state.open).toBe(true)

    dialog.observe({ closedByAny: true }).send(pointer.down, { part: DIALOG, backdrop: false }).send(pointer.press, { part: DIALOG, backdrop: true })
    expect(dialog.state.open).toBe(true)

    dialog.send(pointer.down, { part: DIALOG, backdrop: true }).send(pointer.press, { part: DIALOG, backdrop: true })
    expect(dialog.state.open).toBe(false)
  })
})
