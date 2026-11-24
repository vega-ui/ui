import { FC } from 'react';
import { WheelPickerOption, WheelPickerOptionProps } from '../../../WheelPicker';
import { useTimeFieldOptionContext } from '../../contexts';

export type TimeFieldOptionProps = Omit<WheelPickerOptionProps<string>, 'value' | 'label' | 'disabled'>

/** TimeFieldOption is one option of a time column, a WheelPickerOption that takes its value and its disabled state from the column. Place it as the required template of a TimeFieldColumn with a WheelPickerFace inside, which shows the two-digit value without children */
export const TimeFieldOption: FC<TimeFieldOptionProps> = (props) => {
  const { value, disabled } = useTimeFieldOptionContext()

  return <WheelPickerOption value={value} disabled={disabled} {...props} />
}
