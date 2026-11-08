'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { Slot } from '../../../Slot';
import { usePopoverContext } from '../../contexts';

export interface PopoverAnchorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * If true, renders the anchor as its child element using `Slot`.
   *
   * @default false
   */
  asChild?: boolean

  /**
   * Ref forwarded to the anchor element.
   */
  ref?: Ref<HTMLDivElement>
}

/** The PopoverAnchor component marks the element the popover is positioned against instead of its trigger, such as a whole field around a small button */
export const PopoverAnchor: FC<PopoverAnchorProps> = ({ asChild, ref, children, ...props }) => {
  const Element = asChild ? Slot : 'div'

  const { setAnchor } = usePopoverContext()
  const mergedRef = useMergeRefs([setAnchor, ref])

  return (
    <Element {...props} ref={mergedRef}>
      {children}
    </Element>
  )
}
