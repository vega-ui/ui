'use client';

import { HTMLAttributes, ReactNode, Ref, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { stayOnTop } from '@vega-ui/core';
import { QueuedToast, renderedOf, SwipeDirection, ToastPlacement, ToastQueue, toastRegionWidget } from '@vega-ui/widgets/toast';
import { useOutput, useSnapshot, useWidget, widgetEnvironment } from '../../../internals/widget';
import { ToastItemProvider, ToastRegionProvider } from '../../contexts';
import style from './style.module.css';

const NONE: readonly QueuedToast[] = []

export interface ToastRegionProps<Content> extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * The queue the region shows, made once with `createToastQueue()`.
   */
  queue: ToastQueue<Content>

  /**
   * How many of the newest toasts are shown at once; the older ones wait until a shown one closes.
   * @default 3
   */
  limit?: number

  /**
   * Where the toasts appear: `top-start`, `top`, `top-end`, `bottom-start`, `bottom` or `bottom-end`. On a screen up to 40rem wide they are always centered.
   * @default 'top-end'
   */
  placement?: ToastPlacement

  /**
   * The directions a swipe closes a toast in. A swipe the other way resists and springs back.
   * @default up, or down at the bottom, and toward the nearer side edge, the end edge when centered
   */
  swipeDirections?: readonly SwipeDirection[]

  /**
   * The template of one toast: rendered once per shown toast, which reads its content with `useToastContext()`.
   */
  children: ReactNode

  /**
   * Ref forwarded to the region element.
   */
  ref?: Ref<HTMLElement>
}

/** ToastRegion shows the toasts of a queue above the page, a modal dialog included, as a live region the screen reader reads. It renders its children once per toast, pauses their timers while the pointer or the focus is on them or the page is not in use, and stacks them until the pointer or the focus expands the stack. Give it a name with aria-label. */
export const ToastRegion = <Content,>({
  queue,
  limit = 3,
  placement = 'top-end',
  swipeDirections,
  children,
  className,
  ref,
  ...props
}: ToastRegionProps<Content>) => {
  const toasts = useSyncExternalStore(queue.subscribe, () => queue.toasts, () => NONE)
  const handle = useWidget(toastRegionWidget, { toasts, limit, placement, swipeDirections, onClose: queue.close }, widgetEnvironment)
  const attrs = useOutput(handle, toastRegionWidget.output.root)
  const rendered = useSnapshot(handle, renderedOf)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const region = useRef<HTMLElement>(null)
  const regionRef = useMergeRefs([handle.root, region, ref])

  useEffect(() => {
    const created = document.createElement('div')
    setContainer(created)

    return () => created.remove()
  }, [])

  useEffect(() => {
    if (!container || !region.current) return

    return stayOnTop(container, region.current)
  }, [container])

  if (!container) return null

  return createPortal(
    <ToastRegionProvider handle={handle}>
      <section ref={regionRef} className={csx(style.region, className)} data-placement={placement} {...handle.listen(attrs, props)}>
        {rendered.map(({ toast, index }) => (
          <ToastItemProvider key={toast.key} toastKey={toast.key} content={toast.content} index={index}>
            {children}
          </ToastItemProvider>
        ))}
      </section>
    </ToastRegionProvider>,
    container,
  )
}
