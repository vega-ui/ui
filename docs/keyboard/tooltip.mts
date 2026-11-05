import type { KeyboardSpec } from './types';

const example = 'tooltip/icon-hint.tsx';
const reply = { role: 'button', name: 'Reply' };
const archive = { role: 'button', name: 'Archive' };
const hint = { role: 'tooltip', name: 'Move to Archive · E' };

export default [
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moving the focus to the trigger from the keyboard shows the tooltip after `delayOpen`, or at once right after another tooltip closed; moving it away hides the tooltip.',
    ru: 'Перенос фокуса на триггер с клавиатуры показывает тултип после `delayOpen` или сразу, если только что закрылся другой тултип; уход фокуса скрывает его.',
    checks: [
      { example, steps: [{ focus: reply }], press: 'Tab', before: [{ hidden: hint }], expect: [{ focused: archive }, { visible: hint }] },
      { example, steps: [{ focus: reply }, { press: 'Tab' }], press: 'Shift+Tab', before: [{ visible: hint }], expect: [{ focused: reply }, { hidden: hint }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Hides the open tooltip. The focus stays on the trigger.',
    ru: 'Скрывает открытый тултип. Фокус остаётся на триггере.',
    checks: [
      { example, steps: [{ focus: reply }, { press: 'Tab' }], press: 'Escape', before: [{ visible: hint }], expect: [{ hidden: hint }, { focused: archive }] },
    ],
  },
] satisfies KeyboardSpec;
