import type { KeyboardSpec } from './types';

const example = 'password-field/sign-in-password.tsx';
const toggle = { role: 'button', name: 'Show password' };
const shown = { role: 'textbox', name: 'Password' };

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the toggle button, shows or hides the password and flips `aria-pressed`. The focus stays on the button.',
    ru: 'На кнопке-переключателе показывает или скрывает пароль и меняет `aria-pressed`. Фокус остаётся на кнопке.',
    checks: [
      { example, steps: [{ focus: toggle }], press: 'Enter', before: [{ attr: 'aria-pressed', of: toggle, is: 'false' }], expect: [{ attr: 'aria-pressed', of: toggle, is: 'true' }, { visible: shown }, { focused: toggle }] },
      { example, steps: [{ focus: toggle }, { press: 'Enter' }], press: 'Space', before: [{ visible: shown }], expect: [{ attr: 'aria-pressed', of: toggle, is: 'false' }] },
    ],
  },
  {
    keys: ['Shift+Tab'],
    en: 'From the toggle button, returns the focus to the input. The toggle is a separate tab stop after the input.',
    ru: 'С кнопки-переключателя возвращает фокус в поле. Переключатель — отдельная остановка табуляции после поля.',
    checks: [
      { example, steps: [{ focus: toggle }, { press: 'Enter' }], press: 'Shift+Tab', expect: [{ focused: shown }] },
    ],
  },
] satisfies KeyboardSpec;
