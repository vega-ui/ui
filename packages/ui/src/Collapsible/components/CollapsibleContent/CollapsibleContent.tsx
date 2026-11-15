'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { useCollapsibleContext } from '../../contexts';
import { collapsibleWidget, CONTENT } from '@vega-ui/widgets/collapsible';

export interface CollapsibleContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ref forwarded to the root collapsible content container.
   * Useful for measuring height, managing animation, or setting focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** The CollapsibleContent component holds the expandable content of a Collapsible section and is shown or hidden based on the trigger state, with optional animation and accessibility support */
export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  ref,
  className,
  children,
  ...props
}) => {
  const { handle } = useCollapsibleContext()
  const attrs = useOutput(handle, collapsibleWidget.output.content)
  const contentRef = useMergeRefs([handle.part(CONTENT, collapsibleWidget.output.content), ref])

  return (
    <div
      ref={contentRef}
      className={csx(style.content, className)}
      {...handle.merge(attrs, props)}
    >
      {children}
    </div>
  )
}
