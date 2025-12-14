import { FC, HTMLAttributes, PropsWithChildren } from 'react';

/** The TableBody component represents the `<tbody>` section of a table, typically used to group rows of dynamic or structured data within a Table layout */
export const TableBody: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}