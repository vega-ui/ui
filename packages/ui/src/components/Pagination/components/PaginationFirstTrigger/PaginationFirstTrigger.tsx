'use client';

import { IconButton, IconButtonProps } from '../../../IconButton';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';
import { DoubleArrowLeftIcon } from '@adara-cs/icons';

export interface PaginationFirstTriggerProps extends IconButtonProps {
  /**
   * Optional link target for the trigger.
   */
  href?: string
}

/**
 * The PaginationLastTrigger component is a navigation control that takes the user to the first page in a paginated list,
 * extending IconButtonProps and optionally acting as a link via the href prop
 *
 * - If `asChild` is `true` (default) and `children` is provided, that child will be used as the underlying element,
 *   allowing you to fully control the trigger structure (e.g. a custom `<a>` or `<button>`).
 * - If `asChild` is `true` but no `children` is provided, the component will render a default `<a>` tag
 *   with the provided `href`, unless `disabled` is set.
 */
export const PaginationFirstTrigger = ({
  disabled,
  asChild = true,
  children,
  size,
  href,
  variant,
  ...props
}: PaginationFirstTriggerProps) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <PaginationListItem>
      <IconButton
        asChild={asChild}
        aria-disabled={disabled}
        variant={variant ?? _variant}
        appearance='ghost'
        size={size ?? _size}
        disabled={disabled}
        {...props}
      >
        {(asChild && children) ? children : <a href={disabled ? undefined : href}><DoubleArrowLeftIcon /></a>}
      </IconButton>
    </PaginationListItem>
  )
}