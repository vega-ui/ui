'use client';

import { cloneElement, FC, ReactElement } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';
import { ArrowRightIcon } from '@adara-cs/icons';

export interface PaginationNextTriggerProps extends IconButtonProps {
  /**
   * Optional link target for the trigger.
   */
  href?: string
}

/**
 * The PaginationNextTrigger component is a navigation control that advances the user to the next page in a paginated list,
 * extending IconButtonProps and optionally supporting link-based navigation through the href prop.
 *
 *  - If `asChild` is `true` (default) and `children` is provided, that child will be used as the underlying element,
 *    allowing you to fully control the trigger structure (e.g. a custom `<a>` or `<button>`).
 *  - If `asChild` is `true` but no `children` is provided, the component will render a default `<a>` tag
 *    with the provided `href`, unless `disabled` is set.
 */
export const PaginationNextTrigger: FC<PaginationNextTriggerProps> = ({
  disabled,
  asChild = true,
  variant,
  children,
  href,
  size,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()
  const childrenReact = (children as ReactElement)
  const childrenProps = (childrenReact?.props as Record<string, unknown>)

  return (
    <PaginationListItem>
      <IconButton
        aria-disabled={disabled}
        variant={variant ?? _variant}
        asChild={asChild}
        disabled={disabled}
        appearance='ghost'
        size={size ?? _size}
        {...props}
      >
        {(asChild && children)
          ? cloneElement(children as ReactElement, childrenProps, <ArrowRightIcon />)
          : <a href={disabled ? undefined : href}><ArrowRightIcon /></a>
        }
      </IconButton>
    </PaginationListItem>
  )
}