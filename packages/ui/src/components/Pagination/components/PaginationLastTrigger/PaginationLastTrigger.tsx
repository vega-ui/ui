'use client';

import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';

export interface PaginationLastTriggerProps extends IconButtonProps {
  /**
   * Optional link target for the trigger.
   */
  href?: string
}

/**
 * The PaginationLastTrigger component is a navigation control that takes the user to the last page in a paginated list,
 * extending IconButtonProps and optionally acting as a link via the href prop
 *
 * - If `asChild` is `true` (default) and `children` is provided, that child will be used as the underlying element,
 *   allowing you to fully control the trigger structure (e.g. a custom `<a>` or `<button>`).
 * - If `asChild` is `true` but no `children` is provided, the component will render a default `<a>` tag
 *   with the provided `href`, unless `disabled` is set.
 */
export const PaginationLastTrigger: FC<PaginationLastTriggerProps> = ({
  disabled,
  asChild = true,
  href,
  size,
  children,
  variant,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <PaginationListItem>
      <IconButton
        aria-disabled={disabled}
        disabled={disabled}
        variant={variant ?? _variant}
        name='doubleArrowRight'
        appearance='ghost'
        asChild={asChild}
        size={size ?? _size}
        {...props}
      >
        {(asChild && children) ? children : <a href={disabled ? undefined : href} />}
      </IconButton>
    </PaginationListItem>
  )
}