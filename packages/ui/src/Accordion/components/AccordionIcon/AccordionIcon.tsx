import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { ChevronDown } from '@vega-ui/icons';
import { Icon, IconProps } from '../../../Icon';
import style from './style.module.css';
import { useCollapsibleContext } from '../../../Collapsible';
import { sizeMapper } from './helpers';
import { useAccordionItemContext } from '../../contexts';

export type AccordionIconProps = IconProps

/**
 * AccordionIcon is a visual indicator for the AccordionItem state.
 * It reflects whether the item is expanded or collapsed and updates
 * its appearance accordingly (e.g. rotation).
 *
 * The icon size is derived from the AccordionItem size to ensure
 * visual consistency. By default, a ChevronDown icon is rendered,
 * but a custom icon can be provided via children.
 *
 * This component is purely presentational and relies on Accordion
 * and Collapsible contexts for its state.
 */
export const AccordionIcon: FC<AccordionIconProps> = ({ className, children, ...props }) => {
  const { size } = useAccordionItemContext()
  const { opened } = useCollapsibleContext()
  
  return (
    <Icon aria-hidden={true} className={csx(style.icon, className)} data-open={opened} size={sizeMapper(size)} {...props}>
      {children ?? <ChevronDown />}
    </Icon>
  )
}