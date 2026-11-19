import { FC } from 'react';
import { useSnapshot } from '../../../internals/widget';
import { csx } from '@vega-ui/utils';
import { Icon, IconProps } from '../../../Icon';
import style from './style.module.css';
import { useCollapsibleContext } from '../../../Collapsible';
import { useAccordionItemContext } from '../../contexts';

export type AccordionIconProps = IconProps

/**
 * AccordionIcon is the indicator of an AccordionItem: it has `data-open` while the item is expanded, for a rotation, and takes its size from the item. Pass the icon as its children, such as a chevron.
 */
export const AccordionIcon: FC<AccordionIconProps> = ({ className, children, ...props }) => {
  const { size } = useAccordionItemContext()
  const { handle } = useCollapsibleContext()
  const opened = useSnapshot(handle, (state) => state.open)
  
  return (
    <Icon aria-hidden={true} className={csx(style.icon, className)} data-open={opened} size={size} {...props}>
      {children}
    </Icon>
  )
}