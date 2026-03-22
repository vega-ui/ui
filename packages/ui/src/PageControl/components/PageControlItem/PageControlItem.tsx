import { ButtonHTMLAttributes, FC, Ref } from 'react';
import style from './style.module.css'
import { usePageControlContext } from '../../contexts';
import { csx, mergeRefs } from '@vega-ui/utils';
import { PageControlSize } from '../../types';

export interface PageControlItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Index of the page item (zero-based).
   * Used to identify and compare with the active index from context.
   */
  index: number
  
  /**
   * Ref forwarded to the underlying button element.
   */
  ref?: Ref<HTMLButtonElement>
  
  /**
   * Forces this item to be marked as active, regardless of the context.
   * If not provided, active state is determined by comparing `index` with the active index from context.
   */
  current?: boolean
  
  /**
   * Defines the size of the page control items.
   */
  size?: PageControlSize
}

/** PageControlItem is a UI component that represents an individual navigation dot or step indicator within a PageControl group. It reflects active state, handles user interaction, and adapts visually based on context or variant. */
export const PageControlItem: FC<PageControlItemProps> = ({
  index,
  className,
  size,
  current,
  ref,
  ...props
}) => {
  const { active, size: _size, itemRef } = usePageControlContext()
  
  const _current = active === index
  const selected = current ?? _current
  
  return (
    <button
      role='tab'
      type='button'
      tabIndex={selected ? 0 : -1}
      ref={mergeRefs([ref, itemRef?.(index)])}
      disabled={current}
      data-index={index}
      aria-current={current ? 'page' : undefined}
      className={csx(style.pageControlItem, className)}
      aria-selected={selected}
      data-active={selected}
      data-size={_size ?? size}
      {...props}
    />
  )
}