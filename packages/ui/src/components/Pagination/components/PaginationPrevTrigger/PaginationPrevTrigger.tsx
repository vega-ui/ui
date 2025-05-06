'use client';

import { cloneElement, FC, ReactElement } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';
import { ArrowLeftIcon } from '@vega-ui/icons';

export interface PaginationPrevTriggerProps extends IconButtonProps {
  /**
   * Optional link target for the trigger.
   */
  href?: string
}

/**
 * The PaginationPrevTrigger component is a navigation control that moves the user to the previous page
 * in a paginated list. It extends IconButtonProps and optionally supports navigation via an `href` prop.
 *
 * - If `asChild` is `true` (default) and `children` is provided, that child will be used as the underlying element,
 *   allowing you to fully control the trigger structure (e.g. a custom `<a>` or `<button>`).
 * - If `asChild` is `true` but no `children` is provided, the component will render a default `<a>` tag
 *   with the provided `href`, unless `disabled` is set.
 */
export const PaginationPrevTrigger: FC<PaginationPrevTriggerProps> = ({
  disabled,
  asChild = true,
  children,
  href,
  variant,
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
        disabled={disabled}
        variant={variant ?? _variant}
        appearance='ghost'
        asChild={asChild}
        size={size ?? _size}
        {...props}
      >
        {(asChild && children)
          ? cloneElement(children as ReactElement, childrenProps, <ArrowLeftIcon />)
          : <a href={disabled ? undefined : href}><ArrowLeftIcon /></a>
        }
      </IconButton>
    </PaginationListItem>
  )
}