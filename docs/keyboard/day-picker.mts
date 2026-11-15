import type { KeyboardSpec } from './types';

const example = 'day-picker/one-month-of-days.tsx';
const day = (value: number) => ({ role: 'gridcell', name: String(value) });

export default [
  {
    keys: ['ArrowLeft', 'ArrowRight'],
    en: 'Moves the focus to the previous or next day, crossing into the neighbouring week or month and skipping unavailable days. In RTL the arrows are mirrored: ← moves to the next day.',
    ru: 'Переносит фокус на предыдущий или следующий день, переходя на соседнюю неделю или в соседний месяц и пропуская недоступные дни. В RTL стрелки зеркальны: ← ведёт к следующему дню.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'ArrowRight', expect: [{ focused: day(16) }] },
      { example, steps: [{ focus: day(16) }], press: 'ArrowLeft', expect: [{ focused: day(15) }] },
      { example, dir: 'rtl', steps: [{ focus: day(15) }], press: 'ArrowLeft', expect: [{ focused: day(16) }] },
      { example, steps: [{ focus: day(31) }], press: 'ArrowRight', expect: [{ focused: day(1) }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Moves the focus to the same weekday of the previous or next week, crossing into the neighbouring month and skipping unavailable days.',
    ru: 'Переносит фокус на тот же день недели предыдущей или следующей недели, переходя в соседний месяц и пропуская недоступные дни.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'ArrowDown', expect: [{ focused: day(22) }] },
      { example, steps: [{ focus: day(15) }], press: 'ArrowUp', expect: [{ focused: day(8) }] },
      { example, steps: [{ focus: day(29) }], press: 'ArrowDown', expect: [{ focused: day(5) }] },
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
    en: 'Moves the focus to the same day of the previous or next month and shows that month. A day the month does not have moves to its last day, an unavailable day to the nearest available one.',
    ru: 'Переносит фокус на тот же день предыдущего или следующего месяца и показывает этот месяц. Если такого дня в месяце нет, фокус встаёт на последний день, а с недоступного дня — на ближайший доступный.',
    checks: [
      { example, steps: [{ focus: day(31) }], press: 'PageUp', expect: [{ focused: day(28) }] },
      { example, steps: [{ focus: day(31) }], press: 'PageDown', expect: [{ focused: day(30) }] },
    ],
  },
  {
    keys: ['Shift+PageUp', 'Shift+PageDown'],
    en: 'Moves the focus to the same day and month of the previous or next year. February 29 moves to February 28 in a common year.',
    ru: 'Переносит фокус на тот же день и месяц предыдущего или следующего года. 29 февраля в невисокосном году превращается в 28 февраля.',
    checks: [
      { example, steps: [{ focus: day(15) }], press: 'Shift+PageDown', before: [{ attr: 'aria-selected', of: day(15), is: 'true' }], expect: [{ focused: day(15) }, { attr: 'aria-selected', of: day(15), is: 'false' }] },
      { example, steps: [{ focus: day(15) }], press: 'Shift+PageUp', expect: [{ focused: day(15) }, { attr: 'aria-selected', of: day(15), is: 'false' }] },
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
