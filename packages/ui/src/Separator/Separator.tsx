import { FC, HTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the orientation of the separator.
   *
   * - 'horizontal': Divider between blocks (default)
   * - 'vertical': Divider between inline elements or columns
   */
  orientation?: 'horizontal' | 'vertical'
}

/** A Separator is a UI component used to visually divide content into distinct sections, often represented as a line or space to enhance clarity and organization in layouts */
export const Separator: FC<SeparatorProps> = ({ orientation = 'horizontal', className, ...props }) => {
  return (
    <div role='separator' {...props} data-orientation={orientation} className={csx(style.separator, className)} />
  );
}