import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { csx, mergeRefs } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useSnapScrollerContext } from '../../contexts';
import style from './style.module.css'

export interface SnapScrollerContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Sequential index of the item inside SnapScroller.
   * Used to derive the snapped page via the element's `data-index`.
   */
  index: number;
  
  /**
   * Render the content as a child (via `Slot`) instead of a native <div>.
   * Keeps attributes/refs bound to the passed child element.
   */
  asChild?: boolean;
  
  /**
   * External ref to the item's root element.
   * Will be merged with internal `itemRef(index)` to participate in snapping logic.
   */
  ref?: Ref<HTMLDivElement>
}

/** SnapScrollerContent is a single snap-aligned item within SnapScroller. */
export const SnapScrollerContent: FC<PropsWithChildren<SnapScrollerContentProps>> = ({
  className,
  ref,
  asChild = false,
  index,
  children,
  ...props
}) => {
  const { itemRef } = useSnapScrollerContext()
  
  const Element = asChild ? Slot : 'div'

  return (
    <Element
      data-index={index}
      className={csx(style.content, className)}
      ref={mergeRefs([itemRef(index), ref])}
      {...props}
    >
      {children}
    </Element>
  )
}