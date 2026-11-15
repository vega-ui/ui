'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { PaginationProvider } from './contexts';
import { PaginationSize, PaginationVariant } from './types';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /**
   * Ref forwarded to the underlying `<nav>` element.
   */
  ref?: Ref<HTMLElement>

  /**
   * Size of the links and ellipses inside, unless one sets its own.
   */
  size?: PaginationSize

  /**
   * Visual variant of the links and ellipses inside, unless one sets its own.
   */
  variant?: PaginationVariant
}

/** Pagination is a `<nav>` landmark with links between the pages of content, commonly used in lists, tables, or search results. Name it with `aria-label` */
export const Pagination: FC<PaginationProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  return (
    <PaginationProvider variant={variant} size={size}>
      <nav {...props}>
        {children}
      </nav>
    </PaginationProvider>
  )
}
