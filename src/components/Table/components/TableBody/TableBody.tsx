import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const TableBody: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}