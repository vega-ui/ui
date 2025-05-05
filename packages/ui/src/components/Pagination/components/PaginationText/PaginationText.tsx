'use client';

import { FC } from 'react';
import { PaginationListItem } from '../PaginationListItem';
import { usePaginationContext } from '../../hooks';
import { Text, TextProps } from '../../../Text';
import { sizeMapper } from './utils';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface PaginationTextProps extends TextProps {
  /**
   * Visual style variant of the text.
   */
  variant?: 'primary' | 'secondary'
}

/**
 * The PaginationTextProps interface defines props for the PaginationText component, which extends
 * TextProps to display supporting or contextual text (e.g. "Page 3 of 20") in a pagination UI, with
 * a variant prop to switch between primary and secondary visual styles.
 */
export const PaginationText: FC<PaginationTextProps> = ({
  className,
  variant,
  size,
  children,
  fontWeight = 500,
  ...props
}) => {
  const { size: _size, variant: _variant } = usePaginationContext()

  return (
    <PaginationListItem>
      <Text
        fontWeight={fontWeight}
        className={csx(className, style.paginationText)}
        size={size ?? sizeMapper(_size ?? 'medium')}
        data-variant={variant ?? _variant}
        {...props}
      >
        {children}
      </Text>
    </PaginationListItem>
  )
}