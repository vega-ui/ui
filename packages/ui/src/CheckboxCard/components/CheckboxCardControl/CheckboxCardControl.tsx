import { FC, HTMLAttributes, Ref } from 'react';
import { Checkbox, CheckboxProps } from '../../../Checkbox';
import { sizeMapper } from './helpers';
import { useCheckboxCardContext } from '../../contexts';

export interface CheckboxCardControlProps extends HTMLAttributes<HTMLSpanElement>, Pick<CheckboxProps, 'variant' | 'size'> {
  /**
   * Ref to the `<span>` that holds the checkbox inside the card's label.
   */
  ref?: Ref<HTMLSpanElement>
}

export const CheckboxCardControl: FC<CheckboxCardControlProps> = ({ variant: controlVariant, size: controlSize, ...props }) => {
  const { size, variant } = useCheckboxCardContext()

  return (
    <Checkbox variant={controlVariant ?? variant} size={controlSize ?? sizeMapper(size)} asChild>
      <span {...props} />
    </Checkbox>
  )
}
