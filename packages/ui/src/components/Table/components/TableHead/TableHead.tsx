import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const TableHead: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <thead {...props}>
     {children}
    </thead>
  )
}