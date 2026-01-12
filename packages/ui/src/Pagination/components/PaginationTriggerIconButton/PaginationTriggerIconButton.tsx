'use client';

import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { usePaginationContext } from '../../contexts';

export type PaginationTriggerIconButtonProps = IconButtonProps

/**
 * The PaginationTriggerIconButton component is a navigation control that takes the user to the page in a paginated list,
 * extending IconButtonProps
 */
export const PaginationTriggerIconButton: FC<PaginationTriggerIconButtonProps> = ({
  size,
  variant,
  children,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <IconButton
      variant={variant ?? _variant}
      appearance='ghost'
      size={size ?? _size}
      {...props}
    >
      {children}
    </IconButton>
  )
}