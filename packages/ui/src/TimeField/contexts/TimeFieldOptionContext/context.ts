'use client';

import { createContext } from '../../../internals/context';
import { TimeFieldUnit } from '@vega-ui/widgets/time-field';

export interface TimeFieldOptionContextData {
  /**
   * The part of the time the column of the option turns.
   */
  unit: TimeFieldUnit

  /**
   * The two-digit value of the option, like `'09'`.
   */
  value: string

  /**
   * Whether the option is outside `min` and `max` of its field.
   */
  disabled: boolean
}

export const [TimeFieldOptionProvider, useTimeFieldOptionContext] = createContext<TimeFieldOptionContextData>('TimeFieldOptionContext', {
  unit: 'hour',
  value: '',
  disabled: false,
})
