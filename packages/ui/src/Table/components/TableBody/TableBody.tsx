import { FC, HTMLAttributes } from 'react';

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

/** The TableBody component represents the `<tbody>` section of a table, typically used to group rows of dynamic or structured data within a Table layout */
export const TableBody: FC<TableBodyProps> = ({ children, ...props }) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}