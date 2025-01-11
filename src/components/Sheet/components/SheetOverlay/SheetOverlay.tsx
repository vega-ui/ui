import { FC, PropsWithChildren } from 'react';
import { FloatingOverlay } from '@floating-ui/react';
import { csx } from '../../../../utils/css';
import style from './style.module.css'

export interface SheetOverlayProps {
  hidden?: boolean
  blurred?: boolean
  className?: string
}

export const SheetOverlay: FC<PropsWithChildren<SheetOverlayProps>> = ({ hidden, className, blurred, children }) => {
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