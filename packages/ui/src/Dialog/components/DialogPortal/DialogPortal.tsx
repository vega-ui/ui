import { FC } from 'react';
import { FloatingFocusManager, FloatingPortal, FloatingPortalProps } from '@floating-ui/react';
import { useDialogContext } from '../../contexts';

export type DialogPortalProps = FloatingPortalProps

/**
 * `DialogPortal` is an infrastructure subcomponent of `Dialog` responsible
 * for rendering drawer-related elements (overlay, content, etc.) into a
 * React portal and managing focus behavior.
 *
 * It composes `FloatingPortal` to ensure the drawer is rendered at the
 * appropriate place in the DOM tree (typically near the document root),
 * avoiding stacking and overflow issues.
 *
 * When the drawer is mounted, `DialogPortal` wraps its children with
 * `FloatingFocusManager`, enabling focus trapping and proper focus
 * restoration based on the drawer's floating context
 */
export const DialogPortal: FC<DialogPortalProps> = ({ children, ...props }) => {
  const { isMounted, context } = useDialogContext()
  
  return (
    <FloatingPortal  {...props}>
      {isMounted && (
        <FloatingFocusManager modal={true} context={context}>
          <>{children}</>
        </FloatingFocusManager>
      )}
    </FloatingPortal >
  )
}