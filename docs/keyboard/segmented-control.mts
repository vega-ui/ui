import type { KeyboardSpec } from './types';

const example = 'segmented-control/minimal-composition.tsx';
const monthly = { role: 'radio', name: 'Monthly' };
const yearly = { role: 'radio', name: 'Yearly' };

export default [
  {
    keys: ['ArrowRight', 'ArrowDown'],
    en: 'Moves the focus to the next segment and selects it. Segments are native radios: Chromium and Firefox wrap from the last segment to the first and, in RTL, move to the previous segment on →; Safari does neither.',
    ru: 'Переносит фокус на следующий сегмент и выбирает его. Сегменты — нативные радиокнопки: Chromium и Firefox с последнего переходят на первый, а в RTL по → переносят на предыдущий; Safari не делает ни того, ни другого.',
    checks: [
      { example, steps: [{ focus: monthly }], press: 'ArrowRight', before: [{ checked: true, of: monthly }], expect: [{ checked: true, of: yearly }, { focused: yearly }] },
      { example, steps: [{ focus: monthly }], press: 'ArrowDown', expect: [{ checked: true, of: yearly }, { focused: yearly }] },
      { example, steps: [{ focus: monthly }, { press: 'ArrowRight' }], press: 'ArrowRight', before: [{ checked: true, of: yearly }], expect: [{ checked: true, of: monthly }] },
      { example, dir: 'rtl', steps: [{ focus: monthly }, { press: 'ArrowDown' }], press: 'ArrowRight', before: [{ checked: true, of: yearly }], expect: [{ checked: true, of: monthly }, { focused: monthly }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowUp'],
    en: 'Moves the focus to the previous segment and selects it. Chromium and Firefox wrap from the first segment to the last and, in RTL, move to the next segment on ←; Safari does neither.',
    ru: 'Переносит фокус на предыдущий сегмент и выбирает его. Chromium и Firefox с первого переходят на последний, а в RTL по ← переносят на следующий; Safari не делает ни того, ни другого.',
    checks: [
      { example, steps: [{ focus: monthly }, { press: 'ArrowRight' }], press: 'ArrowLeft', before: [{ checked: true, of: yearly }], expect: [{ checked: true, of: monthly }, { focused: monthly }] },
      { example, steps: [{ focus: monthly }], press: 'ArrowUp', before: [{ checked: true, of: monthly }], expect: [{ checked: true, of: yearly }] },
      { example, dir: 'rtl', steps: [{ focus: monthly }], press: 'ArrowLeft', before: [{ checked: true, of: monthly }], expect: [{ checked: true, of: yearly }, { focused: yearly }] },
    ],
  },
] satisfies KeyboardSpec;
