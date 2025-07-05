'use client';
import { FC, Ref } from 'react';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { CollapsibleContent, CollapsibleContentProps } from '../../../Collapsible';

export interface AccordionContentProps extends CollapsibleContentProps {
  /**
   * Ref to the root content div element.
   */
  ref?: Ref<HTMLDivElement>
}

/**
 * AccordionContent is the panel that displays the content of an open AccordionItem.
 * It wraps `CollapsibleContent` and supports custom styling and forwarded ref.
 */
export const AccordionContent: FC<AccordionContentProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <CollapsibleContent {...props} className={csx(style.content, className)} ref={ref}>
      {children}
    </CollapsibleContent>
  )
}