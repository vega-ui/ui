'use client';
import { DetailedHTMLProps, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@adara-cs/utils';
import { useCollapsibleContext } from '../../hooks';

export type CollapsibleContentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { wrapperClassName?: string };

export const CollapsibleContent = forwardRef<HTMLDivElement, PropsWithChildren<CollapsibleContentProps>>(({
  className,
  wrapperClassName,
  children,
}, ref) => {
  const { opened, onTransitionEnd, wrapperRef, contentRef, hidden } = useCollapsibleContext()

  return (
    <div ref={mergeRefs([ref, contentRef])} data-type='content' data-open={opened} hidden={hidden} onTransitionEnd={onTransitionEnd} className={csx(style.content, className)}>
      <div ref={wrapperRef} className={wrapperClassName}>
        {children}
      </div>
    </div>
  )
})