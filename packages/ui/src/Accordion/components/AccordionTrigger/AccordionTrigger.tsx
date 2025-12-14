'use client';
import { FC, PropsWithChildren, ReactElement, Ref } from 'react';
import { sizeMapper } from './helpers';
import { Icon } from '../../../Icon';
import { Heading } from '../../../Heading';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { CollapsibleTrigger } from '../../../Collapsible';
import { ChevronDown } from '@vega-ui/icons';
import { useAccordionItemContext } from '../../contexts';

export interface AccordionTriggerProps {
  /**
   * Optional class name for the trigger button element.
   */
  className?: string
  
  /**
   * Optional class name for the outer wrapper (`Heading` component).
   */
  wrapperClassName?: string
  
  /**
   * Optional class name for the arrow icon wrapper.
   */
  arrowIconClassName?: string
  
  /**
   * Custom arrow icon to display instead of the default.
   */
  arrowIcon?: ReactElement
  
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
  arrowIcon,
  className,
  arrowIconClassName,
  wrapperClassName,
  children,
  ref,
}) => {
  const { size } = useAccordionItemContext()

  return (
    <Heading as='h3' size={sizeMapper(size)} className={wrapperClassName}>
      <CollapsibleTrigger ref={ref} className={csx(style.triggerButton, className)} data-size={size}>
        {children}
        {arrowIcon ? arrowIcon : <Icon className={csx(style.arrowIcon, arrowIconClassName)} size='sm'><ChevronDown /></Icon>}
      </CollapsibleTrigger>
    </Heading>
  )
}