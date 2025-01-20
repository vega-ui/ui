'use client';

import style from './style.module.css';
import {
  ChangeEvent,
  Children,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes, ReactElement,
  useState
} from 'react';
import { csx } from '../../utils/css';
import { SegmentedControlItem, SegmentedControlItemProps } from './components';

export interface SegmentedControlProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  children?: ReactElement<SegmentedControlItemProps>[] | ReactElement<SegmentedControlItemProps>
  value?: string | number
  name: string
  variant?: 'primary' | 'secondary'
  onChange?(e: ChangeEvent<HTMLInputElement>, value: string | number): void
}

/** Primary UI component for user interaction */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(({
  size = 'medium',
  disabled,
  className,
  children,
  variant,
  value: controlledValue,
  onChange: controlledOnChange,
  name,
  ...props
}, ref) => {
  const values = Children.toArray(children).map((child) => (child as ReactElement).props?.value)

  const [uncontrolledValue, setUncontrolledValue] = useState(controlledValue ?? values[0])

  const uncontrolledOnChange = (_: ChangeEvent<HTMLInputElement>, value: string | number) => {
    setUncontrolledValue(value)
  }

  const value = controlledValue ?? uncontrolledValue
  const onChange = controlledOnChange ?? uncontrolledOnChange

  const activeIndex = values.indexOf(value)

  return (
    <div data-size={size} data-variant={variant} className={csx(style.controlWrapper, className)} ref={ref} {...props}>
      {children && Children.map(children, (child, i) => (
        <SegmentedControlItem
          key={i}
          {...child.props}
          onChange={onChange}
          disabled={disabled}
          name={name}
          size={size}
          checked={child.props?.value === value}
        />
      ))}
      <div
        data-disabled={disabled}
        data-variant={variant}
        style={{ transform: `translateX(${(activeIndex === -1 ? 0 : activeIndex) * 100}%)`, width: `calc(100% / ${Children.count(children)})` }}
        data-size={size}
        className={style.active}
      />
    </div>
  );
});
