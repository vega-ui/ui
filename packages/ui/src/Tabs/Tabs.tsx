'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TabsActivation, TabsEntry, TabsOrientation, tabsWidget } from '@vega-ui/widgets/tabs';
import { TabsProvider } from './contexts';
import { TabsSize, TabsVariant } from './types';
import style from './style.module.css'

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Value of the selected tab. Enables controlled mode when set.
   */
  value?: string

  /**
   * Value of the tab selected on mount. Without it the first enabled tab is shown.
   */
  defaultValue?: string

  /**
   * Called with the value of the tab the user selects.
   */
  onChangeValue?: (value: string) => void

  /**
   * `automatic` shows a tab as soon as the arrow keys move to it; `manual` only moves the focus, and Enter or Space shows the focused tab. A click shows the clicked tab in both.
   */
  activation?: TabsActivation

  /**
   * Direction of the tab list: the arrow keys follow it.
   */
  orientation?: TabsOrientation

  /**
   * Size of the tabs.
   */
  size?: TabsSize

  /**
   * Color of the line under the selected tab.
   */
  variant?: TabsVariant

  /**
   * Ref forwarded to the root <div> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** Tabs shows one panel of content at a time, picked by a tab in its TabsList. */
export const Tabs: FC<TabsProps> = ({
  value,
  defaultValue,
  onChangeValue,
  activation = 'automatic',
  orientation = 'horizontal',
  size = 'md',
  variant = 'secondary',
  className,
  children,
  ...props
}) => {
  const handle = useWidget(tabsWidget, (items: readonly TabsEntry[]) => ({
    items,
    activation,
    orientation,
    value,
    defaultValue,
    onChangeValue: (next: string | null) => {
      if (next !== null) onChangeValue?.(next)
    },
  }), widgetEnvironment)

  return (
    <TabsProvider handle={handle} size={size}>
      <div data-orientation={orientation} data-variant={variant} className={csx(style.tabs, className)} {...props}>
        {children}
      </div>
    </TabsProvider>
  )
}
