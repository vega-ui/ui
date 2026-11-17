'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { PANEL, panelPart } from '@vega-ui/widgets/tabs';
import { useOutput, usePart } from '../../../internals/widget';
import { useTabsContext } from '../../contexts';
import style from './style.module.css'

export interface TabsPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Value of the TabsTab that shows this panel.
   */
  value: string

  /**
   * Ref forwarded to the <div role="tabpanel"> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** TabsPanel is the content of a tab. A hidden panel stays mounted and is found by the browser's find in page, which shows its tab. */
export const TabsPanel: FC<TabsPanelProps> = ({
  value,
  className,
  ref,
  ...props
}) => {
  const { handle } = useTabsContext()
  const attrs = useOutput(handle, panelPart, value)
  const register = usePart(handle, PANEL, panelPart, value)
  const panelRef = useMergeRefs([register, ref])

  return (
    <div
      ref={panelRef}
      className={csx(style.panel, className)}
      {...handle.merge(attrs, props)}
    />
  )
}
