import { ButtonHTMLAttributes, FC, Ref } from 'react';
import style from './style.module.css'
import { usePageControlContext } from '../../hooks';
import { csx } from '@vega-ui/utils';
import { PageControlVariant } from '../../types.ts';

export interface PageControlItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Index of the page item (zero-based).
   * Used to identify and compare with the active index from context.
   */
  index: number
  
  /**
   * Optional class name applied to the outer <li> wrapper.
   * Useful for layout or spacing overrides.
   */
  wrapperClassName?: string
  
  /**
   * Ref forwarded to the underlying button element.
   */
  ref?: Ref<HTMLButtonElement>
  
  /**
   * Visual variant of the page control item.
   * Inherits available values from `PageControlVariant`, such as 'default' or 'high-contrast'.
   */
  variant?: PageControlVariant
  
  /**
   * Forces this item to be marked as active, regardless of the context.
   * If not provided, active state is determined by comparing `index` with the active index from context.
   */
  current?: boolean
}

/** PageControlItem is a UI component that represents an individual navigation dot or step indicator within a PageControl group. It reflects active state, handles user interaction, and adapts visually based on context or variant. */
export const PageControlItem: FC<PageControlItemProps> = ({
  index,
  wrapperClassName,
  className,
  children,
  variant,
  current,
  ref,
  ...props
}) => {
  const { active, variant: _variant } = usePageControlContext()
  
  const _current = active === index
  
  return (
    <li className={csx(style.wrapper, wrapperClassName)}>
      <button
        ref={ref}
        disabled={current}
        data-index={index}
        aria-current={current ? 'page' : undefined}
        className={csx(style.pageControlItem, className)}
        data-active={current ?? _current}
        data-variant={variant ?? _variant}
        {...props}
      >
        {children}
      </button>
    </li>
  )
}