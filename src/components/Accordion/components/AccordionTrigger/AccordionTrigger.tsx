import { forwardRef, PropsWithChildren, ReactElement } from 'react';
import { sizeMapper } from './utils';
import { Icon } from '../../../Icon';
import { Heading } from '../../../Heading';
import { csx } from '../../../../utils/css';
import style from './style.module.css';

interface AccordionTriggerProps {
  size?: 'small' | 'medium' | 'large'
  open?: boolean
  className?: string
  wrapperClassName?: string
  arrowIconClassName?: string
  arrowIcon?: ReactElement
  onClick?: () => void
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, PropsWithChildren<AccordionTriggerProps>>(({
  size = 'medium',
  open,
  arrowIcon,
  className,
  arrowIconClassName,
  wrapperClassName,
  onClick,
  children,
}, ref) => {
  return (
    <Heading as='h3' size={sizeMapper(size)} className={wrapperClassName}>
      <button aria-expanded={open} data-size={size} data-open={open} onClick={onClick} ref={ref} className={csx(style.triggerButton, className)}>
        {children}
        {arrowIcon ? arrowIcon : <Icon className={csx(style.arrowIcon, arrowIconClassName)} size='pico' name='bottomArrow'/>}
      </button>
    </Heading>
  )
})