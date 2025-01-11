import { FC, PropsWithChildren } from 'react';
import { FloatingOverlay } from '@floating-ui/react';
import { csx } from '../../../../utils/css';
import style from './style.module.css'

export interface DrawerOverlayProps {
  hidden?: boolean
  blurred?: boolean
  className?: string
}

export const DrawerOverlay: FC<PropsWithChildren<DrawerOverlayProps>> = ({ hidden, className, blurred, children }) => {
  return (
    <FloatingOverlay
      hidden={hidden}
      data-blurred={blurred}
      className={csx(style.overlay, className)}
      lockScroll
    >
      {children}
    </FloatingOverlay>
  )
}