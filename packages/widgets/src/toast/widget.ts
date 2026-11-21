import { act, Action, browser, command, defineWidget, focus, handled, internal, keep, key, layout, lifecycle, listening, matching, measure, Measured, Point, pointer, Result, ROOT, source, state, Step } from '@vega-ui/core'
import { projectMomentum, rubberBand } from '@vega-ui/utils'
import { dragIntentOf, getReleaseDuration, Sample, velocityOf, withSample } from '../drag'
import { QueuedToast } from './queue'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

export type ToastPlacement = 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'

export const CLOSE_TOAST = command<{ readonly key: string }>()('closeToast')

export const CLOSE = 'close'

type PartName = typeof ROOT | typeof CLOSE

const MEASURE = 'toasts'
const TIMER = 'toast:'
const EXIT_DURATION = 400

const timerOf = (toastKey: string) => `${TIMER}${toastKey}`

interface Swipe {
  readonly key: string
  readonly phase: 'pending' | 'active'
  readonly origin: Point
  readonly axis: 'x' | 'y' | undefined
  readonly samples: readonly Sample[]
  readonly offset: number
}

interface SwipeOut {
  readonly axis: 'x' | 'y'
  readonly offset: number
  readonly direction: SwipeDirection
  readonly duration: number
}

interface Size {
  readonly width: number
  readonly height: number
}

interface Margins {
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
}

interface Leaving {
  readonly toast: QueuedToast
  readonly index: number
  readonly closed: boolean
  readonly swipe: SwipeOut | undefined
  readonly settled: boolean
}

const toasts = source({ key: (toast: QueuedToast) => toast.key })

export const toastRegionShape = state({
  options: {
    toasts: [] as readonly QueuedToast[],
    limit: 3,
    placement: 'top-end' as ToastPlacement,
    swipeDirections: undefined as readonly SwipeDirection[] | undefined,
    onClose: undefined as ((toastKey: string) => void) | undefined,
  },
  owns: {},
  internal: {
    shown: internal([] as readonly QueuedToast[]),
    leaving: internal([] as readonly Leaving[]),
    hovered: internal(false),
    focusInside: internal(false),
    focusedToast: internal(null as string | null),
    inactive: internal(false),
    swipe: internal(null as Swipe | null),
    sizes: internal(new Map() as ReadonlyMap<string, Size>),
    margins: internal(null as Margins | null),
  },
  observes: { rtl: matching(ROOT, ':dir(rtl)') },
  parts: [ROOT, CLOSE],
  follows: ['toasts', 'limit'],
  collection: (options) => toasts.of(options.toasts),
})

type ToastRegionSnapshot = typeof toastRegionShape.__snapshot

const shape = toastRegionShape

const isExpanded = (state: ToastRegionSnapshot) => state.hovered || state.focusInside

const isPaused = (state: ToastRegionSnapshot) => isExpanded(state) || state.inactive || state.swipe?.phase === 'active'

const visibleOf = (state: ToastRegionSnapshot) => {
  const closed = new Set(state.leaving.filter((entry) => entry.closed).map((entry) => entry.toast.key))

  return state.options.toasts.filter((toast) => !closed.has(toast.key)).slice(0, state.options.limit)
}

const measureShown = (shown: readonly QueuedToast[]): Action<string, PartName>[] => {
  if (shown.length === 0) return []

  return [act.measure<string, PartName>({ name: MEASURE, parts: [ROOT], items: shown.map((toast) => toast.key), rect: true, scroll: true, viewport: true })]
}

const timersOf = (state: ToastRegionSnapshot, visible: readonly QueuedToast[]) => {
  const queued = new Set(state.options.toasts.map((toast) => toast.key))
  const shown = new Set(state.shown.map((toast) => toast.key))
  const paused = isPaused(state)
  const actions: Action<string, PartName>[] = []

  for (const name of state.timers.keys()) {
    if (name.startsWith(TIMER) && !queued.has(name.slice(TIMER.length))) actions.push(act.cancelTimer(name))
  }

  for (const toast of state.shown) {
    if (queued.has(toast.key) && !visible.includes(toast)) actions.push(act.pauseTimer(timerOf(toast.key)))
  }

  for (const toast of visible) {
    if (shown.has(toast.key) || toast.timeout === undefined) continue

    const name = timerOf(toast.key)
    if (!state.timers.has(name)) actions.push(act.timer(name, toast.timeout))
    if (paused) actions.push(act.pauseTimer(name))
    else if (state.timers.has(name)) actions.push(act.resumeTimer(name))
  }

  return actions
}

