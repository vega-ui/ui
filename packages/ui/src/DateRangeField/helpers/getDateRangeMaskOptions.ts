import { MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoInitialCalibrationPlugin } from '@maskito/core';
import { CalendarSystem, toLatinDigits } from '@vega-ui/i18n';
import { normalizeTemplateDate, parseTemplateDate } from '@vega-ui/utils';

export interface GetDateRangeMaskOptions {
  template: string;
  separator: string;
  calendar: CalendarSystem;
  min?: string;
  max?: string;
}

export const getDateRangeMaskOptions = ({ template, separator, calendar, min, max }: GetDateRangeMaskOptions): MaskitoOptions => {
  const dateMask = Array.from(template, (char) => /[dmy]/.test(char) ? /\d/ : char)

  return {
    ...MASKITO_DEFAULT_OPTIONS,
    mask: [...dateMask, ...Array.from(separator), ...dateMask],
    overwriteMode: 'replace',
    preprocessors: [
      ({ elementState, data }) => ({
        elementState: { ...elementState, value: toLatinDigits(elementState.value) },
        data: toLatinDigits(data),
      }),
    ],
    postprocessors: [
      ({ value, selection: [from, to] }) => {
        const start = normalizeTemplateDate(calendar, value.slice(0, template.length), template, { min, max })
        const middle = value.slice(template.length, template.length + separator.length)
        const end = normalizeTemplateDate(calendar, value.slice(template.length + separator.length), template, { min, max })

        const startDate = parseTemplateDate(calendar, start, template)
        const endDate = parseTemplateDate(calendar, end, template)
        const isReversed = startDate !== undefined && endDate !== undefined && startDate > endDate

        const normalized = isReversed ? end + middle + start : start + middle + end
        const shift = normalized.length - value.length

        return { value: normalized, selection: [from + shift, to + shift] }
      },
    ],
    plugins: [
      maskitoInitialCalibrationPlugin(),
    ],
  }
}
