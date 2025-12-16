import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type AvatarGroupStackProps = HTMLAttributes<HTMLDivElement>

/**
 * AvatarGroupStack is a layout container for grouping and stacking Avatar components.
 * It provides the structural wrapper required to arrange avatars in an overlapping
 * stack.
 */
export const AvatarGroupStack: FC<AvatarGroupStackProps> = ({ className, ...props }) => {
  return (
    <div className={csx(style.stack, className)} {...props} />
  )
}