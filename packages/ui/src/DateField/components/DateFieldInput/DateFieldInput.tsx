import { FC, useMemo } from 'react';
import { TextFieldInput, TextFieldInputProps } from '../../../TextField';
import { useMaskito } from '@maskito/react';
import { useDateFieldContext } from '../../contexts';
import { mergeRefs, parseTemplateDate } from '@vega-ui/utils';
import { getDateMaskOptions } from '../../helpers';

export type DateFieldInputProps = TextFieldInputProps

/**
 * DateFieldInput — a masked date text input used inside DateField.
 *
 * Applies a date mask based on the current format, separator and calendar
 * system, enforces min/max date constraints, and keeps the field's date in
 * sync with the text: it is parsed on mount (native `defaultValue`), on each
 * `input` event and after a form reset, and becomes `undefined` while the
 * text is empty or incomplete. When `min` or `max` change, the text is
 * normalized again like typing does, dispatching `input`.
 *
 * Integrates with DateFieldContext for format, separator, boundaries,
 * change handler, and shared input ref. Merges internal and external refs.
 */
export const DateFieldInput: FC<DateFieldInputProps> = ({ ref, ...props }) => {
  const { template, calendar, inputRef, min, max, changeDate, disabled } = useDateFieldContext()
  
  const options = useMemo(() => getDateMaskOptions({
    template,
    calendar,
    min,
    max,
    onSync: (value) => changeDate(parseTemplateDate(calendar, value, template)),
  }), [template, calendar, min, max, changeDate]);
  
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