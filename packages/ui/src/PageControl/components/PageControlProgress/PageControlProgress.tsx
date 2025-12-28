import { FC, Ref, useRef, useEffect, useState, CSSProperties } from 'react';
import style from './style.module.css'
import { PageControlItem, PageControlItemProps } from '../PageControlItem';
import { csx, mergeRefs } from '@vega-ui/utils';
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

/** PageControlProgress is a UI component used within PageControl to represent a navigation item with a visual progress indicator. It animates over time and triggers a callback when the progress completes, enabling automatic step transitions. */
export const PageControlProgress: FC<PageControlProgressProps> = ({
  className,
  index,
  duration = 5000,
  current,
  size,
  style: _style,
  ref,
  ...props
}) => {
  const { active, size: _size } = usePageControlContext()
  const progressRef = useRef<HTMLButtonElement>(null)
  const [progressValue, setProgressValue] = useState(0)
  
  const isCurrent = current ?? (active === index)
  
  useEffect(() => {
    const el = progressRef.current
    if (!el || active !== index) return
    
    let prevRounded = 0
    
    const readProgress = () => {
      const style = getComputedStyle(el, '::after')
      const matrix = new DOMMatrixReadOnly(style.transform)
      const x = matrix.m41
      
      const percent = 1 - Math.abs(x / el.offsetWidth)
      const rounded = Math.round(percent * 100)
      
      if (prevRounded !== rounded) {
        prevRounded = rounded
        setProgressValue(rounded)
      }
      
      if (percent < 1) requestAnimationFrame(readProgress)
    }
    
    requestAnimationFrame(readProgress)
  }, [active, index])
  
  return (
    <PageControlItem
      ref={mergeRefs([ref, progressRef])}
      index={index}
      role={isCurrent ? 'meter' : undefined}
      aria-valuemax={isCurrent ? 100 : undefined}
      aria-valuenow={isCurrent ? progressValue : undefined}
      className={csx(style.pageControlProgress, className)}
      size={size ?? _size}
      style={{
        '--duration': `${duration}ms`,
        ..._style
      } as CSSProperties}
      {...props}
    />
  )
}