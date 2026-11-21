import { describe, expect, it } from 'vitest'
import { act, browser, createInput, focus, key, lifecycle, measure, pointer, timer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { QueuedToast } from '../queue'
import { CLOSE, CLOSE_TOAST, renderedOf, toastRegionWidget } from '../widget'

type ToastRegionOptions = Parameters<typeof simulate<typeof toastRegionWidget.shape>>[1]

const toastsOf = (...keys: string[]): readonly QueuedToast[] => keys.map((toastKey) => ({ key: toastKey, content: toastKey, timeout: 5000 }))

const options = (overrides: Partial<ToastRegionOptions> = {}): ToastRegionOptions => ({ toasts: toastsOf('c', 'b', 'a'), limit: 3, placement: 'top-end', swipeDirections: undefined, onClose: undefined, ...overrides })

const simulateRegion = (overrides: Partial<ToastRegionOptions> = {}) => simulate(toastRegionWidget, options(overrides)).send(lifecycle.connect)

const shownOf = (region: ReturnType<typeof simulateRegion>) => region.state.shown.map((toast) => toast.key)

const sized = (...keys: string[]) => ({ measured: { name: 'toasts', parts: {}, items: keys.map((toastKey) => [toastKey, { scroll: { top: 0, left: 0, width: 300, height: 60, clientWidth: 300, clientHeight: 60 } }] as const) } })

const liveOf = (region: ReturnType<typeof simulateRegion>, toastKey: string) => toastRegionWidget.output.toast.live.render(toastRegionWidget.output.toast.live.select(region.state, toastKey))

const swipe = (region: ReturnType<typeof simulateRegion>, toastKey: string, points: readonly { x: number; y: number; time: number }[]) => {
  const [start, ...moves] = points
  region.send(pointer.down, { key: toastKey, point: start, primary: true, time: start.time })
  for (const point of moves.slice(0, -1)) region.send(pointer.drag, { point, time: point.time })
  const end = moves[moves.length - 1]

  return region.send(pointer.release, { key: toastKey, point: end, time: end.time })
}

describe('Critical User Paths', () => {
  it('shows the newest toasts up to the limit and the next one once a shown toast is gone', () => {
    const region = simulateRegion({ toasts: toastsOf('d', 'c', 'b', 'a') })
    expect(shownOf(region)).toEqual(['d', 'c', 'b'])

    region.setOptions(options({ toasts: toastsOf('d', 'b', 'a') }))
    expect(shownOf(region)).toEqual(['d', 'b', 'a'])
  })

  it('starts the timer of each shown toast and closes a toast once its time runs out', () => {
    const region = simulate(toastRegionWidget, options())

    region.send(lifecycle.connect)
    expect(region.actions).toEqual(expect.arrayContaining([act.timer('toast:c', 5000), act.timer('toast:b', 5000), act.timer('toast:a', 5000)]))

    region.send(timer('toast:b'))
    expect(region.actions).toEqual([act.cancelTimer('toast:b'), act.awaitAnimationsAt('b'), act.emit('close', 'b')])
    expect(shownOf(region)).toEqual(['c', 'a'])
  })

  it('keeps a toast without a timeout until it is closed', () => {
    const region = simulateRegion({ toasts: [{ key: 'a', content: 'a', timeout: undefined }] })

    expect(region.actions.some((action) => action.type === 'timer')).toBe(false)
  })

  it('pauses the timers while the pointer is over the toasts, the focus is inside them or the page is inactive', () => {
    const region = simulateRegion({ toasts: toastsOf('a') })

    region.send(pointer.enter, { pointerType: 'mouse' })
    expect(region.actions).toEqual([act.pauseTimer('toast:a')])

    region.send(pointer.leave, { pointerType: 'mouse' })
    expect(region.actions).toEqual([act.resumeTimer('toast:a')])

    region.send(focus.enter, { key: 'a' })
    expect(region.actions).toEqual([act.pauseTimer('toast:a')])

    region.send(focus.leave)
    expect(region.actions).toEqual([act.resumeTimer('toast:a')])

    region.send(browser.inactive)
    expect(region.actions).toEqual([act.pauseTimer('toast:a')])

    region.send(browser.active)
    expect(region.actions).toEqual([act.resumeTimer('toast:a')])
  })

  it('closes the toast of a close button and the focused toast on Escape', () => {
    const region = simulateRegion()

    region.send(createInput(CLOSE_TOAST, { key: 'b' }))
    expect(region.actions).toContainEqual(act.emit('close', 'b'))

    region.send(key.escape, { key: 'a' })
    expect(region.answer).toBe('handled')
    expect(region.actions).toContainEqual(act.emit('close', 'a'))
  })

  it('closes a toast swiped far or fast enough in a direction it allows', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))

    swipe(region, 'c', [{ x: 0, y: 0, time: 0 }, { x: 10, y: 0, time: 16 }, { x: 60, y: 0, time: 32 }, { x: 110, y: 0, time: 48 }])

    expect(region.actions).toContainEqual(act.emit('close', 'c'))
    expect(liveOf(region, 'c')).toMatchObject({ 'data-status': 'closing', 'data-swipe-direction': 'right', '--toast-swipe-x': '110px' })
  })

  it('springs a toast back when the swipe is short and slow', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))

    swipe(region, 'c', [{ x: 0, y: 0, time: 0 }, { x: 10, y: 0, time: 100 }, { x: 40, y: 0, time: 400 }, { x: 40, y: 0, time: 800 }])

    expect(region.actions).not.toContainEqual(act.emit('close', 'c'))
    expect(liveOf(region, 'c')).toMatchObject({ 'data-status': 'open', 'data-swiping': 'false', '--toast-swipe-x': undefined })
  })
})

