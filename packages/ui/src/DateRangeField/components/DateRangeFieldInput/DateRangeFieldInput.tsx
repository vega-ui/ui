import { FC, FormEvent, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { maskitoDateRangeOptionsGenerator, maskitoParseDate } from '@maskito/kit';
import { useDateRangeFieldContext } from '../../contexts';
import { mergeEventHandlers, mergeRefs } from '@vega-ui/utils';

export type DateRangeFieldInputProps = TextFieldInputProps

/**
 * DateRangeFieldInput — the text input component for DateRangeField that
 * supports masked range entry.
 *
 * Purpose:
 * Provides a controlled text input for entering a start and end date, using
 * masking to enforce formatting and separators. Synchronizes the input with
 * the shared date range state and avoids unnecessary parsing on programmatic
 * updates.
 */
export const DateRangeFieldInput: FC<DateRangeFieldInputProps> = ({ ref, onInput: _onInput, ...props }) => {
  const { format, separator, rangeSeparator, inputRef, disabled, min, max, changeDate, lastStringified } = useDateRangeFieldContext()
  
  const options = useMemo(() => maskitoDateRangeOptionsGenerator({
    mode: format,
    dateSeparator: separator,
    rangeSeparator,
    max,
    min
  }), [format, separator, min, max, rangeSeparator]);
  
  const innerInputRef = useMaskito({ options });
  
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    if (lastStringified.current === value) return

    const sep = rangeSeparator ?? '–'
    
    let startRaw: string
    let endRaw: string | undefined
    
    if (value.includes(sep)) {
      const parts = value.split(sep, 2).map(v => v.trim())
      startRaw = parts[0]
      endRaw = parts[1]
    } else {
      startRaw = value.trim()
      endRaw = undefined
    }
    
    const startDate = maskitoParseDate(startRaw, { mode: format, separator, min, max })
    if (!startDate) return
    
    const endDate = endRaw
      ? maskitoParseDate(endRaw, { mode: format, separator, min, max }) ?? undefined
      : undefined
    
    changeDate?.([startDate, endDate])
  }
  
  return (
    <TextFieldInput
      type='text'
      inputMode='numeric'
      disabled={disabled}
      onInput={mergeEventHandlers(onInput, _onInput)}
      ref={mergeRefs([innerInputRef, ref, inputRef])}
      {...props}
    />
  )
}