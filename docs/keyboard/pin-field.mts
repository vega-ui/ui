import type { KeyboardSpec } from './types';

const example = 'pin-field/standard-4-digit-pin.tsx';
const pin = { role: 'textbox', name: 'New card PIN' };

export default [
  {
    keys: ['Backspace'],
    en: 'Deletes the character before the caret. The focus stays in the field, it is one input behind the slots.',
    ru: 'Удаляет символ перед кареткой. Фокус остаётся в поле: за ячейками стоит одно поле ввода.',
    checks: [
      { example, steps: [{ focus: pin }, { press: '1' }, { press: '2' }, { press: '3' }], press: 'Backspace', before: [{ value: '123', of: pin }], expect: [{ value: '12', of: pin }, { focused: pin }] },
    ],
  },
] satisfies KeyboardSpec;
