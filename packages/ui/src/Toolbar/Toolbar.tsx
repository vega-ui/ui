'use client';
import { FC, HTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { ToolbarEntry, ToolbarOrientation, toolbarWidget } from '@vega-ui/widgets/toolbar';
import { useOutput, useWidget, widgetEnvironment } from '../internals/widget';
import { ToolbarProvider } from './contexts';
import style from './style.module.css'

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Lays the items out in a row or a column; the arrow keys of that axis move the focus between them.
   * @default 'horizontal'
   */
  orientation?: ToolbarOrientation

  /**
   * Ref forwarded to the toolbar element.
   */
  ref?: Ref<HTMLDivElement>
}

/** Toolbar groups controls into one Tab stop: the arrow keys move the focus between its ToolbarItem and the buttons of a ToggleGroup, and Tab returns to the item that had the focus last. */
export const Toolbar: FC<ToolbarProps> = ({
  orientation = 'horizontal',
  className,
  ref,
  ...props
}) => {
  const handle = useWidget(toolbarWidget, (items: readonly ToolbarEntry[]) => ({ items, orientation }), widgetEnvironment)
  const attrs = useOutput(handle, toolbarWidget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <ToolbarProvider handle={handle} inside>
      <div
        ref={rootRef}
        data-orientation={orientation}
        className={csx(style.toolbar, className)}
        {...handle.listen(attrs, props)}
      />
    </ToolbarProvider>
  )
}
