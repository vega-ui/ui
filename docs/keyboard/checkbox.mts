import type { KeyboardSpec } from './types';

const example = 'checkbox/minimal-composition.tsx';
const remember = { role: 'checkbox', name: 'Remember me on this device' };

export default [
  {
    keys: ['Space'],
    en: 'Checks or unchecks the focused checkbox. An indeterminate checkbox becomes checked.',
    ru: 'Отмечает или снимает отметку с чекбокса в фокусе. Чекбокс в промежуточном состоянии становится отмеченным.',
    checks: [
      { example, steps: [{ focus: remember }], press: 'Space', before: [{ checked: false, of: remember }], expect: [{ checked: true, of: remember }, { focused: remember }] },
    ],
  },
] satisfies KeyboardSpec;
