'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { contextMenuWidget, TRIGGER } from '@vega-ui/widgets/menu';
import { useOutput } from '../../../internals/widget';
import { Slot } from '../../../Slot';
import { useMenuContext } from '../../../Menu/contexts';
import style from './style.module.css'

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Renders the only child element as the area instead of a `<div>`, like a row or a card of your own.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the area element.
   */
  ref?: Ref<HTMLDivElement>
}

/** ContextMenuTrigger is the area that opens its ContextMenu at the point of a right click or a long touch, or at the focused element on the context menu key. */
export const ContextMenuTrigger: FC<ContextMenuTriggerProps> = ({
  asChild,
  className,
  ref,
  children,
  ...props
}) => {
  const { handle } = useMenuContext()
  const attrs = useOutput(handle, contextMenuWidget.output.trigger)
  const triggerRef = useMergeRefs([handle.rootAt(TRIGGER), ref])
  const Element = asChild ? Slot : 'div'

  return (
    <Element
      ref={triggerRef}
      className={csx(style.trigger, className)}
      {...handle.listen(attrs, props)}
    >
      {children}
    </Element>
  )
}
