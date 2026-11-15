import { act, browser, command, controlled, defineWidget, internal, keep, layout as layoutInput, listening, measure, Point, pointer, ScrollBox, state, Step } from '@vega-ui/core'
import { clamp, projectMomentum, resolveLength, rubberBand } from '@vega-ui/utils'
import { closeModalDialog, DIALOG, isRendered, modalDialogStatus, modalDialogSteps, modalDialogValues } from '../modal-dialog'
import { dragIntentOf, Sample, velocityOf, withSample } from '../drag'
import { getFloatExpansion } from './getFloatExpansion'
import { getReleaseDuration } from './getReleaseDuration'
import { getSnapLimits } from './getSnapLimits'
import { getTranslateY } from './getTranslateY'
import { getUnfloatedTop } from './getUnfloatedTop'
import { resolveSnapStop } from './resolveSnapStop'

export const SURFACE = 'surface'

export const MEASURE_SHEET = command('measureSheet')
export const NEXT_SNAP_POINT = command('nextSnapPoint')

const LAYOUT = 'sheetLayout'
const PRESS = 'sheetPress'
const BACKDROP = { keyframes: { opacity: [0, 1] }, pseudoElement: '::backdrop' }

interface Layout {
  readonly offsets: readonly number[]
  readonly active: number
  readonly resting: number
  readonly lowest: number
  readonly base: number
  readonly lowestTop: number
  readonly stops: readonly number[]
}

interface Gesture {
  readonly phase: 'pending' | 'active' | 'released'
  readonly layout: Layout
  readonly limits: readonly [number, number]
  readonly origin: Point
  readonly scroller: ScrollBox | undefined
  readonly samples: readonly Sample[]
  readonly from: number
  readonly frozen: boolean
  readonly position: number
  readonly velocity: number
}

interface Paint {
  readonly offset: number
  readonly gap: number
  readonly expansion: number
  readonly clip: number
  readonly clipped: boolean
  readonly floating: boolean
}

export const sheetShape = state({
  options: {
    snapPoints: undefined as Array<`${number}px` | number> | undefined,
    steppedSnapPoints: false as boolean,
  },
  owns: { ...modalDialogValues.owns, activeSnapPoint: controlled(undefined as number | undefined) },
  internal: {
    ...modalDialogValues.internal,
    height: internal(0),
    viewport: internal(0),
    keyboardInset: internal(0),
    inset: internal(0),
    duration: internal(0),
    painted: internal(false),
    gesture: internal(null as Gesture | null),
    paint: internal(null as Paint | null),
    progress: internal(1),
    releaseDuration: internal(null as number | null),
  },
  observes: modalDialogValues.observes,
})

type SheetSnapshot = typeof sheetShape.__snapshot

export const hasSnapPoints = (state: SheetSnapshot) => (state.options.snapPoints?.length ?? 0) > 1

const isOpen = (state: SheetSnapshot) => {
  if (sheetShape.open.controlled(state)) return state.options.open === true

  return state.open
}

const chosenSnapPoint = (state: SheetSnapshot) => {
  if (sheetShape.activeSnapPoint.controlled(state)) return state.options.activeSnapPoint

  return state.activeSnapPoint
}

const offsetsOf = (state: SheetSnapshot) => {
  const { snapPoints } = state.options
  if (!snapPoints) return [0]

  return snapPoints.map((point) => Math.max(0, state.height - resolveLength(point, state.viewport)))
}

const defaultSnapPointOf = (state: SheetSnapshot, offsets = offsetsOf(state)) => state.options.defaultActiveSnapPoint ?? offsets.indexOf(Math.max(...offsets))

const layoutOf = (state: SheetSnapshot): Layout => {
  const offsets = offsetsOf(state)
  const lowest = Math.max(...offsets)
  const active = chosenSnapPoint(state) ?? defaultSnapPointOf(state, offsets)
  const base = state.viewport - state.keyboardInset - state.height

  return {
    offsets,
    active,
    resting: offsets[active] ?? 0,
    lowest,
    base,
    lowestTop: base + lowest,
    stops: state.closedByAny ? [...offsets, state.height] : offsets,
  }
}

