import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CheckboxCardContentProps = HTMLAttributes<HTMLDivElement>

/** The CheckboxCardContent component is a layout wrapper used inside a CheckboxCard to structure and style its inner content, such as titles, descriptions, or icons, while aligning with the card’s orientation and variant */
export const CheckboxCardContent: FC<PropsWithChildren<CheckboxCardContentProps>> = ({ className, ...props }) => {
  return (
    <div className={csx(style.content, className)} {...props} />
  )
}