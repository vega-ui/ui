'use client';

import {
  FC,
  HTMLAttributes,
  ReactNode,
  PointerEvent,
  UIEvent,
  useState,
  useRef,
  useMemo, Ref, ReactElement, forwardRef,
} from 'react';
import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus
} from '@floating-ui/react';
import { useSnapPoints } from './hooks';
import { SheetInner, SheetOverlay } from './components';
import { useControlledState } from '@adara-cs/hooks';
import { RemoveScroll } from 'react-remove-scroll';
import { mergeRefs } from '@adara-cs/utils';

export interface SheetProps extends HTMLAttributes<HTMLElement> {
  /** The value that the Sheet will aim at when the pointer is released */
  snapPoints?: Array<`${number}px` | number>
  scrollable?: boolean
  /**
   * The threshold value, as a percentage of the screen, at which the snap point will be set to the edge value
   *
   * @default 0.4
   * */
  edgeThreshold?: number
  /**
   * The threshold value, as a percentage of the screen, at which the snap point will be set to the next/prev value
   *
   * @default 0.1
   * */
  siblingThreshold?: number
  /**
   * The time in milliseconds needed to make a decision on switching to threshold snap points
   *
   * @default 500
   * */
  swipeTimestamp?: number
  closable?: boolean
  /**
   * When swiping, the nearest snap point will be clearly recorded.
   *
   * @default false
   */
  dismissible?: boolean
  activeSnapPoint?: number
  blurredOverlay?: boolean
  defaultSnapPoint?: number
  onChangeActiveSnapPoint?: (activeSnapPoint: number) => void
  steppedSnapPoints?: boolean
  withOverlay?: boolean
  open?: boolean
  clickEnabled?: boolean
  onChangeOpen?: (value: boolean | undefined) => void
  children?: ReactNode | ReactNode[]
  headerSlot?: ReactNode | ReactNode[]
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
}