const framing = (state: SheetSnapshot) => {
  const layout = layoutOf(state)
  const limits = getSnapLimits(layout.stops, layout.resting, state.options.steppedSnapPoints)

  return { layout, limits }
}

const offsetAtTop = (state: SheetSnapshot, layout: Layout, top: number) =>
  getUnfloatedTop(layout.base + top, layout.lowestTop, state.inset) - layout.base

const paintOf = (state: SheetSnapshot, layout: Layout, offset: number): Paint => {
  const expansion = getFloatExpansion(layout.base + offset, layout.lowestTop)

  return {
    offset,
    gap: state.inset * (1 - expansion),
    expansion,
    clip: Math.min(offset, layout.lowest),
    clipped: layout.lowest > 0,
    floating: expansion < 1,
  }
}

const progressOf = (state: SheetSnapshot, layout: Layout, offset: number) => {
  if (state.height <= layout.lowest) return 1

  return clamp(0, (state.height - offset) / (state.height - layout.lowest), 1)
}

const samePaint = (first: Paint | null, second: Paint) => {
  if (!first) return false

  return (Object.keys(second) as (keyof Paint)[]).every((name) => first[name] === second[name])
}

const isDragging = (state: SheetSnapshot) => {
  const { gesture } = state
  if (!gesture) return false

  return gesture.phase !== 'pending' || gesture.frozen
}

const rest = (state: SheetSnapshot) => {
  if (!isOpen(state) || isDragging(state)) return state

  const layout = layoutOf(state)
  const paint = paintOf(state, layout, layout.resting)
  const painted = samePaint(state.paint, paint) ? state : sheetShape.paint.set(state, paint)

  return sheetShape.progress.set(painted, progressOf(state, layout, layout.resting))
}

const settle = (before: SheetSnapshot, after: SheetSnapshot) => {
  const closed = before.stage === 'open' && after.stage !== 'open'
  if (!closed || sheetShape.activeSnapPoint.controlled(after) || after.activeSnapPoint === undefined) return rest(after)

  return sheetShape.activeSnapPoint.set(after, defaultSnapPointOf(after))
}

const resting = (step: Step<SheetSnapshot>): Step<SheetSnapshot> => listening(step.listens ?? [], (state, input) => {
  const result = step(state, input)
  if (!result) return undefined

  return { ...result, state: settle(state, result.state) }
})

const canStart = (layout: Layout, scroller: ScrollBox | undefined, toward: 1 | -1) => {
  if (layout.resting > Math.min(...layout.offsets)) return true
  if (!scroller) return true
  if (toward === -1) return false

  return scroller.top <= 0
}

const move = (state: SheetSnapshot, gesture: Gesture, delta: number) => {
  const { layout, limits: [upperLimit, lowerLimit] } = gesture
  const position = offsetAtTop(state, layout, gesture.from + delta)
  const limit = clamp(upperLimit, position, lowerLimit)
  const offset = limit + rubberBand(position - limit, state.height)
  const next = sheetShape.paint.set(sheetShape.gesture.set(state, gesture), paintOf(state, layout, offset))

  return { state: next, scrub: act.scrub(DIALOG, { ...BACKDROP, progress: progressOf(state, layout, offset) }) }
}

