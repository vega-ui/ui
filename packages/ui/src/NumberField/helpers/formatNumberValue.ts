import { maskitoTransform, MaskitoOptions } from '@maskito/core';

export const formatNumberValue = (value: number, options: MaskitoOptions) => Number.isNaN(value) ? '' : maskitoTransform(String(value), options)
