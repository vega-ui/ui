'use client';
import { FC, ReactNode, useId } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { anchorNameOf, Placement } from '../internals/anchor';
import { MenuEntry, menuWidget } from '@vega-ui/widgets/menu';
import { MenuProvider } from './contexts';
import { MenuSize } from './types';

export interface MenuProps {
  /**
   * The MenuTrigger and the MenuContent of the menu.
   */
  children?: ReactNode

  /**
   * Whether the menu is shown. Enables controlled mode when set.
   */
  open?: boolean

  /**
   * Whether the menu is shown on mount.
   */
  defaultOpen?: boolean

  /**
   * Called when the menu is shown or hidden.
   */
  onChangeOpen?: (open: boolean) => void

  /**
   * Preferred placement of the menu relative to its trigger. The menu moves to the opposite side when there is no room.
   */
  placement?: Placement

  /**
   * Size of the menu items.
   */
  size?: MenuSize
}

/** Menu is a list of actions or options that a MenuTrigger button shows, following the WAI-ARIA menu button pattern. */
export const Menu: FC<MenuProps> = ({
  open,
  defaultOpen,
  onChangeOpen,
  placement = 'bottom-start',
  size = 'md',
  children,
}) => {
  const handle = useWidget(menuWidget, (items: readonly MenuEntry[]) => ({ items, open, defaultOpen, onChangeOpen }), widgetEnvironment)
  const anchorName = anchorNameOf(useId())

  return (
    <MenuProvider handle={handle} size={size} placement={placement} anchorName={anchorName}>
      {children}
    </MenuProvider>
  )
}
