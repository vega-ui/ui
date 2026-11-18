'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { menuWidget, TRIGGER } from '@vega-ui/widgets/menu';
import { useOutput } from '../../../internals/widget';
import { Slot } from '../../../Slot';
import { useMenuContext } from '../../contexts';

export interface MenuTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'> {
  /**
   * Renders the only child element as the trigger instead of a <button>, like your own Button.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the trigger element.
   */
  ref?: Ref<HTMLButtonElement>
}

/** MenuTrigger is the menu button: a click, Enter or Space shows the menu with the focus on its first item, the Down and Up arrows on the first or the last item. */
export const MenuTrigger: FC<MenuTriggerProps> = ({
  asChild,
  style,
  ref,
  children,
  ...props
}) => {
  const { handle, anchorName } = useMenuContext()
  const attrs = useOutput(handle, menuWidget.output.trigger)
  const triggerRef = useMergeRefs([handle.rootAt(TRIGGER), ref])
  const Element = asChild ? Slot : 'button'

  return (
    <Element
      type={asChild ? undefined : 'button'}
      ref={triggerRef}
      style={{ anchorName, ...style }}
      {...handle.listen(attrs, props)}
    >
      {children}
    </Element>
  )
}
