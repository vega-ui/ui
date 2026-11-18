import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the <div role="group"> element.
   */
  ref?: Ref<HTMLDivElement>
}

/** MenuGroup groups related items of a menu. Name it with aria-labelledby pointing to your heading, or with aria-label. */
export const MenuGroup: FC<MenuGroupProps> = ({ className, ...props }) => {
  return <div role='group' className={csx(style.group, className)} {...props} />
}
