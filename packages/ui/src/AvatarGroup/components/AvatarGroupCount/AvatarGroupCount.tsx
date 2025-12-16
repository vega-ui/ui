'use client';

import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { Text, TextProps } from '../../../Text';
import style from './style.module.css';
import { useAvatarGroupContext } from '../../contexts';
import { AvatarGroupVariant } from '../../types.ts';

export interface AvatarGroupCountProps extends TextProps {
  /**
   * Visual variant of the AvatarGroup.
   * Used to adjust the appearance of the count indicator.
   */
  variant?: AvatarGroupVariant;
}

/**
 * AvatarGroupCount displays a numeric indicator representing the number
 * of avatars that are not visible within the AvatarGroup stack.
 *
 * It is typically used to show an overflow count (for example, "+3")
 * when the total number of avatars exceeds the available space.
 *
 * The text size is derived from the current AvatarGroup size to ensure
 * visual consistency, and the appearance can be adjusted based on the
 * AvatarGroup variant via a data attribute.
 */
export const AvatarGroupCount: FC<AvatarGroupCountProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  const { size = 'md', variant } = useAvatarGroupContext()

  return (
    <Text
      ref={ref}
      data-variant={variant}
      className={csx(style.count, className)}
      size={sizeMapper(size)}
      fontWeight={500}
      {...props}
    >
      {children}
    </Text>
  )
}