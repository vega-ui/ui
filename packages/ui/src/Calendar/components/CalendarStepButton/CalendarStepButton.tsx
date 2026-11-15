import { FC, MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useOutput } from '../../../internals/widget';
import { Icon } from '../../../Icon';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useCalendarInternalContext } from '../../contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface CalendarStepButtonProps extends IconButtonProps {
  step: -1 | 1
}

export const CalendarStepButton: FC<CalendarStepButtonProps> = ({ step, children, disabled, className, onClick: _onClick, ...props }) => {
  const { handle, widget, prev, next, size, variant } = useCalendarInternalContext()

  const backward = step < 0
  const attrs = useOutput(handle, backward ? widget.output.previous : widget.output.next)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (event.defaultPrevented) return

    if (backward) prev()
    else next()
  }

  return (
    <IconButton
      type='button'
      appearance='ghost'
      variant={variant satisfies IconButtonProps['variant']}
      size={size satisfies IconButtonProps['size']}
      disabled={disabled || attrs.disabled === true}
      className={csx(style.button, backward ? style.prev : style.next, className)}
      data-visible={attrs['data-visible'] as boolean}
      onClick={onClick}
      {...props}
    >
      {children ?? <Icon className={style.icon}>{backward ? <ChevronLeft /> : <ChevronRight />}</Icon>}
    </IconButton>
  )
}
