import { FC, HTMLAttributes, Ref } from 'react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { SheetOverlay } from '../SheetOverlay';
import { mergeProps, mergeRefs } from '@vega-ui/utils';
import { useSheetContext } from '../../contexts';
import { SheetContainer } from '../SheetContainer';

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name for custom styling of the sheet container.
   */
  className?: string

  /**
   * Renders the sheet as an overlay above content instead of displacing layout.
   */
  overlaid?: boolean

  /**
   * Ref forwarded to the root sheet container.
   * Useful for focus management, measurement, or animation hooks.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Applies a blurred background overlay behind the sheet.
   * Enhances focus and visual depth.
   */
  blurredOverlay?: boolean

  /**
   * Controls visibility without unmounting the component.
   * When `true`, the sheet is hidden but still rendered in the DOM.
   */
  hidden?: boolean
}

/** The SheetContent component is the main container for a sliding sheet or bottom drawer, supporting scrollable content, overlays, headers, and visibility toggling for responsive, layered UI panels */
export const SheetContent: FC<SheetContentProps> = ({
  className,
  overlaid = true,
  blurredOverlay,
  ref,
  hidden,
  children,
  ...props
}) => {
  const {
    context,
    contentRef,
    contentProps = {},
    isMounted,
    transitionStatus,
    onPress,
    onDrag,
    onScrollCapture,
    onRelease,
    offset = 0,
    transforming,
  } = useSheetContext()

  const content = (
    <SheetContainer
      className={className}
      shadow={!overlaid}
      onScrollCapture={onScrollCapture}
      onPointerDown={onPress}
      onPointerMove={onDrag}
      onPointerUp={onRelease}
      hidden={overlaid ? hidden : !isMounted}
      status={transitionStatus}
      ref={mergeRefs([contentRef, ref])}
      offset={offset}
      dragging={transforming}
      {...mergeProps(contentProps, props)}
    >
      {children}
    </SheetContainer>
  )

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <RemoveScroll>
            {overlaid ? (
              <SheetOverlay blurred={blurredOverlay} hidden={!isMounted}>
                {content}
              </SheetOverlay>
            ) : content}
          </RemoveScroll>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  )
}