import { useLayoutEffect, useRef, useState } from 'react';
import { clamp, findScrollableAncestor, flushStyles, isBackdropPoint, isTextInteraction, projectMomentum, rubberBand } from '@vega-ui/utils';
import { getFloatExpansion, getReleaseDuration, getSnapLimits, getUnfloatedTop, resolveSnapStop } from '../helpers';
import { DragGesture, useDragGesture } from '@vega-ui/hooks';
import { useSheetContext } from '../contexts';

export interface UseSheetDragOptions {
  dialog: HTMLDialogElement | null
  rendered: boolean
  keyboardInset: number
  swipeable: boolean
}

export const useSheetDrag = ({ dialog, rendered, keyboardInset, swipeable }: UseSheetDragOptions) => {
  const {
    open,
    changeOpen,
    changeHeight,
    height,
    viewport,
    offsets,
    activeSnapPoint,
    changeActiveSnapPoint,
    steppedSnapPoints,
  } = useSheetContext()
  const backdropAnimation = useRef<Animation | null>(null)
  const layout = useRef({ inset: 0, duration: 0 })
  const dragOrigin = useRef(0)
  const surfaceRef = useRef<HTMLDivElement>(null)
  
  const [dragging, setDragging] = useState(false)

  const restingOffset = offsets[activeSnapPoint] ?? 0
  const lowestOffset = Math.max(...offsets)
  const stops = swipeable ? [...offsets, height] : offsets
  const base = viewport - keyboardInset - height
  const lowestTop = base + lowestOffset
  const getOffsetAtTop = (position: number) => getUnfloatedTop(base + position, lowestTop, layout.current.inset) - base

  const paintOffset = (offset: number) => {
    if (!dialog) return

    const { inset } = layout.current
    const progress = height > lowestOffset ? clamp(0, (height - offset) / (height - lowestOffset), 1) : 1
    const expansion = getFloatExpansion(base + offset, lowestTop)
    const clip = Math.min(offset, lowestOffset)
    const gap = inset * (1 - expansion)

    dialog.style.setProperty('--sheet-offset', `${offset}px`)
    dialog.style.setProperty('--sheet-gap', `${gap}px`)
    dialog.style.setProperty('--sheet-expansion', `${expansion}`)
    dialog.style.setProperty('--sheet-clip', `${clip}px`)
    surfaceRef.current?.style.setProperty('--sheet-gap', `${gap}px`)

    dialog.dataset.clipped = String(lowestOffset > 0)
    dialog.dataset.floating = String(expansion < 1)

    if (backdropAnimation.current) backdropAnimation.current.currentTime = progress * 1000
    else dialog.style.setProperty('--sheet-progress', `${progress}`)
  }

  const shouldStart = (event: PointerEvent, direction: 1 | -1) => {
    if (!dialog) return false
    if (isBackdropPoint(dialog, event) || isTextInteraction(event.target)) return false
    if (restingOffset > Math.min(...offsets)) return true

    const scroller = findScrollableAncestor(event.target as Element, dialog)
    if (!scroller) return true
    if (direction === -1) return false

    return scroller.scrollTop <= 0
  }

  const onDragPress = () => {
    if (!dialog) return

    const { m42: translateY } = new DOMMatrix(getComputedStyle(dialog).transform)
    dragOrigin.current = translateY

    if (!open || dialog.getAnimations().length === 0) return

    dialog.dataset.dragging = 'true'
    setDragging(true)
    paintOffset(getOffsetAtTop(dragOrigin.current))
  }

  const onStart = () => {
    if (!dialog) return

    dialog.dataset.dragging = 'true'
    setDragging(true)
    backdropAnimation.current = dialog.animate({ opacity: [0, 1] }, { duration: 1000, fill: 'both', pseudoElement: '::backdrop' })
    backdropAnimation.current.pause()
  }

  const onMove = ({ delta }: DragGesture) => {
    const position = getOffsetAtTop(dragOrigin.current + delta)
    const [upperLimit, lowerLimit] = getSnapLimits(stops, restingOffset, steppedSnapPoints)

    const limit = clamp(upperLimit, position, lowerLimit)

    paintOffset(limit + rubberBand(position - limit, height))
  }

  const onEnd = ({ delta, velocity }: DragGesture) => {
    if (!dialog) return

    if (backdropAnimation.current) {
      dialog.style.setProperty('--sheet-progress', getComputedStyle(dialog, '::backdrop').opacity)
      flushStyles(dialog)
      backdropAnimation.current.cancel()
      backdropAnimation.current = null
    }

    const position = getOffsetAtTop(dragOrigin.current + delta)
    const closing = swipeable && resolveSnapStop(stops, restingOffset, position + projectMomentum(velocity, 0.99), steppedSnapPoints) === height
    const target = resolveSnapStop(offsets, restingOffset, position + projectMomentum(velocity), steppedSnapPoints)
    const duration = getReleaseDuration((closing ? height : target) - position, velocity, { max: layout.current.duration })

    dialog.style.setProperty('--sheet-release-duration', `${duration}ms`)

    if (closing) changeOpen(false)
    else if (target !== restingOffset) changeActiveSnapPoint(offsets.lastIndexOf(target))

    setDragging(false)
  }

  useLayoutEffect(() => {
    if (!dialog) return

    const measure = () => {
      const computed = getComputedStyle(dialog)

      layout.current.inset = parseFloat(computed.getPropertyValue('--sheet-inset-length'))

      if (dialog.dataset.dragging !== 'true') layout.current.duration = parseFloat(computed.transitionDuration) * 1000

      changeHeight(dialog.offsetHeight)
    }
    
    const observer = new ResizeObserver(measure)

    measure()
    observer.observe(dialog)

    return () => observer.disconnect()
  }, [dialog, rendered, changeHeight])

  useLayoutEffect(() => {
    if (!dialog || dragging) return

    dialog.dataset.dragging = 'false'

    if (open) paintOffset(restingOffset)
    if (open && rendered && height === dialog.offsetHeight) dialog.dataset.painted = 'true'

    if (!dialog.style.getPropertyValue('--sheet-release-duration')) return

    flushStyles(dialog)
    dialog.style.removeProperty('--sheet-release-duration')
  })

  useDragGesture(dialog, {
    axis: 'y',
    shouldStart,
    onPress: onDragPress,
    onCancel: () => setDragging(false),
    onStart,
    onMove,
    onEnd
  })

  return surfaceRef
}
