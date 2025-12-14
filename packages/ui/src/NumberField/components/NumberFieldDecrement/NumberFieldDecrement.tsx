import { FC } from 'react';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { MinusIcon } from '@vega-ui/icons';

export type NumberFieldDecrementProps = IconButtonProps

export const NumberFieldDecrement: FC<NumberFieldDecrementProps> = ({ ...props }) => {
  return (
    <IconButton
      variant='secondary'
      appearance='transparent'
      {...props}
    >
      <Icon><MinusIcon /></Icon>
    </IconButton>
  )
}