const measuring = listening<SheetSnapshot>([layoutInput.resize, layoutInput.viewport], (state, input) => {
  if (input.is(MEASURE_SHEET) || input.is(layoutInput.resize) || input.is(layoutInput.viewport)) {
    return keep(state, [act.measure({ name: LAYOUT, parts: [DIALOG], rect: true, styles: ['--sheet-inset-length', 'transition-duration'], viewport: true })])
  }

  if (!input.is(measure.done) || input.measured?.name !== LAYOUT) return undefined

  const metrics = input.measured.parts[DIALOG]
  const { viewport } = input.measured
  if (!metrics?.rect || !metrics.styles || !viewport) return keep(state)

  const measuresDuration = !isDragging(state) && state.releaseDuration === null
  const settledHeight = state.painted || Math.abs(state.height - metrics.rect.height) < 0.5
  const measured: SheetSnapshot = {
    ...state,
    height: metrics.rect.height,
    viewport: viewport.height,
    keyboardInset: Math.round(viewport.keyboardInset),
    inset: parseFloat(metrics.styles['--sheet-inset-length']),
    duration: measuresDuration ? parseFloat(metrics.styles['transition-duration']) * 1000 : state.duration,
    painted: state.open && isRendered(state) && settledHeight,
  }
  if (!measured.gesture) return keep(measured)

  return keep(sheetShape.gesture.set(measured, { ...measured.gesture, ...framing(measured) }))
})

const snapping: Step<SheetSnapshot> = (state, input) => {
  if (!input.is(NEXT_SNAP_POINT)) return undefined

  const { offsets, active } = layoutOf(state)
  const order = offsets.map((_, index) => index).sort((first, second) => offsets[second] - offsets[first])
  const next = order[(order.indexOf(active) + 1) % order.length]
  if (next === active) return keep(state)

  return keep(sheetShape.activeSnapPoint.set(state, next))
}

const pressing = listening<SheetSnapshot>([pointer.down], (state, input) => {
  if (!input.is(pointer.down) || input.part !== DIALOG || !input.point) return undefined
  if (input.backdrop || !input.primary || input.text) return undefined

  const gesture: Gesture = {
    phase: 'pending',
    ...framing(state),
    origin: input.point,
    scroller: input.scroller,
    samples: [{ time: input.time ?? 0, position: input.point.y }],
    from: 0,
    frozen: false,
    position: 0,
    velocity: 0,
  }
  const next = sheetShape.gesture.set(sheetShape.pressedBackdrop.set(state, false), gesture)

  return keep(next, [act.measure({ name: PRESS, parts: [DIALOG], styles: ['transform'] })])
})

const grabbing: Step<SheetSnapshot> = (state, input) => {
  if (!input.is(measure.done) || input.measured?.name !== PRESS) return undefined

  const { gesture } = state
  const transform = input.measured.parts[DIALOG]?.styles?.transform
  if (!gesture || transform === undefined) return keep(state)

  const from = getTranslateY(transform)
  const grabbed = sheetShape.gesture.set(state, { ...gesture, from })
  if (!state.open) return keep(grabbed)

  const { layout } = gesture
  const top = offsetAtTop(state, layout, from)
  const painted = state.paint?.offset ?? layout.resting
  if (Math.abs(top - painted) < 0.5) return keep(grabbed)

  const frozen = sheetShape.gesture.set(state, { ...gesture, from, frozen: true })
  return keep(sheetShape.paint.set(frozen, paintOf(state, layout, top)))
}

const dragging = listening<SheetSnapshot>([pointer.drag], (state, input) => {
  if (!input.is(pointer.drag) || !input.point) return undefined

  const { gesture } = state
  if (!gesture || gesture.phase === 'released') return undefined

  const delta = input.point.y - gesture.origin.y
  const samples = withSample(gesture.samples, { time: input.time ?? 0, position: input.point.y })

  if (gesture.phase === 'active') {
    const moved = move(state, { ...gesture, samples }, delta)
    return keep(moved.state, [moved.scrub])
  }

  const intent = dragIntentOf(delta, input.point.x - gesture.origin.x)
  if (intent === 'pending') return keep(state)
  if (intent === 'across' || !canStart(gesture.layout, gesture.scroller, delta > 0 ? 1 : -1)) return keep(sheetShape.gesture.set(state, null))

  const moved = move(state, { ...gesture, phase: 'active', samples }, delta)
  return keep(moved.state, [act.claimPointer(), moved.scrub])
})

