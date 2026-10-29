import { FC } from 'react';
import { Checkbox, CheckboxProps } from '../../../Checkbox';
import { sizeMapper } from './helpers';
import { useCheckboxCardContext } from '../../contexts';

export type CheckboxCardControlProps = CheckboxProps

export const CheckboxCardControl: FC<CheckboxCardControlProps> = (props) => {
  const { size, variant } = useCheckboxCardContext()
  
  return (
    <Checkbox
      variant={variant}
      size={sizeMapper(size)}
      {...props}
    />
  )
}