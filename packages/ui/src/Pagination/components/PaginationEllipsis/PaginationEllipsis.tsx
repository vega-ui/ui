'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { Button } from '../../../Button';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePaginationContext } from '../../contexts';
import { PaginationSize, PaginationVariant } from '../../types';

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Ref forwarded to the underlying `<li>` element.
   */
  ref?: Ref<HTMLLIElement>

  /**
   * Size of the ellipsis. Defaults to the size of `Pagination`.
   */
  size?: PaginationSize

  /**
   * Visual variant of the ellipsis. Defaults to the variant of `Pagination`.
   */
  variant?: PaginationVariant
}

/** The PaginationEllipsis component renders an `<li>` hidden from assistive technologies that marks skipped pages, as wide as a link of the same size. The links around it name their pages, so it needs no text of its own */
export const PaginationEllipsis: FC<PaginationEllipsisProps> = ({
  className,
  size,
  variant,
  children = '…',
  ...props
}) => {
  const context = usePaginationContext()

  return (
    <Button
      asChild
      className={csx(style.paginationEllipsis, className)}
      variant={variant ?? context.variant}
      appearance='transparent'
      size={size ?? context.size}
    >
      <li aria-hidden {...props}>{children}</li>
    </Button>
  )
}
