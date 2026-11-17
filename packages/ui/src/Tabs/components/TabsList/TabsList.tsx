'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { tabsWidget } from '@vega-ui/widgets/tabs';
import { useOutput } from '../../../internals/widget';
import { useTabsContext } from '../../contexts';
import style from './style.module.css'

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the <div role="tablist"> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** TabsList is the tablist that holds the TabsTab buttons and moves the focus between them with the arrow keys. */
export const TabsList: FC<TabsListProps> = ({
  ref,
  className,
  ...props
}) => {
  const { handle, size } = useTabsContext()
  const attrs = useOutput(handle, tabsWidget.output.list)
  const listRef = useMergeRefs([handle.root, ref])

  return (
    <div
      ref={listRef}
      data-size={size}
      className={csx(style.list, className)}
      {...handle.listen(attrs, props)}
    />
  )
}
