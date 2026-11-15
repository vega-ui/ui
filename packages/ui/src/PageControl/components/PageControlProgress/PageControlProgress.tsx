import { FC, Ref, CSSProperties } from 'react';
import style from './style.module.css'
import { PageControlItem, PageControlItemProps } from '../PageControlItem';
import { csx } from '@vega-ui/utils';
import { usePageControlContext } from '../../contexts';
import { PageControlSize } from '../../types';

export interface PageControlProgressProps extends PageControlItemProps {
  /**
   * Index of the page item (zero-based).
   * Used to determine whether this item is currently active.
   */
  index: number
  
  /**
   * Duration of the progress animation in milliseconds.
   * Controls how long the visual fill takes to complete.
   * Defaults to 5000ms if not provided.
   */
  duration?: number
  
  /**
   * Ref forwarded to the underlying button element.
   */
  ref?: Ref<HTMLButtonElement>
  
  /**
   * Whether this page item is currently active.
   * If not provided, active state is inferred from context.
   */
  current?: boolean
  
  /**
   * Defines the size of the page control items.
   */
  size?: PageControlSize
}

/** PageControlProgress is a UI component used within PageControl to represent a navigation item with a visual progress indicator. It fills over `duration` while active; the native `onAnimationEnd` fires once the fill completes, enabling automatic step transitions. */
export const PageControlProgress: FC<PageControlProgressProps> = ({
  className,
  index,
  duration = 5000,
  size,
  style: _style,
  ...props
}) => {
  const { size: _size } = usePageControlContext()

  return (
    <PageControlItem
      index={index}
      size={size ?? _size}
      className={csx(style.pageControlProgress, className)}
      style={{
        '--duration': `${duration}ms`,
        ..._style
      } as CSSProperties}
      {...props}
    />
  )
}