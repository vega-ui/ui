import { useEffect } from 'react'
import { safeSetPointerCapture } from '@vega-ui/utils'
import { useEventCallback } from './useEventCallback'

export interface DragGesture {
  delta: number
  velocity: number
}

export interface UseDragGestureOptions {
  axis: 'x' | 'y'
  shouldStart?: (event: PointerEvent, direction: 1 | -1) => boolean
  onStart?: () => void
  onMove?: (gesture: DragGesture) => void
  onEnd?: (gesture: DragGesture) => void
}

interface Sample {
  time: number
  position: number
}

/**
 * Tracks a one-axis pointer drag on `element`. The drag starts once the
 * pointer moves along `axis` and `shouldStart` accepts the `pointerdown` that
 * began it and its direction; from then on it owns the pointer, blocks native
 * scrolling, reports the offset and the velocity in pixels per second, and
 * swallows the click that ends it.
 */
export const useDragGesture = (element: HTMLElement | null, { axis, shouldStart, onStart, onMove, onEnd }: UseDragGestureOptions) => {
  const canStart = useEventCallback((event: PointerEvent, direction: 1 | -1) => shouldStart?.(event, direction) ?? true)
  const start = useEventCallback(() => onStart?.())
  const move = useEventCallback((gesture: DragGesture) => onMove?.(gesture))
  const end = useEventCallback((gesture: DragGesture) => onEnd?.(gesture))

  useEffect(() => {
    if (!element) return

    let pointerId: number | null = null
    let startEvent: PointerEvent = new PointerEvent('pointerdown')
    let phase: 'pending' | 'active' | 'idle' = 'idle'
    let originX = 0
    let originY = 0
    let samples: Sample[] = []
    let dragged = false

    const position = (event: PointerEvent) => axis === 'x' ? event.clientX : event.clientY

    const gesture = (): DragGesture => {
      const last = samples[samples.length - 1]
      const recent = samples.filter((sample) => last.time - sample.time <= 100)
      const first = recent[0]
      const duration = last.time - first.time
      const origin = axis === 'x' ? originX : originY

      return {
        delta: last.position - origin,
        velocity: duration === 0 ? 0 : ((last.position - first.position) / duration) * 1000,
      }
    }

    const reset = () => {
      pointerId = null
      phase = 'idle'
      samples = []
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return

      pointerId = event.pointerId
      startEvent = event
      phase = 'pending'
      originX = event.clientX
      originY = event.clientY
      samples = [{ time: event.timeStamp, position: position(event) }]
      dragged = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return

      if (phase === 'pending') {
        const dx = event.clientX - originX
        const dy = event.clientY - originY
        const delta = axis === 'x' ? dx : dy
        const cross = axis === 'x' ? dy : dx

        if (Math.abs(delta) < 3 && Math.abs(cross) < 3) return

        if (Math.abs(cross) > Math.abs(delta) || !canStart(startEvent, delta > 0 ? 1 : -1)) {
          reset()
          return
        }

        phase = 'active'
        safeSetPointerCapture(element, event.pointerId)
        start()
      }

      samples.push({ time: event.timeStamp, position: position(event) })
      move(gesture())
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return

      if (phase === 'active') {
        samples.push({ time: event.timeStamp, position: position(event) })
        dragged = true
        end(gesture())
      }

      reset()
    }

    const onTouchMove = (event: TouchEvent) => {
      if (phase === 'active') event.preventDefault()
    }

    const onClick = (event: MouseEvent) => {
      if (!dragged) return

      dragged = false
      event.preventDefault()
      event.stopPropagation()
    }

    const controller = new AbortController()
    const { signal } = controller

    element.addEventListener('pointerdown', onPointerDown, { signal })
    element.addEventListener('pointermove', onPointerMove, { signal })
    element.addEventListener('pointerup', onPointerEnd, { signal })
    element.addEventListener('pointercancel', onPointerEnd, { signal })
    element.addEventListener('touchmove', onTouchMove, { passive: false, signal })
    element.addEventListener('click', onClick, { capture: true, signal })

    return () => controller.abort()
  }, [element, axis, canStart, start, move, end])
}
