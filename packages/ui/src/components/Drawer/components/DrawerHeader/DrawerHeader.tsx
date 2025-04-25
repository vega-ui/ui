'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { IconButton } from '../../../IconButton';
import { Heading } from '../../../Heading';
import { useDrawerContext } from '../../hooks';

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional title text displayed in the header.
   */
  title?: string

  /**
   * Custom class name applied to the header content container.
   */
  className?: string

  /**
   * Optional class name for the outer wrapper of the header.
   */
  wrapperClassName?: string

  /**
   * Ref forwarded to the drawer header element.
   * Useful for measuring, scrolling into view, or focus management.
   */
  ref?: Ref<HTMLDivElement>
}

/** The DrawerHeader component defines the top section of a drawer, typically used to display a title, actions, or a close button, and supports custom layout through class names and wrappers */
export const DrawerHeader: FC<DrawerHeaderProps> = ({
  className,
  wrapperClassName,
  title,
  children,
  ref,
  ...props
}) => {
  const { onChangeOpen } = useDrawerContext()

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      {...props}
    >
      <div className={csx(style.drawerHeader, className)}>
        {title && <Heading as='h3' size={6}>{title}</Heading>}
        <IconButton onClick={() => onChangeOpen(false)} aria-label='close' variant='secondary' appearance='transparent' name='close' size='small' />
      </div>
      {children}
    </div>
  )
}