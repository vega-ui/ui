import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { SheetOverlay } from '../SheetOverlay';
import { SheetInner } from '../SheetInner';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { useSheetContext } from '../../hooks';

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
   * Optional header content rendered at the top of the sheet.
   * Typically used for titles, toolbars, or close actions.
   */
  headerSlot?: ReactNode | ReactNode[]

  /**
   * Enables vertical scrolling within the sheet content area.
   * Useful for long content in constrained viewports.
   */
  scrollable?: boolean

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
  scrollable = true,
  blurredOverlay,
  headerSlot,
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
    <SheetInner
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
      scrollable={scrollable}
      dragging={transforming}
      headerSlot={headerSlot}
      {...mergeProps(contentProps, props)}
    >
      {children}
    </SheetInner>
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