'use client';
import { DetailedHTMLProps, FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';
import { CollapsibleContent } from '../../../Collapsible';

interface AccordionContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

export const AccordionContent: FC<AccordionContentProps> = ({
 className,
 children,
  ref,
}) => {
  return (
    <CollapsibleContent className={csx(style.content, className)} ref={ref}>
      {children}
    </CollapsibleContent>
  )
}