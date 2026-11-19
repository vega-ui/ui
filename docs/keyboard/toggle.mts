import type { KeyboardSpec } from './types';

const example = 'toggle/minimal-composition.tsx';
const ruler = { role: 'button', name: 'Show ruler' };

const calls = 'toggle/call-controls.tsx';
const mute = { role: 'button', name: 'Mute' };

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Presses or releases the focused toggle, and the focus stays on it. It is a native `<button>`; with `asChild` the child keeps its own keys.',
    ru: 'Нажимает или отжимает переключатель в фокусе, и фокус остаётся на нём. Это нативный `<button>`; с `asChild` у дочернего элемента остаются свои клавиши.',
    checks: [
      { example, steps: [{ focus: ruler }], press: 'Enter', before: [{ attr: 'aria-pressed', of: ruler, is: 'false' }], expect: [{ attr: 'aria-pressed', of: ruler, is: 'true' }, { focused: ruler }] },
      { example, steps: [{ focus: ruler }, { press: 'Enter' }], press: 'Space', before: [{ attr: 'aria-pressed', of: ruler, is: 'true' }], expect: [{ attr: 'aria-pressed', of: ruler, is: 'false' }] },
      { example: calls, steps: [{ focus: mute }], press: 'Space', before: [{ attr: 'aria-pressed', of: mute, is: 'true' }], expect: [{ attr: 'aria-pressed', of: mute, is: 'false' }, { focused: mute }] },
    ],
  },
] satisfies KeyboardSpec;
