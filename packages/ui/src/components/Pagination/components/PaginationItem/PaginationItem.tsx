'use client';

import { cloneElement, FC, isValidElement } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { PaginationListItem } from '../PaginationListItem';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePaginationContext } from '../../hooks';

export interface PaginationItemProps extends ButtonProps {
  /**
   * Marks this item as the currently active page.
   * Applies visual emphasis.
   */
  current?: boolean

  /**
   * Optional link target for navigation.
   */
  href?: string
}

/**
 * The PaginationText component represents a single page  within a pagination interface.
 * It extends ButtonProps and supports dynamic behavior and styling.
 *
 * - If `asChild` is false, the `children` are rendered directly inside the Button.
 * - If `asChild` is true (default):
 *   - and `children` is a valid React element, it is cloned and passed through as the button content.
 *   - otherwise, a default `<a>` element is rendered with `href` (unless disabled).
 *
 * This makes the component fully composable and accessible, with both link-based and button-based pagination supported.
 */
export const PaginationItem: FC<PaginationItemProps> = ({
  className,
  disabled,
  current,
  asChild = true,
  variant,
  href,
  size,
  children,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <PaginationListItem>
      <Button
        aria-current={current ? 'page' : undefined}
        className={csx(style.paginationItem, className)}
        variant={variant ?? _variant}
        appearance={current ? 'fill' : 'transparent'}
        asChild={asChild}
        disabled={disabled}
        size={size ?? _size}
        {...props}
      >
        {!asChild ? children : isValidElement(children) ? cloneElement(children) : (
          <a aria-disabled={disabled} href={disabled ? undefined : href}>{children}</a>
        )}
      </Button>
    </PaginationListItem>
  )
}