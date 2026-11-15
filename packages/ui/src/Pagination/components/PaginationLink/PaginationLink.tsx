'use client';

import { AnchorHTMLAttributes, FC, Ref } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { Slot } from '../../../Slot';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePaginationContext } from '../../contexts';
import { PaginationSize, PaginationVariant } from '../../types';

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Ref forwarded to the rendered `<a>` element.
   */
  ref?: Ref<HTMLAnchorElement>

  /**
   * Renders the child element instead of `<a>`, for example a router link or a `<button>`.
   * The address goes on the child.
   */
  asChild?: boolean

  /**
   * Marks the link as the current page with `aria-current='page'` and applies visual emphasis.
   */
  current?: boolean

  /**
   * Size of the link. Defaults to the size of `Pagination`.
   */
  size?: PaginationSize

  /**
   * Visual variant of the link. Defaults to the variant of `Pagination`.
   */
  variant?: PaginationVariant

  /**
   * Structural appearance of the link, like on `Button`.
   * Defaults to `fill` for the current page and `transparent` for the others.
   */
  appearance?: ButtonProps['appearance']
}

/** The PaginationLink component renders a link to a page, or with `asChild` a router link or a button */
export const PaginationLink: FC<PaginationLinkProps> = ({
  className,
  current,
  variant,
  size,
  appearance,
  asChild,
  children,
  ...props
}) => {
  const context = usePaginationContext()
  const Element = asChild ? Slot : 'a'

  return (
    <Button
      asChild
      aria-current={current ? 'page' : undefined}
      className={csx(style.paginationLink, className)}
      variant={variant ?? context.variant}
      appearance={appearance ?? (current ? 'fill' : 'transparent')}
      size={size ?? context.size}
    >
      <Element {...props}>{children}</Element>
    </Button>
  )
}