const releasing = listening<SheetSnapshot>([pointer.release, pointer.cancel], (state, input) => {
  if (!input.is(pointer.release) && !input.is(pointer.cancel)) return undefined

  const { gesture } = state
  if (!gesture || gesture.phase === 'released') return undefined
  if (gesture.phase === 'pending') return keep(sheetShape.gesture.set(state, null))

  const layout = layoutOf(state)
  const progress = progressOf(state, layout, state.paint?.offset ?? layout.resting)
  const released = sheetShape.progress.set(state, progress)
  if (!input.is(pointer.release) || !input.point) {
    return keep(sheetShape.gesture.set(released, { ...gesture, phase: 'released', position: layout.resting, velocity: 0 }), [act.flushStyles(DIALOG)])
  }

  const position = offsetAtTop(state, layout, gesture.from + input.point.y - gesture.origin.y)
  const velocity = velocityOf(withSample(gesture.samples, { time: input.time ?? 0, position: input.point.y }))

  return keep(sheetShape.gesture.set(released, { ...gesture, phase: 'released', position, velocity }), [act.flushStyles(DIALOG)])
})

const settling: Step<SheetSnapshot> = (state, input) => {
  if (!input.is(browser.flushed) || input.part !== DIALOG) return undefined

  const { gesture } = state
  if (!gesture || gesture.phase !== 'released') return keep(sheetShape.releaseDuration.set(state, null))

  const layout = layoutOf(state)
  const { position, velocity } = gesture
  const stepped = state.options.steppedSnapPoints
  const closing = state.closedByAny && resolveSnapStop(layout.stops, layout.resting, position + projectMomentum(velocity, 0.99), stepped) === state.height
  const target = resolveSnapStop(layout.offsets, layout.resting, position + projectMomentum(velocity), stepped)
  const duration = getReleaseDuration((closing ? state.height : target) - position, velocity, { max: state.duration })
  const ended = sheetShape.releaseDuration.set(sheetShape.gesture.set(state, null), duration)
  const after = [act.stopScrub(DIALOG), act.flushStyles(DIALOG)]

  if (closing) {
    const closed = closeModalDialog(ended)
    return keep(closed.state, [...closed.actions, ...after])
  }

  if (target === layout.resting) return keep(ended, after)

  return keep(sheetShape.activeSnapPoint.set(ended, layout.offsets.lastIndexOf(target)), after)
}

type DialogSelection = readonly [boolean, Paint | null, number, boolean, number, number | null, boolean]

const paintStyles = (paint: Paint | null) => {
  if (!paint) return {}

  return {
    '--sheet-offset': `${paint.offset}px`,
    '--sheet-gap': `${paint.gap}px`,
    '--sheet-expansion': `${paint.expansion}`,
    '--sheet-clip': `${paint.clip}px`,
    'data-clipped': String(paint.clipped),
    'data-floating': String(paint.floating),
  }
}

const renderDialog = ([open, paint, progress, dragging, keyboardInset, releaseDuration, painted]: DialogSelection) => ({
  ...modalDialogStatus(open),
  ...paintStyles(paint),
  '--sheet-progress': `${progress}`,
  '--sheet-keyboard-inset': `${keyboardInset}px`,
  '--sheet-release-duration': releaseDuration === null ? undefined : `${releaseDuration}ms`,
  'data-dragging': dragging ? 'true' : 'false',
  'data-painted': painted ? 'true' : undefined,
})

export const sheetWidget = defineWidget({
  state: sheetShape,

  step: [dragging, measuring, snapping, pressing, grabbing, releasing, settling, ...modalDialogSteps<SheetSnapshot>()].map(resting),

  output: {
    dialog: {
      ...sheetShape.part(() => [] as const, () => ({})),
      live: {
        select: (state: SheetSnapshot) => [state.open, state.paint, state.progress, isDragging(state), state.keyboardInset, state.releaseDuration, state.painted],
        render: (selected) => renderDialog(selected as DialogSelection),
      },
    },
    surface: {
      ...sheetShape.part(() => [] as const, () => ({})),
      live: {
        select: (state: SheetSnapshot) => [state.paint?.gap],
        render: ([gap]) => ({ '--sheet-gap': typeof gap === 'number' ? `${gap}px` : undefined }),
      },
    },
  },
})
