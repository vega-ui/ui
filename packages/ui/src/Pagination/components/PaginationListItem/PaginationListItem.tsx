import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PaginationItemProps = PropsWithChildren<HTMLAttributes<HTMLLIElement>>;

export const PaginationListItem: FC<PaginationItemProps> = ({ children, className, ...props }) => {
  return (
    <li {...props} className={csx(style.paginationListItem, className)}>
      {children}
    </li>
  )
}