import { FC } from 'react';
import { sizeMapper } from './helpers';
import { Heading, HeadingProps } from '../../../Heading';
import { useAccordionItemContext } from '../../contexts';

export type AccordionHeaderProps = HeadingProps

/**
 * AccordionHeader defines the heading for an AccordionItem.
 * It renders a semantic heading element and displays the item’s title.
 *
 * The heading level is fixed to `h3` to ensure consistent document
 * structure, while the visual size is derived from the AccordionItem
 * size for proper alignment with other accordion parts.
 *
 * This component is presentational and obtains all contextual data
 * (such as size) from the AccordionItem context.
 */
export const AccordionHeader: FC<AccordionHeaderProps> = ({ children, ...props }) => {
  const { size } = useAccordionItemContext()
  
  return (
    <Heading as='h3' size={sizeMapper(size)} {...props}>
      {children}
    </Heading>
  )
}