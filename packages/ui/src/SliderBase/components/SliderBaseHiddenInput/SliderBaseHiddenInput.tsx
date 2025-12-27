import { FC, InputHTMLAttributes, Ref } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';

export interface SliderBaseHiddenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>
}

export const SliderBaseHiddenInput: FC<SliderBaseHiddenInputProps> = ({ ...props }) => {
  return (
    <VisuallyHidden asChild>
      <input
        aria-hidden
        readOnly
        type='range'
        tabIndex={-1}
        {...props}
      />
    </VisuallyHidden>
  )
}