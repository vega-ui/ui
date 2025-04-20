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
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  children?: ReactElement<SegmentedControlItemProps>[] | ReactElement<SegmentedControlItemProps>
  value?: string | number
  name: string
  variant?: 'primary' | 'secondary'
  onChange?(e: ChangeEvent<HTMLInputElement>): void
  ref?: Ref<HTMLDivElement>
}

/** Primary UI component for user interaction */
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
