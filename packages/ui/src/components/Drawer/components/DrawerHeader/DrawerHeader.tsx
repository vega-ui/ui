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
  title?: string
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
  className,
  title,
  children,
  ref,
  ...props
}) => {
  const { onChangeOpen } = useDrawerContext()

  return (
    <div
      ref={ref}
      className={csx(style.drawerHeader, className)}
      {...props}
    >
      {title && <Heading as='h3' size={6}>{title}</Heading>}
      <IconButton onClick={() => onChangeOpen(false)} aria-label='close' variant='secondary' appearance='transparent' name='close' size='small' />
      {children}
    </div>
  )
}