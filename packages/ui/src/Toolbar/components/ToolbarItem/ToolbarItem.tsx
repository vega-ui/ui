'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { Slot } from '../../../Slot';
import { useToolbarContext } from '../../contexts';
import { useToolbarItem } from '../../hooks';

export interface ToolbarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Renders the only child element as the item instead of a `<button>`, like a Button, a MenuTrigger or a Toggle.
   */
  asChild?: boolean

  /**
   * Disables the item and its child, and the arrow keys skip it.
   */
  disabled?: boolean

  /**
   * Ref forwarded to the item element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** ToolbarItem makes a control one of the items the arrow keys move between in its Toolbar. */
export const ToolbarItem: FC<ToolbarItemProps> = ({
  asChild,
  disabled = false,
  children,
  ref,
  ...props
}) => {
  const { handle } = useToolbarContext()
  const { register, attrs } = useToolbarItem<HTMLButtonElement>(disabled)
  const itemRef = useMergeRefs([register, ref])

  if (asChild) return <Slot ref={itemRef} disabled={disabled || undefined} {...handle.merge(attrs ?? {}, props)}>{children}</Slot>

  return <button type='button' ref={itemRef} disabled={disabled} {...handle.merge(attrs ?? {}, props)}>{children}</button>
}
