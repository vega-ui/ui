import { act, defineWidget, internal, keep, listening, matching, measure, Point, pointer, ScrollBox, state, Step } from '@vega-ui/core'
import { projectMomentum, rubberBand } from '@vega-ui/utils'
import { closeModalDialog, DIALOG, modalDialogStatus, modalDialogSteps, modalDialogValues } from '../modal-dialog'
import { dragIntentOf, Sample, velocityOf, withSample } from '../drag'
import { DrawerPosition } from './types'

interface Gesture {
  readonly active: boolean
  readonly origin: Point
  readonly scroller: ScrollBox | undefined
  readonly samples: readonly Sample[]
}

const SIZE = 'drawerSize'

export const drawerShape = state({
  options: { position: 'end' as DrawerPosition },
  owns: modalDialogValues.owns,
  internal: {
    ...modalDialogValues.internal,
    gesture: internal(null as Gesture | null),
    size: internal(0),
    drag: internal(null as number | null),
  },
  observes: { ...modalDialogValues.observes, rtl: matching(DIALOG, ':dir(rtl)') },
})

type DrawerSnapshot = typeof drawerShape.__snapshot

const edgeOf = (state: DrawerSnapshot) => state.options.position.split('-')[0]

const isVertical = (state: DrawerSnapshot) => {
  const edge = edgeOf(state)
  return edge === 'top' || edge === 'bottom'
}

const directionOf = (state: DrawerSnapshot) => {
  const edge = edgeOf(state)
  if (edge === 'bottom') return 1
  if (edge === 'top') return -1
  if (edge === 'end') return state.rtl ? -1 : 1

  return state.rtl ? 1 : -1
}

const along = (state: DrawerSnapshot, point: Point) => (isVertical(state) ? point.y : point.x)

const across = (state: DrawerSnapshot, point: Point) => (isVertical(state) ? point.x : point.y)

const canStart = (state: DrawerSnapshot, scroller: ScrollBox | undefined, toward: 1 | -1) => {
  if (!isVertical(state) || !scroller) return true

  const direction = directionOf(state)
  if (toward !== direction) return false
  if (direction === 1) return scroller.top <= 0

  return scroller.top + scroller.clientHeight >= scroller.height
}

const offsetOf = (state: DrawerSnapshot, delta: number) => {
  const direction = directionOf(state)
  const toward = delta * direction
  if (toward >= 0) return delta

  return rubberBand(toward, state.size) * direction
}

const pressing = listening<DrawerSnapshot>([pointer.down], (state, input) => {
  if (!input.is(pointer.down) || input.part !== DIALOG || !input.point) return undefined
  if (input.backdrop || !input.primary || input.pointerType === 'mouse' || input.text || !state.closedByAny) return undefined

  const gesture: Gesture = {
    active: false,
    origin: input.point,
    scroller: input.scroller,
    samples: [{ time: input.time ?? 0, position: along(state, input.point) }],
  }
  const next = drawerShape.gesture.set(drawerShape.pressedBackdrop.set(state, false), gesture)

  return keep(next, [act.measure({ name: SIZE, parts: [DIALOG], rect: true })])
})

const sizing: Step<DrawerSnapshot> = (state, input) => {
  if (!input.is(measure.done) || input.measured?.name !== SIZE) return undefined

  const rect = input.measured.parts[DIALOG]?.rect
  if (!rect) return keep(state)

  return keep(drawerShape.size.set(state, isVertical(state) ? rect.height : rect.width))
}

const dragging = listening<DrawerSnapshot>([pointer.drag], (state, input) => {
  if (!input.is(pointer.drag) || !input.point) return undefined

  const { gesture } = state
  if (!gesture) return undefined

  const delta = along(state, input.point) - along(state, gesture.origin)
  const samples = withSample(gesture.samples, { time: input.time ?? 0, position: along(state, input.point) })

  if (gesture.active) return keep(drawerShape.drag.set(drawerShape.gesture.set(state, { ...gesture, samples }), offsetOf(state, delta)))

  const intent = dragIntentOf(delta, across(state, input.point) - across(state, gesture.origin))
  if (intent === 'pending') return keep(state)
  if (intent === 'across' || !canStart(state, gesture.scroller, delta > 0 ? 1 : -1)) return keep(drawerShape.gesture.set(state, null))

  const next = drawerShape.gesture.set(state, { ...gesture, active: true, samples })
  return keep(drawerShape.drag.set(next, offsetOf(state, delta)), [act.claimPointer()])
})

const releasing = listening<DrawerSnapshot>([pointer.release, pointer.cancel], (state, input) => {
  if (!input.is(pointer.release) && !input.is(pointer.cancel)) return undefined

  const { gesture } = state
  if (!gesture) return undefined

  const ended = drawerShape.drag.set(drawerShape.gesture.set(state, null), null)
  if (!gesture.active || !input.point) return keep(ended)

  const position = along(state, input.point)
  const delta = position - along(state, gesture.origin)
  const velocity = velocityOf(withSample(gesture.samples, { time: input.time ?? 0, position }))
  if ((delta + projectMomentum(velocity)) * directionOf(state) <= state.size / 2) return keep(ended)

  return closeModalDialog(ended)
})

export const drawerWidget = defineWidget({
  state: drawerShape,

  step: [pressing, sizing, dragging, releasing, ...modalDialogSteps<DrawerSnapshot>()],

  output: {
    dialog: {
      ...drawerShape.part(() => [] as const, () => ({})),
      live: drawerShape.part(
        (state) => [state.open, state.drag] as const,
        ([open, drag]) => ({
          ...modalDialogStatus(open),
          '--drawer-drag': `${drag ?? 0}px`,
          'data-dragging': drag === null ? 'false' : 'true',
        }),
      ),
    },
  },
})
