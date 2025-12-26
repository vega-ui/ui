import { FC } from 'react';
import { FloatingFocusManager, FloatingPortal, FloatingPortalProps } from '@floating-ui/react';
import { useSelectContext } from '../../contexts';

export interface SelectPortalProps extends FloatingPortalProps {
  /**
   * Which element to initially focus. Can be either a number (tabbable index as specified by the order) or a ref.
   */
  initialFocus?: number
}

/**
 * `SelectPortal` is an internal infrastructure component of `Select`
 * responsible for rendering floating select elements (listbox, options, etc.)
 * into a React portal and coordinating focus behavior.
 *
 * It composes `FloatingPortal` to mount the select’s floating layer
 * relative to the select root, preventing clipping by parent containers
 * and avoiding z-index and overflow issues.
 *
 * While the select is open, `SelectPortal` wraps its children with
 * `FloatingFocusManager`, enabling managed focus behavior and ensuring
 * focus is restored correctly when the select closes, based on the
 * Floating UI context.
 */
export const SelectPortal: FC<SelectPortalProps> = ({ children, initialFocus = -1, ...props }) => {
  const { context, open, selectRef } = useSelectContext()
  
  return (
    <FloatingPortal root={selectRef?.current} {...props}>
      <FloatingFocusManager initialFocus={initialFocus} disabled={!open} context={context} modal={false}>
        <>{children}</>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}