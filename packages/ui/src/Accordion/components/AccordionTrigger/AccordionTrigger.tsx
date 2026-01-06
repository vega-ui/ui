'use client';
import { FC, PropsWithChildren } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { CollapsibleTrigger, CollapsibleTriggerProps } from '../../../Collapsible';
import { useAccordionItemContext } from '../../contexts';

export type AccordionTriggerProps = CollapsibleTriggerProps

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