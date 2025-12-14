import { FC } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { PlusIcon } from '@vega-ui/icons';

export type NumberFieldIncrementProps = IconButtonProps

export const NumberFieldIncrement: FC<NumberFieldIncrementProps> = ({
  ...props
}) => {
  return (
    <IconButton
      variant='secondary'
      appearance='transparent'
      {...props}>
      <Icon><PlusIcon /></Icon>
    </IconButton>
  )
}