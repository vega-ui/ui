'use client';

import style from './style.module.css';
import {
  ChangeEvent,
  Children,
  DetailedHTMLProps, FC,
  HTMLAttributes, ReactElement, Ref,
} from 'react';
import { csx } from '@adara-cs/utils';
import { SegmentedControlItemProps } from './components';
import { SegmentedControlProvider } from './providers';
import { useControlledState } from '@adara-cs/hooks';

export interface SegmentedControlProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  /**
   * Disables all segments, preventing user interaction.
   */
  disabled?: boolean

  /**
   * Visual size of the segmented control.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * One or more `SegmentedControlItem` components.
   * These define the selectable options.
   */
  children?: ReactElement<SegmentedControlItemProps>[] | ReactElement<SegmentedControlItemProps>

  /**
   * The currently selected value.
   * Must match the `value` of one of the children.
   */
  value?: string | number

  /**
   * The name of the underlying radio group.
   * Required for grouping and form submission.
   */
  name?: string

  /**
   * Visual style variant of the segmented control.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Callback fired when the selected segment changes.
   *
   * @param e - The original change event from the input
   */
  onChange?(e: ChangeEvent<HTMLInputElement>): void

  /**
   * Ref to the root container element.
   * Useful for measuring or controlling focus.
   */
  ref?: Ref<HTMLDivElement>
}

/** A Segmented Control is a UI component that displays a set of options in a horizontal layout, where each option is a "segment." Users can select one segment to toggle between different views or settings, offering a compact alternative to multiple buttons or switches */
export const SegmentedControl: FC<SegmentedControlProps> = ({
  size = 'medium',
  disabled,
  className,
  children,
  variant = 'secondary',
  value: controlledValue,
  onChange: _onChange,
  name,
  ref,
  ...props
}) => {
  const values = Children.toArray(children).map((child) => (child as ReactElement<{ value?: string | number }>).props?.value)

  const [value, setValue] = useControlledState(controlledValue, values[0])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange?.(e)
    setValue(e.currentTarget.value)
  }

  const activeIndex = values.indexOf(value)

  return (
    <SegmentedControlProvider value={value} onChange={onChange} variant={variant} size={size} disabled={disabled} name={name} >
      <div data-size={size} data-variant={variant} className={csx(style.controlWrapper, className)}
           ref={ref} {...props}>
        {children}
        <div
          data-disabled={disabled}
          data-variant={variant}
          style={{
            transform: `translateX(${(activeIndex === -1 ? 0 : activeIndex) * 100}%)`,
            width: `calc(100% / ${Children.count(children)})`
          }}
          data-size={size}
          className={style.active}
        />
      </div>
    </SegmentedControlProvider>
  );
}
