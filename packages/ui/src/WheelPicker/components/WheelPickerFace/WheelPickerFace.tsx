'use client';

import { HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useWheelPickerOptionContext } from '../../contexts';
import style from '../../style.module.css';

export interface WheelPickerFaceProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Ref forwarded to the face element.
   */
  ref?: Ref<HTMLSpanElement>
}

/** WheelPickerFace is the content of a WheelPickerOption that turns with the wheel. The option stays in place as the stop of the scroll while its face bends along the cylinder, so place what the option shows in it; without children it shows the text of its option, its `label` or `value` */
export const WheelPickerFace = ({ className, children, ...props }: WheelPickerFaceProps) => {
  const { label } = useWheelPickerOptionContext()

  return <span className={csx(style.face, className)} {...props}>{children ?? label}</span>
}
