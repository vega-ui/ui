'use client';
import { FC, PropsWithChildren } from 'react';
import { Heading } from '../../../Heading';
import { Text } from '../../../Text';
import style from './style.module.css';
import { CheckboxCardProps } from '../../CheckboxCard.tsx';
import { sizeMapper } from './utils';
import { useCheckboxCardContext } from '../../hooks';

export interface CheckboxCardContentProps {
  /**
   * The main title displayed inside the checkbox card.
   */
  title?: string

  /**
   * Additional descriptive text displayed below the title.
   */
  description?: string

  /**
   * Optional class name for custom styling of the content wrapper.
   */
  className?: string

  /**
   * Inherited visual size from the parent CheckboxCard component.
   * Affects spacing, typography, and layout scale.
   */
  size?: CheckboxCardProps['size']
}

/** The CheckboxCardContent component is a layout wrapper used inside a CheckboxCard to structure and style its inner content, such as titles, descriptions, or icons, while aligning with the card’s orientation and variant */
export const CheckboxCardContent: FC<PropsWithChildren<CheckboxCardContentProps>> = ({ title, size: _size, description, className, children }) => {
  const { size } = useCheckboxCardContext()
  const { title: titleSize, description: descriptionSize } = sizeMapper(_size ?? size)

  return (
    <div className={className}>
      {title && <Heading as='h4' className={style.title} size={titleSize}>{title}</Heading>}
      {description && (
        <Text asChild size={descriptionSize} className={style.description}>
          <p>{description}</p>
        </Text>
      )}
      {children}
    </div>
  )
}