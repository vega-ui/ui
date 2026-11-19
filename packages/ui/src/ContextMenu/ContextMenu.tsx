'use client';
import { FC, ReactNode, useId } from 'react';
import { ANCHOR, contextMenuWidget, MenuEntry } from '@vega-ui/widgets/menu';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { anchorNameOf } from '../internals/anchor';
import { MenuProvider } from '../Menu/contexts';
import { MenuSize } from '../Menu';
import style from './style.module.css'

export interface ContextMenuProps {
  /**
   * The ContextMenuTrigger and the MenuContent of the menu.
   */
  children?: ReactNode

  /**
   * Called when the menu is shown or hidden.
   */
  onChangeOpen?: (open: boolean) => void

  /**
   * Size of the menu items.
   * @default 'md'
   */
  size?: MenuSize
}

/** ContextMenu is a menu that opens where the user asks for it: a right click, a long touch or the context menu key on its ContextMenuTrigger. It renders only a hidden point for the menu to open at; its items are the parts of Menu. */
export const ContextMenu: FC<ContextMenuProps> = ({
  onChangeOpen,
  size = 'md',
  children,
}) => {
  const handle = useWidget(contextMenuWidget, (items: readonly MenuEntry[]) => ({ items, onChangeOpen }), widgetEnvironment)
  const anchorName = anchorNameOf(useId())

  return (
    <MenuProvider handle={handle} size={size} side='point' anchorName={anchorName} content={contextMenuWidget.output.content}>
      <span aria-hidden popover='manual' ref={handle.part(ANCHOR, contextMenuWidget.output.anchor)} className={style.anchor} style={{ anchorName }} />
      {children}
    </MenuProvider>
  )
}
