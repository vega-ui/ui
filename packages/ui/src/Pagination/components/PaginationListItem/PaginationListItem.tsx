import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PaginationListItemProps = PropsWithChildren<HTMLAttributes<HTMLLIElement>>;

/**
 * PaginationListItem
 *
 * List item used inside Pagination.
 * Wraps content in `<li>` and applies base styles.
 */
export const PaginationListItem: FC<PaginationListItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={csx(style.paginationListItem, className)} {...props}>
      {children}
    </li>
  )
}