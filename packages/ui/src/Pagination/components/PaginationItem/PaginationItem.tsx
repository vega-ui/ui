import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Ref forwarded to the underlying `<li>` element.
   */
  ref?: Ref<HTMLLIElement>
}

/** The PaginationItem component renders one `<li>` of the pagination list, around a link, an ellipsis or a status text */
export const PaginationItem: FC<PaginationItemProps> = ({ className, ...props }) => {
  return <li className={csx(style.paginationItem, className)} {...props} />
}
