'use client';
import { FC, ReactNode, useId } from 'react';
import { MenuEntry, submenuWidget } from '@vega-ui/widgets/menu';
import { useWidget, widgetEnvironment } from '../../../internals/widget';
import { anchorNameOf } from '../../../internals/anchor';
import { MenuProvider, useMenuContext } from '../../contexts';

export interface MenuSubmenuProps {
  /**
   * The MenuSubmenuTrigger and the MenuContent of the submenu.
   */
  children?: ReactNode

  /**
   * Whether the submenu is shown. Enables controlled mode when set.
   */
  open?: boolean

  /**
   * Whether the submenu is shown on mount.
   */
  defaultOpen?: boolean

  /**
   * Called when the submenu is shown or hidden.
   */
  onChangeOpen?: (open: boolean) => void
}

/** MenuSubmenu is a submenu inside a MenuContent: its MenuSubmenuTrigger is an item of the menu around it, and its MenuContent opens beside that item. It renders no element of its own. */
export const MenuSubmenu: FC<MenuSubmenuProps> = ({
  open,
  defaultOpen,
  onChangeOpen,
  children,
}) => {
  const parent = useMenuContext()
  const handle = useWidget(submenuWidget, (items: readonly MenuEntry[]) => ({ items, open, defaultOpen, onChangeOpen }), widgetEnvironment)
  const anchorName = anchorNameOf(useId())

  return (
    <MenuProvider handle={handle} size={parent.size} side='inline-end' align='start' anchorName={anchorName} parent={parent}>
      {children}
    </MenuProvider>
  )
}