const sync = (state: ToastRegionSnapshot): Result<ToastRegionSnapshot> => {
  const visible = visibleOf(state)
  const visibleKeys = new Set(visible.map((toast) => toast.key))
  const queued = new Set(state.options.toasts.map((toast) => toast.key))
  const kept = state.leaving.filter((entry) => !entry.settled && !visibleKeys.has(entry.toast.key))
  const left: Leaving[] = []
  for (const [index, toast] of state.shown.entries()) {
    if (!visibleKeys.has(toast.key)) left.push({ toast, index, closed: !queued.has(toast.key), swipe: undefined, settled: false })
  }

  const leaving = [...kept, ...left]
  const measured = new Set([...visible, ...leaving.map((entry) => entry.toast)].map((toast) => toast.key))
  const sizes = new Map([...state.sizes].filter(([toastKey]) => measured.has(toastKey)))
  const next = shape.sizes.set(shape.leaving.set(shape.shown.set(state, visible), leaving), sizes)

  return keep(next, [...timersOf(state, visible), ...left.map((entry) => act.awaitAnimationsAt(entry.toast.key)), ...measureShown(visible)])
}

const close = (state: ToastRegionSnapshot, toastKey: string, swipe?: SwipeOut): Result<ToastRegionSnapshot> | undefined => {
  const index = state.shown.findIndex((toast) => toast.key === toastKey)
  if (index === -1) return undefined

  const shown = state.shown.filter((toast) => toast.key !== toastKey)
  const leaving = [...state.leaving, { toast: state.shown[index], index, closed: true, swipe, settled: false }]
  const next = shape.leaving.set(shape.shown.set(state, shown), leaving)
  const actions: Action<string, PartName>[] = [act.cancelTimer(timerOf(toastKey)), act.awaitAnimationsAt(toastKey), act.emit('close', toastKey)]
  if (state.focusedToast !== toastKey) return keep(next, actions)

  const neighbor = shown[index] ?? shown[index - 1]
  if (!neighbor) return keep(shape.focusedToast.set(next, null), [...actions, act.restoreFocus()])

  return keep(shape.focusedToast.set(next, neighbor.key), [...actions, act.focusInside(neighbor.key, 'first')])
}

const following: Step<ToastRegionSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined

  return sync(state)
}

const marginsOf = (state: ToastRegionSnapshot, measured: Measured): Margins | null => {
  const rect = measured.parts[ROOT]?.rect
  const { viewport } = measured
  if (!rect || !viewport) return state.margins

  const margins = { top: rect.y, right: viewport.width - rect.x - rect.width, bottom: viewport.height - rect.y - rect.height, left: rect.x }
  const previous = state.margins
  if (!previous) return margins

  const same = previous.top === margins.top && previous.right === margins.right && previous.bottom === margins.bottom && previous.left === margins.left
  return same ? previous : margins
}

const measuring = listening<ToastRegionSnapshot>([layout.resize], (state, input) => {
  if (input.is(layout.resize)) return keep(state, measureShown(state.shown))
  if (!input.is(measure.done) || input.measured?.name !== MEASURE) return undefined

  const sizes = new Map(state.sizes)
  let changed = false
  for (const [measured, metrics] of input.measured.items) {
    if (typeof measured !== 'string' || !metrics.scroll) continue
    if (metrics.scroll.height > metrics.scroll.clientHeight && sizes.has(measured)) continue

    const previous = sizes.get(measured)
    if (previous?.width === metrics.scroll.width && previous.height === metrics.scroll.height) continue

    sizes.set(measured, { width: metrics.scroll.width, height: metrics.scroll.height })
    changed = true
  }

  const margins = marginsOf(state, input.measured)
  const sized = changed ? shape.sizes.set(state, sizes) : state

  return keep(margins === state.margins ? sized : shape.margins.set(sized, margins))
})

