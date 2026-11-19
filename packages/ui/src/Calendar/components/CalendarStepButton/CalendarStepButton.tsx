import { FC } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { NEXT_BUTTON, PREVIOUS_BUTTON } from '@vega-ui/widgets/calendar';
import { useOutput } from '../../../internals/widget';
import { Button, ButtonProps, ButtonShape } from '../../../Button';
import { useCalendarInternalContext } from '../../contexts';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarStepButtonProps = ButtonProps & ButtonShape & {
  step: -1 | 1
}

export const CalendarStepButton: FC<CalendarStepButtonProps> = ({ step, ref, children, disabled, className, ...props }) => {
  const { handle, widget, size, variant } = useCalendarInternalContext()

  const backward = step < 0
  const attrs = useOutput(handle, backward ? widget.output.previous : widget.output.next)
  const mergedRef = useMergeRefs([handle.part(backward ? PREVIOUS_BUTTON : NEXT_BUTTON), ref])

  return (
    <Button
      ref={mergedRef}
      type='button'
      appearance='ghost'
      variant={variant satisfies ButtonProps['variant']}
      size={size satisfies ButtonProps['size']}
      disabled={disabled || attrs.disabled}
      className={csx(style.button, backward ? style.prev : style.next, className)}
      data-visible={attrs['data-visible']}
      {...props}
    >
      {children}
    </Button>
  )
}
