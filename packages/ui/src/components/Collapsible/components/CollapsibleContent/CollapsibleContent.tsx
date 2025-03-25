'use client';
import { DetailedHTMLProps, FC, HTMLAttributes, Ref, useLayoutEffect, useRef } from 'react';
import style from './style.module.css';
import { csx, mergeRefs } from '@adara-cs/utils';
import { useCollapsibleContext } from '../../hooks';

export interface CollapsibleContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  wrapperClassName?: string
  ref?: Ref<HTMLDivElement>
}

export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  className,
  wrapperClassName,
  ref,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { opened, onTransitionEnd, hidden } = useCollapsibleContext()

  useLayoutEffect(() => {
    const contentNode = contentRef.current
    const wrapperNode = wrapperRef.current

    if (contentNode && wrapperNode) {
      const rectHeight = wrapperNode.getBoundingClientRect().height
      contentNode.style.setProperty('--content-height', rectHeight + 'px')
    }
  });

  return (
    <div ref={mergeRefs([ref, contentRef])} data-type='content' data-open={opened} hidden={hidden} onTransitionEnd={onTransitionEnd} className={csx(style.content, className)}>
      <div ref={wrapperRef} className={wrapperClassName}>
        {children}
      </div>
    </div>
  )
}