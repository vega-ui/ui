'use client';
import { FC, PropsWithChildren } from 'react';
import { Heading } from '../../../Heading';
import { Text } from '../../../Text';
import style from './style.module.css';
import { CheckboxCardProps } from '../../CheckboxCard.tsx';
import { sizeMapper } from './utils';
import { useCheckboxCardContext } from '../../hooks';

export interface CheckboxCardContentProps {
  title?: string
  description?: string
  className?: string
  size?: CheckboxCardProps['size']
}

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