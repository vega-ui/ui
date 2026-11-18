'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { useMenuItem } from '../../hooks';
import style from './style.module.css'

export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  /**
   * Renders the only child element as the item instead of a <button>, like an <a> that navigates.
   */
  asChild?: boolean

  /**
   * Plain text of the item for typeahead, used instead of the text of its content.
   */
  label?: string

  /**
   * Keeps the item focusable with aria-disabled, as the menu pattern asks, but never activates it.
   */
  disabled?: boolean

  /**
   * Ref forwarded to the item element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** MenuItem is an action of the menu: a click, Enter or Space runs its onClick, closes the menu and gives the focus back to the MenuTrigger. Call preventDefault in onClick to keep the menu open. */
export const MenuItem: FC<MenuItemProps> = ({
  asChild,
  label,
  disabled = false,
  onClick: _onClick,
  className,
  ref,
  children,
  ...props
}) => {
  const { handle, size, register, attrs, onClick } = useMenuItem('item', disabled, label, _onClick)
  const itemRef = useMergeRefs([register, ref])
  const Element = asChild ? Slot : 'button'

  return (
    <Element
      type={asChild ? undefined : 'button'}
      ref={itemRef}
      data-size={size}
      className={csx(style.item, className)}
      onClick={onClick}
      {...handle.merge(attrs, props)}
    >
      {children}
    </Element>
  )
}
