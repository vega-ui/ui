import { MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoInitialCalibrationPlugin, maskitoUpdateElement } from '@maskito/core';
import { toLatinDigits } from '@vega-ui/i18n';
import { normalizeTemplateTime, stepTimeSegment } from '@vega-ui/utils';

export interface GetTimeMaskOptions {
  template: string;
  min?: string;
  max?: string;
  step?: number;
}

export const getTimeMaskOptions = ({ template, min, max, step }: GetTimeMaskOptions): MaskitoOptions => ({
  ...MASKITO_DEFAULT_OPTIONS,
  mask: Array.from(template, (char) => /[HMS]/.test(char) ? /\d/ : char),
  overwriteMode: 'replace',
  preprocessors: [
    ({ elementState, data }) => ({
      elementState: { ...elementState, value: toLatinDigits(elementState.value) },
      data: toLatinDigits(data),
    }),
  ],
  postprocessors: [
    ({ value, selection: [from, to] }) => {
      const normalized = normalizeTemplateTime(value, template, { min, max })
      const shift = normalized.length - value.length

      return { value: normalized, selection: [from + shift, to + shift] }
    },
  ],
  plugins: [
    maskitoInitialCalibrationPlugin(),
    (element) => {
      const listener = (event: KeyboardEvent) => {
        if (!step) return
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return

        const position = element.selectionStart ?? 0
        const value = stepTimeSegment(element.value, template, position, event.key === 'ArrowUp' ? 1 : -1, step)
        if (value === undefined) return

        event.preventDefault()
        maskitoUpdateElement(element, { value, selection: [position, position] })
      }

      element.addEventListener('keydown', listener)
      return () => element.removeEventListener('keydown', listener)
    },
  ],
})
