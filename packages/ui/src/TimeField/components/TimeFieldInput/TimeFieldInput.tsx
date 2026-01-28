import { FC, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { maskitoTimeOptionsGenerator } from '@maskito/kit';
import { useTimeFieldContext } from '../../contexts';
import { mergeRefs } from '@vega-ui/utils';

export type TimeFieldInputProps = TextFieldInputProps

/**
 * TimeFieldInput — the text input component for TimeField that supports
 * masked time entry.
 *
 * Purpose:
 * Provides a controlled text input for entering times in `"HH:MM"` or
 * `"HH:MM:SS"` format, with optional minimum, maximum, and step constraints.
 */
export const TimeFieldInput: FC<TimeFieldInputProps> = ({ ref, ...props }) => {
  const { format, min, max, step } = useTimeFieldContext()
  
  const parseTimeString = (time?: string) => {
    if (!time) return undefined
    const parts = time.split(':').map(Number)
    return {
      hours: parts[0],
      minutes: parts[1],
      seconds: parts[2] ?? 0
    }
  }
  
  const options = useMemo(() => {
    return maskitoTimeOptionsGenerator({
      mode: format,
      timeSegmentMinValues: parseTimeString(min),
      timeSegmentMaxValues: parseTimeString(max),
      step,
    })
  }, [format, min, max, step]);
  
  const innerInputRef = useMaskito({ options });
  
  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      ref={mergeRefs([innerInputRef, ref])}
      {...props}
    />
  )
}