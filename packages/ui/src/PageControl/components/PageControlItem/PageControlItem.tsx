import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useItem, useOutput } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { usePageControlContext } from '../../contexts';
import { currentTabOf, tabPart } from '@vega-ui/widgets/page-control';
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
  disabled,
  ref,
  ...props
}) => {
  const { handle, size: _size } = usePageControlContext()
  const register = useItem(handle, index, { disabled: disabled === true })
  const itemRef = useMergeRefs([register, ref])
  const attrs = useOutput(handle, tabPart, index)
  const forced = current === undefined ? undefined : currentTabOf(current)

  return (
    <button
      type='button'
      ref={itemRef}
      disabled={disabled}
      data-index={index}
      className={csx(style.pageControlItem, className)}
      data-size={size ?? _size}
      {...handle.merge(attrs, { ...forced, ...props })}
    />
  )
}
