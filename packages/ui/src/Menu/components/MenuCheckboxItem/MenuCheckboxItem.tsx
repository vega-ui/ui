'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { menuCheckboxWidget } from '@vega-ui/widgets/menu';
import { useOutput, useWidget, widgetEnvironment } from '../../../internals/widget';
import { useMenuItem } from '../../hooks';
import style from '../MenuItem/style.module.css'

export interface MenuCheckboxItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  /**
   * Whether the item is checked. Enables controlled mode when set.
   */
  checked?: boolean

  /**
   * Whether the item is checked on mount.
   */
  defaultChecked?: boolean

  /**
   * Called with the new checked state when the user checks or unchecks the item.
   */
  onChangeChecked?: (checked: boolean) => void

  /**
   * Plain text of the item for typeahead, used instead of the text of its content.
   */
  label?: string

  /**
   * Keeps the menu open when a click or Enter toggles the item, as Space does. Set it to false to close the menu as a plain item does.
   * @default true
   */
  keepOpen?: boolean

  /**
   * Keeps the item focusable with aria-disabled, as the menu pattern asks, but never checks it.
   */
  disabled?: boolean

  /**
   * Ref forwarded to the <button role="menuitemcheckbox"> element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** MenuCheckboxItem is an item that checks and unchecks: a click, Enter or Space toggles it and keeps the menu open, unless keepOpen is false. */
export const MenuCheckboxItem: FC<MenuCheckboxItemProps> = ({
  checked,
  defaultChecked,
  onChangeChecked,
  label,
  keepOpen = true,
  disabled = false,
  onClick: _onClick,
  className,
  ref,
  ...props
}) => {
  const { handle, size, register, attrs, onClick } = useMenuItem('checkbox', disabled, label, _onClick, { keepOpen })
  const check = useWidget(menuCheckboxWidget, { checked, defaultChecked, onChangeChecked }, widgetEnvironment)
  const checkAttrs = useOutput(check, menuCheckboxWidget.output.item)
  const itemRef = useMergeRefs([check.root, register, ref])

  return (
    <button
      type='button'
      ref={itemRef}
      data-size={size}
      className={csx(style.item, className)}
      onClick={onClick}
      {...handle.merge({ ...attrs, ...checkAttrs }, props)}
    />
  )
}
