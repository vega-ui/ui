import { FC, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateTimeFieldContext } from '../../contexts';
import { getISODatePart, getISOTimePart, mergeRefs, parseTemplateDate } from '@vega-ui/utils';
import { getDateTimeMaskOptions } from '../../helpers';

export type DateTimeFieldInputProps = TextFieldInputProps

/**
 * DateTimeFieldInput — a masked text input for entering date and time values.
 *
 * Purpose:
 * Provides controlled text-based entry for a DateTimeField using an input mask,
 * while keeping the parsed date and time values synchronized with shared field state.
 *
 * This component represents the input side of the DateTimeField and works in
 * tandem with the calendar component to maintain a consistent date–time state.
 *
 * The text is parsed on mount (native `defaultValue`), on each `input` event
 * and after a form reset; while it is empty or incomplete the field has no
 * date and the time falls back to midnight. When `min` or `max` change, the
 * text is normalized again like typing does, dispatching `input`.
 */
export const DateTimeFieldInput: FC<DateTimeFieldInputProps> = ({ ref, ...props }) => {
  const {
    template,
    calendar,
    timeStep,
    inputRef,
    min,
    max,
    changeDate,
    changeTime,
    disabled
  } = useDateTimeFieldContext()
  
  const options = useMemo(() => getDateTimeMaskOptions({
    template,
    calendar,
    min,
    max,
    step: timeStep,
    onSync: (value) => {
      const dateTime = parseTemplateDate(calendar, value, template)

      changeDate(getISODatePart(dateTime))
      changeTime(getISOTimePart(dateTime) ?? '00:00:00')
    },
  }), [template, calendar, min, max, timeStep, changeDate, changeTime]);
  
  const innerInputRef = useMaskito({ options });

  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      ref={mergeRefs([innerInputRef, ref, inputRef])}
      {...props}
    />
  )
}