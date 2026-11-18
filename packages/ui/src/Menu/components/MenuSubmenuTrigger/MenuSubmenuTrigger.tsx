'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { submenuWidget, TRIGGER } from '@vega-ui/widgets/menu';
import { useOutput } from '../../../internals/widget';
import { useMenuContext } from '../../contexts';
import { useMenuItem } from '../../hooks';
import style from '../MenuItem/style.module.css'

export interface MenuSubmenuTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  /**
   * Plain text of the item for typeahead, used instead of the text of its content.
   */
  label?: string

  /**
   * Keeps the item focusable with aria-disabled, as the menu pattern asks, but never opens the submenu.
   */
  disabled?: boolean

  /**
   * Ref forwarded to the `<button role="menuitem" aria-haspopup="menu">` element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** MenuSubmenuTrigger is the item of a menu that opens a MenuSubmenu: Enter, Space, the arrow toward the submenu or a click opens it with the focus on its first item, and the pointer resting on it opens it beside the item. */
export const MenuSubmenuTrigger: FC<MenuSubmenuTriggerProps> = ({
  label,
  disabled = false,
  onClick: _onClick,
  className,
  style: _style,
  ref,
  ...props
}) => {
  const { handle, anchorName } = useMenuContext()
  const { size, register, attrs, onClick } = useMenuItem('submenu', disabled, label, _onClick)
  const triggerAttrs = useOutput(handle, submenuWidget.output.trigger)
  const triggerRef = useMergeRefs([handle.rootAt(TRIGGER), register, ref])

  return (
    <button
      type='button'
      ref={triggerRef}
      data-size={size}
      className={csx(style.item, className)}
      style={{ anchorName, ..._style }}
      {...handle.listen({ ...attrs, ...triggerAttrs }, { ...props, onClick })}
    />
  )
}
