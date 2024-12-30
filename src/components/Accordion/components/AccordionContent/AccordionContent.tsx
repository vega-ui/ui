import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import style from './style.module.css';
import { csx } from '../../../../utils/css';

interface AccordionContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  hidden?: boolean
  open?: boolean
  wrapperRef?: Ref<HTMLDivElement>
}

export const AccordionContent = forwardRef<HTMLDivElement, PropsWithChildren<AccordionContentProps>>(({
  hidden,
  open,
  className,
  wrapperRef,
  onTransitionEnd,
  children,
}, ref) => {
  return (
    <div ref={ref} data-type='content' data-open={open} hidden={hidden} onTransitionEnd={onTransitionEnd} className={csx(style.content, className)}>
      <div ref={wrapperRef}>
        {children}
      </div>
    </div>
  )
})