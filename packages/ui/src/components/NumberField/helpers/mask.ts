import { MaskitoOptions, maskitoUpdateElement } from '@maskito/core';
import { maskitoEventHandler, maskitoNumberOptionsGenerator } from '@maskito/kit';

export interface GetNumberMaskOptions {
  min?: number;
  max?: number;
  precision?: number;
  decimalSeparator?: string;
  decimalPseudoSeparators?: string[];
  decimalZeroPadding?: boolean;
  thousandSeparator?: string;
  prefix?: string;
  postfix?: string;
  minusSign?: string;
  allowEmpty?: boolean;
}

export const getNumberMaskOptions = (options: GetNumberMaskOptions): Required<MaskitoOptions> => {
  const { allowEmpty, min, ...maskitoOptions } = options
  
  const { plugins, ...numberOptions } = maskitoNumberOptionsGenerator({
    minusSign: '-',
    min,
    ...maskitoOptions,
  })

  return {
    ...numberOptions,
    plugins: [
      ...plugins,
      maskitoEventHandler('blur', (element) => {
        if (element.value === '' && !allowEmpty) {
          maskitoUpdateElement(element, min !== Number.MIN_SAFE_INTEGER && min !== undefined ? min.toString() : '0');
        }
      }),
    ],
  } satisfies MaskitoOptions
}