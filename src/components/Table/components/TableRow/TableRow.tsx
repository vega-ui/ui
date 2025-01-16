import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '../../../../utils/css';

export const TableRow: FC<PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>> = ({ children, className, ...props }) => {
  return (
    <tr {...props} className={csx(style.row, className)}>
      {children}
    </tr>
  )
}