'use client';

import { FC } from 'react';
import { Button, ButtonProps } from '../../../Button';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePaginationContext } from '../../contexts';

export interface PaginationItemProps extends ButtonProps {
  /**
   * Marks this item as the currently active page.
   * Applies visual emphasis.
   */
  current?: boolean
}

/**
 * The PaginationText component represents a single page  within a pagination interface.
 * It extends ButtonProps and supports dynamic behavior and styling.
 *
 * This makes the component fully composable and accessible, with both link-based and button-based pagination supported.
 */
export const PaginationItem: FC<PaginationItemProps> = ({
  className,
  disabled,
  current,
  variant,
  size,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <Button
      aria-current={current ? 'page' : undefined}
      className={csx(style.paginationItem, className)}
      variant={variant ?? _variant}
      appearance={current ? 'fill' : 'transparent'}
      disabled={disabled}
      size={size ?? _size}
      {...props}
    />
  )
}