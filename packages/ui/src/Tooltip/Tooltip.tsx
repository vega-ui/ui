'use client';

import { FC, HTMLAttributes, useEffect, useId, useRef } from 'react';
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { useControlledState, useEventCallback } from '@vega-ui/hooks';
import style from './style.module.css'
import { TooltipProvider } from './contexts';
import { csx, tooltipWarmUp } from '@vega-ui/utils';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Delay (in milliseconds) before the tooltip appears on hover. It shows at once on keyboard focus,
   * and right after another tooltip closes.
   */
  delayOpen?: number

  /**
   * Delay (in milliseconds) before the tooltip disappears after blur/unhover.
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
}

/** A Tooltip is a UI component that provides brief, context-sensitive information when a user hovers over or focuses on an element, often displayed as a small popup near the element */
export const Tooltip: FC<TooltipProps> = ({
  delayOpen = 500,
  delayClose = 0,
  open: controlledOpen,
  defaultOpen = false,
  onChangeOpen,
  className,
  children,
  ...props
}) => {
  const arrowRef = useRef<SVGSVGElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const contentId = useId();
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, onChangeOpen);

  const { refs, floatingStyles, placement, middlewareData, context } = useFloating({
    strategy: 'fixed',
    transform: false,
    whileElementsMounted: autoUpdate,
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
    if (!value) tooltipWarmUp.warm()

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
  const hide = (delay = 0) => schedule(false, delay)

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') changeOpen(false)
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
      hide={() => hide()}
      hideAfterDelay={() => hide(delayClose)}
      contentId={contentId}
      side={placement.split('-')[0]}
      arrowX={middlewareData.arrow?.x}
      arrowY={middlewareData.arrow?.y}
      setReference={refs.setReference}
      setFloating={refs.setFloating}
      context={context}
      contentStyle={floatingStyles}
    >
      <div className={csx(style.tooltip, className)} {...props}>
        {children}
      </div>
    </TooltipProvider>
  )
}
