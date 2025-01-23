'use client';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export const TableFoot: FC<PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>> = ({ children, ...props }) => {
  return (
    <tfoot {...props}>
      {children}
    </tfoot>
  )
}