const settling: Step<ToastRegionSnapshot> = (state, input) => {
  if (!input.is(browser.animationEnd) || input.key === undefined) return undefined

  return keep(shape.leaving.set(state, state.leaving.map((entry) => (entry.toast.key === input.key ? { ...entry, settled: true } : entry))))
}

const timing: Step<ToastRegionSnapshot> = (state, input) => {
  if (input.type !== 'timer' || !input.name.startsWith(TIMER)) return undefined

  return close(state, input.name.slice(TIMER.length)) ?? keep(state)
}

const closing: Step<ToastRegionSnapshot> = (state, input) => {
  if (!input.is(CLOSE_TOAST) || typeof input.key !== 'string') return undefined

  return close(state, input.key) ?? keep(state)
}

const pressingClose = listening<ToastRegionSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.part !== CLOSE || typeof input.key !== 'string') return undefined

  return close(state, input.key) ?? keep(state)
})

const dismissing = listening<ToastRegionSnapshot>([key.escape], (state, input) => {
  if (!input.is(key.escape) || input.key === undefined) return undefined

  const closed = close(state, input.key)
  if (!closed) return undefined

  return handled(closed.state, closed.actions)
})

const hovering = listening<ToastRegionSnapshot>([pointer.enter, pointer.leave], (state, input) => {
  if (input.is(pointer.enter)) return input.pointerType === 'touch' ? undefined : keep(shape.hovered.set(state, true))
  if (input.is(pointer.leave)) return keep(shape.hovered.set(state, false))

  return undefined
})

const focusing: Step<ToastRegionSnapshot> = (state, input) => {
  if (input.is(focus.enter) || input.is(focus.move)) return keep(shape.focusedToast.set(shape.focusInside.set(state, true), input.key ?? null))
  if (input.is(focus.leave)) return keep(shape.focusedToast.set(shape.focusInside.set(state, false), null))

  return undefined
}

const attending = listening<ToastRegionSnapshot>([browser.active, browser.inactive], (state, input) => {
  if (input.is(browser.inactive)) return keep(shape.inactive.set(state, true))
  if (input.is(browser.active)) return keep(shape.inactive.set(state, false))

  return undefined
})

const directionOf = (axis: 'x' | 'y', offset: number): SwipeDirection => {
  if (axis === 'x') return offset < 0 ? 'left' : 'right'

  return offset < 0 ? 'up' : 'down'
}

const swipeDirectionsOf = (state: ToastRegionSnapshot): readonly SwipeDirection[] => {
  if (state.options.swipeDirections) return state.options.swipeDirections

  const { placement } = state.options
  const vertical = placement.startsWith('bottom') ? 'down' : 'up'
  const towardEnd = !placement.endsWith('-start')
  const horizontal = towardEnd === state.rtl ? 'left' : 'right'

  return [vertical, horizontal]
}

const allowsAxis = (state: ToastRegionSnapshot, axis: 'x' | 'y') => swipeDirectionsOf(state).some((direction) => (axis === 'x' ? direction === 'left' || direction === 'right' : direction === 'up' || direction === 'down'))

const lengthOf = (state: ToastRegionSnapshot, toastKey: string, axis: 'x' | 'y') => {
  const size = state.sizes.get(toastKey)
  if (!size) return 1

  return Math.max(1, axis === 'x' ? size.width : size.height)
}

const offsetOf = (state: ToastRegionSnapshot, swipe: Swipe, axis: 'x' | 'y', delta: number) => {
  if (swipeDirectionsOf(state).includes(directionOf(axis, delta))) return delta

  return rubberBand(delta, lengthOf(state, swipe.key, axis))
}

