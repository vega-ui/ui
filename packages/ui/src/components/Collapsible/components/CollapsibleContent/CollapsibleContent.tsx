import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren, useContext } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@adara-cs/utils';
import { CollapsibleContext } from '../../providers/CollapsibleProvider/context.ts';

export type CollapsibleContentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const CollapsibleContent = forwardRef<HTMLDivElement, PropsWithChildren<CollapsibleContentProps>>(({
  className,
  children,
}, ref) => {
  const { opened, onTransitionEnd, wrapperRef, contentRef, hidden } = useContext(CollapsibleContext)

  return (
    <div ref={mergeRefs([ref, contentRef])} data-type='content' data-open={opened} hidden={hidden} onTransitionEnd={onTransitionEnd} className={csx(style.content, className)}>
      <div ref={wrapperRef}>
        {children}
      </div>
    </div>
  )
})