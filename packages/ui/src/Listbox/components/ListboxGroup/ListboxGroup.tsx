import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import styles from './style.module.css';

export interface ListboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the group element.
   */
  ref?: Ref<HTMLDivElement>
}

/** A ListboxGroup groups related options like a native `optgroup`. Name it with `aria-labelledby` pointing to your heading, or with `aria-label` */
export const ListboxGroup: FC<ListboxGroupProps> = ({ className, ...props }) => {
  return <div role='group' className={csx(styles.group, className)} {...props} />
}
