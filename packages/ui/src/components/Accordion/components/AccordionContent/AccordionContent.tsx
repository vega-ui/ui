import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';
import { CollapsibleContent } from '../../../Collapsible';

type AccordionContentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const AccordionContent = forwardRef<HTMLDivElement, PropsWithChildren<AccordionContentProps>>(({
  className,
  children,
}, ref) => {
  return (
    <CollapsibleContent className={csx(style.content, className)} ref={ref}>
      {children}
    </CollapsibleContent>
  )
})