export const Sheet: FC<SheetProps> = forwardRef(({
  children,
  triggerSlot,
  snapPoints,
  edgeThreshold = .4,
  siblingThreshold = .1,
  scrollable = true,
  closable = true,
  dismissible = true,
  swipeTimestamp = 500,
  defaultSnapPoint,
  withOverlay = true,
  blurredOverlay = true,
  steppedSnapPoints = false,
  activeSnapPoint: controlledActiveSnapPoint,
  onChangeActiveSnapPoint,
  open: controlledOpen,
  onChangeOpen: controlledOnChangeOpen,
  headerSlot,
  clickEnabled = true,
  className,
  ...props
}, ref) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useControlledState(controlledOpen, false, controlledOnChangeOpen)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const [transforming, setTransforming] = useState<boolean>(false)

  const { defaultActiveSnapPoint, activeSnapPointValue, findClosestSnapPointIndex, setActiveSnapPoint, activeSnapPoint, hasSnapPoints, sortedSnapPointsInDimensions } = useSnapPoints({
    snapPoints,
    defaultSnapPoint,
    activeSnapPoint: controlledActiveSnapPoint,
    onChangeActiveSnapPoint,
    containerRef: refs.floating,
  })

  const startCoordinates = useRef(0)
  const startTimestamp = useRef<number | null>(null)

  const [y, setY] = useState(0)

  const click = useClick(context, { enabled: clickEnabled });
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown',
    enabled: dismissible
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const { isMounted, status } = useTransitionStatus(context);

  const offset = useMemo(() => transforming ? y + activeSnapPointValue : activeSnapPointValue, [transforming, y, activeSnapPointValue])
  const limit = useMemo(() => hasSnapPoints ? sortedSnapPointsInDimensions[0] : 0, [hasSnapPoints, sortedSnapPointsInDimensions])

  const clear = () => {
    setTransforming(false)
    setY(0)

    startCoordinates.current = 0
    startTimestamp.current = null
  }

  const onClose = () => {
    setActiveSnapPoint(defaultActiveSnapPoint)
    setIsOpen(false)
    clear()
  }

  const changeSnapPoint = (pos: number, direction?: -1 | 1) => {
    if (!refs.floating.current || !hasSnapPoints) return

    const snapPointIndex = findClosestSnapPointIndex(pos, direction)
    if (snapPointIndex === undefined) return

    setActiveSnapPoint(snapPointIndex)
  }

  const couldDrag = (element: HTMLElement) => {
    const highlightedText = window.getSelection()?.toString()

    let el = element

    if (el.tagName === 'SELECT') return false
    if (highlightedText && highlightedText.length > 0) return false

    while (el) {
      if (el.scrollHeight > el.clientHeight) {
        if (el.scrollTop !== 0) return false;
      }

      if (el === refs.floating.current) break;

      el = el.parentNode as HTMLElement
    }

    return true
  }

  const onPress = (e: PointerEvent) => {
    if (!couldDrag(e.target as HTMLElement)) return

    if (refs.floating.current && !refs.floating.current.contains(e.target as Node)) return;

    const element = e.target as HTMLElement
    element?.setPointerCapture(e.pointerId)

    startTimestamp.current = e.timeStamp
    startCoordinates.current = e.clientY

    setTransforming(true)
  }

  const onDrag = (e: PointerEvent) => {
    if (!couldDrag(e.target as HTMLElement)) return
    if (!transforming || !refs.floating.current) return

    const delta = e.clientY - startCoordinates.current
    const pos = delta + activeSnapPointValue

    if (pos + 100 < limit) {
      if (!steppedSnapPoints) {
        changeSnapPoint(pos)
        clear()
      }

      return

    }

    if (delta < 0 && offset === limit) return;

    setY(delta)
  }

  const onRelease = (e: PointerEvent) => {
    if (!refs.floating.current) return
    if (!couldDrag(e.target as HTMLElement)) {
      if (transforming) setTransforming(false)
      return
    }

    // Visible height
    const currentHeight = refs.floating.current.clientHeight - offset

    const direction: -1 | 1 = (e.clientY - startCoordinates.current) > 0 ? 1 : -1
    const isActionSwipe = startTimestamp.current != null && e.timeStamp - startTimestamp.current < swipeTimestamp

    const isEdgeSwipe = Math.abs(y) > currentHeight * edgeThreshold
    const isSiblingSnapPoint = Math.abs(y) > currentHeight * siblingThreshold

    const handleEdgeSwipe = () => {
      if (direction === 1) {
        if (closable) onClose()
        else if (hasSnapPoints) setActiveSnapPoint(sortedSnapPointsInDimensions.length - 1)
      }

      if (direction === -1) {
        if (hasSnapPoints) setActiveSnapPoint(0)
      }
    }

    const handleActionSwipe = () => {
      if (isEdgeSwipe) handleEdgeSwipe()
      else changeSnapPoint(offset, isSiblingSnapPoint ? direction : undefined)
    }

    // Handle stepped snap points
    if (steppedSnapPoints && hasSnapPoints) {
      if (isEdgeSwipe && direction === 1) onClose()
      if (direction === 1 && activeSnapPoint !== sortedSnapPointsInDimensions.length - 1) setActiveSnapPoint(activeSnapPoint + 1)
      if (direction === -1 && activeSnapPoint !== 0) setActiveSnapPoint(activeSnapPoint - 1)

      clear()
      return
    }

    if (isActionSwipe) {
      handleActionSwipe()
      clear()
      return
    }

    changeSnapPoint(offset)
    clear()
  }

  const onScrollCapture = (e: UIEvent) => {
    const element = (e.target as HTMLElement)
    const scrollTop = element.scrollTop

    if (scrollTop !== 0 && transforming) {
      setTransforming(false)
    }
  }

  const content = (
    <SheetInner
      className={className}
      shadow={!withOverlay}
      onScrollCapture={onScrollCapture}
      onPointerDown={onPress}
      onPointerMove={onDrag}
      onPointerUp={onRelease}
      hidden={withOverlay ? props.hidden : !isMounted}
      status={status}
      ref={mergeRefs([refs.setFloating, ref])}
      contentRef={contentRef}
      offset={offset}
      scrollable={scrollable}
      dragging={transforming}
      headerSlot={headerSlot}
      {...getFloatingProps(props)}
    >
      {children}
    </SheetInner>
  )

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps())}
      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager context={context}>
            <RemoveScroll>
              {withOverlay ? (
                <SheetOverlay blurred={blurredOverlay} hidden={!isMounted}>
                  {content}
                </SheetOverlay>
              ) : content}
            </RemoveScroll>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
})