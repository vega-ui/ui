'use client';

import { ButtonHTMLAttributes, FC, FocusEvent, PointerEvent, Ref } from 'react';
import { Slot } from '../../../Slot';
import { useTooltipContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';

export interface TooltipTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a slotted child element using `asChild`.
   * Enables integration with custom elements (e.g., <a>, <div>, icon buttons) that serve as tooltip triggers.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the underlying button or slotted element.
   * Useful for focus control, programmatic access, or accessibility enhancements.
   */
  ref?: Ref<HTMLButtonElement>
}

/** The TooltipTrigger component is the interactive element—typically a button, icon, or text span—that shows a Tooltip on hover with a mouse or pen and on keyboard focus, never on a tap, supporting flexible rendering via the asChild prop for custom composition and accessibility */
export const TooltipTrigger: FC<TooltipTriggerProps> = ({
  asChild,
  children,
  ref,
  onPointerEnter: _onPointerEnter,
  onPointerLeave: _onPointerLeave,
  onPointerDown: _onPointerDown,
  onFocus: _onFocus,
  onBlur: _onBlur,
  'aria-describedby': describedBy,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { open, show, showNow, hide, hideAfterDelay, contentId, context, setReference } = useTooltipContext()
  const mergedRef = useMergeRefs([setReference, ref])

  const onPointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'touch') show()
  }

  const onPointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.relatedTarget instanceof Node && context.elements.floating?.contains(event.relatedTarget)) return

    hideAfterDelay()
  }

  const onFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (event.currentTarget.matches(':focus-visible')) showNow()
  }

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      aria-describedby={csx(describedBy, open ? contentId : undefined) || undefined}
      onPointerEnter={mergeEventHandlers(onPointerEnter, _onPointerEnter)}
      onPointerLeave={mergeEventHandlers(onPointerLeave, _onPointerLeave)}
      onPointerDown={mergeEventHandlers(hide, _onPointerDown)}
      onFocus={mergeEventHandlers(onFocus, _onFocus)}
      onBlur={mergeEventHandlers(hide, _onBlur)}
      {...props}
      ref={mergedRef}
    >
      {children}
    </Element>
  )
}
