import { FC, PropsWithChildren } from 'react';
import { csx } from '@vega-ui/utils';
import { IndexedSnapScrollerContent, IndexedSnapScrollerContentProps } from '../../../IndexedSnapScroller';
import style from './style.module.css'

export type YearPickerScrollerContentProps = Omit<IndexedSnapScrollerContentProps, 'index'>

/**
 * YearPickerScrollerContent is a styled wrapper around
 * IndexedSnapScrollerContent used to render a single scroll-snap page
 * within the YearPicker. It applies YearPicker-specific layout styles
 * while delegating index management and snapping behavior to the
 * underlying scroller system.
 */
export const YearPickerScrollerContent: FC<PropsWithChildren<YearPickerScrollerContentProps>> = ({ className, children, ...props }) => {
  return (
    <IndexedSnapScrollerContent {...props} className={csx(style.content, className)}>
      {children}
    </IndexedSnapScrollerContent>
  )
}