import { describe, expect, it, vi } from 'vitest'
import { act, browser, createInput, measure, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { DIALOG } from '../../modal-dialog'
import { MEASURE_SHEET, NEXT_SNAP_POINT, sheetWidget } from '../widget'

type SheetOptions = Parameters<typeof simulate<typeof sheetWidget.shape>>[1]

const laid = (height = 600) => ({
  measured: {
    name: 'sheetLayout',
    parts: { [DIALOG]: { rect: { x: 0, y: 0, width: 400, height }, styles: { '--sheet-inset-length': '0', 'transition-duration': '0.3s' } } },
    items: [],
    viewport: { width: 400, height: 800, keyboardInset: 0 },
  },
})

const pressed = (translateY: number) => ({
  measured: { name: 'sheetPress', parts: { [DIALOG]: { styles: { transform: `matrix(1, 0, 0, 1, 0, ${translateY})` } } }, items: [] },
})

const press = (y: number, extra: object = {}) => ({ part: DIALOG, point: { x: 0, y }, pointerType: 'touch', primary: true, time: 0, ...extra })

const at = (y: number, time: number) => ({ point: { x: 0, y }, time })

const openSheet = (options: Partial<SheetOptions> = {}, closedByAny = true) => {
  const sheet = simulate(sheetWidget, { snapPoints: [0.5, 1], steppedSnapPoints: false, open: true, ...options } as SheetOptions).observe({ closedByAny })
  return sheet.send(createInput(MEASURE_SHEET)).send(measure.done, laid())
}

const grab = (sheet: ReturnType<typeof openSheet>, y: number, translateY = sheet.state.paint?.offset ?? 0) => sheet.send(pointer.down, press(y)).send(measure.done, pressed(translateY))

const settle = (sheet: ReturnType<typeof openSheet>) => sheet.send(browser.flushed, { part: DIALOG })

describe('Critical User Paths', () => {
  it('measures the sheet and rests at the lowest snap point whatever their order', () => {
    const sheet = simulate(sheetWidget, { snapPoints: [1, 0.5], steppedSnapPoints: false, open: true } as SheetOptions)

    sheet.send(createInput(MEASURE_SHEET))
    expect(sheet.actions).toEqual([act.measure({ name: 'sheetLayout', parts: [DIALOG], rect: true, styles: ['--sheet-inset-length', 'transition-duration'], viewport: true })])

    sheet.send(measure.done, laid())
    expect(sheet.state.paint).toMatchObject({ offset: 200, clip: 200, clipped: true })
    expect(sheet.state.progress).toBe(1)
  })

  it('rests at the default snap point, at a pixel snap point and at its top for a snap point above its height', () => {
    expect(openSheet({ defaultActiveSnapPoint: 1 }).state.paint?.offset).toBe(0)
    expect(openSheet({ snapPoints: ['100px', 1] }).state.paint?.offset).toBe(500)
    expect(openSheet({ snapPoints: [0.25, 1], defaultActiveSnapPoint: 1 }).send(measure.done, laid(300)).state.paint?.offset).toBe(0)
  })

  it('follows a drag past the threshold and settles at the snap point nearest to the release', () => {
    const onChangeActiveSnapPoint = vi.fn()
    const sheet = grab(openSheet({ onChangeActiveSnapPoint }), 500)
    expect(sheet.state.gesture?.from).toBe(200)

    sheet.send(pointer.drag, at(498, 16))
    expect(sheet.state.gesture?.phase).toBe('pending')
    expect(sheet.state.paint?.offset).toBe(200)

    sheet.send(pointer.drag, at(400, 32))
    expect(sheet.state.paint?.offset).toBe(100)
    expect(sheet.actions).toEqual([act.claimPointer(), act.scrub(DIALOG, { keyframes: { opacity: [0, 1] }, pseudoElement: '::backdrop', progress: 1 })])

    sheet.send(pointer.release, at(380, 1000))
    expect(sheet.actions).toEqual([act.flushStyles(DIALOG)])

    settle(sheet)
    expect(sheet.state.gesture).toBe(null)
    expect(sheet.state.activeSnapPoint).toBe(1)
    expect(onChangeActiveSnapPoint).toHaveBeenLastCalledWith(1)
    expect(sheet.state.paint?.offset).toBe(0)
    expect(sheet.actions).toEqual([act.stopScrub(DIALOG), act.flushStyles(DIALOG)])
  })

  it('reaches the next snap point by a quick flick that ends near the current one', () => {
    const sheet = grab(openSheet(), 500)

    sheet.send(pointer.drag, at(480, 16)).send(pointer.release, at(470, 48))
    settle(sheet)

    expect(sheet.state.activeSnapPoint).toBe(1)
  })

  it('returns to its snap point after a short slow drag and carries a flick past the closest one', () => {
    const onChangeActiveSnapPoint = vi.fn()
    const slow = grab(openSheet({ onChangeActiveSnapPoint }), 500)

    slow.send(pointer.drag, at(480, 16)).send(pointer.drag, at(460, 32)).send(pointer.release, at(460, 1000))
    settle(slow)
    expect(onChangeActiveSnapPoint).not.toHaveBeenCalled()
    expect(slow.state.paint?.offset).toBe(200)

    const flick = grab(openSheet({ snapPoints: [0.25, 0.5, 1] }), 700)

    flick.send(pointer.drag, at(670, 48)).send(pointer.release, at(640, 96))
    settle(flick)
    expect(flick.state.activeSnapPoint).toBe(2)
    expect(flick.state.paint?.offset).toBe(0)
  })

  it('closes when a drag ends below the lowest snap point and the dialog closes on any request', () => {
    const onChangeOpen = vi.fn()
    const sheet = grab(openSheet({ onChangeOpen }), 300)

    sheet.send(pointer.drag, at(350, 16)).send(pointer.drag, at(650, 32))
    expect(sheet.actions).toEqual([act.scrub(DIALOG, { keyframes: { opacity: [0, 1] }, pseudoElement: '::backdrop', progress: 0.125 })])

    sheet.send(pointer.release, at(650, 1000))
    settle(sheet)

    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
  })

  it('stays open on a light flick down, settles at the lowest snap point on a flick from the top and closes on a long flick', () => {
    const onChangeOpen = vi.fn()
    const light = grab(openSheet({ onChangeOpen }), 500)

    light.send(pointer.drag, at(530, 48)).send(pointer.release, at(560, 96))
    settle(light)
    expect(light.state.paint?.offset).toBe(200)

    const fromTop = grab(openSheet({ defaultActiveSnapPoint: 1, onChangeOpen }), 500)

    fromTop.send(pointer.drag, at(560, 48)).send(pointer.release, at(620, 96))
    settle(fromTop)
    expect(fromTop.state.activeSnapPoint).toBe(0)
    expect(fromTop.state.paint?.offset).toBe(200)
    expect(onChangeOpen).not.toHaveBeenCalled()

    const long = grab(openSheet({ onChangeOpen }), 500)

    long.send(pointer.drag, at(575, 48)).send(pointer.release, at(650, 96))
    settle(long)
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
  })

  it('moves to the next snap point on the command, from the lowest up and back', () => {
    const sheet = openSheet({ snapPoints: [0.25, 0.5, 1] })

    sheet.send(createInput(NEXT_SNAP_POINT))
    expect(sheet.state.activeSnapPoint).toBe(1)
    expect(sheet.state.paint?.offset).toBe(200)

    sheet.send(createInput(NEXT_SNAP_POINT))
    expect(sheet.state.paint?.offset).toBe(0)

    sheet.send(createInput(NEXT_SNAP_POINT))
    expect(sheet.state.activeSnapPoint).toBe(0)
  })
})

describe('Edge Cases', () => {
  it('rests at the new offset of its snap point when the parent changes the snap points', () => {
    const sheet = openSheet()
    expect(sheet.state.paint?.offset).toBe(200)

    sheet.setOptions({ snapPoints: [0.25, 1], steppedSnapPoints: false, open: true })
    expect(sheet.state.paint?.offset).toBe(400)
  })

  it('keeps a sheet the browser closed closed when the parent keeps open and changes the snap point', () => {
    const sheet = openSheet({ activeSnapPoint: 0 })

    sheet.send(browser.close, { part: DIALOG }).setOptions({ snapPoints: [0.5, 1], steppedSnapPoints: false, open: true, activeSnapPoint: 1 } as SheetOptions)
    expect(sheet.actions).not.toContainEqual(act.showModal(DIALOG))
  })

  it('stays open and returns to its snap point after a drag down when only a button closes it', () => {
    const onChangeOpen = vi.fn()
    const sheet = grab(openSheet({ onChangeOpen }, false), 300)

    sheet.send(pointer.drag, at(350, 16)).send(pointer.drag, at(650, 32))
    expect(sheet.state.paint!.offset).toBeLessThan(400)

    sheet.send(pointer.release, at(650, 1000))
    settle(sheet)

    expect(onChangeOpen).not.toHaveBeenCalled()
    expect(sheet.state.paint?.offset).toBe(200)
  })

  it('stops at the snap point next to the current one when the snap points are stepped', () => {
    const sheet = grab(openSheet({ snapPoints: [0.25, 0.5, 1], steppedSnapPoints: true }), 700)
    expect(sheet.state.paint?.offset).toBe(400)

    sheet.send(pointer.drag, at(600, 16)).send(pointer.drag, at(300, 32))
    expect(sheet.state.paint!.offset).toBeGreaterThan(0)
    expect(sheet.state.paint!.offset).toBeLessThan(200)

    sheet.send(pointer.release, at(300, 1000))
    settle(sheet)

    expect(sheet.state.activeSnapPoint).toBe(1)
    expect(sheet.state.paint?.offset).toBe(200)
  })

  it('resists a drag above its top and settles back at it', () => {
    const sheet = grab(openSheet({ snapPoints: undefined }), 300)

    sheet.send(pointer.drag, at(250, 16)).send(pointer.drag, at(100, 32))
    expect(sheet.state.paint!.offset).toBeLessThan(0)
    expect(sheet.state.paint!.offset).toBeGreaterThan(-200)

    sheet.send(pointer.release, at(100, 1000))
    settle(sheet)
    expect(sheet.state.paint?.offset).toBe(0)
  })

  it('reports the last of the snap points that share an offset and keeps the active one when a drag returns to its offset', () => {
    const onChangeActiveSnapPoint = vi.fn()
    const up = grab(openSheet({ snapPoints: ['100px', 0.5, 1], onChangeActiveSnapPoint }).send(measure.done, laid(150)), 500)

    up.send(pointer.drag, at(475, 16)).send(pointer.drag, at(450, 32)).send(pointer.release, at(450, 1000))
    settle(up)
    expect(onChangeActiveSnapPoint).toHaveBeenCalledExactlyOnceWith(2)

    onChangeActiveSnapPoint.mockClear()
    const back = grab(openSheet({ snapPoints: ['100px', 0.5, 1], defaultActiveSnapPoint: 1, onChangeActiveSnapPoint }).send(measure.done, laid(150)), 500)

    back.send(pointer.drag, at(505, 16)).send(pointer.release, at(505, 1000))
    settle(back)
    expect(onChangeActiveSnapPoint).not.toHaveBeenCalled()
  })

  it('returns to the snap point when the browser cancels the drag', () => {
    const sheet = grab(openSheet(), 500)

    sheet.send(pointer.drag, at(400, 16)).send(pointer.cancel)
    settle(sheet)

    expect(sheet.state.activeSnapPoint).toBe(undefined)
    expect(sheet.state.paint?.offset).toBe(200)
  })

  it('lets a sideways move and a scrolled list at the top snap point keep the pointer', () => {
    const sheet = grab(openSheet(), 500)

    sheet.send(pointer.drag, { point: { x: 40, y: 490 }, time: 16 })
    expect(sheet.state.gesture).toBe(null)

    sheet.send(createInput(NEXT_SNAP_POINT)).send(pointer.down, press(500, { scroller: { top: 40, left: 0, width: 400, height: 1200, clientWidth: 400, clientHeight: 600 } }))
    sheet.send(measure.done, pressed(0)).send(pointer.drag, at(560, 16))
    expect(sheet.state.gesture).toBe(null)
    expect(sheet.state.paint?.offset).toBe(0)
  })

  it('leaves a press on text, a secondary press and a press on the backdrop to the page', () => {
    const sheet = openSheet()

    sheet.send(pointer.down, press(500, { text: true }))
    sheet.send(pointer.down, press(500, { primary: false }))
    sheet.send(pointer.down, press(500, { backdrop: true }))

    expect(sheet.state.gesture).toBe(null)
  })

  it('catches a sheet that is still moving where the press finds it', () => {
    const sheet = grab(openSheet(), 500, 150)

    expect(sheet.state.gesture?.frozen).toBe(true)
    expect(sheet.state.paint?.offset).toBe(150)
  })

  it('opens again at the lowest snap point after the parent closes it and reports that point once it closed', () => {
    const onChangeActiveSnapPoint = vi.fn()
    const options = { snapPoints: [0.5, 1], steppedSnapPoints: false, onChangeActiveSnapPoint }
    const sheet = openSheet()

    sheet.setOptions({ ...options, open: true } as SheetOptions)
    sheet.send(browser.toggle, { part: DIALOG, to: true }).send(createInput(NEXT_SNAP_POINT))
    expect(onChangeActiveSnapPoint).toHaveBeenLastCalledWith(1)

    sheet.setOptions({ ...options, open: false } as SheetOptions)
    sheet.send(browser.animationEnd, { part: DIALOG }).send(browser.close, { part: DIALOG })
    expect(onChangeActiveSnapPoint).toHaveBeenLastCalledWith(0)

    sheet.setOptions({ ...options, open: true } as SheetOptions)
    expect(onChangeActiveSnapPoint).toHaveBeenCalledTimes(2)
    expect(sheet.state.activeSnapPoint).toBe(0)
    expect(sheet.state.paint?.offset).toBe(200)
  })

  it('keeps the snap point the parent controls', () => {
    const onChangeActiveSnapPoint = vi.fn()
    const sheet = openSheet({ activeSnapPoint: 0, onChangeActiveSnapPoint })

    sheet.send(createInput(NEXT_SNAP_POINT))
    expect(onChangeActiveSnapPoint).toHaveBeenLastCalledWith(1)

    sheet.setOptions({ snapPoints: [0.5, 1], steppedSnapPoints: false, open: true, activeSnapPoint: 0, onChangeActiveSnapPoint } as SheetOptions)
    expect(sheet.state.paint?.offset).toBe(200)

    sheet.setOptions({ snapPoints: [0.5, 1], steppedSnapPoints: false, open: true, activeSnapPoint: 1, onChangeActiveSnapPoint } as SheetOptions)
    expect(sheet.state.paint?.offset).toBe(0)
  })
})
