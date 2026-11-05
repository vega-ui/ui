import type { KeyboardSpec } from './types';

const example = 'day-picker/one-month-of-days.tsx';
const day = (value: number) => ({ role: 'gridcell', name: String(value) });

export default [
  {
    keys: ['ArrowLeft', 'ArrowRight'],
    en: 'Moves the focus to the previous or next day, wrapping to the neighbouring week and skipping disabled days. In RTL the arrows are mirrored: ← moves to the next day.',
    ru: 'Переносит фокус на предыдущий или следующий день с переходом на соседнюю неделю, пропуская отключённые дни. В RTL стрелки зеркальны: ← ведёт к следующему дню.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'ArrowRight', expect: [{ focused: day(16) }] },
      { example, steps: [{ focus: day(16) }], press: 'ArrowLeft', expect: [{ focused: day(15) }] },
      { example, dir: 'rtl', steps: [{ focus: day(15) }], press: 'ArrowLeft', expect: [{ focused: day(16) }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Moves the focus to the same weekday of the previous or next week, stopping at the edge of the month.',
    ru: 'Переносит фокус на тот же день недели предыдущей или следующей недели, останавливаясь на краю месяца.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'ArrowDown', expect: [{ focused: day(22) }] },
      { example, steps: [{ focus: day(15) }], press: 'ArrowUp', expect: [{ focused: day(8) }] },
      { example, steps: [{ focus: day(29) }], press: 'ArrowDown', expect: [{ focused: day(29) }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last day of the week.',
    ru: 'Переносит фокус на первый или последний день недели.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'Home', expect: [{ focused: day(9) }] },
      { example, steps: [{ focus: day(11) }], press: 'End', expect: [{ focused: day(15) }] },
    ],
  },
  {
    keys: ['Control+Home', 'Control+End'],
    en: 'Moves the focus to the first or last day of the month.',
    ru: 'Переносит фокус на первый или последний день месяца.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'Control+Home', expect: [{ focused: day(1) }] },
      { example, steps: [{ focus: day(15) }], press: 'Control+End', expect: [{ focused: day(31) }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown'],
    en: 'Moves the focus to the same weekday in the first or last week of the month. The month itself does not change: paging months belongs to Calendar.',
    ru: 'Переносит фокус на тот же день недели в первой или последней неделе месяца. Сам месяц не меняется: листание месяцев — задача Calendar.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'PageUp', expect: [{ focused: day(1) }] },
      { example, steps: [{ focus: day(9) }], press: 'PageDown', expect: [{ focused: day(30) }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused day.',
    ru: 'Выбирает день в фокусе.',
    checks: [
      { example, steps: [{ focus: day(14) }], press: 'Enter', before: [{ attr: 'aria-selected', of: day(14), is: 'false' }], expect: [{ attr: 'aria-selected', of: day(14), is: 'true' }, { attr: 'aria-selected', of: day(15), is: 'false' }] },
      { example, steps: [{ focus: day(14) }], press: 'Space', expect: [{ attr: 'aria-selected', of: day(14), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;
