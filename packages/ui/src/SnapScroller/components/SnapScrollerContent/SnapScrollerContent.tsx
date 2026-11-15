import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useItem } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
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
   * Merged with the ref that registers the item with the scroller under its `index`.
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
  const { handle } = useSnapScrollerContext()
  const register = useItem(handle, index)
  const mergedRef = useMergeRefs([register, ref])

  const Element = asChild ? Slot : 'div'

  return (
    <Element
      data-index={index}
      className={csx(style.content, className)}
      ref={mergedRef}
      {...props}
    >
      {children}
    </Element>
  )
}