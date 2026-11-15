import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { Slot } from '../../../Slot';

export interface GridRowGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * When `true`, renders the child element instead of a `<div>`, merging the props,
   * for example a `<tbody>`.
   *
   * @default false
   */
  asChild?: boolean
}

/**
 * GridRowGroup represents a logical grouping of rows within a Grid.
 */
export const GridRowGroup: FC<PropsWithChildren<GridRowGroupProps>> = ({ children, asChild, ...props }) => {
  const Element = asChild ? Slot : 'div'

  return (
    <Element role='rowgroup' {...props}>
      {children}
    </Element>
  )
}