const pressing = listening<ToastRegionSnapshot>([pointer.down], (state, input) => {
  if (!input.is(pointer.down) || input.key === undefined || !input.point) return undefined
  if (!input.primary || input.text || !state.shown.some((toast) => toast.key === input.key)) return undefined

  const swipe: Swipe = { key: input.key, phase: 'pending', origin: input.point, axis: undefined, samples: [], offset: 0 }
  return keep(shape.swipe.set(state, swipe))
})

const dragging = listening<ToastRegionSnapshot>([pointer.drag], (state, input) => {
  const { swipe } = state
  if (!input.is(pointer.drag) || !input.point || !swipe) return undefined

  const deltaX = input.point.x - swipe.origin.x
  const deltaY = input.point.y - swipe.origin.y

  if (swipe.phase === 'pending') {
    const intent = dragIntentOf(deltaX, deltaY)
    if (intent === 'pending') return keep(state)

    const axis = intent === 'along' ? 'x' : 'y'
    if (!allowsAxis(state, axis)) return keep(shape.swipe.set(state, null))

    const delta = axis === 'x' ? deltaX : deltaY
    const started: Swipe = { ...swipe, phase: 'active', axis, samples: [{ time: input.time ?? 0, position: delta }], offset: offsetOf(state, swipe, axis, delta) }
    return keep(shape.swipe.set(state, started), [act.claimPointer()])
  }

  if (!swipe.axis) return keep(state)

  const delta = swipe.axis === 'x' ? deltaX : deltaY
  const samples = withSample(swipe.samples, { time: input.time ?? 0, position: delta })
  return keep(shape.swipe.set(state, { ...swipe, samples, offset: offsetOf(state, swipe, swipe.axis, delta) }))
})

const marginToward = (state: ToastRegionSnapshot, direction: SwipeDirection) => {
  if (!state.margins) return 0
  if (direction === 'up') return state.margins.top
  if (direction === 'down') return state.margins.bottom
  if (direction === 'left') return state.margins.left

  return state.margins.right
}

const swipeOutOf = (state: ToastRegionSnapshot, swipe: Swipe, velocity: number): SwipeOut | undefined => {
  if (!swipe.axis) return undefined

  const projected = swipe.offset + projectMomentum(velocity, 0.99)
  const direction = directionOf(swipe.axis, projected)
  const length = lengthOf(state, swipe.key, swipe.axis)
  if (!swipeDirectionsOf(state).includes(direction) || Math.abs(projected) < length / 2) return undefined

  const distance = Math.sign(projected) * (length + 2 * marginToward(state, direction)) - swipe.offset
  return { axis: swipe.axis, offset: swipe.offset, direction, duration: getReleaseDuration(distance, velocity, { max: EXIT_DURATION }) }
}

const releasing = listening<ToastRegionSnapshot>([pointer.release, pointer.cancel], (state, input) => {
  const { swipe } = state
  if ((!input.is(pointer.release) && !input.is(pointer.cancel)) || !swipe) return undefined

  const released = shape.swipe.set(state, null)
  if (swipe.phase === 'pending' || !input.is(pointer.release) || !input.point || !swipe.axis) return keep(released)

  const delta = swipe.axis === 'x' ? input.point.x - swipe.origin.x : input.point.y - swipe.origin.y
  const velocity = velocityOf(withSample(swipe.samples, { time: input.time ?? 0, position: delta }))
  const out = swipeOutOf(state, { ...swipe, offset: offsetOf(state, swipe, swipe.axis, delta) }, velocity)
  if (!out) return keep(released)

  return close(released, swipe.key, out) ?? keep(released)
})

const pausing = (step: Step<ToastRegionSnapshot>): Step<ToastRegionSnapshot> => listening(step.listens ?? [], (state, input) => {
  const result = step(state, input)
  if (!result) return undefined

  const paused = isPaused(result.state)
  if (paused === isPaused(state)) return result

  const running = result.state.shown.map((toast) => timerOf(toast.key)).filter((name) => state.timers.has(name))
  const actions = running.map((name) => (paused ? act.pauseTimer(name) : act.resumeTimer(name)))

  return { ...result, actions: [...result.actions, ...actions] }
})

export interface RenderedToast {
  readonly toast: QueuedToast
  readonly index: number
}

