import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { csx } from '@vega-ui/utils';
import { PageControlProvider } from './contexts';
import { activeOf, PageControlEntry, pageControlWidget } from '@vega-ui/widgets/page-control';
import style from './style.module.css'
import { PageControlSize } from './types';

export interface PageControlProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Controlled active index.
   */
  active?: number
  
  /**
   * Uncontrolled initial active index.
   */
  defaultActive?: number
  
  /**
   * Callback that is triggered when the user selects a different page.
   * Receives the new index as a number.
   */
  onChangeActive?: (value: number) => void
  
  /**
   * Ref forwarded to the underlying <ul> element.
   */
  ref?: Ref<HTMLUListElement>
  
  /**
   * Defines the size of the page control items.
   */
  size?: PageControlSize
}

/** PageControl is a UI component that displays a sequence of page indicators, allowing users to navigate between steps or views. It supports interaction, active state management, and visual variants such as default or high-contrast styles. */
export const PageControl: FC<PropsWithChildren<PageControlProps>> = ({
  ref,
  active,
  defaultActive = 0,
  onChangeActive,
  children,
  className,
  size = 'md',
  ...props
}) => {
  const handle = useWidget(pageControlWidget, (items: readonly PageControlEntry[]) => ({
    items,
    active,
    defaultActive,
    onChangeActive: (index: number | null) => {
      if (index !== null) onChangeActive?.(index)
    },
  }), widgetEnvironment)
  const attrs = useOutput(handle, pageControlWidget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])
  const current = useSnapshot(handle, activeOf)

  return (
    <PageControlProvider handle={handle} size={size} active={current ?? undefined}>
      <ul
        ref={rootRef}
        className={csx(style.pageControl, className)}
        {...handle.listen(attrs, props)}
      >
        {children}
      </ul>
    </PageControlProvider>
  )
}
