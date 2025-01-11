import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { csx } from '../../../../utils/css';
import style from './style.module.css'
import { IconButton } from '../../../IconButton';
import { Heading } from '../../../Heading';
import { useDrawerContext } from '../../hooks';

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  className?: string
}

export const DrawerHeader = forwardRef<HTMLDivElement, PropsWithChildren<DrawerHeaderProps>>(({
  className,
  title,
  children,
  ...props
}, ref) => {
  const { onChangeOpen } = useDrawerContext()

  return (
    <div
      ref={ref}
      className={csx(style.drawerHeader, className)}
      {...props}
    >
      {title && <Heading as='h3'>{title}</Heading>}
      <IconButton onClick={() => onChangeOpen(false)} aria-label='close' variant='secondary' appearance='transparent' name='close' size='small' />
      {children}
    </div>
  )
})