import type { KeyboardSpec } from './types';

const example = 'radio/disabled-option.tsx';
const eu = { role: 'radio', name: 'European Union (Frankfurt)' };
const us = { role: 'radio', name: 'United States (Virginia)' };

export default [
  {
    keys: ['ArrowDown', 'ArrowRight'],
    en: 'Moves the focus to the next enabled radio with the same `name` and checks it. This is native radio behaviour: Chromium and Firefox wrap from the last radio to the first and, in RTL, move to the previous radio on →; Safari does neither.',
    ru: 'Переносит фокус на следующую доступную радиокнопку с тем же `name` и отмечает её. Это нативное поведение радиокнопок: Chromium и Firefox с последней переходят на первую, а в RTL по → переносят на предыдущую; Safari не делает ни того, ни другого.',
    checks: [
      { example, steps: [{ focus: eu }], press: 'ArrowDown', before: [{ checked: true, of: eu }], expect: [{ checked: true, of: us }, { focused: us }] },
      { example, steps: [{ focus: eu }], press: 'ArrowRight', before: [{ checked: true, of: eu }], expect: [{ checked: true, of: us }, { focused: us }] },
      { example, steps: [{ focus: eu }, { press: 'ArrowDown' }], press: 'ArrowDown', before: [{ checked: true, of: us }], expect: [{ checked: true, of: eu }, { focused: eu }] },
      { example, dir: 'rtl', steps: [{ focus: eu }, { press: 'ArrowDown' }], press: 'ArrowRight', before: [{ checked: true, of: us }], expect: [{ checked: true, of: eu }, { focused: eu }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowLeft'],
    en: 'Moves the focus to the previous enabled radio with the same `name` and checks it. Chromium and Firefox wrap from the first radio to the last and, in RTL, move to the next radio on ←; Safari does neither.',
    ru: 'Переносит фокус на предыдущую доступную радиокнопку с тем же `name` и отмечает её. Chromium и Firefox с первой переходят на последнюю, а в RTL по ← переносят на следующую; Safari не делает ни того, ни другого.',
    checks: [
      { example, steps: [{ focus: eu }, { press: 'ArrowDown' }], press: 'ArrowUp', before: [{ checked: true, of: us }], expect: [{ checked: true, of: eu }, { focused: eu }] },
      { example, steps: [{ focus: eu }], press: 'ArrowLeft', before: [{ checked: true, of: eu }], expect: [{ checked: true, of: us }, { focused: us }] },
      { example, dir: 'rtl', steps: [{ focus: eu }], press: 'ArrowLeft', before: [{ checked: true, of: eu }], expect: [{ checked: true, of: us }, { focused: us }] },
    ],
  },
  {
    keys: ['Space'],
    en: 'Checks the focused radio if it is not checked yet.',
    ru: 'Отмечает радиокнопку в фокусе, если она ещё не отмечена.',
    checks: [
      { example, steps: [{ focus: us }], press: 'Space', before: [{ checked: false, of: us }], expect: [{ checked: true, of: us }, { checked: false, of: eu }] },
    ],
  },
] satisfies KeyboardSpec;
