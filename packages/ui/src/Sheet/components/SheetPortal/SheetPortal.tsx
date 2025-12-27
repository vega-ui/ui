import { FC } from 'react';
import { FloatingFocusManager, FloatingPortal, FloatingPortalProps, useTransitionStatus } from '@floating-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { useSheetContext } from '../../contexts';

export type SheetPortalProps = FloatingPortalProps

/**
 * SheetPortal
 *
 * A portal component responsible for rendering `Sheet` content
 * outside the normal DOM hierarchy and managing focus and scroll
 * behavior while the sheet is mounted.
 */
export const SheetPortal: FC<SheetPortalProps> = ({ children, ...props }) => {
  const { context } = useSheetContext()
  const { isMounted } = useTransitionStatus(context)
  
  return (
    <FloatingPortal {...props}>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <RemoveScroll>
            {<>{children}</>}
          </RemoveScroll>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}