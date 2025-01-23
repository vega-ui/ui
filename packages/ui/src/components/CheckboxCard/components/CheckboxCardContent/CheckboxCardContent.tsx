'use client';
import { FC, PropsWithChildren } from 'react';
import { Heading } from '../../../Heading';
import { Text } from '../../../Text';
import style from './style.module.css';

export interface CheckboxCardContentProps {
  title?: string
  description?: string
  className?: string
}

export const CheckboxCardContent: FC<PropsWithChildren<CheckboxCardContentProps>> = ({ title, description, className, children }) => {
  return (
    <div className={className}>
      {title && <Heading as='h4' className={style.title} size={4}>{title}</Heading>}
      {description && <Text as='p' size={2} className={style.description}>{description}</Text>}
      {children}
    </div>
  )
}