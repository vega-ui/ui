import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { SheetOverlay } from '../SheetOverlay';
import { SheetInner } from '../SheetInner';
import { mergeProps, mergeRefs } from '@adara-cs/utils';
import { useSheetContext } from '../../hooks';

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  overlaid?: boolean
  headerSlot?: ReactNode | ReactNode[]
  scrollable?: boolean
  ref?: Ref<HTMLDivElement>
  blurredOverlay?: boolean
  hidden?: boolean
}

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