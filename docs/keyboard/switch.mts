import type { KeyboardSpec } from './types';

const example = 'switch/settings-toggle.tsx';
const updates = { role: 'switch', name: 'Automatic updates' };
const usage = { role: 'switch', name: 'Share usage data' };

export default [
  {
    keys: ['Space'],
    en: 'Turns the focused switch on or off.',
    ru: 'Включает или выключает переключатель в фокусе.',
    checks: [
      { example, steps: [{ focus: usage }], press: 'Space', before: [{ checked: false, of: usage }], expect: [{ checked: true, of: usage }] },
      { example, steps: [{ focus: updates }], press: 'Space', before: [{ checked: true, of: updates }], expect: [{ checked: false, of: updates }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous switch. Each switch is its own tab stop.',
    ru: 'Переносит фокус на следующий или предыдущий переключатель. Каждый переключатель — отдельная остановка табуляции.',
    checks: [
      { example, steps: [{ focus: updates }], press: 'Tab', expect: [{ focused: usage }] },
      { example, steps: [{ focus: usage }], press: 'Shift+Tab', expect: [{ focused: updates }] },
    ],
  },
] satisfies KeyboardSpec;