describe('Edge Cases', () => {
  it('closes the toast whose close part is pressed', () => {
    const region = simulateRegion().send(pointer.press, { key: 'b', part: CLOSE })

    expect(region.actions).toContainEqual(act.emit('close', 'b'))
    expect(liveOf(region, 'b')).toMatchObject({ 'data-status': 'closing' })
  })

  it('throws a swiped toast over the distance to the edge of the screen, not only its own length', () => {
    const flick = [{ x: 0, y: 0, time: 0 }, { x: 50, y: 0, time: 33 }, { x: 100, y: 0, time: 66 }, { x: 150, y: 0, time: 100 }, { x: 170, y: 0, time: 113 }]
    const placed = { measured: { name: 'toasts', parts: { root: { rect: { x: 600, y: 16, width: 300, height: 60 } } }, items: sized('c').measured.items, viewport: { width: 1000, height: 800, keyboardInset: 0 } } }
    const durationOf = (region: ReturnType<typeof simulateRegion>) => parseFloat(String(liveOf(swipe(region, 'c', flick), 'c')['--toast-release-duration']))

    const near = durationOf(simulateRegion().send(measure.done, sized('c')))
    const far = durationOf(simulateRegion().send(measure.done, placed))

    expect(far).toBeGreaterThan(near)
  })

  it('swipes toward the nearer side edge by default, which follows the direction of the page', () => {
    const flick = [{ x: 0, y: 0, time: 0 }, { x: -60, y: 0, time: 16 }, { x: -200, y: 0, time: 32 }, { x: -200, y: 0, time: 48 }]
    const closesLeft = (region: ReturnType<typeof simulateRegion>) => swipe(region.send(measure.done, sized('c', 'b', 'a')), 'c', flick).actions.some((action) => action.type === 'emit')

    expect(closesLeft(simulateRegion())).toBe(false)
    expect(closesLeft(simulateRegion({ placement: 'top-start' }))).toBe(true)
    expect(closesLeft(simulateRegion({ placement: 'bottom-start' }))).toBe(true)
    expect(closesLeft(simulate(toastRegionWidget, options()).observe({ rtl: true }).send(lifecycle.connect))).toBe(true)
    expect(closesLeft(simulate(toastRegionWidget, options({ placement: 'top-start' })).observe({ rtl: true }).send(lifecycle.connect))).toBe(false)
  })

  it('keeps the last height a toast had whole while its box cuts it', () => {
    const box = (height: number, clientHeight: number) => ({ top: 0, left: 0, width: 300, height, clientWidth: 300, clientHeight })
    const whole = { measured: { name: 'toasts', parts: {}, items: [['c', { scroll: box(48, 48) }], ['b', { scroll: box(96, 96) }]] as const } }
    const cut = { measured: { name: 'toasts', parts: {}, items: [['c', { scroll: box(52, 52) }], ['b', { scroll: box(67, 48) }], ['a', { scroll: box(60, 48) }]] as const } }
    const region = simulateRegion().send(measure.done, whole).send(measure.done, cut)

    expect(liveOf(region, 'c')).toMatchObject({ '--toast-height': '52px' })
    expect(liveOf(region, 'b')).toMatchObject({ '--toast-height': '96px', '--toast-front-height': '52px' })
    expect(liveOf(region, 'a')).toMatchObject({ '--toast-height': '60px' })
  })

  it('follows the pointer in a direction it allows and resists in the others', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))

    region.send(pointer.down, { key: 'c', point: { x: 0, y: 0 }, primary: true, time: 0 })
    region.send(pointer.drag, { point: { x: 10, y: 0 }, time: 16 })
    expect(region.actions).toEqual([act.claimPointer(), act.pauseTimer('toast:c'), act.pauseTimer('toast:b'), act.pauseTimer('toast:a')])

    region.send(pointer.drag, { point: { x: 80, y: 0 }, time: 32 })
    expect(liveOf(region, 'c')).toMatchObject({ 'data-swiping': 'true', '--toast-swipe-x': '80px' })

    region.send(pointer.drag, { point: { x: -80, y: 0 }, time: 48 })
    const resisted = parseFloat(String(liveOf(region, 'c')['--toast-swipe-x']))
    expect(resisted).toBeLessThan(0)
    expect(resisted).toBeGreaterThan(-80)
  })

  it('leaves a drag along an axis it does not swipe to the page', () => {
    const region = simulateRegion({ swipeDirections: ['right'] })

    region.send(pointer.down, { key: 'c', point: { x: 0, y: 0 }, primary: true, time: 0 })
    region.send(pointer.drag, { point: { x: 0, y: 20 }, time: 16 })

    expect(region.actions).toEqual([])
    expect(region.state.swipe).toBeNull()
  })

  it('keeps a closed toast rendered in its place until its exit animation ends, and its place until the page removes it', () => {
    const region = simulateRegion()

    region.send(createInput(CLOSE_TOAST, { key: 'b' }))
    region.setOptions(options({ toasts: toastsOf('c', 'a') }))
    expect(renderedOf(region.state).map((entry) => entry.toast.key)).toEqual(['c', 'b', 'a'])
    expect(liveOf(region, 'b')).toMatchObject({ 'data-status': 'closing', 'data-index': '1' })

    region.send(browser.animationEnd, { key: 'b' })
    expect(renderedOf(region.state).map((entry) => entry.toast.key)).toEqual(['c', 'a'])
    expect(liveOf(region, 'b')).toMatchObject({ 'data-status': 'closing', 'data-index': '1' })
  })

  it('animates out a toast the queue dropped without the region', () => {
    const region = simulateRegion()

    region.setOptions(options({ toasts: toastsOf('c', 'a') }))
    expect(region.actions).toEqual(expect.arrayContaining([act.cancelTimer('toast:b'), act.awaitAnimationsAt('b')]))
    expect(liveOf(region, 'b')).toMatchObject({ 'data-status': 'closing' })
  })

  it('pauses the timer of a toast a newer one pushed out and resumes it once it is shown again', () => {
    const region = simulateRegion({ limit: 2, toasts: toastsOf('b', 'a') })

    region.setOptions(options({ limit: 2, toasts: toastsOf('c', 'b', 'a') }))
    expect(region.actions).toEqual(expect.arrayContaining([act.pauseTimer('toast:a'), act.timer('toast:c', 5000)]))

    region.setOptions(options({ limit: 2, toasts: toastsOf('b', 'a') }))
    expect(region.actions).toEqual(expect.arrayContaining([act.resumeTimer('toast:a')]))
    expect(shownOf(region)).toEqual(['b', 'a'])
  })

  it('starts a toast added under the pointer paused', () => {
    const region = simulateRegion({ toasts: toastsOf('a') }).send(pointer.enter, { pointerType: 'mouse' })

    region.setOptions(options({ toasts: toastsOf('b', 'a') }))
    expect(region.actions).toEqual(expect.arrayContaining([act.timer('toast:b', 5000), act.pauseTimer('toast:b')]))
  })

  it('moves the focus into the next toast when the focused one closes', () => {
    const region = simulateRegion()

    region.send(focus.enter, { key: 'b' }).send(createInput(CLOSE_TOAST, { key: 'b' }))
    expect(region.actions).toContainEqual(act.focusInside('a', 'first'))
  })

  it('gives the focus back to where it was before the toasts once the last focused toast closes', () => {
    const region = simulateRegion({ toasts: toastsOf('a') })

    region.send(focus.enter, { key: 'a' }).send(createInput(CLOSE_TOAST, { key: 'a' }))
    expect(region.actions).toContainEqual(act.restoreFocus())
  })

  it('does not expand the stack on a touch', () => {
    const region = simulateRegion()

    expect(region.send(pointer.enter, { pointerType: 'touch' }).answer).toBe('pass')
  })

  it('stacks each toast below the heights of the newer ones', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))

    expect(liveOf(region, 'c')).toMatchObject({ 'data-front': 'true', '--toast-offset': '0px', '--toast-front-height': '60px' })
    expect(liveOf(region, 'a')).toMatchObject({ 'data-front': 'false', 'data-index': '2', '--toast-offset': '120px' })
  })
})

describe('Performance', () => {
  it('keeps its state when a measure finds the sizes it already has', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))
    const measured = region.state

    region.send(measure.done, sized('c', 'b', 'a'))
    expect(region.state).toBe(measured)
  })

  it('forgets the size of a toast once it is gone', () => {
    const region = simulateRegion().send(measure.done, sized('c', 'b', 'a'))

    region.send(createInput(CLOSE_TOAST, { key: 'b' }))
    region.send(browser.animationEnd, { key: 'b' })
    region.setOptions(options({ toasts: toastsOf('c', 'a') }))

    expect([...region.state.sizes.keys()]).toEqual(['c', 'a'])
  })
})
