'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { menuRadioGroupWidget } from '@vega-ui/widgets/menu';
import { useItem, useOutput } from '../../../internals/widget';
import { useMenuRadioGroupContext } from '../../contexts';
import { useMenuItem } from '../../hooks';
import style from '../MenuItem/style.module.css'

export interface MenuRadioItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'value'> {
  /**
   * Value of the item, given to the MenuRadioGroup when the user checks it.
   */
  value: string

  /**
   * Plain text of the item for typeahead, used instead of the text of its content.
   */
  label?: string

  /**
   * Keeps the item focusable with aria-disabled, as the menu pattern asks, but never checks it.
   */
  disabled?: boolean

  /**
   * Ref forwarded to the <button role="menuitemradio"> element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** MenuRadioItem is one choice of a MenuRadioGroup: a click or Enter checks it and closes the menu, Space checks it and keeps the menu open. */
export const MenuRadioItem: FC<MenuRadioItemProps> = ({
  value,
  label,
  disabled = false,
  onClick: _onClick,
  className,
  ref,
  ...props
}) => {
  const { handle, size, register, attrs, onClick } = useMenuItem('radio', disabled, label, _onClick, value)
  const { handle: group } = useMenuRadioGroupContext()
  const radioAttrs = useOutput(group, menuRadioGroupWidget.output.radio, value)
  const registerRadio = useItem(group, value, { disabled })
  const itemRef = useMergeRefs([register, registerRadio, ref])

  return (
    <button
      type='button'
      ref={itemRef}
      data-size={size}
      className={csx(style.item, className)}
      onClick={onClick}
      {...handle.merge({ ...attrs, ...radioAttrs }, props)}
    />
  )
}
