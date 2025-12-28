import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css';
import { SegmentedControlItemProvider, useSegmentedControlContext } from '../../contexts';
import { csx, mergeRefs } from '@vega-ui/utils';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from '../../types';

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * Disables the item, preventing selection and focus.
   */
  disabled?: boolean

  /**
   * Controls the size of the item.
   * Affects padding, font size, and spacing.
   */
  size?: SegmentedControlSize

  /**
   * Visual style variant of the item.
   */
  variant?: SegmentedControlVariant
  
  /**
   * The unique value associated with this segment
   */
  value: SegmentedControlValue
  
  /**
   * Ref forwarded to the underlying `<label>` element.
   */
  ref?: Ref<HTMLLabelElement>
}

/** Represents an individual selectable option inside a SegmentedControl group */
export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({
  disabled,
  variant,
  size,
  children,
  className,
  value,
  ref,
  ...props
}) => {
  const { size: _size, variant: _variant, disabled: _disabled, itemRef, selected } = useSegmentedControlContext()

  return (
    <SegmentedControlItemProvider value={value}>
      <label
        data-disabled={disabled ?? _disabled}
        data-size={size ?? _size}
        data-variant={variant ?? _variant}
        data-active={selected === value}
        className={csx(style.item, className)}
        ref={mergeRefs([itemRef?.(value), ref])}
        {...props}
      >
        {children}
      </label>
    </SegmentedControlItemProvider>
  )
}