import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface PaginationListProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Ref forwarded to the underlying `<ul>` element.
   */
  ref?: Ref<HTMLUListElement>
}

/** The PaginationList component renders the `<ul>` that lays out the pagination items in a row */
export const PaginationList: FC<PaginationListProps> = ({ className, ...props }) => {
  return <ul className={csx(style.paginationList, className)} {...props} />
}
