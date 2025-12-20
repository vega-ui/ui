import { FC } from 'react';
import { FloatingFocusManager, FloatingPortal, FloatingPortalProps } from '@floating-ui/react';
import { useDrawerContext } from '../../contexts';

export type DrawerPortalProps = FloatingPortalProps

/**
 * `DrawerPortal` is an infrastructure subcomponent of `Drawer` responsible
 * for rendering drawer-related elements (overlay, content, etc.) into a
 * React portal and managing focus behavior.
 *
 * It composes `FloatingPortal` to ensure the drawer is rendered at the
 * appropriate place in the DOM tree (typically near the document root),
 * avoiding stacking and overflow issues.
 *
 * When the drawer is mounted, `DrawerPortal` wraps its children with
 * `FloatingFocusManager`, enabling focus trapping and proper focus
 * restoration based on the drawer's floating context
 */
export const DrawerPortal: FC<DrawerPortalProps> = ({ children, ...props }) => {
  const { isMounted, context } = useDrawerContext()
  
  return (
    <FloatingPortal {...props}>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <>{children}</>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}