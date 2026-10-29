import { FC } from 'react';
import { Checkbox, CheckboxProps } from '../../../Checkbox';
import { sizeMapper } from './helpers';
import { useCheckboxCardContext } from '../../contexts';

export type CheckboxCardControlProps = CheckboxProps

export const CheckboxCardControl: FC<CheckboxCardControlProps> = (props) => {
  const {
    size,
    variant,
    onChangeChecked,
    defaultChecked,
    checked,
    indeterminate,
    disabled
  } = useCheckboxCardContext()
  
  return (
    <Checkbox
      variant={variant}
      onChangeChecked={onChangeChecked}
      defaultChecked={defaultChecked}
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      size={sizeMapper(size)}
      {...props}
    />
  )
}