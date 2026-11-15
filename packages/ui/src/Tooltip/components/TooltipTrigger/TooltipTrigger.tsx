'use client';

import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useSnapshot } from '../../../internals/widget';
import { Slot } from '../../../Slot';
import { useTooltipContext } from '../../contexts';
import { TRIGGER } from '@vega-ui/widgets/tooltip';
import { csx } from '@vega-ui/utils';
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
  style,
  'aria-describedby': describedBy,
  ...props
}) => {
  const Element = asChild ? Slot : 'button'

  const { handle, contentId, anchorName } = useTooltipContext()
  const open = useSnapshot(handle, (state) => state.open)
  const mergedRef = useMergeRefs([handle.rootAt(TRIGGER), ref])

  return (
    <Element
      type={Element === 'button' ? 'button' : undefined}
      aria-describedby={csx(describedBy, open ? contentId : undefined) || undefined}
      style={{ anchorName, ...style }}
      {...handle.listen({}, props)}
      ref={mergedRef}
    >
      {children}
    </Element>
  )
}
