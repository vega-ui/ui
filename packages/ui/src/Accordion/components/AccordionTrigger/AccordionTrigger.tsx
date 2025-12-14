'use client';
import { FC, PropsWithChildren, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { CollapsibleTrigger } from '../../../Collapsible';
import { useAccordionItemContext } from '../../contexts';

export interface AccordionTriggerProps {
  /**
   * Optional class name for the trigger button element.
   */
  className?: string
  
  /**
   * Ref to the internal `button` element used for the trigger.
   */
  ref?: Ref<HTMLButtonElement>
}

/**
 * AccordionTrigger is a button used to toggle the visibility of an AccordionItem.
 * It renders inside a heading tag and optionally displays an arrow icon.
 * Supports custom size, styling, and icon overrides.
 */
export const AccordionTrigger: FC<PropsWithChildren<AccordionTriggerProps>> = ({
  className,
  children,
  ref,
}) => {
  const { size } = useAccordionItemContext()

  return (
    <CollapsibleTrigger ref={ref} className={csx(style.triggerButton, className)} data-size={size}>
      {children}
    </CollapsibleTrigger>
  )
}