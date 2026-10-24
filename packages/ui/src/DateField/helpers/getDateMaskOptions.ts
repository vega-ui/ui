import { MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoInitialCalibrationPlugin } from '@maskito/core';
import { CalendarSystem, toLatinDigits } from '@vega-ui/i18n';
import { subscribeInputValue, normalizeTemplateDate } from '@vega-ui/utils';

export interface GetDateMaskOptions {
  template: string;
  calendar: CalendarSystem;
  min?: string;
  max?: string;
  onSync(value: string): void;
}

export const getDateMaskOptions = ({ template, calendar, min, max, onSync }: GetDateMaskOptions): MaskitoOptions => ({
  ...MASKITO_DEFAULT_OPTIONS,
  mask: Array.from(template, (char) => /[dmy]/.test(char) ? /\d/ : char),
  overwriteMode: 'replace',
  preprocessors: [
    ({ elementState, data }) => ({
      elementState: { ...elementState, value: toLatinDigits(elementState.value) },
      data: toLatinDigits(data),
    }),
  ],
  postprocessors: [
    ({ value, selection: [from, to] }) => {
      const normalized = normalizeTemplateDate(calendar, value, template, { min, max })
      const shift = normalized.length - value.length

      return { value: normalized, selection: [from + shift, to + shift] }
    },
  ],
  plugins: [
    maskitoInitialCalibrationPlugin(),
    (element) => subscribeInputValue(element, onSync),
  ],
})
