import { FC, HTMLAttributes, PropsWithChildren } from 'react';

/** The TableFoot component represents the `<tfoot>` section of a table, typically used to display summary rows, totals, or persistent footer content aligned with the table's columns */
export const TableFoot: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <tfoot {...props}>
      {children}
    </tfoot>
  )
}