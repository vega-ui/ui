import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { Icon } from '../../../Icon';
import { X } from '@vega-ui/icons';
import { useDialogContext } from '../../contexts';
import { mergeEventHandlers } from '@vega-ui/utils';

export type DialogCloseButtonProps = IconButtonProps

/**
 * `DialogCloseButton` is an action subcomponent of `Dialog` used to
 * close the currently open drawer.
 *
 * It composes the `IconButton` primitive and wires its click behavior
 * to the surrounding `Dialog` state via `DialogContext`.
 *
 * When activated, the button triggers a state change that closes the
 * drawer. Any additional `onClick` handler passed via props is safely
 * merged and invoked alongside the internal close logic.
 *
 * By default, the button renders a close (X) icon, but the icon content
 * can be customized by providing children.
 *
 * This component is intended to be used within `DialogHeader` or other
 * drawer action areas and does not manage drawer state independently.
 */
export const DialogCloseButton: FC<DialogCloseButtonProps> = ({ onClick: _onClick, children, ...props }) => {
  const { changeOpen } = useDialogContext()
  
  const onClick = () => {
    changeOpen(false)
  }
  
  return (
    <IconButton
      onClick={mergeEventHandlers(onClick, _onClick)}
      size='md'
      variant='secondary'
      appearance='transparent'
      {...props}
    >
      {children ?? <Icon><X /></Icon>}
    </IconButton>
  )
}