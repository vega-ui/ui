import { FC, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type AlertMainProps = HTMLAttributes<HTMLDivElement>

/**
 * AlertMain serves as the main layout container for Alert content.
 * It is used to group and align the primary elements of an Alert,
 * such as the icon, title, and descriptive text.
 */
export const AlertMain: FC<AlertMainProps> = ({ className, children, ...props }) => {
  return (
    <div className={csx(style.main, className)} {...props}>
      {children}
    </div>
  )
}