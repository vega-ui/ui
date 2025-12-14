import { FC, HTMLAttributes, PropsWithChildren } from 'react';

/** The TableHead component represents the `<thead>` section of a table, typically used to define column headers and labels that describe the content structure of the table rows */
export const TableHead: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <thead {...props}>
     {children}
    </thead>
  )
}