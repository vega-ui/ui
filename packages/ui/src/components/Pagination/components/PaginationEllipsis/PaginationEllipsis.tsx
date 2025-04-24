'use client';

import { FC } from 'react';
import { Button, ButtonProps } from '../../../Button';
import { PaginationListItem } from '../PaginationListItem';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { usePaginationContext } from '../../hooks';

export type PaginationEllipsisProps = ButtonProps

/** The PaginationEllipsis component visually indicates a gap in the pagination range (e.g., "…") and is typically used to show skipped pages between the current and boundary items in large paginated lists. */
export const PaginationEllipsis: FC<PaginationEllipsisProps> = ({
  className,
  size,
  variant,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <PaginationListItem>
      <Button
        className={csx(style.paginationEllipsis, className)}
        variant={variant ?? _variant}
        aria-hidden='true'
        appearance='transparent'
        asChild
        size={size ?? _size}
        {...props}
      >
        <div>
          ...
        </div>
      </Button>
    </PaginationListItem>
  )
}