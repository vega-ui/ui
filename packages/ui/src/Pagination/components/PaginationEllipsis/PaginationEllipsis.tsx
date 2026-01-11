'use client';

import { FC } from 'react';
import { Button, ButtonProps } from '../../../Button';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { usePaginationContext } from '../../contexts';

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
  )
}