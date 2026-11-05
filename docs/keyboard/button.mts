import type { KeyboardSpec } from './types';

const example = 'button/pressed-toggle.tsx';
const button = { role: 'button', name: 'Watch repository' };

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Activates the focused button. It is a native `<button>`; with `asChild` the child element keeps its own keys, so a link reacts to Enter only.',
    ru: 'Активирует кнопку в фокусе. Это нативный `<button>`; с `asChild` у дочернего элемента остаются свои клавиши, и ссылка реагирует только на Enter.',
    checks: [
      { example, steps: [{ focus: button }], press: 'Enter', before: [{ attr: 'aria-pressed', of: button, is: 'false' }], expect: [{ attr: 'aria-pressed', of: button, is: 'true' }, { focused: button }] },
      { example, steps: [{ focus: button }], press: 'Space', before: [{ attr: 'aria-pressed', of: button, is: 'false' }], expect: [{ attr: 'aria-pressed', of: button, is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;
