'use client';

import { FC, ReactNode, useRef, useState } from 'react';
import {
  arrow, autoUpdate, flip, FloatingContext, offset, shift,
  useDismiss,
  useFloating, useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';
import { TooltipProvider } from './providers';

export interface TooltipProps {
  /**
   * The trigger and content of the tooltip.
   * Should include TooltipTrigger and TooltipContent as children.
   */
  children?: ReactNode

  /**
   * Delay (in milliseconds) before the tooltip appears after hover/focus.
   */
  delayOpen?: number

  /**
   * Delay (in milliseconds) before the tooltip disappears after blur/unhover.
   */
  delayClose?: number
}

/** A Tooltip is a UI component that provides brief, context-sensitive information when a user hovers over or focuses on an element, often displayed as a small popup near the element */
export const Tooltip: FC<TooltipProps> = ({
  delayOpen = 500,
  delayClose = 0,
  children
}) => {
  const arrowRef = useRef(null);

  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(14),
      flip(),
      shift(),
    ],
    open,
    onOpenChange: setOpen,
  });

  const hover = useHover(context, { move: false, delay: { open: delayOpen, close: delayClose } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <TooltipProvider
      arrowRef={arrowRef}
      changeOpen={setOpen}
      open={open}
      triggerProps={getReferenceProps()}
      contentProps={getFloatingProps()}
      contentRef={refs.setFloating}
      triggerRef={refs.setReference}
      context={context as FloatingContext<HTMLElement>}
      contentStyle={{ ...floatingStyles, ...transitionStyles }}
    >
      {children}
    </TooltipProvider>
  )
}