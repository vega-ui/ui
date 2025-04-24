'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { PaginationProvider } from './providers';
import { IconButtonProps } from '../IconButton';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /**
   * Custom class name applied to the card container.
   * Useful for styling or layout control.
   */
  className?: string

  /**
   * Ref forwarded to the underlying card element.
   */
  ref?: Ref<HTMLUListElement>

  /**
   * Visual size of the card, inherited from IconButtonProps.
   * Controls padding, font size, or spacing according to the design system scale.
   */
  size?: IconButtonProps['size']

  /**
   * Visual variant of the component.
   * Inherits available values from `IconButtonProps['variant']`, such as 'primary' or 'secondary'.
   * Controls the visual style (color, background, border) according to the design system.
   */
  variant?: IconButtonProps['variant']
}

/** Pagination is a UI component that divides content into discrete pages and provides navigation controls, allowing users to move between different sections of content, commonly used in lists, tables, or search results */
export const Pagination: FC<CardProps> = ({
  children,
  className,
  size = 'medium',
  variant = 'primary',
  ref,
  ...props
}) => {
  return (
    <PaginationProvider variant={variant} size={size}>
      <ul ref={ref} className={csx(style.pagination, className)} {...props}>
        {children}
      </ul>
    </PaginationProvider>
  )
}