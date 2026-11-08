'use client';

import { FC, ReactNode, useEffect, useId, useRef } from 'react';
import { arrow, autoUpdate, flip, offset, Placement, shift, useFloating } from '@floating-ui/react';
import { useControlledState, useEventCallback } from '@vega-ui/hooks';
import { TooltipProvider } from './contexts';
import { tooltipWarmUp } from './helpers';

export interface TooltipProps {
  /**
   * Preferred placement of the tooltip relative to its trigger.
   * Follows the Floating UI `Placement` type (e.g., 'top', 'bottom-start').
   * It flips to the opposite side when there is no room.
   *
   * @default 'bottom'
   */
  placement?: Placement

  /**
   * Delay (in milliseconds) before the tooltip appears on hover. It shows at once on keyboard focus,
   * and right after another tooltip closes.
   */
  delayOpen?: number

  /**
   * Delay (in milliseconds) before the tooltip disappears after the pointer leaves the trigger or the tooltip,
   * long enough to move the pointer onto the tooltip. It hides at once on blur.
   *
   * @default 250
   */
  delayClose?: number

  /**
   * Controls the open state of the tooltip.
   * When set, the component becomes controlled.
   */
  open?: boolean

  /**
   * Initial open state for uncontrolled usage.
   */
  defaultOpen?: boolean

  /**
   * Callback fired when the open state changes.
   *
   * @param state - The new open state (`true` or `false`)
   */
  onChangeOpen?(state: boolean): void

  /**
   * The trigger and content of the tooltip.
   * Should include `TooltipTrigger` and `TooltipContent` components.
   */
  children?: ReactNode
}

/** A Tooltip is a UI component that provides brief, context-sensitive information when a user hovers over or focuses on an element, often displayed as a small popup near the element */
export const Tooltip: FC<TooltipProps> = ({
  placement: preferredPlacement = 'bottom',
  delayOpen = 500,
  delayClose = 250,
  open: controlledOpen,
  defaultOpen = false,
  onChangeOpen,
  children,
}) => {
  const arrowRef = useRef<SVGSVGElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, onChangeOpen);

  const { refs, elements, floatingStyles, placement, middlewareData, context } = useFloating({
    strategy: 'fixed',
    transform: false,
    whileElementsMounted: autoUpdate,
    placement: preferredPlacement,
    middleware: [
      offset(14),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    open,
  });

  const changeOpen = useEventCallback((value: boolean) => {
    if (value === open) return

    setOpen(value)
  });

  const schedule = (value: boolean, delay: number) => {
    clearTimeout(timer.current)

    if (delay <= 0) {
      changeOpen(value)
      return
    }

    timer.current = setTimeout(() => changeOpen(value), delay)
  };

  const show = () => schedule(true, tooltipWarmUp.isWarm() ? 0 : delayOpen)
  const showNow = () => schedule(true, 0)
  const cancelHide = () => clearTimeout(timer.current)
  const hide = (delay = 0) => schedule(false, delay)

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (open) return tooltipWarmUp.hold()
  }, [open]);

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return

      event.preventDefault()
      changeOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, changeOpen]);

  return (
    <TooltipProvider
      arrowRef={arrowRef}
      open={open}
      changeOpen={changeOpen}
      show={show}
      showNow={showNow}
      cancelHide={cancelHide}
      hide={() => hide()}
      hideAfterDelay={() => hide(delayClose)}
      contentId={elements.floating?.id || id}
      side={placement.split('-')[0]}
      arrowX={middlewareData.arrow?.x}
      arrowY={middlewareData.arrow?.y}
      setReference={refs.setReference}
      setFloating={refs.setFloating}
      context={context}
      contentStyle={floatingStyles}
    >
      {children}
    </TooltipProvider>
  )
}
