import type { KeyboardSpec } from './types';

const example = 'collapsible/minimal-composition.tsx';
const trigger = { role: 'button', name: 'Advanced billing options' };

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Expands or collapses the content. The focus stays on the trigger.',
    ru: 'Раскрывает или сворачивает содержимое. Фокус остаётся на триггере.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ attr: 'aria-expanded', of: trigger, is: 'false' }], expect: [{ attr: 'aria-expanded', of: trigger, is: 'true' }, { focused: trigger }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }], press: 'Space', before: [{ attr: 'aria-expanded', of: trigger, is: 'true' }], expect: [{ attr: 'aria-expanded', of: trigger, is: 'false' }, { focused: trigger }] },
    ],
  },
] satisfies KeyboardSpec;
