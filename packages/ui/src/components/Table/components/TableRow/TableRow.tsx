import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

/** The TableRow component represents a single `<tr>` element within a table, used to group together a set of cells (`<td>` or `<th>`) in either the header, body, or footer sections of a table layout */
export const TableRow: FC<PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>> = ({ children, className, ...props }) => {
  return (
    <tr {...props} className={csx(style.row, className)}>
      {children}
    </tr>
  )
}