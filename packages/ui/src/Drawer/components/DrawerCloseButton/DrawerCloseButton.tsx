import { FC } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useDrawerContext } from '../../contexts';
import { X } from '@vega-ui/icons';
import { mergeEventHandlers } from '@vega-ui/utils';

export type DrawerCloseButtonProps = IconButtonProps

/**
 * `DrawerCloseButton` is an action subcomponent of `Drawer` used to
 * close the currently open drawer.
 *
 * It composes the `IconButton` primitive and wires its click behavior
 * to the surrounding `Drawer` state via `PhoneFieldContext`.
 *
 * When activated, the button triggers a state change that closes the
 * drawer. Any additional `onClick` handler passed via props is safely
 * merged and invoked alongside the internal close logic.
 *
 * By default, the button renders a close (X) icon, but the icon content
 * can be customized by providing children.
 *
 * This component is intended to be used within `DrawerHeader` or other
 * drawer action areas and does not manage drawer state independently.
 */
export const DrawerCloseButton: FC<DrawerCloseButtonProps> = ({ onClick: _onClick, children, ...props }) => {
  const { onChangeOpen } = useDrawerContext()
  
  const onClick = () => {
    onChangeOpen(false)
  }
  
  return (
    <IconButton
      onClick={mergeEventHandlers(onClick, _onClick)}
      aria-label='close'
      variant='secondary'
      appearance='transparent'
      size='sm'
      {...props}
    >
      {children ?? <Icon><X strokeWidth={3}/></Icon>}
    </IconButton>
  )
}