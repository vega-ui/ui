'use client';
import { FC, PropsWithChildren, ReactElement, Ref } from 'react';
import { sizeMapper } from './utils';
import { Icon } from '../../../Icon';
import { Heading } from '../../../Heading';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { CollapsibleTrigger } from '../../../Collapsible';
import { BottomArrowIcon } from '@vega-ui/icons';

interface AccordionTriggerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  wrapperClassName?: string
  arrowIconClassName?: string
  arrowIcon?: ReactElement
  ref?: Ref<HTMLButtonElement>
}

export const AccordionTrigger: FC<PropsWithChildren<AccordionTriggerProps>> = ({
  size = 'medium',
  arrowIcon,
  className,
  arrowIconClassName,
  wrapperClassName,
  children,
  ref,
}) => {
  return (
    <Heading as='h3' size={sizeMapper(size)} className={wrapperClassName}>
      <CollapsibleTrigger ref={ref} className={csx(style.triggerButton, className)} data-size={size}>
        {children}
        {arrowIcon ? arrowIcon : <Icon className={csx(style.arrowIcon, arrowIconClassName)} size='3xs'><BottomArrowIcon /></Icon>}
      </CollapsibleTrigger>
    </Heading>
  )
}