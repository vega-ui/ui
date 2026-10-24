import { FC, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateRangeFieldContext } from '../../contexts';
import { mergeRefs, parseTemplateRange } from '@vega-ui/utils';
import { getDateRangeMaskOptions } from '../../helpers';

export type DateRangeFieldInputProps = TextFieldInputProps

/**
 * DateRangeFieldInput — the text input component for DateRangeField that
 * supports masked range entry.
 *
 * Purpose:
 * Provides a controlled text input for entering a start and end date, using
 * masking to enforce formatting and separators. Synchronizes the input with
 * the shared date range state: the text is parsed on mount (native
 * `defaultValue`), on each `input` event and after a form reset, and the
 * range is empty while the start date is empty or incomplete. When `min` or
 * `max` change, the text is normalized again like typing does, dispatching
 * `input`.
 */
export const DateRangeFieldInput: FC<DateRangeFieldInputProps> = ({ ref, ...props }) => {
  const { template, calendar, rangeSeparator, inputRef, disabled, min, max, changeDate } = useDateRangeFieldContext()
  
  const options = useMemo(() => getDateRangeMaskOptions({
    template,
    separator: rangeSeparator,
    calendar,
    min,
    max,
    onSync: (value) => changeDate(parseTemplateRange(calendar, value, template, rangeSeparator)),
  }), [template, rangeSeparator, calendar, min, max, changeDate]);
  
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