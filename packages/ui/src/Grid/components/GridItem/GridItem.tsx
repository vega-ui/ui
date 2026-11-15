import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { GridItemSize, GridItemVariant } from '../../types';
import style from './style.module.css';

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the item element.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Controls the item’s visual size.
   *
   * @default 'md'
   */
  size?: GridItemSize

  /**
   * Color of the selected item.
   *
   * @default 'secondary'
   */
  variant?: GridItemVariant
}

/**
 * GridItem is the look of a selectable cell: sizes, the selected state,
 * the range from start to end, and the disabled state. It has no behavior of its own
 * and is placed inside `<GridCell asChild>`, which gives it the role, focus,
 * `aria-selected`, `aria-disabled` and `data-range`.
 */
export const GridItem: FC<PropsWithChildren<GridItemProps>> = ({ size = 'md', variant = 'secondary', className, ...props }) => {
  return <div data-size={size} data-variant={variant} className={csx(style.item, className)} {...props} />
}
