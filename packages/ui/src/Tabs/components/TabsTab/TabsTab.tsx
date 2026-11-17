'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { tabPart } from '@vega-ui/widgets/tabs';
import { useItem, useOutput } from '../../../internals/widget';
import { useTabsContext } from '../../contexts';
import { TabsSize } from '../../types';
import style from './style.module.css'

export interface TabsTabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'value'> {
  /**
   * Value of the tab, matched by the `value` of its TabsPanel.
   */
  value: string

  /**
   * Size of the tab. Falls back to the size of Tabs.
   */
  size?: TabsSize

  /**
   * Ref forwarded to the <button role="tab"> element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** TabsTab is the button that shows its TabsPanel. */
export const TabsTab: FC<TabsTabProps> = ({
  value,
  size,
  disabled,
  className,
  ref,
  ...props
}) => {
  const { handle, size: _size } = useTabsContext()
  const register = useItem(handle, value, { disabled: disabled === true })
  const tabRef = useMergeRefs([register, ref])
  const attrs = useOutput(handle, tabPart, value)

  return (
    <button
      type='button'
      ref={tabRef}
      disabled={disabled}
      data-size={size ?? _size}
      className={csx(style.tab, className)}
      {...handle.merge(attrs, props)}
    />
  )
}
