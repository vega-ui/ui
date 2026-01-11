import { FC, HTMLAttributes } from 'react';

export type TableFootProps = HTMLAttributes<HTMLTableSectionElement>

/** The TableFoot component represents the `<tfoot>` section of a table, typically used to display summary rows, totals, or persistent footer content aligned with the table's columns */
export const TableFoot: FC<TableFootProps> = ({ children, ...props }) => {
  return (
    <tfoot {...props}>
      {children}
    </tfoot>
  )
}