const rendered = new WeakMap<readonly QueuedToast[], { leaving: readonly Leaving[]; toasts: readonly RenderedToast[] }>()

export const renderedOf = (state: ToastRegionSnapshot): readonly RenderedToast[] => {
  const cached = rendered.get(state.shown)
  if (cached && cached.leaving === state.leaving) return cached.toasts

  const toasts: RenderedToast[] = state.shown.map((toast, index) => ({ toast, index }))
  const unsettled = state.leaving.filter((entry) => !entry.settled)
  unsettled.sort((first, second) => first.index - second.index)
  for (const entry of unsettled) {
    toasts.splice(Math.min(entry.index, toasts.length), 0, { toast: entry.toast, index: entry.index })
  }

  rendered.set(state.shown, { leaving: state.leaving, toasts })
  return toasts
}

const indexOf = (state: ToastRegionSnapshot, toastKey: string) => {
  const index = state.shown.findIndex((toast) => toast.key === toastKey)
  if (index !== -1) return index

  return state.leaving.find((entry) => entry.toast.key === toastKey)?.index ?? 0
}

const offsetBefore = (state: ToastRegionSnapshot, index: number) => state.shown.slice(0, index).reduce((sum, toast) => sum + (state.sizes.get(toast.key)?.height ?? 0), 0)

const frontHeightOf = (state: ToastRegionSnapshot) => {
  const [front] = state.shown
  return front ? state.sizes.get(front.key)?.height : undefined
}

const swipeOf = (state: ToastRegionSnapshot, toastKey: string) => {
  const leaving = state.leaving.find((entry) => entry.toast.key === toastKey)
  if (leaving?.swipe) return leaving.swipe

  const { swipe } = state
  if (!swipe || swipe.key !== toastKey || swipe.phase !== 'active' || !swipe.axis) return undefined

  return swipe
}

const px = (value: number | undefined) => (value === undefined ? undefined : `${value}px`)

const renderToast = ([index, open, offset, height, frontHeight, axis, swipeOffset, direction, duration]: readonly [number, boolean, number, number | undefined, number | undefined, 'x' | 'y' | undefined, number | undefined, SwipeDirection | undefined, number | undefined]) => ({
  'data-index': String(index),
  'data-front': open && index === 0 ? 'true' : 'false',
  'data-status': open ? 'open' : 'closing',
  'data-swiping': open && axis !== undefined ? 'true' : 'false',
  'data-swipe-direction': direction,
  '--toast-index': String(index),
  '--toast-offset': px(offset),
  '--toast-height': px(height),
  '--toast-front-height': px(frontHeight),
  '--toast-swipe-x': px(axis === 'x' ? swipeOffset : undefined),
  '--toast-swipe-y': px(axis === 'y' ? swipeOffset : undefined),
  '--toast-release-duration': duration === undefined ? undefined : `${duration}ms`,
})

export const toastRegionWidget = defineWidget({
  state: toastRegionShape,

  step: [following, measuring, settling, timing, closing, pressingClose, dismissing, hovering, focusing, attending, pressing, dragging, releasing].map(pausing),

  output: {
    root: toastRegionShape.part(
      (state) => [isExpanded(state)] as const,
      ([expanded]) => ({ role: 'region', 'aria-live': 'polite', 'aria-relevant': 'additions text', popover: 'manual', 'data-expanded': expanded }),
    ),
    toast: {
      ...toastRegionShape.part(() => [] as const, () => ({ role: 'status', 'aria-atomic': true })),
      live: toastRegionShape.part(
        (state, toastKey) => {
          const index = indexOf(state, toastKey)
          const open = state.shown.some((toast) => toast.key === toastKey)
          const swipe = swipeOf(state, toastKey)
          const out = swipe && 'direction' in swipe ? swipe : undefined

          return [index, open, offsetBefore(state, index), state.sizes.get(toastKey)?.height, frontHeightOf(state), swipe?.axis, swipe?.offset, out?.direction, out?.duration] as const
        },
        renderToast,
      ),
    },
  },
})
