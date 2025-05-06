'use client';

import { cloneElement, FC, ReactElement } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';
import { DoubleArrowRightIcon } from '@vega-ui/icons';

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
  const childrenReact = (children as ReactElement)
  const childrenProps = (childrenReact?.props as Record<string, unknown>)

  return (
    <PaginationListItem>
      <IconButton
        aria-disabled={disabled}
        disabled={disabled}
        variant={variant ?? _variant}
        appearance='ghost'
        asChild={asChild}
        size={size ?? _size}
        {...props}
      >
        {(asChild && children)
          ? cloneElement(children as ReactElement, childrenProps, <DoubleArrowRightIcon />)
          : <a href={disabled ? undefined : href}><DoubleArrowRightIcon /></a>
        }
      </IconButton>
    </PaginationListItem>
  )
}